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
import {
  OptionAnalysisType,
  RaschQuestionAnalysisType,
} from '@/schema/analysis.schema'
import { ReactNode } from 'react'

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

const _CellItem = (key: keyof CellRestrainType, value: number) => {
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

type MetricInfo = {
  label: string
  tooltipContent: string
  idealRange?: { min: number; max: number }
}

const raschMetrics: Record<string, MetricInfo> = {
  difficulty: {
    label: 'Độ khó',
    tooltipContent:
      'Độ khó trong mô hình Rasch, thể hiện vị trí của câu hỏi trên thang đo.',
    idealRange: { min: -3, max: 3 },
  },
  logit: {
    label: 'Logit',
    tooltipContent:
      'Đơn vị đo lường trong mô hình Rasch, thể hiện độ khó của câu hỏi trên thang đo logit.',
    idealRange: { min: -3, max: 3 },
  },
  discrimination: {
    label: 'Độ phân cách',
    tooltipContent: 'Khả năng phân biệt giữa thí sinh có năng lực cao và thấp.',
    idealRange: { min: 0.3, max: 2 },
  },
  infit: {
    label: 'Infit',
    tooltipContent:
      'Chỉ số đánh giá mức độ phù hợp của câu hỏi với mô hình Rasch, nhạy cảm với các mẫu phản hồi không mong đợi.',
    idealRange: { min: 0.7, max: 1.3 },
  },
  outfit: {
    label: 'Outfit',
    tooltipContent:
      'Chỉ số đánh giá mức độ phù hợp của câu hỏi với mô hình Rasch, nhạy cảm với các giá trị ngoại lai.',
    idealRange: { min: 0.7, max: 1.3 },
  },
  reliability: {
    label: 'Độ tin cậy',
    tooltipContent:
      'Độ tin cậy của câu hỏi trong mô hình Rasch, thể hiện mức độ ổn định của câu hỏi.',
    idealRange: { min: 0.7, max: 1 },
  },
}

export function RaschMetricsTable({
  item,
}: {
  item: RaschQuestionAnalysisType
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Chỉ số</TableHead>
          <TableHead>Giá trị</TableHead>
          <TableHead>Đánh giá</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(raschMetrics).map(([key, info]) => {
          const value = item[key as keyof RaschQuestionAnalysisType] as number
          let assessment = ''
          let textColor = 'text-green-600'

          if (info.idealRange) {
            if (value < info.idealRange.min) {
              assessment = 'Thấp'
              textColor = 'text-red-600'
            } else if (value > info.idealRange.max) {
              assessment = 'Cao'
              textColor = 'text-red-600'
            } else {
              assessment = 'Tốt'
              textColor = 'text-green-600'
            }
          } else {
            assessment = 'N/A'
            textColor = 'text-gray-600'
          }

          return (
            <TableRow key={key}>
              <TableCell className="font-medium">
                <HoverCardText content={info.tooltipContent}>
                  {info.label}
                </HoverCardText>
              </TableCell>
              <TableCell>
                {typeof value === 'number' ? value.toFixed(4) : value}
              </TableCell>
              <TableCell className={cn('font-medium', textColor)}>
                {assessment}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
