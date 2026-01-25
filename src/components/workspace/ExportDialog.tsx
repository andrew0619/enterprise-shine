/**
 * Export Dialog Component
 * 內容匯出對話框
 * 
 * 支援 JSON、Markdown、HTML、ZIP 格式匯出
 */

import { useState } from 'react';
import {
  Download,
  FileJson,
  FileText,
  FileCode,
  FolderArchive,
  Loader2,
  Check,
  Copy,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

import {
  type ExportData,
  type ExportOptions,
  exportToJSON,
  exportToMarkdown,
  exportToHTML,
  downloadJSON,
  downloadMarkdown,
  downloadHTML,
  downloadZIP,
} from '@/lib/content-exporter';

interface ExportDialogProps {
  data: ExportData | null;
  onExport?: (options: ExportOptions) => Promise<void>;
  disabled?: boolean;
}

type ExportFormat = 'json' | 'markdown' | 'html' | 'zip';

interface FormatOption {
  value: ExportFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const formatOptions: FormatOption[] = [
  {
    value: 'json',
    label: 'JSON',
    description: '結構化資料格式，適合開發者使用',
    icon: <FileJson className="h-5 w-5" />,
  },
  {
    value: 'markdown',
    label: 'Markdown',
    description: '純文字格式，方便閱讀和編輯',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    value: 'html',
    label: 'HTML',
    description: '網頁格式，可直接在瀏覽器開啟',
    icon: <FileCode className="h-5 w-5" />,
  },
  {
    value: 'zip',
    label: 'ZIP 完整包',
    description: '包含所有格式和檔案的壓縮包',
    icon: <FolderArchive className="h-5 w-5" />,
  },
];

export function ExportDialog({ data, onExport, disabled }: ExportDialogProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('zip');
  const [includeFiles, setIncludeFiles] = useState(true);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'options' | 'preview'>('options');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleFormatChange = (value: string) => {
    setFormat(value as ExportFormat);
    updatePreview(value as ExportFormat);
  };

  const updatePreview = (selectedFormat: ExportFormat) => {
    if (!data) return;

    switch (selectedFormat) {
      case 'json':
        setPreviewContent(exportToJSON(data));
        break;
      case 'markdown':
        setPreviewContent(exportToMarkdown(data));
        break;
      case 'html':
        setPreviewContent(exportToHTML(data));
        break;
      case 'zip':
        setPreviewContent('ZIP 包將包含：\n\n- content.json\n- content.md\n- content.html\n- README.md\n- files/ (如有選擇包含檔案)');
        break;
    }
  };

  const handleExport = async () => {
    if (!data) return;

    setIsExporting(true);

    try {
      const options: ExportOptions = {
        format,
        includeFiles,
        includeMetadata,
        groupByModule: true,
      };

      if (onExport) {
        await onExport(options);
      } else {
        // 使用內建下載功能
        switch (format) {
          case 'json':
            downloadJSON(data);
            break;
          case 'markdown':
            downloadMarkdown(data);
            break;
          case 'html':
            downloadHTML(data);
            break;
          case 'zip':
            await downloadZIP(data);
            break;
        }
      }

      toast({
        title: '匯出成功',
        description: `內容已匯出為 ${format.toUpperCase()} 格式`,
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: '匯出失敗',
        description: error instanceof Error ? error.message : '發生未知錯誤',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(previewContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: '已複製到剪貼簿',
      });
    } catch {
      toast({
        title: '複製失敗',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled || !data}>
          <Download className="h-4 w-4 mr-2" />
          匯出內容
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            匯出專案內容
          </DialogTitle>
          <DialogDescription>
            選擇匯出格式，將所有內容打包下載
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="options">匯出選項</TabsTrigger>
            <TabsTrigger value="preview" onClick={() => updatePreview(format)}>
              預覽
            </TabsTrigger>
          </TabsList>

          <TabsContent value="options" className="flex-1 overflow-auto space-y-6 mt-4">
            {/* 格式選擇 */}
            <div className="space-y-4">
              <Label className="text-base">選擇格式</Label>
              <RadioGroup
                value={format}
                onValueChange={handleFormatChange}
                className="grid grid-cols-2 gap-3"
              >
                {formatOptions.map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      format === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="sr-only"
                    />
                    <div className={`mt-0.5 ${format === option.value ? 'text-primary' : 'text-muted-foreground'}`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            {/* 進階選項 */}
            <div className="space-y-4">
              <Label className="text-base">進階選項</Label>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="include-files">包含上傳檔案</Label>
                  <p className="text-sm text-muted-foreground">
                    將所有圖片和文件一起打包
                  </p>
                </div>
                <Switch
                  id="include-files"
                  checked={includeFiles}
                  onCheckedChange={setIncludeFiles}
                  disabled={format !== 'zip'}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="include-metadata">包含中繼資料</Label>
                  <p className="text-sm text-muted-foreground">
                    包含時間戳、版本號等資訊
                  </p>
                </div>
                <Switch
                  id="include-metadata"
                  checked={includeMetadata}
                  onCheckedChange={setIncludeMetadata}
                />
              </div>
            </div>

            {/* 匯出資訊摘要 */}
            {data && (
              <>
                <Separator />
                <div className="space-y-2">
                  <Label className="text-base">匯出內容摘要</Label>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-muted-foreground">客戶</div>
                      <div className="font-medium">{data.client.companyName}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-muted-foreground">模組數</div>
                      <div className="font-medium">{data.modules.length} 個</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-muted-foreground">檔案數</div>
                      <div className="font-medium">{data.files.length} 個</div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <div className="text-muted-foreground">模板</div>
                      <div className="font-medium">{data.project.templateId}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="preview" className="flex-1 overflow-hidden flex flex-col mt-4">
            <div className="flex items-center justify-between mb-2">
              <Label className="text-base">
                {format.toUpperCase()} 預覽
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={format === 'zip'}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    已複製
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    複製
                  </>
                )}
              </Button>
            </div>
            <div className="flex-1 overflow-auto rounded-lg border bg-muted/30 p-4">
              <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                {previewContent || '載入中...'}
              </pre>
            </div>
          </TabsContent>
        </Tabs>

        {/* 匯出按鈕 */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleExport} disabled={isExporting || !data}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                匯出中...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                下載 {format.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


