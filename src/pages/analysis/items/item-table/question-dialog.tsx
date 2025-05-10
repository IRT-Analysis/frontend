// QuestionDialog.tsx
import { CustomAreaChart } from '@/components/chart/area-chart'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetOptionsAnalysisQuery } from '@/queries/useAnalyze'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { Row } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import { MetricsTable } from './metric-table'
import { Answers } from '@/constants'

type QuestionDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  row: Row<
    QuestionAnalysisType & {
      questionNumber: number
    }
  >
  isDirty: boolean
}

export const QuestionDialog = ({
  open,
  onOpenChange,
  row,
  isDirty,
}: QuestionDialogProps) => {
  const {
    id: questionId,
    content,
    correct_option_id,
    question_analysis: { group_choice_percentages, evaluation },
  } = row.original

  const getOptionsAnalysisQuery = useGetOptionsAnalysisQuery(
    questionId,
    isDirty
  )
  const optionsData = getOptionsAnalysisQuery.data?.data
  const isLoading =
    getOptionsAnalysisQuery.isLoading || getOptionsAnalysisQuery.isFetching
  let correctOptionLetter: Answers | undefined = undefined
  const answerArr = [Answers.A, Answers.B, Answers.C, Answers.D]
  if (optionsData && correct_option_id)
    correctOptionLetter =
      answerArr[optionsData.findIndex((opt) => opt.id === correct_option_id)]
  console.log('optionsData', optionsData)
  console.log('correct_option_id', correct_option_id)
  console.log('correctOptionLetter', correctOptionLetter)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Chi tiết câu hỏi</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="space-y-4 p-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <Skeleton className="h-6 w-3/4" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 bg-muted/50" />
              ))}
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-[200px] w-1/2" />
              <Skeleton className="h-[200px] w-1/2" />
            </div>
          </div>
        ) : optionsData ? (
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gray-800">{content}</div>
            <div className="grid grid-cols-4 gap-4">
              {optionsData.map((option) => (
                <div
                  key={option.id}
                  className="rounded-md border border-blue-200 bg-blue-50 p-3 text-center font-medium text-blue-600 shadow-sm"
                >
                  {option.content}
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <MetricsTable data={optionsData} correct_option={'A'} />
              </div>
              <div className="w-1/2">
                <CustomAreaChart
                  groupChoicePercentages={group_choice_percentages}
                  optionLabels={Object.keys(Answers)}
                  correct_option={correctOptionLetter ?? Answers.A}
                />
              </div>
            </div>
            {evaluation && (
              <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 shadow-sm">
                <h4 className="mb-2 text-base font-semibold text-gray-700">
                  Đánh giá
                </h4>
                <p className="whitespace-pre-line text-sm text-gray-700">
                  {evaluation}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Không thể tải dữ liệu
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
