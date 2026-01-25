/**
 * Admin Project List Page
 * 管理後台專案列表
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Trash2,
  Download,
  Calendar,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { projectStatusInfo, timelineOptions, type ProjectStatus, type TimelineOption } from '@/types/supabase';

interface ProjectItem {
  id: string;
  project_name: string;
  company_name: string;
  contact_email: string;
  status: ProjectStatus;
  timeline: TimelineOption;
  template_id: string;
  created_at: string;
  file_count: number;
  languages: string[];
}

export default function ProjectList() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );

      const projectList: ProjectItem[] = submissions.map((s: any) => ({
        id: s.id,
        project_name: `${s.companyName} 官網專案`,
        company_name: s.companyName,
        contact_email: s.contactEmail,
        status: s.status || 'pending',
        timeline: s.timeline || 'flexible',
        template_id: s.templateId || 'enterprise-shine',
        created_at: s.submittedAt,
        file_count: s.files?.length || 0,
        languages: s.languages || ['zh-TW'],
      }));

      setProjects(projectList);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = (id: string, newStatus: ProjectStatus) => {
    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );
      
      const updated = submissions.map((s: any) => {
        if (s.id === id) {
          return { ...s, status: newStatus };
        }
        return s;
      });

      localStorage.setItem('client_submissions', JSON.stringify(updated));
      loadProjects();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteProject = (id: string) => {
    if (!confirm('確定要刪除此專案嗎？此操作無法復原。')) {
      return;
    }

    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );
      
      const filtered = submissions.filter((s: any) => s.id !== id);
      localStorage.setItem('client_submissions', JSON.stringify(filtered));
      loadProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  // 篩選專案
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.contact_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

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
          <h1 className="text-2xl font-bold">專案管理</h1>
          <p className="text-muted-foreground">
            共 {projects.length} 個專案，{projects.filter(p => p.status === 'pending').length} 個待處理
          </p>
        </div>
        <Link to="/intake">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            新增專案
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋專案名稱、公司或 Email..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="篩選狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                {Object.entries(projectStatusInfo).map(([key, info]) => (
                  <SelectItem key={key} value={key}>{info.labelZh}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Project Table */}
      <Card>
        <CardContent className="p-0">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <FolderKanban className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchTerm || statusFilter !== 'all' ? '找不到符合條件的專案' : '尚無專案'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? '請嘗試其他搜尋條件' 
                  : '開始建立第一個專案吧！'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/intake">
                  <Button>建立專案</Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>專案</TableHead>
                  <TableHead>模板</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>時程</TableHead>
                  <TableHead>建立日期</TableHead>
                  <TableHead>檔案</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => {
                  const statusConfig = projectStatusInfo[project.status];
                  const timelineConfig = timelineOptions[project.timeline];
                  
                  return (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FolderKanban className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Link 
                              to={`/admin/projects/${project.id}`}
                              className="font-medium hover:underline"
                            >
                              {project.project_name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {project.contact_email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {project.template_id === 'quantum-horizons' 
                            ? 'Quantum Horizons' 
                            : 'Enterprise Shine'
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={project.status}
                          onValueChange={(value) => updateProjectStatus(project.id, value as ProjectStatus)}
                        >
                          <SelectTrigger className="w-28 h-8">
                            <Badge className={`${statusConfig.color} text-xs`}>
                              {statusConfig.labelZh}
                            </Badge>
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(projectStatusInfo).map(([key, info]) => (
                              <SelectItem key={key} value={key}>
                                <Badge className={info.color}>{info.labelZh}</Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{timelineConfig.labelZh}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(project.created_at)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          {project.file_count}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/admin/projects/${project.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                查看詳情
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              匯出資料
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => deleteProject(project.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              刪除專案
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


