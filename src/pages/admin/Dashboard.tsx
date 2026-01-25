/**
 * Admin Dashboard Page
 * 管理後台儀表板
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Users,
  FileText,
  Clock,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectStatusInfo, type ProjectStatus } from '@/types/supabase';

// 模擬資料（之後會從 Supabase 取得）
interface DashboardStats {
  totalProjects: number;
  pendingProjects: number;
  inProgressProjects: number;
  completedProjects: number;
  totalClients: number;
  totalFiles: number;
}

interface RecentProject {
  id: string;
  project_name: string;
  company_name: string;
  status: ProjectStatus;
  created_at: string;
  template_id: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    pendingProjects: 0,
    inProgressProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    totalFiles: 0,
  });

  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 從 localStorage 讀取模擬資料
    const loadData = () => {
      try {
        const submissions = JSON.parse(
          localStorage.getItem('client_submissions') || '[]'
        );
        
        // 計算統計
        const pending = submissions.filter((s: any) => !s.status || s.status === 'pending').length;
        const inProgress = submissions.filter((s: any) => s.status === 'in_progress').length;
        const completed = submissions.filter((s: any) => s.status === 'completed').length;

        setStats({
          totalProjects: submissions.length,
          pendingProjects: pending,
          inProgressProjects: inProgress,
          completedProjects: completed,
          totalClients: submissions.length, // 假設每個提交是一個客戶
          totalFiles: submissions.reduce((acc: number, s: any) => acc + (s.files?.length || 0), 0),
        });

        // 最近專案
        const recent = submissions
          .slice(-5)
          .reverse()
          .map((s: any) => ({
            id: s.id,
            project_name: `${s.companyName} 官網專案`,
            company_name: s.companyName,
            status: s.status || 'pending',
            created_at: s.submittedAt,
            template_id: s.templateId || 'enterprise-shine',
          }));

        setRecentProjects(recent);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const statCards = [
    {
      title: '總專案數',
      value: stats.totalProjects,
      icon: FolderKanban,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: '待處理',
      value: stats.pendingProjects,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: '進行中',
      value: stats.inProgressProjects,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: '已完成',
      value: stats.completedProjects,
      icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">儀表板</h1>
          <p className="text-muted-foreground">歡迎回來！這是您的專案總覽。</p>
        </div>
        <Link to="/intake">
          <Button className="gap-2">
            <FolderKanban className="h-4 w-4" />
            新增專案
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>最近專案</CardTitle>
              <CardDescription>最近提交的專案需求</CardDescription>
            </div>
            <Link to="/admin/projects">
              <Button variant="ghost" size="sm" className="gap-1">
                查看全部
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">尚無專案</h3>
                <p className="text-muted-foreground mb-4">
                  還沒有客戶提交需求單
                </p>
                <Link to="/intake">
                  <Button>建立第一個專案</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => {
                  const statusConfig = projectStatusInfo[project.status];
                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FolderKanban className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{project.project_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.company_name} • {project.template_id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={statusConfig.color}>
                          {statusConfig.labelZh}
                        </Badge>
                        <Link to={`/admin/projects/${project.id}`}>
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>快速操作</CardTitle>
            <CardDescription>常用功能</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/intake" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FolderKanban className="h-4 w-4" />
                建立新專案
              </Button>
            </Link>
            <Link to="/admin/clients" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" />
                管理客戶
              </Button>
            </Link>
            <Link to="/admin/files" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                檔案庫
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>系統資訊</CardTitle>
            <CardDescription>模板與統計</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">可用模板</span>
              <span className="font-medium">2 個</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">總客戶數</span>
              <span className="font-medium">{stats.totalClients}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">總檔案數</span>
              <span className="font-medium">{stats.totalFiles}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">系統版本</span>
              <span className="font-medium">v1.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


