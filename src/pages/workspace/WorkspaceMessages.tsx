/**
 * Workspace Messages Page
 * 客戶與 Agency 的留言討論
 */

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Send,
  Paperclip,
  CheckCheck,
  User,
  Headphones,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getProjectComments, sendComment, markCommentsAsRead, getProjectById } from '@/lib/supabase';
import type { Comment } from '@/types/supabase';

export default function WorkspaceMessages() {
  const { projectId } = useParams<{ projectId: string }>();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [clientName, setClientName] = useState('客戶');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);

  useEffect(() => {
    // 滾動到最新訊息
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const loadData = async () => {
    setLoading(true);
    try {
      // 載入專案資料以取得客戶名稱
      const { data: project } = await getProjectById(projectId!);
      if (project) {
        setClientName(project.client?.contact_name || '客戶');
      }

      // 載入留言
      const { data: comments, error } = await getProjectComments(projectId!);
      if (error) {
        console.error('Failed to load comments:', error);
      } else {
        setMessages(comments || []);
        
        // 標記 Agency 的訊息為已讀
        const unreadAgencyMessages = comments?.filter(
          c => c.author_type === 'agency' && !c.is_read
        ) || [];
        
        if (unreadAgencyMessages.length > 0) {
          await markCommentsAsRead(projectId!, unreadAgencyMessages.map(c => c.id));
        }
      }
    } catch (err) {
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !projectId) return;
    
    setSending(true);
    try {
      const { success, error } = await sendComment(
        projectId,
        'client',
        clientName,
        newMessage.trim()
      );

      if (success) {
        setNewMessage('');
        // 重新載入訊息
        await loadData();
      } else {
        console.error('Failed to send message:', error);
      }
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days} 天前`;
    } else {
      return date.toLocaleDateString('zh-TW', { month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">留言討論</h1>
        <p className="text-muted-foreground">與我們的團隊溝通，解決您的疑問</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden">
        {/* Messages List */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">尚無訊息</h3>
              <p className="text-muted-foreground">
                有任何問題都可以在這裡詢問我們！
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isAgency = message.author_type === 'agency';
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isAgency ? '' : 'flex-row-reverse'}`}
                  >
                    <Avatar className={`h-8 w-8 shrink-0 ${isAgency ? 'bg-primary' : 'bg-muted'}`}>
                      <AvatarFallback className={isAgency ? 'bg-primary text-primary-foreground' : ''}>
                        {isAgency ? (
                          <Headphones className="h-4 w-4" />
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`flex-1 max-w-[80%] ${isAgency ? '' : 'flex flex-col items-end'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{message.author_name}</span>
                        {isAgency && (
                          <Badge variant="secondary" className="text-xs">客服</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTime(message.created_at)}
                        </span>
                      </div>
                      <div className={`
                        rounded-2xl px-4 py-2.5 text-sm
                        ${isAgency 
                          ? 'bg-muted rounded-tl-sm' 
                          : 'bg-primary text-primary-foreground rounded-tr-sm'
                        }
                      `}>
                        {message.message}
                      </div>
                      {!isAgency && message.is_read && (
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <CheckCheck className="h-3 w-3" />
                          已讀
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="輸入訊息..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              disabled={sending}
              className="flex-1"
            />
            <Button 
              onClick={handleSend}
              disabled={!newMessage.trim() || sending}
              size="icon"
            >
              {sending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            按 Enter 發送，我們通常在 24 小時內回覆
          </p>
        </div>
      </Card>
    </div>
  );
}
