/**
 * Admin Project Detail Page
 * 管理後台專案詳情
 */

import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Palette,
  Globe,
  Clock,
  FileText,
  Download,
  Trash2,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Layers,
  Image as ImageIcon,
  File,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  projectStatusInfo,
  timelineOptions,
  type ProjectStatus,
  type TimelineOption,
  type UploadedFile,
} from '@/types/supabase';
import { getTemplateById } from '@/templates/registry';
import { ExportDialog } from '@/components/workspace/ExportDialog';
import { prepareExportData, type ExportData } from '@/lib/content-exporter';

interface ProjectData {
  id: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  primaryColor: string;
  templateId: string;
  selectedModuleIds: string[];
  languages: string[];
  referenceSites?: string;
  specialRequirements?: string;
  timeline: TimelineOption;
  status: ProjectStatus;
  files: UploadedFile[];
  submittedAt: string;
  internalNotes?: string;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');
  const [exportData, setExportData] = useState<ExportData | null>(null);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = () => {
    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );
      
      const found = submissions.find((s: any) => s.id === id);
      if (found) {
        const projectData = {
          ...found,
          status: found.status || 'pending',
        };
        setProject(projectData);
        setInternalNotes(found.internalNotes || '');
        
        // 準備匯出資料
        const content = JSON.parse(localStorage.getItem(`content_${id}`) || '[]');
        const files = JSON.parse(localStorage.getItem(`files_${id}`) || '[]');
        const template = getTemplateById(found.templateId);
        
        if (template) {
          const expData: ExportData = {
            project: {
              id: found.id,
              name: `${found.companyName} 官網專案`,
              templateId: found.templateId,
              status: found.status || 'pending',
              createdAt: found.submittedAt,
              updatedAt: found.submittedAt,
            },
            client: {
              companyName: found.companyName,
              contactName: found.contactName,
              contactEmail: found.contactEmail,
              primaryColor: found.primaryColor,
            },
            modules: template.modules
              .filter(m => found.selectedModuleIds?.includes(m.id))
              .map(m => ({
                moduleId: m.id,
                moduleName: m.name,
                sections: m.sections.map(s => ({
                  sectionId: s.id,
                  sectionName: s.name,
                  fields: s.fields.map(f => {
                    const item = content.find((c: any) => 
                      c.module_id === m.id && c.section_id === s.id && c.field_id === f.id
                    );
                    return {
                      fieldId: f.id,
                      fieldName: f.label,
                      value: item?.content_value || null,
                      jsonValue: item?.content_json,
                    };
                  }),
                })),
              })),
            files: files.map((f: any) => ({
              id: f.id,
              fileName: f.file_name || f.name,
              fileType: f.file_type || f.type,
              url: f.public_url || f.url,
              uploadedAt: f.created_at || found.submittedAt,
            })),
            exportedAt: new Date().toISOString(),
          };
          setExportData(expData);
        }
      }
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProject = (updates: Partial<ProjectData>) => {
    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );
      
      const updated = submissions.map((s: any) => {
        if (s.id === id) {
          return { ...s, ...updates };
        }
        return s;
      });

      localStorage.setItem('client_submissions', JSON.stringify(updated));
      loadProject();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const deleteProject = () => {
    if (!confirm('確定要刪除此專案嗎？此操作無法復原。')) {
      return;
    }

    try {
      const submissions = JSON.parse(
        localStorage.getItem('client_submissions') || '[]'
      );
      
      const filtered = submissions.filter((s: any) => s.id !== id);
      localStorage.setItem('client_submissions', JSON.stringify(filtered));
      navigate('/admin/projects');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'logo':
      case 'hero':
      case 'product':
      case 'team':
        return ImageIcon;
      default:
        return File;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium mb-2">找不到專案</h2>
        <p className="text-muted-foreground mb-4">此專案可能已被刪除</p>
        <Link to="/admin/projects">
          <Button>返回專案列表</Button>
        </Link>
      </div>
    );
  }

