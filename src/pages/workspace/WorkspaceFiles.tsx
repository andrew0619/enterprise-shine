/**
 * Workspace Files Page
 * 檔案管理頁面
 */

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Upload,
  Image as ImageIcon,
  FileText,
  Folder,
  MoreHorizontal,
  Download,
  Trash2,
  Eye,
  Search,
  Grid,
  List,
  Filter,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUploader } from '@/components/intake/FileUploader';
import type { UploadedFile } from '@/types/supabase';

interface FileItem {
  id: string;
  name: string;
  type: 'logo' | 'hero' | 'product' | 'team' | 'document' | 'other';
  size: number;
  url: string;
  uploadedAt: string;
  module?: string;
}

const fileTypeLabels: Record<string, string> = {
  logo: 'Logo',
  hero: '主視覺',
  product: '產品圖',
  team: '團隊照',
  document: '文件',
  other: '其他',
};

const fileTypeColors: Record<string, string> = {
  logo: 'bg-purple-100 text-purple-700',
  hero: 'bg-blue-100 text-blue-700',
  product: 'bg-green-100 text-green-700',
  team: 'bg-orange-100 text-orange-700',
  document: 'bg-gray-100 text-gray-700',
  other: 'bg-gray-100 text-gray-700',
};

export default function WorkspaceFiles() {
  const { projectId } = useParams<{ projectId: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showUploader, setShowUploader] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadedFile[]>([]);

  // 模擬檔案列表（之後從 API 取得）
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: 'company-logo.png',
      type: 'logo',
      size: 245000,
      url: '#',
      uploadedAt: '2026-01-20T10:00:00',
      module: 'brand',
    },
    {
      id: '2',
      name: 'hero-background.jpg',
      type: 'hero',
      size: 2450000,
      url: '#',
      uploadedAt: '2026-01-20T11:30:00',
      module: 'hero',
    },
    {
      id: '3',
      name: 'product-server.png',
      type: 'product',
      size: 890000,
      url: '#',
      uploadedAt: '2026-01-21T09:00:00',
      module: 'services',
    },
    {
      id: '4',
      name: 'content-brief.docx',
      type: 'document',
      size: 156000,
      url: '#',
      uploadedAt: '2026-01-21T14:00:00',
    },
  ]);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || file.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const isImageType = (type: string) => ['logo', 'hero', 'product', 'team'].includes(type);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">檔案管理</h1>
          <p className="text-muted-foreground">管理您上傳的所有檔案</p>
        </div>
        <Button onClick={() => setShowUploader(!showUploader)} className="gap-2">
          <Upload className="h-4 w-4" />
          上傳檔案
        </Button>
      </div>

      {/* Upload Section */}
      {showUploader && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">上傳新檔案</CardTitle>
            <CardDescription>支援圖片和文件格式</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUploader
              label=""
              description="拖曳檔案到這裡，或點擊選擇檔案"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              maxSize={10}
              fileType="other"
              files={uploadFiles}
              onFilesChange={setUploadFiles}
            />
            {uploadFiles.length > 0 && (
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setUploadFiles([])}>
                  清除
                </Button>
                <Button onClick={() => {
                  // 實作上傳邏輯
                  setUploadFiles([]);
                  setShowUploader(false);
                }}>
                  確認上傳
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜尋檔案..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="篩選類型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部類型</SelectItem>
            {Object.entries(fileTypeLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex border rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* File Stats */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <span>共 {filteredFiles.length} 個檔案</span>
        <span>•</span>
        <span>
          總大小 {formatSize(filteredFiles.reduce((sum, f) => sum + f.size, 0))}
        </span>
      </div>

      {/* Files Grid/List */}
      {filteredFiles.length === 0 ? (
        <Card className="py-12">
          <CardContent className="text-center">
            <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">沒有找到檔案</h3>
            <p className="text-muted-foreground">
              {searchTerm || typeFilter !== 'all' 
                ? '嘗試其他搜尋條件' 
                : '上傳您的第一個檔案開始吧！'
              }
            </p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="group overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                {isImageType(file.type) ? (
                  <ImageIcon className="h-16 w-16 text-muted-foreground" />
                ) : (
                  <FileText className="h-16 w-16 text-muted-foreground" />
                )}
                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <p className="font-medium text-sm truncate">{file.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge className={`text-xs ${fileTypeColors[file.type]}`}>
                    {fileTypeLabels[file.type]}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatSize(file.size)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {isImageType(file.type) ? (
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge className={`${fileTypeColors[file.type]}`}>
                        {fileTypeLabels[file.type]}
                      </Badge>
                      <span>{formatSize(file.size)}</span>
                      <span>•</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        預覽
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        下載
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}


