import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
import { assignGroupFromScore } from '@/lib/utils'
import { StudentExam } from '@/schema/analysis.schema'
import { AnalyzeType } from '@/types/ctt-analysis.type'
import { ColumnDef } from '@tanstack/react-table'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { ArrowUpDown, BarChart2, Eye } from 'lucide-react'

export const getStudentTableColumns = (
  handleViewExam: (studentId: string) => void,
  handleViewKidmap: (studentId: string) => void,
  type: AnalyzeType,
  groupOptions: number[]
): ColumnDef<StudentExam>[] => {
  const columns: ColumnDef<StudentExam>[] = [
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
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              <p>Mã số sinh viên</p>
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </div>
        )
      },
      size: 100,
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.getValue('student_id')}
        </div>
      ),
    },
    {
      id: 'first_name',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              <p>Họ</p>
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </div>
        )
      },
      size: 200,
      cell: ({ row }) => {
        const { first_name } = row.original
        return <div className="text-center">{first_name}</div>
      },
    },
    {
      id: 'last_name',
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              <p>Tên</p>
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </div>
        )
      },
      size: 150,
      cell: ({ row }) => {
        const { last_name } = row.original
        return <div className="text-center">{last_name}</div>
      },
    },
    {
      accessorKey: 'grade', // % based
      header: ({ column }) => {
        return (
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              <p>Điểm (thang 10)</p>
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </div>
        )
      },
      size: 100,
      cell: ({ row }) => (
        <div className="text-center">
          {((row.getValue('grade') as number) * 10).toFixed(2) ?? '-'}
        </div>
      ),
    },
    {
      accessorKey: 'group',
      filterFn: 'equals',
      accessorFn: (row) => assignGroupFromScore(row.total_score),
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <div className="flex items-center justify-center">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center justify-center outline-none focus:outline-none"
                >
                  <p>Phân nhóm</p>
                  <span className="absolute -right-2 flex items-center">
                    <ArrowUpDown />
                  </span>
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
            </div>
          </DropdownMenu>
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
  ]
  if (type === AnalyzeType.RASCH) {
    columns.splice(columns.length - 1, 0, {
      accessorKey: 'ability',
      header: () => (
        <div className="flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger>
              <span>Năng lực</span>
            </HoverCardTrigger>
            <HoverCardContent className="w-[300px]">
              <MathJaxContext>
                <div className="text-sm">
                  <p>
                    Trong mô hình Rasch, <strong>năng lực</strong> của thí sinh
                    được biểu diễn bằng đơn vị logit.
                  </p>
                  <p className="mt-2">
                    Càng cao, thí sinh càng có xác suất trả lời đúng các câu hỏi
                    khó hơn.
                  </p>
                  <MathJax>
                    {
                      '\\( P(\\theta) = \\frac{e^{\\theta - b}}{1 + e^{\\theta - b}} \\)'
                    }
                  </MathJax>
                </div>
              </MathJaxContext>
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.original.ability?.toFixed(4) ?? '-'}
        </div>
      ),
      size: 120,
    })
  }

  // push actions column
  columns.push({
    id: 'actions',
    header: '',
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
            <Eye className="mr-1 h-4 w-4" />
            Bài làm
          </Button>
          {type === AnalyzeType.RASCH && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewKidmap(student.student_exam_id)}
              className="h-8 px-2"
            >
              <BarChart2 className="mr-1 h-4 w-4" /> KIDMAP
            </Button>
          )}
        </div>
      )
    },
  })

  return columns
}
