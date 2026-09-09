import * as React from 'react'
import { FileQuestion } from 'lucide-react'
import { cn } from '../../lib/utils'

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded border border-dashed border-wp-border bg-wp-surface-alt/50',
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-wp-border-light/60 text-wp-muted mb-3">
        {icon ?? <FileQuestion size={24} />}
      </div>
      <h3 className="text-[15px] font-semibold text-wp-text mb-1">{title}</h3>
      {description && (
        <p className="text-[13px] text-wp-muted max-w-sm mb-4 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  )
}

export { EmptyState }
