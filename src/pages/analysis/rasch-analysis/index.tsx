import { getViolatedIndices } from '@/lib/utils'
import { useGetRaschAnalysisQuery } from '@/queries/useAnalyze'
import { useParams } from 'react-router-dom'
import { ItemPieChart } from '../items/item-pie-chart'
import ReviewQuestionsCard from '../items/review-question-card'
import RaschItemTable from './item-table'

const RaschItems = () => {
  const { projectId } = useParams()

  const { data: response, isPending } = useGetRaschAnalysisQuery(
    projectId!,
    !!projectId
  )

  const data =
    response?.data.map((item, index) => ({
      ...item,
      questionNumber: index + 1,
    })) ?? []

  const reviewQuestions = data
    .map((item) => {
      const violatedIndices = getViolatedIndices(item)
      if (violatedIndices.length > 0) {
        return {
          id: item.id,
          questionNo: item.questionNumber,
          violatedIndices,
        }
      }
      return null
    })
    .filter((q) => q !== null)
  return (
    <div className="flex gap-5 p-5">
      <div className="grow">
        <RaschItemTable isPending={isPending} data={data} />
      </div>
      <div className="flex shrink-0 basis-[270px] flex-col gap-5">
        <ReviewQuestionsCard questions={reviewQuestions} />
        <ItemPieChart />
      </div>
    </div>
  )
}
export default RaschItems
