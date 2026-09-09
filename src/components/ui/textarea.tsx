import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'block w-full rounded border border-wp-border bg-white text-wp-text px-2.5 py-1.5 text-[13px]',
          'placeholder:text-wp-muted resize-vertical min-h-[80px]',
          'focus:outline-none focus:border-wp-primary focus:ring-1 focus:ring-wp-primary',
          'disabled:bg-wp-surface-alt disabled:cursor-not-allowed',
          'transition-colors',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
