import * as React from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const ToastProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-4 right-4 z-[100] flex max-h-screen w-full max-w-sm flex-col gap-2 p-0',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitive.Viewport.displayName

const toastVariants = cva(
  [
    'group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded border px-4 py-3 shadow-lg',
    'transition-all',
    'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
    'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
    'data-[state=open]:slide-in-from-bottom-full',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-wp-border bg-white text-wp-text',
        success: 'border-wp-success bg-wp-success-bg text-wp-text',
        warning: 'border-wp-warning bg-wp-warning-bg text-wp-text',
        error:   'border-wp-danger  bg-wp-danger-bg  text-wp-text',
        info:    'border-wp-info    bg-wp-info-bg    text-wp-text',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

const variantIcons = {
  default: null,
  success: <CheckCircle2 size={16} className="text-wp-success mt-0.5 flex-shrink-0" />,
  warning: <AlertTriangle size={16} className="text-wp-warning mt-0.5 flex-shrink-0" />,
  error:   <XCircle      size={16} className="text-wp-danger  mt-0.5 flex-shrink-0" />,
  info:    <Info         size={16} className="text-wp-info    mt-0.5 flex-shrink-0" />,
} as const

type ToastVariant = keyof typeof variantIcons

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & VariantProps<typeof toastVariants>
>(({ className, variant = 'default', ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
))
Toast.displayName = ToastPrimitive.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      'inline-flex shrink-0 items-center justify-center rounded border border-wp-border bg-transparent px-2 py-1',
      'text-[12px] font-medium text-wp-text transition-colors hover:bg-wp-bg',
      'focus:outline-none focus:ring-2 focus:ring-wp-primary focus:ring-offset-1',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitive.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      'ml-auto flex-shrink-0 rounded p-0.5 text-wp-muted opacity-70 transition-opacity hover:opacity-100',
      'focus:outline-none focus:ring-2 focus:ring-wp-primary',
      className
    )}
    toast-close=""
    {...props}
  >
    <X size={14} />
  </ToastPrimitive.Close>
))
ToastClose.displayName = ToastPrimitive.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title
    ref={ref}
    className={cn('text-[13px] font-semibold leading-snug', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitive.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description
    ref={ref}
    className={cn('text-[12px] text-wp-muted mt-0.5', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitive.Description.displayName

// ---- useToast hook ----
type ToastData = {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
  action?: { label: string; onClick: () => void }
  duration?: number
}

type ToastState = { toasts: ToastData[] }
type ToastAction2 = { type: 'ADD'; toast: ToastData } | { type: 'REMOVE'; id: string }

function toastReducer(state: ToastState, action: ToastAction2): ToastState {
  switch (action.type) {
    case 'ADD':    return { toasts: [...state.toasts, action.toast] }
    case 'REMOVE': return { toasts: state.toasts.filter(t => t.id !== action.id) }
  }
}

const ToastContext = React.createContext<{
  toast: (data: Omit<ToastData, 'id'>) => void
} | null>(null)

function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(toastReducer, { toasts: [] })

  const toast = React.useCallback((data: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    dispatch({ type: 'ADD', toast: { ...data, id } })
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastProvider>
        {children}
        {state.toasts.map(({ id, title, description, variant = 'default', action, duration = 4000 }) => (
          <Toast
            key={id}
            variant={variant}
            duration={duration}
            onOpenChange={(open) => { if (!open) dispatch({ type: 'REMOVE', id }) }}
          >
            {variantIcons[variant]}
            <div className="flex-1 min-w-0">
              {title       && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action && (
              <ToastAction altText={action.label} onClick={action.onClick}>
                {action.label}
              </ToastAction>
            )}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}

function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastContextProvider')
  return ctx
}

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastTitle,
  ToastDescription,
  ToastProvider,
  ToastViewport,
  ToastContextProvider,
  useToast,
}
