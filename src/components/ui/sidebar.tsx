import * as React from 'react'
import { cn } from '../../lib/utils'

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn(
        'fixed top-8 left-0 bottom-0 w-40 z-40',
        'bg-wp-sidebar overflow-y-auto overflow-x-hidden',
        className
      )}
      {...props}
    />
  )
)
Sidebar.displayName = 'Sidebar'

const SidebarSection = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('py-3', className)} {...props} />
  )
)
SidebarSection.displayName = 'SidebarSection'

const SidebarHeading = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-wp-muted',
        className
      )}
      {...props}
    />
  )
)
SidebarHeading.displayName = 'SidebarHeading'

const NavItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('block', className)} {...props} />
  )
)
NavItem.displayName = 'NavItem'

const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { active?: boolean }
>(({ className, active, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      'flex items-center gap-3 px-4 py-2 text-[13px] text-[#a7aaad]',
      'no-underline hover:no-underline hover:bg-white/[.07] hover:text-white',
      'transition-colors leading-snug',
      active && 'bg-wp-primary text-white hover:bg-wp-primary-hover',
      className
    )}
    {...props}
  >
    {children}
  </a>
))
NavLink.displayName = 'NavLink'

const NavBadge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'ml-auto text-[10px] bg-wp-danger text-white rounded-full px-1.5 py-px min-w-[18px] text-center',
        className
      )}
      {...props}
    />
  )
)
NavBadge.displayName = 'NavBadge'

const NavDivider = () => <div className="h-px bg-white/[.07] my-1.5" />

export { Sidebar, SidebarSection, SidebarHeading, NavItem, NavLink, NavBadge, NavDivider }
