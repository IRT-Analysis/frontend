import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Student } from './MOCK_DATA'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<Student>[] = [
  {
    id: 'select',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'index',
    header: 'STT',
    size: 50,
    cell: ({ row, table }) => (
      <div className="text-center">
        {(table
          .getSortedRowModel()
          ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1}
      </div>
    ),
  },
  {
    accessorKey: 'student_id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mã số thí sinh
          <ArrowUpDown />
        </Button>
      )
    },
    size: 150,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('student_id')}</div>
    ),
  },
  {
    accessorKey: 'correct_count',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Số câu đúng
          <ArrowUpDown />
        </Button>
      )
    },
    size: 150,
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue('correct_count')}
      </div>
    ),
  },
  {
    accessorKey: 'score',
    size: 100,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Điểm
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('score')}</div>
    ),
  },
  {
    accessorKey: 'group',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Phân nhóm
          <ArrowUpDown />
        </Button>
      )
    },
    size: 100,
    cell: ({ row }) => {
      const value = row.getValue('group') as number
      const displayValue = `Nhóm ${value}`
      let variant: BadgeProps['variant']
      if (value === 5) {
        variant = 'veryEasy'
      } else if (value === 4) {
        variant = 'easy'
      } else if (value === 3) {
        variant = 'medium'
      } else if (value === 2) {
        variant = 'hard'
      } else {
        variant = 'veryHard'
      }
      return (
        <HoverCard>
          <HoverCardTrigger className="flex items-center justify-center">
            <Badge variant={variant}>{displayValue}</Badge>
          </HoverCardTrigger>
          <HoverCardContent>Có nghĩa là như thế nào</HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    header: 'Bài làm',
    size: 100,
    cell: () => {
      return <div className="text-center">Xem</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: ({ row }) => {
      const student = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.student_id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
