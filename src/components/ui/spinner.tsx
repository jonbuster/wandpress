import * as React from 'react'
import { cn } from '../../lib/utils'

// ---- Spinner ----
const sizeMap = {
  xs:      'w-3 h-3 border',
  sm:      'w-4 h-4 border-2',
  default: 'w-5 h-5 border-2',
  lg:      'w-8 h-8 border-[3px]',
  xl:      'w-12 h-12 border-4',
} as const

interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: keyof typeof sizeMap
  color?: 'primary' | 'white' | 'muted'
}

const colorMap = {
  primary: 'border-wp-border border-t-wp-primary',
  white:   'border-white/30 border-t-white',
  muted:   'border-wp-border-light border-t-wp-muted',
}

function Spinner({ size = 'default', color = 'primary', className, ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block rounded-full animate-spin',
        sizeMap[size],
        colorMap[color],
        className
      )}
      {...props}
    />
  )
}

// ---- Skeleton ----
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circle' | 'rect'
  width?: string
  height?: string
  lines?: number  // for text variant: number of lines
}

function SkeletonLine({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        'bg-gradient-to-r from-wp-border-light via-wp-bg to-wp-border-light bg-[length:400%_100%]',
        'animate-[shimmer_1.5s_ease-in-out_infinite] rounded',
        className
      )}
      style={{
        backgroundSize: '400% 100%',
        animation: 'shimmer 1.5s ease-in-out infinite',
        ...style,
      }}
    />
  )
}

function Skeleton({ variant = 'text', width, height, lines = 3, className, style, ...props }: SkeletonProps) {
  if (variant === 'circle') {
    return (
      <SkeletonLine
        className={cn('rounded-full', className)}
        style={{ width: width ?? '40px', height: height ?? '40px', ...style } as React.CSSProperties}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    )
  }
  if (variant === 'rect') {
    return (
      <SkeletonLine
        className={cn('rounded', className)}
        style={{ width: width ?? '100%', height: height ?? '120px', ...style } as React.CSSProperties}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    )
  }
  // text: multiple lines
  return (
    <div className={cn('space-y-2', className)} style={style} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          className="h-3 rounded"
          style={{ width: i === lines - 1 ? '65%' : '100%' }}
        />
      ))}
    </div>
  )
}

export { Spinner, Skeleton }
