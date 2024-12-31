import HoverCardText from '@/components/reuseable-hover-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { OptionDetails } from '@/types/ctt-analysis.type'
import { ReactNode, useMemo } from 'react'

export type DataType = {
  name: keyof typeof CellRestrain
  A: number
  B: number
  C: number
  D: number
}[]

const CellRestrain: Partial<
  Record<
    keyof OptionDetails,
    {
      label: string
      first: number
      second: number
      tooltips: string | ReactNode
    }
  >
> = {
  selected_by: {
    label: 'Số lượng',
    tooltips: <span>Số lượng thí sinh chọn.</span>,
    first: 0,
    second: 1000,
  },
  top_selected: {
    label: 'Nhóm cao',
    tooltips: (
      <div className="w-[300px]">
        Số lượng thí sinh trong nhóm cao chọn. Đáp án sẽ được chọn nhiều hơn các
        lựa chọn khác.
      </div>
    ),
    first: 0,
    second: 1000,
  },
  ratio: {
    label: 'Tỉ lệ',
    tooltips: (
      <div className="w-[300px]">
        Tỉ lệ thí sinh chọn trên tổng số thí sinh. Đáp án sẽ có tỉ lệ cao hơn
        các lựa chọn khác.
      </div>
    ),
    first: 0.2,
    second: 0.7,
  },
  bottom_selected: {
    label: 'Nhóm thấp',
    tooltips: (
      <div className="w-[300px]">
        Số lượng thí sinh trong nhóm thấp chọn. Đáp án sẽ được chọn nhiều hơn
        các lựa chọn khác
      </div>
    ),
    first: 0,
    second: 1000,
  },
  discrimination: {
    label: 'Độ p.cách',
    tooltips: (
      <div className="w-[300px]">
        Độ phân cách của từng đáp án, tính bằng hiệu số của tỉ lệ nhóm cao chọn
        và tỉ lệ nhóm thấp chọn. Đáp án sẽ có độ phân cách dương, còn các lựa
        chọn khác sẽ âm.
      </div>
    ),
    first: 0.2,
    second: 0.7,
  },
  r_pbis: {
    label: 'Hệ số R_PBIS',
    tooltips: (
      <div className="w-[300px]">
        Hệ số tương quan giữa điểm số của câu và điểm bài. Càng cao có nghĩa là
        chọn lựa chọn này sẽ giúp thí sinh có điểm cao, và ngược lại. Đáp án sẽ
        có hệ số dương, còn các lựa chọn khác sẽ âm.
      </div>
    ),
    first: 0,
    second: 10,
  },
} as const

const CellItem = (key: keyof OptionDetails, value: number) => {
  const { first, second } = CellRestrain[key] ?? { first: 0, second: 0 }
  let className = ''
  if (value < first || value > second) {
    className = 'text-red-500'
  } else {
    className = 'text-foreground'
  }

  return (
    <TableCell className={cn('text-center font-semibold', className)}>
      <HoverCardText content={value}>{value}</HoverCardText>
    </TableCell>
  )
}

export function MetricsTable({
  data,
  correct_option,
}: {
  data: Record<string, OptionDetails>
  correct_option: string
}) {
  const tranposedData = useMemo(() => {
    const statNames = Object.keys(data['0']) as (keyof OptionDetails)[] // Get all the stat names from the first option
    const result: DataType = []
    statNames.forEach((stat) => {
      const row = {
        name: stat,
        A: data['0']?.[stat] ?? null,
        B: data['1']?.[stat] ?? null,
        C: data['2']?.[stat] ?? null,
        D: data['3']?.[stat] ?? null,
      }
      result.push(row)
    })

    return result
  }, [data])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Chỉ số</TableHead>
          {['A', 'B', 'C', 'D'].map((item) => (
            <TableHead
              key={item}
              className={cn(
                'text-center',
                item === correct_option
                  ? 'underline decoration-2 underline-offset-2'
                  : ''
              )}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tranposedData.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">
              <HoverCardText content={CellRestrain[item.name]?.tooltips}>
                {CellRestrain[item.name]?.label}
              </HoverCardText>
            </TableCell>
            {CellItem(item.name, item.A)}
            {CellItem(item.name, item.B)}
            {CellItem(item.name, item.C)}
            {CellItem(item.name, item.D)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
