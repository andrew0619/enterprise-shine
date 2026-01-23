/**
 * FileUploader Component
 * 支援拖放和點擊上傳的文件上傳組件
 */

import { useState, useCallback } from 'react';
import { Upload, X, FileText, Image, File, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UploadedFile } from '@/types/supabase';

interface FileUploaderProps {
  label: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // MB
  fileType: UploadedFile['type'];
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
  className?: string;
}

export function FileUploader({
  label,
  description,
  accept = 'image/*,.pdf,.doc,.docx',
  multiple = false,
  maxSize = 10, // 10MB default
  fileType,
  files,
  onFilesChange,
  className,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): string | null => {
    // 檢查檔案大小
    if (file.size > maxSize * 1024 * 1024) {
      return `檔案大小不能超過 ${maxSize}MB`;
    }
    return null;
  };

  const processFiles = async (fileList: FileList) => {
    setError(null);
    setIsUploading(true);

    const newFiles: UploadedFile[] = [];

    for (const file of Array.from(fileList)) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        continue;
      }

      // 創建本地預覽 URL
      const url = URL.createObjectURL(file);
      
      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: fileType,
        url,
        size: file.size,
        uploaded_at: new Date().toISOString(),
      };

      newFiles.push(uploadedFile);
    }

    if (multiple) {
      onFilesChange([...files, ...newFiles]);
    } else {
      // 單檔上傳，釋放舊的 URL
      files.forEach(f => {
        if (f.url.startsWith('blob:')) {
          URL.revokeObjectURL(f.url);
        }
      });
      onFilesChange(newFiles);
    }

    setIsUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  }, [files, multiple, onFilesChange, fileType, maxSize]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file && file.url.startsWith('blob:')) {
      URL.revokeObjectURL(file.url);
    }
    onFilesChange(files.filter(f => f.id !== id));
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext || '')) {
      return <Image className="h-8 w-8 text-blue-500" />;
    }
    if (['pdf'].includes(ext || '')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    if (['doc', 'docx'].includes(ext || '')) {
      return <FileText className="h-8 w-8 text-blue-600" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Label */}
      <div>
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 transition-colors",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50",
          "cursor-pointer"
        )}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="flex flex-col items-center gap-2 text-center">
          {isUploading ? (
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isUploading ? '上傳中...' : '拖放檔案或點擊上傳'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {multiple ? '可上傳多個檔案' : '單一檔案'} · 最大 {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
            >
              {/* Preview or Icon */}
              {file.url && ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].some(ext => 
                file.name.toLowerCase().endsWith(ext)
              ) ? (
                <img 
                  src={file.url} 
                  alt={file.name}
                  className="h-12 w-12 object-cover rounded"
                />
              ) : (
                getFileIcon(file.name)
              )}
              
              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              
              {/* Remove Button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFile(file.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUploader;

