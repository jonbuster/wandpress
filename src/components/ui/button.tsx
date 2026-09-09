import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded text-[13px] font-normal leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wp-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-60 select-none',
  {
    variants: {
      variant: {
        primary:   'bg-wp-primary border border-wp-primary text-white hover:bg-wp-primary-hover hover:border-wp-primary-hover',
        secondary: 'bg-white border border-wp-primary text-wp-primary hover:bg-wp-primary-light hover:border-wp-primary-hover hover:text-wp-primary-hover',
        danger:    'bg-wp-danger border border-wp-danger text-white hover:bg-red-700 hover:border-red-700',
        ghost:     'bg-transparent border border-wp-border text-wp-text hover:bg-wp-bg',
        link:      'bg-transparent border-transparent text-wp-link underline hover:text-wp-link-hover px-0',
      },
      size: {
        sm:      'h-7 px-2 text-[12px]',
        default: 'h-8 px-3 py-1',
        lg:      'h-10 px-5 text-[14px]',
        icon:    'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
