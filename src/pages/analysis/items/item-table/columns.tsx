import HoverCardText from '@/components/reuseable-hover-card'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { ColumnDef } from '@tanstack/react-table'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { ArrowUpDown } from 'lucide-react'
import { ActionsCell } from './action-cell'
import {
  evaluateCTTItemFit,
  evaluateDifficultyCategory,
  evaluateDiscriminationCategory,
  evaluateRpbisCategory,
  FitLabelEnum,
  FitLabelText,
} from '@/lib/utils'
import {
  DifficultyCategoryText,
  DiscriminationCategoryText,
  RpbisCategoryText,
} from '@/constants'

export const columns: ColumnDef<
  QuestionAnalysisType & { questionNumber: number }
>[] = [
  {
    accessorKey: 'questionNumber', // now it's sortable!
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="relative flex items-center justify-center"
        >
          <span className="absolute -right-2 flex items-center">
            <ArrowUpDown />
          </span>
          Câu
        </Button>
      </div>
    ),
    size: 100,
    cell: ({ row }) => (
      <div className="text-center">{row.original.questionNumber}</div>
    ),
  },
  {
    accessorKey: 'difficulty',
    size: 200,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCardText
            content={
              <MathJaxContext>
                <div className="flex flex-col gap-2">
                  <p>
                    Chỉ số độ khó đo lường tỷ lệ thí sinh trả lời đúng một câu
                    <br />
                    hỏi trên tổng thí sinh, thể hiện mức độ khó của câu đó:
                  </p>
                  <MathJax>
                    {
                      '\\(p = \\frac{\\text{Số lượng thí sinh đúng}}{\\text{Tổng số thí sinh}}\\)'
                    }
                  </MathJax>
                </div>
              </MathJaxContext>
            }
          >
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Độ khó
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </HoverCardText>
        </div>
      )
    },
    cell: ({ row }) => {
      const difficulty = row.original.question_analysis.difficulty_index
      return (
        <HoverCardText
          content={
            <div>
              Câu hỏi có tỉ lệ thí sinh chọn đúng là{' '}
              {Math.round(difficulty * 100)}%
            </div>
          }
        >
          <div className="text-center capitalize">{difficulty}</div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'discrimination',
    size: 200,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCardText
            content={
              <MathJaxContext>
                <div className="flex w-fit flex-col gap-2">
                  <p>
                    Độ phân cách thể hiện khả năng phân biệt của một câu hỏi
                    <br />
                    giữa thí sinh có năng lực cao và năng lực thấp:
                  </p>
                  <MathJax>
                    {
                      '\\(\\text{Độ p.cách} = \\text{Tỉ lệ nhóm cao trả lời đúng} - \\text{Tỉ lệ nhóm thấp trả lời đúng}\\)'
                    }
                  </MathJax>
                </div>
              </MathJaxContext>
            }
          >
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Độ phân cách
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </HoverCardText>
        </div>
      )
    },
    cell: ({ row }) => {
      const discrimination = row.original.question_analysis.discrimination_index
      return (
        <HoverCardText
          content={
            <div className="w-[300px]">
              {(() => {
                if (discrimination < 0) {
                  return (
                    <>
                      Câu hỏi có hiệu số tỉ lệ thí sinh nhóm cao chọn đúng so
                      với tỉ lệ đó của nhóm thấp là{' '}
                      <span className="font-bold text-red-500">
                        {Math.round(discrimination * 100)}%
                      </span>
                      .{' '}
                      <span className="text-red-500">
                        Điều này có thể do lỗi trong dữ liệu hoặc câu hỏi cần
                        được xem xét lại.
                      </span>
                    </>
                  )
                }
                return (
                  <>
                    Câu hỏi có hiệu số tỉ lệ thí sinh nhóm cao chọn đúng so với
                    tỉ lệ đó của nhóm thấp là {Math.round(discrimination * 100)}
                    %.
                  </>
                )
              })()}
            </div>
          }
        >
          <div className="text-center">{discrimination}</div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'difficulty_group',
    header: ({ column }) => {
      const difficultyOptions = [
        { label: 'Tất cả', value: null }, // No filter, show all
        { label: 'Quá Khó', value: { min: 0, max: 0.25 } },
        { label: 'Khó', value: { min: 0.25, max: 0.5 } },
        // { label: 'Trung bình', value: { min: 0.3, max: 0.5 } },
        { label: 'Dễ', value: { min: 0.5, max: 0.75 } },
        { label: 'Quá Dễ', value: { min: 0.75, max: 1 } },
      ]
      return (
        <DropdownMenu>
          <div className="flex items-center justify-center">
            <HoverCardText
              content={
                <div>
                  <MathJaxContext>
                    <div>
                      <MathJax>
                        {'\\( \\text{Độ khó} \\leq 0.25 \\)'}, câu hỏi{' '}
                        <span className="font-semibold">quá khó</span>.
                      </MathJax>
                    </div>
                    <div>
                      <MathJax>
                        {'\\( 0.25 \\lt \\text{Độ khó} \\leq 0.5 \\)'}, câu hỏi{' '}
                        <span className="font-semibold">khó</span>.
                      </MathJax>
                    </div>
                    <div>
                      <MathJax>
                        {'\\( 0.5 \\lt \\text{Độ khó} \\leq 0.75 \\)'}, câu hỏi{' '}
                        <span className="font-semibold">dễ</span>.
                      </MathJax>
                    </div>
                    <div>
                      <MathJax>
                        {'\\( 0.75 \\lt \\text{Độ khó} \\)'}, câu hỏi{' '}
                        <span className="font-semibold">quá dễ</span>.
                      </MathJax>
                    </div>
                  </MathJaxContext>
                </div>
              }
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center justify-center"
                >
                  <p>Độ khó</p>
                  <span className="absolute -right-2 flex items-center">
                    <ArrowUpDown />
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </HoverCardText>
            <DropdownMenuContent className="w-30">
              {/* Dropdown items for each difficulty option */}
              {difficultyOptions.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => column.setFilterValue(item.value)}
                >
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      )
    },
    size: 200,
    cell: ({ row }) => {
      const difficulty = row.original.question_analysis.difficulty_index
      const catergory = evaluateDifficultyCategory(difficulty)
      const { evaluation, label, variant } = DifficultyCategoryText[catergory]

      return (
        <HoverCardText
          content={<div className="w-[300px]">{evaluation}</div>}
          className="flex items-center justify-center"
        >
          <Badge variant={variant}>{label}</Badge>
        </HoverCardText>
      )
    },
    filterFn: (row, _, value) => {
      console.log('row', row)
      const pDifficulty = row.getValue('difficulty') as number
      if (!value) {
        return true // No filter, include all rows
      }

      // If a difficulty range is selected, check if p_difficulty falls within the range
      if (value.min !== undefined && value.max !== undefined) {
        return pDifficulty >= value.min && pDifficulty < value.max
      }
      return false // Default case: no match
    },
  },
  {
    accessorKey: 'discrimination_group',
    header: ({ column }) => {
      // Define the discrimination categories and their numeric ranges
      const discriminationOptions = [
        { label: 'Tất cả', value: null }, // No filter, show all
        { label: 'Kém', value: { min: -5, max: 0.1 } },
        { label: 'Tạm được', value: { min: 0.1, max: 0.3 } },
        { label: 'Tốt', value: { min: 0.3, max: 1 } },
      ]

      return (
        <DropdownMenu>
          <div className="flex items-center justify-center">
            <HoverCardText
              content={
                <MathJaxContext>
                  <div>
                    <div>
                      <MathJax>
                        {'\\( \\text{Độ phân cách} \\lt 0.1 \\)'}, câu hỏi phân
                        cách <span className="font-semibold">kém</span>.
                      </MathJax>
                    </div>
                    <div>
                      <MathJax>
                        {'\\( 0.1 \\leq \\text{Độ phân cách} \\lt 0.3 \\)'}, câu
                        hỏi phân cách{' '}
                        <span className="font-semibold">tạm được</span>.
                      </MathJax>
                    </div>
                    <div>
                      <MathJax>
                        {'\\( 0.3 \\leq \\text{Độ phân cách} \\)'}, câu hỏi phân
                        cách <span className="font-semibold">tốt</span>.
                      </MathJax>
                    </div>
                  </div>
                </MathJaxContext>
              }
              className="flex items-center justify-center"
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative flex items-center justify-center"
                >
                  <p>Phân cách</p>
                  <span className="absolute -right-2 flex items-center">
                    <ArrowUpDown />
                  </span>
                </Button>
              </DropdownMenuTrigger>
            </HoverCardText>
            <DropdownMenuContent className="w-30">
              {/* Dropdown items for each discrimination option */}
              {discriminationOptions.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => column.setFilterValue(item.value)}
                >
                  <span>{item.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </div>
        </DropdownMenu>
      )
    },
    size: 200,
    cell: ({ row }) => {
      const discrimination = row.original.question_analysis.discrimination_index
      const catergory = evaluateDiscriminationCategory(discrimination)
      const { evaluation, label, variant } =
        DiscriminationCategoryText[catergory]

      // Categorize discrimination based on the numeric value of discrimination

      return (
        <HoverCardText
          content={<div className="w-[300px]">{evaluation}</div>}
          className="flex items-center justify-center"
        >
          <Badge variant={variant}>{label}</Badge>
        </HoverCardText>
      )
    },

    filterFn: (row, _, value) => {
      const pDiscrimination = row.getValue('discrimination') as number
      if (!value) {
        return true
      }

      if (value.min !== undefined && value.max !== undefined) {
        return pDiscrimination >= value.min && pDiscrimination < value.max
      }
      return false
    },
  },
  {
    accessorKey: 'r_pbis',
    size: 200,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCardText
            content={
              <div className="w-[500px]">
                <MathJaxContext>
                  <div className="flex flex-col gap-2">
                    <p>
                      Chỉ số tương quan đo lường mối liên hệ giữa điểm câu hỏi
                      và điểm số tổng thể, dao động từ −1.0 đến 1.0:
                    </p>

                    <MathJax>
                      {
                        '\\(r_{pbis} = \\frac{\\bar{X}_1 - \\bar{X}_0}{s} \\cdot \\sqrt{\\frac{p(1-p)}{n}}\\)'
                      }
                    </MathJax>
                    <p>Trong đó:</p>
                    <ul>
                      <li>
                        <MathJax>
                          {'\\(\\bar{X}_1\\)'}: Điểm trung bình của nhóm thí
                          sinh trả lời đúng câu hỏi.
                        </MathJax>
                      </li>
                      <li>
                        <MathJax>
                          {'\\(\\bar{X}_0\\)'}: Điểm trung bình của nhóm thí
                          sinh trả lời sai câu hỏi.
                        </MathJax>
                      </li>
                      <li>
                        <MathJax>
                          {'\\(s\\)'}: Độ lệch chuẩn của điểm số tổng thể.
                        </MathJax>
                      </li>
                      <li>
                        <MathJax>
                          {'\\(p\\)'}: Tỷ lệ thí sinh trả lời đúng câu hỏi.
                        </MathJax>
                      </li>
                      <li>
                        <MathJax>{'\\(n\\)'}: Tổng số thí sinh.</MathJax>
                      </li>
                    </ul>
                  </div>
                  <p>
                    Giá trị cao: Câu hỏi tốt, phân biệt rõ giữa thí sinh giỏi và
                    yếu. Giá trị âm: Câu hỏi kém chất lượng, thí sinh yếu trả
                    lời đúng nhiều hơn thí sinh giỏi, có thể do nhầm lẫn hoặc
                    đáp án sai.
                  </p>
                </MathJaxContext>
              </div>
            }
          >
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Hệ số r_pbis
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </HoverCardText>
        </div>
      )
    },
    cell: ({ row }) => {
      const r_pbis = row.original.question_analysis.rpbis
      const r_pbisCategory = evaluateRpbisCategory(r_pbis)
      const { evaluation } = RpbisCategoryText[r_pbisCategory]
      return (
        <HoverCardText content={<div className="w-[300px]">{evaluation}</div>}>
          <div className="text-center">{r_pbis}</div>
        </HoverCardText>
      )
    },
  },
  {
    accessorKey: 'item_assessment',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCardText
            content={
              <div className="w-[300px]">
                <p>
                  Đánh giá tổng thể về chất lượng câu hỏi dựa trên độ khó và độ
                  phân cách:
                </p>
                <ul className="mt-2 list-disc pl-4 text-sm">
                  <li>
                    <strong>Phù hợp:</strong> Độ khó từ 0.3 đến 0.7 và độ phân
                    cách ≥ 0.3
                  </li>
                  <li>
                    <strong>Cần xem xét:</strong> Độ khó từ 0.25 đến 0.75 và độ
                    phân cách ≥ 0.1
                  </li>
                  <li>
                    <strong>Không phù hợp:</strong> Độ khó &lt; 0.25 hoặc &gt;
                    0.75 hoặc độ phân cách &lt; 0.1
                  </li>
                </ul>
              </div>
            }
          >
            <Button
              variant="ghost"
              className="relative flex items-center justify-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Đánh giá
              <span className="absolute -right-2 flex items-center">
                <ArrowUpDown />
              </span>
            </Button>
          </HoverCardText>
        </div>
      )
    },
    size: 250,
    cell: ({ row }) => {
      const difficulty = row.original.question_analysis.difficulty_index
      const discrimination = row.original.question_analysis.discrimination_index
      const rpbis = row.original.question_analysis.rpbis

      const { fit, violatedCategories } = evaluateCTTItemFit({
        difficulty,
        discrimination,
        rpbis,
      })

      let variant: BadgeProps['variant']
      let tooltip = FitLabelText[fit].evaluation

      switch (fit) {
        case FitLabelEnum.Fit:
          variant = 'medium'
          break
        case FitLabelEnum.Considerable:
          variant = 'hard'
          if (violatedCategories.length) {
            tooltip += `\nChỉ số cần cải thiện: ${violatedCategories.map((item) => item.name).join(', ')}.`
          }
          break
        case FitLabelEnum.NotFit:
        default:
          variant = 'veryHard'
          if (violatedCategories.length) {
            tooltip += `\nChỉ số vi phạm: ${violatedCategories.map((item) => item.name).join(', ')}.`
          }
          break
      }

      return (
        <HoverCardText
          content={
            <div className="w-[300px] whitespace-pre-line">{tooltip}</div>
          }
          className="flex items-center justify-center"
        >
          <Badge variant={variant}>{FitLabelText[fit].label}</Badge>
        </HoverCardText>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
