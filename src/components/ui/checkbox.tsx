import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-[2px] border border-wp-border bg-white transition-colors',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wp-primary',
      'disabled:cursor-not-allowed disabled:bg-wp-surface-alt disabled:opacity-50',
      'data-[state=checked]:bg-wp-primary data-[state=checked]:border-wp-primary data-[state=checked]:text-white',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check size={12} strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

interface CheckboxFieldProps {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

function CheckboxField({
  id,
  label,
  description,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  className,
}: CheckboxFieldProps) {
  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <Checkbox
        id={id}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="mt-0.5"
      />
      <div className="flex-1 text-[13px] leading-tight select-none">
        <label
          htmlFor={id}
          className={cn(
            'font-medium text-wp-text cursor-pointer',
            disabled && 'cursor-not-allowed text-wp-muted'
          )}
        >
          {label}
        </label>
        {description && (
          <p className="text-[12px] text-wp-muted mt-1 leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export { Checkbox, CheckboxField }
