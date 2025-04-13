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
import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'

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

const RaschMetricsTable = ({ item }: { item: RaschQuestionAnalysisType }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-center">Chỉ số</TableHead>
          <TableHead className="text-center">Giá trị</TableHead>
          <TableHead className="w-[95px] text-center">Đánh giá</TableHead>
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
              <TableCell className="text-center font-medium">
                <HoverCardText content={info.tooltipContent}>
                  {info.label}
                </HoverCardText>
              </TableCell>
              <TableCell className="text-center">
                {typeof value === 'number' ? value.toFixed(4) : value}
              </TableCell>
              <TableCell className={cn('text-center font-medium', textColor)}>
                {assessment}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default RaschMetricsTable
