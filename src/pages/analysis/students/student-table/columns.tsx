import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { StudentExam } from '@/schema/analysis.schema'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, BarChart2, Eye } from 'lucide-react'
import { assignGroupFromScore } from '.'

export const getStudentTableColumns = (
  handleViewExam: (studentId: string) => void,
  handleViewKidmap: (studentId: string) => void,
  groupOptions: number[]
): ColumnDef<StudentExam>[] => [
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
          Mã số sinh viên
          <ArrowUpDown />
        </Button>
      )
    },
    size: 100,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('student_id')}</div>
    ),
  },
  {
    id: 'last_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Họ
          <ArrowUpDown />
        </Button>
      )
    },
    size: 100,
    cell: ({ row }) => {
      const { last_name } = row.original
      return <div className="text-center">{last_name}</div>
    },
  },
  {
    id: 'first_name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tên
          <ArrowUpDown />
        </Button>
      )
    },
    size: 150,
    cell: ({ row }) => {
      const { first_name } = row.original
      return <div className="text-center">{first_name}</div>
    },
  },
  {
    accessorKey: 'total_score', // % based
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
    size: 100,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('total_score') ?? '-'}</div>
    ),
  },
  {
    accessorKey: 'group',
    filterFn: 'equals',
    accessorFn: (row) => assignGroupFromScore(row.total_score),
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <p>Phân nhóm</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="outline-none focus:outline-none"
              >
                <ArrowUpDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-30">
              <DropdownMenuItem
                onClick={() => {
                  column.setFilterValue('')
                }}
              >
                <span>Tất cả</span>
              </DropdownMenuItem>
              {groupOptions.map((item) => (
                <DropdownMenuItem
                  onClick={() => {
                    column.setFilterValue(item)
                  }}
                >
                  <span>Nhóm {item}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    size: 150,
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
    id: 'actions',
    header: 'Actions',
    size: 150,
    cell: ({ row }) => {
      const student = row.original

      return (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewExam(student.student_exam_id)}
            className="h-8 px-2"
          >
            <Eye className="mr-1 h-4 w-4" /> Exam
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewKidmap(student.student_exam_id)}
            className="h-8 px-2"
          >
            <BarChart2 className="mr-1 h-4 w-4" /> KIDMAP
          </Button>
        </div>
      )
    },
  },
]
