import HoverCardText from '@/components/reuseable-hover-card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Answers } from '@/constants'
import { cn } from '@/lib/utils'
import { OptionAnalysisType } from '@/schema/analysis.schema'
import { ReactNode, useMemo } from 'react'

export type DataType = {
  name: keyof typeof CellRestrain
  A: number
  B: number
  C: number
  D: number
}[]

type CellRestrainType = Partial<
  Record<
    keyof OptionAnalysisType['option_analysis'],
    {
      label: string
      first: number
      second: number
      tooltips: string | ReactNode
    }
  >
>

const CellRestrain: CellRestrainType = {
  // selected_by: {
  //   label: 'Số lượng',
  //   tooltips: <span>Số lượng thí sinh chọn.</span>,
  //   first: 0,
  //   second: 1000,
  // },
  // top_selected: {
  //   label: 'Nhóm cao',
  //   tooltips: (
  //     <div className="w-[300px]">
  //       Số lượng thí sinh trong nhóm cao chọn. Đáp án sẽ được chọn nhiều hơn các
  //       lựa chọn khác.
  //     </div>
  //   ),
  //   first: 0,
  //   second: 1000,
  // },
  selection_rate: {
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
  // bottom_selected: {
  //   label: 'Nhóm thấp',
  //   tooltips: (
  //     <div className="w-[300px]">
  //       Số lượng thí sinh trong nhóm thấp chọn. Đáp án sẽ được chọn nhiều hơn
  //       các lựa chọn khác
  //     </div>
  //   ),
  //   first: 0,
  //   second: 1000,
  // },
  discrimination_index: {
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
  rpbis: {
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

const CellItem = (key: keyof CellRestrainType, value: number) => {
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
  data: OptionAnalysisType[]
  correct_option: string
}) {
  const tranposedData = useMemo(() => {
    if (!data || data.length === 0) return []

    const statNames = Object.keys(
      data[0].option_analysis
    ) as (keyof CellRestrainType)[]

    const result: DataType = []
    statNames.forEach((stat) => {
      const row = {
        name: stat as keyof typeof CellRestrain,
        A: data[0]?.option_analysis[stat] ?? null,
        B: data[1]?.option_analysis[stat] ?? null,
        C: data[2]?.option_analysis[stat] ?? null,
        D: data[3]?.option_analysis[stat] ?? null,
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
          {Object.keys(Answers).map((item) => (
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
