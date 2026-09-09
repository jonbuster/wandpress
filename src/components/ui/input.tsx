import * as React from 'react'
import { cn } from '../../lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputSize?: 'sm' | 'default' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'block w-full rounded border border-wp-border bg-white text-wp-text',
          'placeholder:text-wp-muted',
          'focus:outline-none focus:border-wp-primary focus:ring-1 focus:ring-wp-primary',
          'disabled:bg-wp-surface-alt disabled:text-wp-muted disabled:cursor-not-allowed',
          'transition-colors',
          inputSize === 'sm'      && 'h-7 px-2 text-[12px]',
          inputSize === 'default' && 'h-8 px-2.5 text-[13px]',
          inputSize === 'lg'      && 'h-10 px-3 text-[14px]',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
