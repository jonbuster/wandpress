import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'default' | 'lg'
  onClear?: () => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, defaultValue, onChange, onClear, inputSize = 'default', ...props }, ref) => {
    const [internalVal, setInternalVal] = React.useState(defaultValue || '')
    const isControlled = value !== undefined
    const currentVal = isControlled ? String(value) : String(internalVal)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalVal(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalVal('')
      }
      onClear?.()
    }

    return (
      <div className={cn('relative inline-flex items-center w-full max-w-sm', className)}>
        <Search
          size={inputSize === 'sm' ? 12 : 14}
          className="absolute left-2.5 text-wp-muted pointer-events-none"
        />
        <input
          ref={ref}
          type="search"
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            'w-full rounded border border-wp-border bg-white text-wp-text pl-8 pr-7 placeholder:text-wp-muted',
            'focus:outline-none focus:border-wp-primary focus:ring-1 focus:ring-wp-primary transition-colors',
            'disabled:bg-wp-surface-alt disabled:text-wp-muted disabled:cursor-not-allowed',
            '[&::-webkit-search-cancel-button]:hidden',
            inputSize === 'sm' && 'h-7 text-[12px] pl-7 pr-6',
            inputSize === 'default' && 'h-8 text-[13px]',
            inputSize === 'lg' && 'h-10 text-[14px] pl-9 pr-8'
          )}
          {...props}
        />
        {currentVal && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 rounded-full p-0.5 text-wp-muted hover:text-wp-text hover:bg-wp-bg transition-colors"
            title="Clear search"
          >
            <X size={12} />
          </button>
        )}
      </div>
    )
  }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
