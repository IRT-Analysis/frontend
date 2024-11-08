import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
interface Props {
  page: number
  pageSize: number
  onClick?: (page: number) => void
  isLink?: boolean
  pathname?: string
}

/**
  Với range = 2 áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
  
  [1] 2 3 ... 19 20
  1 [2] 3 4 ... 19 20 
  1 2 [3] 4 5 ... 19 20
  1 2 3 [4] 5 6 ... 19 20
  1 2 3 4 [5] 6 7 ... 19 20
  
  1 2 ... 4 5 [6] 8 9 ... 19 20
  
  1 2 ...13 14 [15] 16 17 ... 19 20
  
  
  1 2 ... 14 15 [16] 17 18 19 20
  1 2 ... 15 16 [17] 18 19 20
  1 2 ... 16 17 [18] 19 20
  1 2 ... 17 18 [19] 20
  1 2 ... 18 19 [20]
   */

const RANGE = 2
export default function AutoPagination({
  page,
  pageSize,
  pathname,
  isLink = true,
  onClick,
}: Props) {
  console.log('page', page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = () => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      return null
    }
    const renderDotAfter = () => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1

        // Điều kiện để return về ...
        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter()
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore()
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter()
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore()
        }
        return (
          <PaginationItem key={index}>
            {isLink ? (
              <PaginationLink
                to={{
                  pathname,
                  search: `?page=${pageNumber}`,
                }}
                isActive={pageNumber === page}
              >
                {pageNumber}
              </PaginationLink>
            ) : (
              <Button
                onClick={() => {
                  onClick?.(pageNumber)
                }}
                variant={pageNumber === page ? 'outline' : 'ghost'}
                className={'h-9 w-9'}
              >
                {pageNumber}
              </Button>
            )}
          </PaginationItem>
        )
      })
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {isLink ? (
            <PaginationPrevious
              to={{
                pathname,
                search: `?page=${page - 1}`,
              }}
              className={cn({
                'cursor-not-allowed': page === 1,
              })}
              onClick={(e) => {
                if (page === 1) {
                  e.preventDefault()
                }
              }}
            />
          ) : (
            <Button
              disabled={page === 1}
              variant={'outline'}
              className={cn(
                {
                  'cursor-not-allowed': page === 1,
                },
                'h-9 w-9 p-0'
              )}
              onClick={() => onClick?.(page - 1)}
            >
              <ChevronLeft />
            </Button>
          )}
        </PaginationItem>
        {renderPagination()}

        <PaginationItem>
          {isLink ? (
            <PaginationNext
              to={{
                pathname,
                search: `?page=${page + 1}`,
              }}
              className={cn({
                'cursor-not-allowed': page === pageSize,
              })}
              onClick={(e) => {
                if (page === pageSize) {
                  e.preventDefault()
                }
              }}
            />
          ) : (
            <Button
              className={cn(
                {
                  'cursor-not-allowed': page === pageSize,
                },
                'h-9 w-9 p-0'
              )}
              variant="outline"
              onClick={() => onClick?.(page + 1)}
            >
              <ChevronRight />
            </Button>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
