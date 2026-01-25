/**
 * Workspace Layout Component
 * 客戶內容協作平台佈局
 */

import { useState } from 'react';
import { Link, useLocation, Outlet, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Settings,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ModuleProgress {
  id: string;
  name: string;
  totalFields: number;
  completedFields: number;
  status: 'pending' | 'in_progress' | 'completed' | 'review';
}

interface WorkspaceLayoutProps {
  projectName?: string;
  companyName?: string;
  modules?: ModuleProgress[];
}

const statusIcons = {
  pending: Circle,
  in_progress: Clock,
  completed: CheckCircle2,
  review: HelpCircle,
};

const statusColors = {
  pending: 'text-muted-foreground',
  in_progress: 'text-yellow-500',
  completed: 'text-green-500',
  review: 'text-blue-500',
};

export default function WorkspaceLayout() {
  const { projectId } = useParams<{ projectId: string }>();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 模擬模組進度（之後會從 API 取得）
  const [modules] = useState<ModuleProgress[]>([
    { id: 'brand', name: '品牌識別', totalFields: 4, completedFields: 2, status: 'in_progress' },
    { id: 'hero', name: '首頁主視覺', totalFields: 4, completedFields: 0, status: 'pending' },
    { id: 'services', name: '核心服務', totalFields: 9, completedFields: 9, status: 'completed' },
    { id: 'stats', name: '數據統計', totalFields: 8, completedFields: 4, status: 'in_progress' },
    { id: 'contact', name: '聯絡資訊', totalFields: 6, completedFields: 6, status: 'review' },
    { id: 'about', name: '關於我們', totalFields: 5, completedFields: 0, status: 'pending' },
  ]);

  // 計算總體進度
  const totalFields = modules.reduce((sum, m) => sum + m.totalFields, 0);
  const completedFields = modules.reduce((sum, m) => sum + m.completedFields, 0);
  const overallProgress = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  const isActive = (moduleId: string) => {
    return location.pathname.includes(`/workspace/${projectId}/${moduleId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-background border-r
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">內容工作區</p>
              <p className="text-xs text-muted-foreground">科技創新公司</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Overview */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">整體進度</span>
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            已完成 {completedFields} / {totalFields} 個欄位
          </p>
        </div>

        {/* Module Navigation */}
        <nav className="p-2 flex-1 overflow-y-auto">
          <p className="text-xs font-medium text-muted-foreground px-3 py-2">內容模組</p>
          {modules.map((module) => {
            const active = isActive(module.id);
            const StatusIcon = statusIcons[module.status];
            const progress = module.totalFields > 0 
              ? Math.round((module.completedFields / module.totalFields) * 100) 
              : 0;

            return (
              <Link
                key={module.id}
                to={`/workspace/${projectId}/${module.id}`}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors mb-1
                  ${active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Tooltip>
                  <TooltipTrigger>
                    <StatusIcon className={`h-4 w-4 ${statusColors[module.status]}`} />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {module.status === 'pending' && '尚未開始'}
                    {module.status === 'in_progress' && '填寫中'}
                    {module.status === 'completed' && '已完成'}
                    {module.status === 'review' && '等待審核'}
                  </TooltipContent>
                </Tooltip>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{module.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/60 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {module.completedFields}/{module.totalFields}
                    </span>
                  </div>
                </div>
                {active && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t space-y-2">
          <Link to={`/workspace/${projectId}/files`}>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Image className="h-4 w-4" />
              檔案管理
            </Button>
          </Link>
          <Link to={`/workspace/${projectId}/messages`}>
            <Button variant="outline" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              留言討論
              <Badge variant="secondary" className="ml-auto">2</Badge>
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-14 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center justify-between h-full px-4">
            {/* Left: Mobile menu + Breadcrumb */}
            <div className="flex items-center gap-3">
              <button 
                className="lg:hidden p-2 -ml-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <nav className="flex items-center gap-1 text-sm">
                <Link to={`/workspace/${projectId}`} className="text-muted-foreground hover:text-foreground">
                  工作區
                </Link>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">品牌識別</span>
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                儲存草稿
              </Button>
              <Button size="sm">
                提交審核
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 max-w-4xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


