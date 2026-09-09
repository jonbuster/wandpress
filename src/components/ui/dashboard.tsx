import * as React from 'react'
import { cn } from '../../lib/utils'

type Cols = 1 | 2 | 3

const colsClass: Record<Cols, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}

interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: Cols
  gap?: 'sm' | 'default' | 'lg'
}

const gapClass = { sm: 'gap-3', default: 'gap-5', lg: 'gap-8' }

const Dashboard = React.forwardRef<HTMLDivElement, DashboardProps>(
  ({ className, cols = 2, gap = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('grid', colsClass[cols], gapClass[gap], className)}
      {...props}
    />
  )
)
Dashboard.displayName = 'Dashboard'

interface DashboardWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 'full' | 'half'
}

const DashboardWidget = React.forwardRef<HTMLDivElement, DashboardWidgetProps>(
  ({ className, span, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        span === 'full' && 'col-span-full',
        span === 'half' && 'md:col-span-1',
        className
      )}
      {...props}
    />
  )
)
DashboardWidget.displayName = 'DashboardWidget'

export { Dashboard, DashboardWidget }
