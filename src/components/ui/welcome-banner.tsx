import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

interface WelcomeBannerProps {
  heading: string
  subheading?: React.ReactNode
  features?: Array<{
    icon: React.ReactNode
    title: string
    description: string
    link?: { href: string; label: string }
  }>
  onDismiss?: () => void
  className?: string
}

function WelcomeBanner({
  heading,
  subheading,
  features = [],
  onDismiss,
  className,
}: WelcomeBannerProps) {
  const [visible, setVisible] = React.useState(true)

  if (!visible) return null

  const handleDismiss = () => {
    setVisible(false)
    onDismiss?.()
  }

  return (
    <div
      className={cn(
        'bg-white border border-wp-border rounded shadow-sm overflow-hidden mb-5',
        className
      )}
    >
      {/* Hero */}
      <div
        className="relative bg-wp-dark px-8 py-10 text-white overflow-hidden"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg,transparent 0,transparent 120px,rgba(255,255,255,.04) 120px,rgba(255,255,255,.04) 121px)',
        }}
      >
        {onDismiss && (
          <button
            type="button"
            onClick={handleDismiss}
            className="absolute top-3 right-4 flex items-center gap-1 text-white/70 hover:text-white hover:bg-white/10 text-[12px] px-2 py-1 rounded transition-colors bg-transparent border-none cursor-pointer"
          >
            <X size={12} />
            Dismiss
          </button>
        )}
        <h1 className="text-[36px] font-bold leading-tight mb-2">{heading}</h1>
        {subheading && (
          <div className="text-[14px] text-white/75">{subheading}</div>
        )}
      </div>

      {/* Features grid */}
      {features.length > 0 && (
        <div
          className="grid divide-x divide-wp-border-light"
          style={{ gridTemplateColumns: `repeat(${features.length}, 1fr)` }}
        >
          {features.map((f, i) => (
            <div key={i} className="p-5">
              <div className="flex items-center justify-center w-10 h-10 bg-wp-dark text-white rounded mb-3 text-lg">
                {f.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-wp-text leading-snug mb-2">
                {f.title}
              </h3>
              <p className="text-[12px] text-wp-muted leading-relaxed mb-3">
                {f.description}
              </p>
              {f.link && (
                <a href={f.link.href} className="text-[12px] text-wp-link hover:text-wp-link-hover">
                  {f.link.label}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { WelcomeBanner }
