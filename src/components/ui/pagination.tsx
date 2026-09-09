import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '../../lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  className?: string
}

function getPages(current: number, total: number, siblings: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const left  = Math.max(current - siblings, 2)
  const right = Math.min(current + siblings, total - 1)

  const showLeftDots  = left > 2
  const showRightDots = right < total - 1

  if (!showLeftDots && showRightDots) {
    const leftItems = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1)
    return [...leftItems, '...', total]
  }
  if (showLeftDots && !showRightDots) {
    const rightItems = Array.from({ length: 3 + 2 * siblings }, (_, i) => total - (3 + 2 * siblings) + i + 1)
    return [1, '...', ...rightItems]
  }
  return [1, '...', ...Array.from({ length: right - left + 1 }, (_, i) => left + i), '...', total]
}

const pageBtn = (
  'inline-flex items-center justify-center h-8 min-w-[32px] px-2 text-[13px] rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wp-primary focus-visible:ring-offset-1 select-none'
)

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPages(currentPage, totalPages, siblingCount)

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={cn('flex items-center gap-1 flex-wrap', className)}
    >
      {/* Prev */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(pageBtn, 'border-wp-border text-wp-muted hover:bg-wp-bg hover:text-wp-text disabled:opacity-40 disabled:cursor-not-allowed')}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="inline-flex items-center justify-center h-8 w-8 text-wp-muted">
            <MoreHorizontal size={14} />
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={cn(
              pageBtn,
              page === currentPage
                ? 'border-wp-primary bg-wp-primary text-white cursor-default'
                : 'border-wp-border text-wp-text hover:bg-wp-bg hover:border-wp-primary hover:text-wp-primary'
            )}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(pageBtn, 'border-wp-border text-wp-muted hover:bg-wp-bg hover:text-wp-text disabled:opacity-40 disabled:cursor-not-allowed')}
        aria-label="Next page"
      >
        <ChevronRight size={14} />
      </button>

      {/* Page info */}
      <span className="ml-2 text-[12px] text-wp-muted">
        Page {currentPage} of {totalPages}
      </span>
    </nav>
  )
}

export { Pagination }
