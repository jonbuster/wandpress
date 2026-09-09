import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wp-primary focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-wp-primary data-[state=unchecked]:bg-wp-border',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0',
        'transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

// Labelled switch wrapper
interface SwitchFieldProps {
  id: string
  label: string
  description?: string
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
}

function SwitchField({ id, label, description, checked, defaultChecked, onCheckedChange, disabled }: SwitchFieldProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <label htmlFor={id} className="text-[13px] font-medium text-wp-text cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-[12px] text-wp-muted mt-0.5">{description}</p>
        )}
      </div>
      <Switch id={id} checked={checked} defaultChecked={defaultChecked} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  )
}

export { Switch, SwitchField }
