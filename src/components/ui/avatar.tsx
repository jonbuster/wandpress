import * as React from 'react'
import { cn } from '../../lib/utils'

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  default: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
} as const

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: keyof typeof sizeMap
  shape?: 'circle' | 'rounded' | 'square'
}

function Avatar({
  src,
  alt = '',
  fallback,
  size = 'default',
  shape = 'circle',
  className,
  ...props
}: AvatarProps) {
  const shapeClass =
    shape === 'circle'  ? 'rounded-full' :
    shape === 'rounded' ? 'rounded-md' :
    'rounded'

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center bg-wp-border text-wp-muted font-semibold flex-shrink-0 overflow-hidden',
        sizeMap[size],
        shapeClass,
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{fallback ?? alt?.charAt(0)?.toUpperCase() ?? '?'}</span>
      )}
    </div>
  )
}

export { Avatar }
