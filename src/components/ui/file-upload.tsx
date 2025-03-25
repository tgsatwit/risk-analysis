import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFileChange: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  label?: string;
  className?: string;
  buttonText?: string;
}

export function FileUpload({
  onFileChange,
  acceptedFileTypes = ".md,.pdf,.docx,.txt",
  maxSizeMB = 10,
  label = "Upload a file",
  className,
  buttonText = "Select file",
  ...props
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      onFileChange(null);
      return;
    }
    
    const selectedFile = e.target.files[0];
    
    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const clearFile = () => {
    setFile(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} bytes`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleClick}
            className="flex gap-2 items-center"
          >
            <Upload className="h-4 w-4" />
            {buttonText}
          </Button>
          
          <input
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            className="hidden"
            {...props}
          />
        </div>
        
        {file ? (
          <div className="flex items-center gap-2 rounded-md border p-2 bg-background">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={clearFile} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            {error || `Drag and drop or click to select a file (max ${maxSizeMB}MB)`}
          </p>
        )}
      </div>
    </div>
  );
} 