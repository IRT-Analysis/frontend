import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 text-neutral-50 shadow hover:brightness-90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:brightness-90',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-900 hover:brightness-90 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:brightness-90',
        destructive:
          'border-transparent bg-red-500 text-neutral-50 shadow hover:brightness-90 dark:bg-red-900 dark:text-neutral-50 dark:hover:brightness-90',
        outline: 'text-neutral-950 dark:text-neutral-50',

        veryEasy:
          'border-transparent bg-[var(--average-background)] text-[var(--average-text)] hover:brightness-90 dark:bg-[var(--dark-average-background)] dark:text-[var(--dark-average-text)] dark:hover:brightness-90',
        easy: 'border-transparent bg-[var(--good-background)] text-[var(--good-text)] hover:brightness-90 dark:bg-[var(--dark-good-background)] dark:text-[var(--dark-good-text)] dark:hover:brightness-90',
        medium:
          'border-transparent bg-[var(--very-good-background)] text-[var(--very-good-text)] hover:brightness-90 dark:bg-[var(--dark-very-good-background)] dark:text-[var(--dark-very-good-text)] dark:hover:brightness-90',
        hard: 'border-transparent bg-[var(--bad-background)] text-[var(--bad-text)] hover:brightness-90 dark:bg-[var(--dark-bad-background)] dark:text-[var(--dark-bad-text)] dark:hover:brightness-90',
        veryHard:
          'border-transparent bg-[var(--very-bad-background)] text-[var(--very-bad-text)] hover:brightness-90 dark:bg-[var(--dark-very-bad-background)] dark:text-[var(--dark-very-bad-text)] dark:hover:brightness-90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
