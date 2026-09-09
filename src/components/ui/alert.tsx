import * as React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const alertVariants = cva(
  'flex items-start gap-3 px-4 py-3 border-l-4 rounded-r shadow-sm mb-4 transition-all',
  {
    variants: {
      variant: {
        default: 'border-wp-border bg-white',
        success: 'border-wp-success bg-wp-success-bg',
        warning: 'border-wp-warning bg-wp-warning-bg',
        error:   'border-wp-danger  bg-wp-danger-bg',
        info:    'border-wp-info    bg-wp-info-bg',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  onDismiss?: () => void
  dismissible?: boolean
}

function Alert({
  className,
  variant,
  title,
  children,
  onDismiss,
  dismissible = false,
  ...props
}: AlertProps) {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-[13px] text-wp-text mb-0.5">{title}</p>
        )}
        <div className="text-[13px] text-wp-text">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="flex-shrink-0 text-wp-muted hover:text-wp-text transition-colors p-0 bg-transparent border-none cursor-pointer leading-none mt-0.5"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export { Alert }
