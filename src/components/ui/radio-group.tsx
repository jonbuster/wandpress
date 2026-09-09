import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'
import { cn } from '../../lib/utils'

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-wp-border bg-white text-wp-primary transition-colors',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-wp-primary',
        'disabled:cursor-not-allowed disabled:bg-wp-surface-alt disabled:opacity-50',
        'data-[state=checked]:border-wp-primary',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2 w-2 fill-current text-wp-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

interface RadioFieldProps {
  id: string
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  className?: string
}

function RadioField({
  id,
  value,
  label,
  description,
  disabled,
  className,
}: RadioFieldProps) {
  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <RadioGroupItem id={id} value={value} disabled={disabled} className="mt-0.5" />
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

export { RadioGroup, RadioGroupItem, RadioField }
