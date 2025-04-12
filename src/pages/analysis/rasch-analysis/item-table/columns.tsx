import HoverCardText from '@/components/reuseable-hover-card'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import { ColumnDef } from '@tanstack/react-table'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { ArrowUpDown, Info } from 'lucide-react'
import RaschItemDetailView from './rasch-detail-view'

// Define the Rasch analysis data type

export const raschColumns: ColumnDef<
  RaschQuestionAnalysisType & { questionNumber: number }
>[] = [
  {
    accessorKey: 'questionNumber',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="relative flex items-center justify-center"
        >
          <span className="absolute -right-2 flex items-center">
            <ArrowUpDown className="h-4 w-4" />
          </span>
          Câu
        </Button>
      </div>
    ),
    size: 80,
    cell: ({ row }) => (
      <div className="text-center">{row.original.questionNumber}</div>
    ),
  },
  {
    accessorKey: 'difficulty',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <MathJaxContext>
              <div className="flex flex-col gap-2">
                <p>
                  Độ khó trong mô hình Rasch thể hiện vị trí của câu hỏi trên
                  thang đo:
                </p>
                <MathJax>
                  {
                    '\\(\\text{Độ khó} = \\log\\left(\\frac{1 - P}{P}\\right)\\)'
                  }
                </MathJax>
                <p>Trong đó P là xác suất trả lời đúng câu hỏi.</p>
              </div>
            </MathJaxContext>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Độ khó
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const difficulty = row.original.difficulty
      return (
        <HoverCardText
          content={
            <div>Độ khó Rasch của câu hỏi là {difficulty.toFixed(4)}</div>
          }
        >
          <div className="text-center">{difficulty.toFixed(4)}</div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'logit',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <MathJaxContext>
              <div className="flex flex-col gap-2">
                <p>
                  Logit là đơn vị đo lường trong mô hình Rasch, thể hiện độ khó
                  của câu hỏi:
                </p>
                <MathJax>
                  {'\\(\\text{Logit} = \\ln\\left(\\frac{p}{1 - p}\\right)\\)'}
                </MathJax>
              </div>
            </MathJaxContext>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Logit
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const logit = row.original.logit
      return (
        <HoverCardText
          content={<div>Giá trị logit của câu hỏi là {logit.toFixed(4)}</div>}
        >
          <div className="text-center">{logit.toFixed(4)}</div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'infit',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <MathJaxContext>
              <div className="flex flex-col gap-2">
                <p>
                  Infit (Information-weighted fit) là chỉ số đánh giá mức độ phù
                  hợp của câu hỏi với mô hình Rasch:
                </p>
                <p>
                  Giá trị lý tưởng là 1.0. Giá trị từ 0.7 đến 1.3 được coi là
                  chấp nhận được.
                </p>
              </div>
            </MathJaxContext>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Infit
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const infit = row.original.infit
      let textColor = 'text-green-600'

      if (infit < 0.7 || infit > 1.3) {
        textColor = 'text-red-600'
      } else if (infit < 0.8 || infit > 1.2) {
        textColor = 'text-yellow-600'
      }

      return (
        <HoverCardText
          content={
            <div className="w-[300px]">
              {infit < 0.7 ? (
                <span>
                  Giá trị infit quá thấp, cho thấy câu hỏi có thể quá dễ đoán
                  hoặc phụ thuộc vào câu hỏi khác.
                </span>
              ) : infit > 1.3 ? (
                <span>
                  Giá trị infit quá cao, cho thấy câu hỏi có thể không phù hợp
                  với mô hình hoặc đo lường một khái niệm khác.
                </span>
              ) : (
                <span>
                  Giá trị infit nằm trong khoảng chấp nhận được (0.7-1.3).
                </span>
              )}
            </div>
          }
        >
          <div className={`text-center ${textColor} font-medium`}>
            {infit.toFixed(4)}
          </div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'outfit',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <MathJaxContext>
              <div className="flex flex-col gap-2">
                <p>
                  Outfit (Outlier-sensitive fit) là chỉ số đánh giá mức độ phù
                  hợp của câu hỏi với mô hình Rasch, nhạy cảm với các giá trị
                  ngoại lai:
                </p>
                <p>
                  Giá trị lý tưởng là 1.0. Giá trị từ 0.7 đến 1.3 được coi là
                  chấp nhận được.
                </p>
              </div>
            </MathJaxContext>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Outfit
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const outfit = row.original.outfit
      let textColor = 'text-green-600'

      if (outfit < 0.7 || outfit > 1.3) {
        textColor = 'text-red-600'
      } else if (outfit < 0.8 || outfit > 1.2) {
        textColor = 'text-yellow-600'
      }

      return (
        <HoverCardText
          content={
            <div className="w-[300px]">
              {outfit < 0.7 ? (
                <span>
                  Giá trị outfit quá thấp, cho thấy câu hỏi có thể quá dễ đoán
                  hoặc phụ thuộc vào câu hỏi khác.
                </span>
              ) : outfit > 1.3 ? (
                <span>
                  Giá trị outfit quá cao, cho thấy câu hỏi có thể không phù hợp
                  với mô hình hoặc có các phản hồi bất thường.
                </span>
              ) : (
                <span>
                  Giá trị outfit nằm trong khoảng chấp nhận được (0.7-1.3).
                </span>
              )}
            </div>
          }
        >
          <div className={`text-center ${textColor} font-medium`}>
            {outfit.toFixed(4)}
          </div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'reliability',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <div className="w-[300px]">
              <p>
                Độ tin cậy của câu hỏi trong mô hình Rasch, thể hiện mức độ ổn
                định của câu hỏi. Giá trị từ 0 đến 1, với giá trị cao hơn thể
                hiện độ tin cậy tốt hơn.
              </p>
            </div>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Độ tin cậy
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const reliability = row.original.reliability
      let textColor = 'text-green-600'

      if (reliability < 0.6) {
        textColor = 'text-red-600'
      } else if (reliability < 0.7) {
        textColor = 'text-yellow-600'
      }

      return (
        <HoverCardText
          content={
            <div className="w-[300px]">
              {reliability < 0.6 ? (
                <span>Độ tin cậy thấp, câu hỏi có thể không ổn định.</span>
              ) : reliability < 0.7 ? (
                <span>
                  Độ tin cậy trung bình, có thể chấp nhận được trong một số
                  trường hợp.
                </span>
              ) : (
                <span>Độ tin cậy tốt, câu hỏi có tính ổn định cao.</span>
              )}
            </div>
          }
        >
          <div className={`text-center ${textColor} font-medium`}>
            {reliability.toFixed(6)}
          </div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'fit_category',
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <HoverCardText
          content={
            <div className="w-[300px]">
              <p>
                Phân loại mức độ phù hợp của câu hỏi với mô hình Rasch dựa trên
                các chỉ số <strong>infit</strong> và <strong>outfit</strong>.
              </p>
              <ul className="mt-2 list-disc pl-4 text-sm">
                <li>
                  <strong>Phù hợp:</strong> Infit và outfit nằm trong khoảng{' '}
                  <code>0.8–1.2</code>
                </li>
                <li>
                  <strong>Cần xem xét:</strong> Nằm ngoài <code>0.8–1.2</code>{' '}
                  nhưng trong <code>0.7–1.3</code>
                </li>
                <li>
                  <strong>Không phù hợp:</strong> Ngoài khoảng{' '}
                  <code>0.7–1.3</code>
                </li>
              </ul>
            </div>
          }
        >
          <Button
            variant="ghost"
            className="relative flex items-center justify-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Phù hợp
            <span className="absolute -right-2 flex items-center">
              <ArrowUpDown className="h-4 w-4" />
            </span>
          </Button>
        </HoverCardText>
      </div>
    ),
    size: 120,
    cell: ({ row }) => {
      const infit = row.original.infit
      const outfit = row.original.outfit

      let category: string
      let variant: BadgeProps['variant']
      let tooltip: string

      if (infit < 0.7 || infit > 1.3 || outfit < 0.7 || outfit > 1.3) {
        category = 'Không phù hợp'
        variant = 'veryHard'
        tooltip =
          'Giá trị infit hoặc outfit nằm ngoài khoảng [0.7–1.3], cho thấy câu hỏi có thể không phù hợp với mô hình hoặc chứa phản hồi bất thường.'
      } else if (infit < 0.8 || infit > 1.2 || outfit < 0.8 || outfit > 1.2) {
        category = 'Cần xem xét'
        variant = 'hard'
        tooltip =
          'Giá trị infit hoặc outfit nằm ngoài khoảng lý tưởng [0.8–1.2], cần xem xét kỹ hơn để đánh giá độ phù hợp.'
      } else {
        category = 'Phù hợp'
        variant = 'medium'
        tooltip =
          'Giá trị infit và outfit nằm trong khoảng [0.8–1.2], cho thấy câu hỏi phù hợp với mô hình Rasch.'
      }

      return (
        <HoverCardText
          content={<div className="w-[300px]">{tooltip}</div>}
          className="flex justify-center"
        >
          <Badge variant={variant}>{category}</Badge>
        </HoverCardText>
      )
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <Info className="h-4 w-4" />
                <span className="sr-only">Thông tin</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
              <RaschItemDetailView item={row.original} />
            </DialogContent>
          </Dialog>
        </div>
      )
    },
  },
]
