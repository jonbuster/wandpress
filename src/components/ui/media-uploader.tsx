import * as React from 'react'
import { UploadCloud, File, X, Image as ImageIcon } from 'lucide-react'
import { Button } from './button'
import { cn } from '../../lib/utils'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
}

interface MediaUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  maxSizeMB?: number
  accept?: string
  onFilesSelected?: (files: File[]) => void
}

function MediaUploader({
  maxSizeMB = 64,
  accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx',
  onFilesSelected,
  className,
  ...props
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<UploadedFile[]>([
    { id: '1', name: 'hero-banner-2026.jpg', size: '1.2 MB', type: 'image/jpeg' },
    { id: '2', name: 'annual-report.pdf', size: '4.8 MB', type: 'application/pdf' },
  ])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      const selected = Array.from(e.dataTransfer.files)
      addFiles(selected)
      onFilesSelected?.(selected)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selected = Array.from(e.target.files)
      addFiles(selected)
      onFilesSelected?.(selected)
    }
  }

  const addFiles = (newFiles: File[]) => {
    const formatted: UploadedFile[] = newFiles.map((f) => ({
      id: Math.random().toString(36).substring(2),
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type,
    }))
    setFiles((prev) => [...prev, ...formatted])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className={cn('w-full space-y-4', className)} {...props}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center p-8 text-center rounded border-2 border-dashed transition-colors',
          isDragging
            ? 'border-wp-primary bg-wp-primary-light/20'
            : 'border-wp-border bg-wp-surface-alt/40 hover:bg-wp-surface-alt/70'
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-wp-border text-wp-muted shadow-sm mb-3">
          <UploadCloud size={24} />
        </div>
        <h3 className="text-[14px] font-semibold text-wp-text mb-1">
          Drop files anywhere to upload
        </h3>
        <p className="text-[12px] text-wp-muted mb-4">or</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={handleFileInput}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Select Files
        </Button>
        <p className="text-[11px] text-wp-muted mt-4">
          Maximum upload file size: {maxSizeMB} MB.
        </p>
      </div>

      {files.length > 0 && (
        <div className="rounded border border-wp-border bg-white divide-y divide-wp-border-light text-[13px]">
          <div className="px-3 py-2 bg-wp-surface-alt font-semibold text-[11px] text-wp-muted uppercase tracking-wider">
            Uploaded Media ({files.length})
          </div>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between px-3 py-2.5 hover:bg-wp-surface-alt/30 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {file.type.startsWith('image/') ? (
                  <ImageIcon size={16} className="text-wp-primary shrink-0" />
                ) : (
                  <File size={16} className="text-wp-muted shrink-0" />
                )}
                <span className="font-medium text-wp-text truncate max-w-xs">
                  {file.name}
                </span>
                <span className="text-[11px] text-wp-muted shrink-0">
                  ({file.size})
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="text-wp-muted hover:text-wp-danger p-1 rounded transition-colors"
                title="Remove file"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { MediaUploader }
