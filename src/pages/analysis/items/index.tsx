import { useGetAllQuestionsAnalysisQuery } from '@/queries/useAnalyze'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ItemPieChart } from './item-pie-chart'
import ItemTable from './item-table'
import ReviewQuestionsCard from './review-question-card'
import { QuestionDialog } from './item-table/question-dialog'
import { ReviewQuestion } from '@/types/ctt-analysis.type'
import { evaluateCTTItemFit } from '@/lib/utils'
import {
  DifficultyCategory,
  DifficultyCategoryText,
  DiscriminationCategory,
  DiscriminationCategoryText,
  RpbisCategory,
  RpbisCategoryText,
} from '@/constants'

const Items = () => {
  const { projectId } = useParams()
  const getAllQuestionAnalysisQuery = useGetAllQuestionsAnalysisQuery(
    projectId!
  )

  const data = useMemo(() => {
    return (
      getAllQuestionAnalysisQuery.data?.data?.map((item, index) => ({
        ...item,
        questionNumber: index + 1,
      })) ?? [
        {
          id: '',
          exam_id: '',
          content: '',
          questionNumber: 1,
          correct_option_id: '',
          question_analysis: {
            discrimination_index: 0,
            difficulty_index: 0,
            rpbis: 0,
            selection_rate: 0,
            group_choice_percentages: [],
            evaluation: '',
          },
        },
      ]
    )
  }, [getAllQuestionAnalysisQuery.data])
  const getReviewQuestions = (
    questions: (QuestionAnalysisType & { questionNumber: number })[]
  ): ReviewQuestion[] => {
    return questions
      .map((q) => {
        const violations = []

        const { difficulty_index, discrimination_index, rpbis } =
          q.question_analysis

        const { violatedCategories } = evaluateCTTItemFit({
          difficulty: difficulty_index,
          discrimination: discrimination_index,
          rpbis,
        })

        for (const category of violatedCategories) {
          if (
            Object.values(DiscriminationCategory).includes(
              category as DiscriminationCategory
            )
          ) {
            violations.push({
              name: 'discrimination',
              value: discrimination_index,
              message:
                DiscriminationCategoryText[category as DiscriminationCategory]
                  .evaluation,
            })
          }

          if (
            Object.values(DifficultyCategory).includes(
              category as DifficultyCategory
            )
          ) {
            violations.push({
              name: 'difficulty',
              value: difficulty_index,
              message:
                DifficultyCategoryText[category as DifficultyCategory]
                  .evaluation,
            })
          }

          if (
            Object.values(RpbisCategory).includes(category as RpbisCategory)
          ) {
            violations.push({
              name: 'R-pbis',
              value: rpbis,
              message: RpbisCategoryText[category as RpbisCategory].evaluation,
            })
          }
        }

        if (violations.length > 0) {
          return {
            id: q.id,
            questionNo: q.questionNumber,
            violatedIndices: violations,
          }
        }

        return null
      })
      .filter(Boolean) as ReviewQuestion[]
  }

  const reviewQuestions = useMemo(() => {
    return getReviewQuestions(data)
  }, [data])

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionAnalysisType | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleQuestionClick = (id: string) => {
    const found = data?.find((q) => q.id === id)
    if (found) {
      setSelectedQuestion(found)
      setDialogOpen(true)
    }
  }

  return (
    <>
      <div className="flex gap-5 p-5">
        <div className="grow">
          <ItemTable
            data={data}
            isPending={getAllQuestionAnalysisQuery.isPending}
          />
        </div>
        <div className="flex shrink-0 basis-[270px] flex-col gap-5">
          <ReviewQuestionsCard
            questions={reviewQuestions}
            onQuestionClick={handleQuestionClick}
          />
          <ItemPieChart />
        </div>
      </div>

      {selectedQuestion && (
        <QuestionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          row={{ original: selectedQuestion } as any} // simulate TanStack Row
          isDirty={true}
        />
      )}
    </>
  )
}

export default Items
