import * as React from 'react'
import { cn } from '../../lib/utils'

const Topbar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'fixed top-0 left-0 right-0 h-8 z-50',
        'flex items-center bg-wp-topbar text-[#a7aaad]',
        'text-[13px] px-3 gap-4',
        className
      )}
      {...props}
    />
  )
)
Topbar.displayName = 'Topbar'

const TopbarBrand = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        'flex items-center gap-2 font-semibold text-white text-[14px]',
        'no-underline hover:no-underline hover:text-white',
        className
      )}
      {...props}
    />
  )
)
TopbarBrand.displayName = 'TopbarBrand'

const TopbarNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn('flex items-center flex-1', className)} {...props} />
  )
)
TopbarNav.displayName = 'TopbarNav'

const TopbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ className, active, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'flex items-center h-8 px-3 text-[#a7aaad] no-underline text-[12px] whitespace-nowrap',
      'hover:bg-white/[.07] hover:text-white hover:no-underline transition-colors',
      active && 'text-white',
      className
    )}
    {...props}
  />
))
TopbarLink.displayName = 'TopbarLink'

const TopbarRight = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-1 ml-auto', className)} {...props} />
  )
)
TopbarRight.displayName = 'TopbarRight'

export { Topbar, TopbarBrand, TopbarNav, TopbarLink, TopbarRight }
