/**
 * Workspace Home Page
 * 客戶工作區首頁 - 顯示專案總覽和進度
 */

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  Clock,
  HelpCircle,
  ArrowRight,
  FileText,
  Image,
  MessageSquare,
  Calendar,
  User,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { getProjectById, getProjectContent } from '@/lib/supabase';
import { getTemplateById } from '@/templates/registry';

interface ModuleStatus {
  id: string;
  name: string;
  description: string;
  totalFields: number;
  completedFields: number;
  status: 'pending' | 'in_progress' | 'completed' | 'review';
}

interface ProjectData {
  name: string;
  template: string;
  templateId: string;
  createdAt: string;
  contactName: string;
  status: string;
}

const statusConfig = {
  pending: { label: '尚未開始', icon: Circle, color: 'bg-gray-100 text-gray-600' },
  in_progress: { label: '填寫中', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: '已完成', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
  review: { label: '等待審核', icon: HelpCircle, color: 'bg-blue-100 text-blue-700' },
};

export default function WorkspaceHome() {
  const { projectId } = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectData | null>(null);
  const [modules, setModules] = useState<ModuleStatus[]>([]);

  useEffect(() => {
    if (projectId) {
      loadProjectData();
    }
  }, [projectId]);

  const loadProjectData = async () => {
    setLoading(true);
    setError(null);

    try {
      // 取得專案資料
      const { data: projectData, error: projectError } = await getProjectById(projectId!);
      
      if (projectError || !projectData) {
        setError(projectError || '找不到專案');
        return;
      }

      // 設定專案資訊
      const template = getTemplateById(projectData.template_id || projectData.templateId);
      setProject({
        name: projectData.project_name || `${projectData.companyName || projectData.client?.company_name} 官網專案`,
        template: template?.name || projectData.template_id || 'Unknown',
        templateId: projectData.template_id || projectData.templateId || 'enterprise-shine',
        createdAt: new Date(projectData.created_at || projectData.submittedAt).toLocaleDateString('zh-TW'),
        contactName: projectData.contactName || projectData.client?.contact_name || '',
        status: projectData.status || 'pending',
      });

      // 取得內容資料
      const { data: content } = await getProjectContent(projectId!);
      
      // 根據模板計算模組進度
      if (template) {
        const moduleStatuses: ModuleStatus[] = template.modules.map((module) => {
          // 計算此模組的總欄位數
          let totalFields = 0;
          module.sections.forEach((section) => {
            const multiplier = section.repeatable ? (section.minItems || 1) : 1;
            totalFields += section.fields.length * multiplier;
          });

          // 計算已填寫的欄位數
          const moduleContent = content?.filter((c) => c.module_id === module.id) || [];
          const completedFields = moduleContent.filter(
            (c) => c.content_value || c.content_json
          ).length;

          // 判斷狀態
          let status: ModuleStatus['status'] = 'pending';
          if (completedFields === 0) {
            status = 'pending';
          } else if (completedFields >= totalFields) {
            status = 'completed';
          } else {
            status = 'in_progress';
          }

          return {
            id: module.id,
            name: module.name,
            description: module.description,
            totalFields,
            completedFields,
            status,
          };
        });

        setModules(moduleStatuses);
      }
    } catch (err: any) {
      console.error('Failed to load project:', err);
      setError(err.message || '載入失敗');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-medium mb-2">無法載入專案</h2>
        <p className="text-muted-foreground mb-4">{error || '找不到專案資料'}</p>
        <Link to="/intake">
          <Button>返回首頁</Button>
        </Link>
      </div>
    );
  }

  // 計算進度
  const totalFields = modules.reduce((sum, m) => sum + m.totalFields, 0);
  const completedFields = modules.reduce((sum, m) => sum + m.completedFields, 0);
  const overallProgress = totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;

  // 找到下一個要填寫的模組
  const nextModule = modules.find(m => m.status === 'pending' || m.status === 'in_progress');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">歡迎回來！👋</h1>
          <p className="text-muted-foreground">
            繼續完成您的網站內容，我們會協助您打造完美的企業官網。
          </p>
        </div>
        {nextModule && (
          <Link to={`/workspace/${projectId}/${nextModule.id}`}>
            <Button className="gap-2">
              繼續填寫
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">整體進度</CardTitle>
          <CardDescription>您已完成 {overallProgress}% 的內容</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={overallProgress} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {modules.filter(m => m.status === 'completed').length}
              </p>
              <p className="text-xs text-muted-foreground">已完成</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">
                {modules.filter(m => m.status === 'in_progress').length}
              </p>
              <p className="text-xs text-muted-foreground">進行中</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {modules.filter(m => m.status === 'review').length}
              </p>
              <p className="text-xs text-muted-foreground">待審核</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">
                {modules.filter(m => m.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">未開始</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">內容模組</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((module) => {
            const config = statusConfig[module.status];
            const StatusIcon = config.icon;
            const progress = module.totalFields > 0 
              ? Math.round((module.completedFields / module.totalFields) * 100) 
              : 0;

            return (
              <Link key={module.id} to={`/workspace/${projectId}/${module.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-5 w-5 ${
                          module.status === 'completed' ? 'text-green-500' :
                          module.status === 'in_progress' ? 'text-yellow-500' :
                          module.status === 'review' ? 'text-blue-500' :
                          'text-gray-400'
                        }`} />
                        <h3 className="font-semibold">{module.name}</h3>
                      </div>
                      <Badge className={config.color}>
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress value={progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {module.completedFields}/{module.totalFields}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Quick Actions & Info */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">快速操作</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to={`/workspace/${projectId}/files`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Image className="h-4 w-4" />
                上傳檔案
              </Button>
            </Link>
            <Link to={`/workspace/${projectId}/messages`}>
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare className="h-4 w-4" />
                聯繫我們
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              查看規格指南
            </Button>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">專案資訊</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">專案名稱：</span>
              <span>{project.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">使用模板：</span>
              <Badge variant="outline">{project.template}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">建立日期：</span>
              <span>{project.createdAt}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">聯絡人：</span>
              <span>{project.contactName}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
