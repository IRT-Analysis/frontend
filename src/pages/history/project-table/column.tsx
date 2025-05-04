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
import { ProjectType } from '@/schema/account.schema'
import { AnalyzeType } from '@/types/ctt-analysis.type'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

export const columns: ColumnDef<ProjectType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center justify-center"
      >
        STT
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row, table }) => {
      const sortedIndex = table
        .getSortedRowModel()
        ?.flatRows?.findIndex((r) => r.id === row.id)

      return (
        <div className="text-center">
          {(sortedIndex !== -1 ? sortedIndex : 0) + 1}
        </div>
      )
    },
    size: 100,
  },
  {
    accessorKey: 'name',
    header: 'Tên Dự Án',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('name')}</div>
    ),
    size: 200,
  },
  {
    accessorKey: 'created_at',
    header: 'Ngày Tạo',
    cell: ({ row }) => {
      const date = row.getValue('created_at') as string
      return (
        <div className="text-center">
          {format(new Date(date), 'dd/MM/yyyy')}
        </div>
      )
    },
    size: 150,
  },
  {
    accessorKey: 'total_questions',
    header: 'Số Câu Hỏi',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('total_questions')}</div>
    ),
    size: 150,
  },
  {
    accessorKey: 'total_students',
    header: 'Số thí sinh',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('total_students')}</div>
    ),
    size: 150,
  },
  {
    accessorKey: 'total_options',
    header: 'Số lựa chọn',
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('total_options')}</div>
    ),
    size: 150,
  },
  {
    accessorKey: 'type',
    header: 'Loại phân tích',
    cell: ({ row }) => {
      const type = row.getValue('type') as string

      const variant = ({
        CTT: 'easy',
        Rasch: 'medium',
        // IRT: 'veryEasy',
      }[type as AnalyzeType] ?? 'outline') as BadgeProps['variant']

      return (
        <div className="flex justify-center">
          <Badge variant={variant}>{type}</Badge>
        </div>
      )
    },
    size: 150,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Sao chép ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>
              <Link to={`/analysis/${type}/${id}`}>Xem phân tích chi tiết</Link>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    size: 50,
  },
]
