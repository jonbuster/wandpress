import * as React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronUp } from 'lucide-react'
import { cn } from '../../lib/utils'

/* ---- Base Card ---- */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-wp-border rounded shadow-sm overflow-hidden mb-5',
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between px-4 py-3 border-b border-wp-border-light bg-white',
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-[14px] font-semibold text-wp-text leading-snug', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardControls = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-0.5 flex-shrink-0', className)} {...props} />
  )
)
CardControls.displayName = 'CardControls'

const CardControl = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'inline-flex items-center justify-center w-[26px] h-[26px] p-0 bg-transparent border-none',
        'text-wp-muted rounded-sm cursor-pointer text-[13px] leading-none',
        'hover:bg-wp-bg hover:text-wp-text transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wp-primary focus-visible:ring-offset-1',
        className
      )}
      {...props}
    />
  )
)
CardControl.displayName = 'CardControl'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-4 py-3 border-t border-wp-border-light bg-wp-surface-alt text-[12px] text-wp-muted',
        className
      )}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

/* ---- Accordion Card (collapsible) ---- */
interface CardAccordionProps {
  title: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  defaultOpen?: boolean
  controls?: React.ReactNode
  className?: string
}

function CardAccordion({
  title,
  children,
  footer,
  defaultOpen = true,
  controls,
  className,
}: CardAccordionProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return (
    <Collapsible.Root
      open={open}
      onOpenChange={setOpen}
      className={cn('bg-white border border-wp-border rounded shadow-sm overflow-hidden mb-5', className)}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardControls>
          {controls}
          <Collapsible.Trigger asChild>
            <CardControl
              title={open ? 'Collapse' : 'Expand'}
              aria-expanded={open}
            >
              <ChevronUp
                size={14}
                className={cn(
                  'transition-transform duration-200',
                  !open && 'rotate-180'
                )}
              />
            </CardControl>
          </Collapsible.Trigger>
        </CardControls>
      </CardHeader>

      <Collapsible.Content
        className={cn(
          'overflow-hidden',
          'data-[state=open]:animate-accordion-down',
          'data-[state=closed]:animate-accordion-up',
        )}
      >
        <div>{children}</div>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardControls,
  CardControl,
  CardContent,
  CardFooter,
  CardAccordion,
}
