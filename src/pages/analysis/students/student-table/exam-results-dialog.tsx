import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetStudentResultQuery } from '@/queries/useAnalyze'
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  studentId: string | null
}

const ExamResultsDialog = ({ isOpen, onClose, studentId }: Props) => {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<
    number | null
  >(null)
  const [currentPage, setCurrentPage] = useState(0)
  const QUESTION_PER_PAGE = 10

  const { data, isLoading } = useGetStudentResultQuery(
    studentId ?? '',
    !!studentId
  )

  const examData = data?.data ?? null

  useEffect(() => {
    if (studentId) {
      setSelectedQuestionIndex(null)
      setCurrentPage(0)
    }
  }, [studentId])

  if (!examData || isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              <Skeleton className="h-6 w-48" />
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4 px-4 py-10">
            <Skeleton className="h-6 w-full max-w-md" />
            <Skeleton className="h-6 w-full max-w-sm" />
            <Skeleton className="h-4 w-full max-w-xs" />

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>

            <Skeleton className="mt-6 h-12 w-24 self-center" />
          </div>
        </DialogContent>
      </Dialog>
    )
  } else {
    const totalQuestions = examData.answers.length
    const correctAnswers = examData.answers.filter((a) => a.is_correct).length
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    const totalPages = Math.ceil(examData.answers.length / QUESTION_PER_PAGE)
    const paginatedQuestions = examData.answers.slice(
      currentPage * QUESTION_PER_PAGE,
      (currentPage + 1) * QUESTION_PER_PAGE
    )
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Kết quả bài làm</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex flex-col items-start justify-between gap-4 rounded-lg bg-muted p-4 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-medium">
                  {`${examData.first_name} ${examData.last_name}`} (Mã số sinh
                  viên: {examData.student_id})
                </h3>
              </div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-muted p-4 sm:flex-row">
                    <div>
                      <h3 className="font-medium">Đánh giá chung</h3>
                      <p className="text-sm text-muted-foreground">
                        Trả lời đúng {correctAnswers} trên {totalQuestions} câu
                        hỏi
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-m text-muted-foreground">Điểm:</div>
                      <div
                        className={cn(
                          'text-3xl font-bold',
                          score >= 80
                            ? 'text-green-600'
                            : score >= 50
                              ? 'text-primary-600-base'
                              : 'text-red-500'
                        )}
                      >
                        {score}%
                      </div>
                      <Progress className="h-2 w-28" value={score} />
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 font-medium">Câu hỏi</h3>
                    <div className="space-y-3">
                      {paginatedQuestions.map((question, index) => {
                        const questionNumber =
                          currentPage * QUESTION_PER_PAGE + index + 1
                        const isSelected =
                          selectedQuestionIndex ===
                          currentPage * QUESTION_PER_PAGE + index

                        return (
                          <div
                            key={index}
                            className="overflow-hidden rounded-md border"
                          >
                            <div
                              className={`flex cursor-pointer items-center justify-between p-3 hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedQuestionIndex(null)
                                } else {
                                  setSelectedQuestionIndex(
                                    currentPage * QUESTION_PER_PAGE + index
                                  )
                                }
                              }}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`mr-3 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                                    question.is_correct
                                      ? 'bg-[var(--very-good-background)] text-[var(--very-good-text)]'
                                      : 'bg-[var(--very-bad-background)] text-[var(--very-bad-text)]'
                                  }`}
                                >
                                  {questionNumber}
                                </div>
                                <div className="max-w-2xl truncate">
                                  {question.question_content}
                                </div>
                              </div>
                              <div className="flex items-center">
                                {question.is_correct ? (
                                  <Check className="mr-2 h-5 w-5 text-[var(--very-good-text)]" />
                                ) : (
                                  <X className="mr-2 h-5 w-5 text-[var(--very-bad-text)]" />
                                )}
                                {isSelected ? (
                                  <ChevronUp className="h-5 w-5" />
                                ) : (
                                  <ChevronDown className="h-5 w-5" />
                                )}
                              </div>
                            </div>

                            {isSelected && (
                              <div className="border-t p-4">
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="mb-2 font-medium">
                                      Câu hỏi:
                                    </h3>
                                    <p className="rounded-md bg-muted p-3">
                                      {question.question_content}
                                    </p>
                                  </div>

                                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div
                                      className={`rounded-md border p-4 ${
                                        question.is_correct
                                          ? 'border-[var(--very-good-text)] bg-[var(--very-good-background)]'
                                          : 'border-[var(--very-bad-text)] bg-[var(--very-bad-background)]'
                                      }`}
                                    >
                                      <h3 className="mb-2 flex items-center font-medium">
                                        Bài làm
                                        {question.is_correct ? (
                                          <Check className="ml-2 h-4 w-4 text-[var(--very-good-text)]" />
                                        ) : (
                                          <X className="ml-2 h-4 w-4 text-[var(--very-bad-text)]" />
                                        )}
                                      </h3>
                                      <p>{question.selected_option.content}</p>
                                    </div>

                                    <div className="rounded-md border border-[var(--very-good-text)] bg-[var(--very-good-background)] p-4">
                                      <h3 className="mb-2 flex items-center font-medium">
                                        Đáp án
                                        <Check className="ml-2 h-4 w-4 text-[var(--very-good-text)]" />
                                      </h3>
                                      <p>{question.correct_option_content}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-6 flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentPage((prev) => Math.max(0, prev - 1))
                            setSelectedQuestionIndex(null)
                          }}
                          disabled={currentPage === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm">
                          Trang {currentPage + 1} trên {totalPages}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setCurrentPage((prev) =>
                              Math.min(totalPages - 1, prev + 1)
                            )
                            setSelectedQuestionIndex(null)
                          }}
                          disabled={currentPage === totalPages - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default ExamResultsDialog
