import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium border whitespace-nowrap align-middle',
  {
    variants: {
      variant: {
        default:  'bg-wp-surface-alt text-wp-muted border-wp-border',
        primary:  'bg-wp-primary text-white border-wp-primary',
        success:  'bg-wp-success-bg text-wp-success border-wp-success',
        warning:  'bg-wp-warning-bg text-yellow-800 border-wp-warning',
        danger:   'bg-wp-danger-bg text-wp-danger border-wp-danger',
        info:     'bg-wp-info-bg text-blue-800 border-wp-info',
        neutral:  'bg-wp-surface-alt text-wp-muted border-wp-border',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