  const template = getTemplateById(project.templateId);
  const statusConfig = projectStatusInfo[project.status];
  const timelineConfig = timelineOptions[project.timeline];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{project.companyName} 官網專案</h1>
            <p className="text-muted-foreground">
              建立於 {formatDate(project.submittedAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/workspace/${id}`}>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              客戶工作區
            </Button>
          </Link>
          <ExportDialog data={exportData} />
          <Button variant="destructive" className="gap-2" onClick={deleteProject}>
            <Trash2 className="h-4 w-4" />
            刪除
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">狀態：</span>
              <Select
                value={project.status}
                onValueChange={(value) => updateProject({ status: value as ProjectStatus })}
              >
                <SelectTrigger className="w-32 h-8">
                  <Badge className={statusConfig.color}>{statusConfig.labelZh}</Badge>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(projectStatusInfo).map(([key, info]) => (
                    <SelectItem key={key} value={key}>
                      <Badge className={info.color}>{info.labelZh}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{timelineConfig.labelZh}</span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{template?.name || project.templateId}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">基本資訊</TabsTrigger>
          <TabsTrigger value="modules">選擇模組</TabsTrigger>
          <TabsTrigger value="files">
            檔案
            {project.files?.length > 0 && (
              <Badge variant="secondary" className="ml-2">{project.files.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notes">內部備註</TabsTrigger>
        </TabsList>

        {/* Info Tab */}
        <TabsContent value="info" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">客戶資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">公司名稱</p>
                    <p className="font-medium">{project.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${project.contactEmail}`} className="font-medium text-primary hover:underline">
                      {project.contactEmail}
                    </a>
                  </div>
                </div>
                {project.contactPhone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">電話</p>
                      <p className="font-medium">{project.contactPhone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">品牌主色</p>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: project.primaryColor }}
                      />
                      <span className="font-mono text-sm">{project.primaryColor}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">語言需求</p>
                    <div className="flex gap-1">
                      {project.languages?.map((lang) => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">其他資訊</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {project.referenceSites && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">參考網站</p>
                    <p className="text-sm whitespace-pre-wrap">{project.referenceSites}</p>
                  </div>
                )}
                {project.specialRequirements && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">特殊需求</p>
                    <p className="text-sm whitespace-pre-wrap">{project.specialRequirements}</p>
                  </div>
                )}
                {!project.referenceSites && !project.specialRequirements && (
                  <p className="text-muted-foreground text-sm">無其他備註</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Modules Tab */}
        <TabsContent value="modules">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">已選擇的功能模組</CardTitle>
              <CardDescription>
                客戶選擇的模板：{template?.name || project.templateId}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.selectedModuleIds && project.selectedModuleIds.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {template?.modules
                    .filter(m => project.selectedModuleIds.includes(m.id))
                    .map((module) => (
                      <div 
                        key={module.id}
                        className="p-3 rounded-lg border bg-primary/5 border-primary/20"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="font-medium">{module.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {module.sections.length} 個內容區塊
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-muted-foreground">未選擇任何模組</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Files Tab */}
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">上傳的檔案</CardTitle>
              <CardDescription>
                共 {project.files?.length || 0} 個檔案
              </CardDescription>
            </CardHeader>
            <CardContent>
              {project.files && project.files.length > 0 ? (
                <div className="space-y-2">
                  {project.files.map((file) => {
                    const FileIcon = getFileIcon(file.type);
                    return (
                      <div 
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <FileIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">{file.type}</Badge>
                              <span>{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.url && (
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="icon">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">尚無上傳檔案</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                內部備註
              </CardTitle>
              <CardDescription>
                此備註僅供內部人員查看，客戶不會看到
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="輸入內部備註..."
                rows={6}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
              />
              <Button 
                onClick={() => updateProject({ internalNotes })}
                disabled={internalNotes === project.internalNotes}
              >
                儲存備註
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

