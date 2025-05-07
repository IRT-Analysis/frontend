import {
  useGetGeneralDetailsQuery,
  useGetHistogramQuery,
} from '@/queries/useAnalyze'
import {
  GetGeneralDetailsResType,
  GetHistogramResType,
} from '@/schema/analysis.schema'
import { useParams } from 'react-router-dom'
import AverageDetails from './average-details'
import { LargeBarChart } from './barchart'
import InfitDeviationChart from './diverging-histogram'
import OverallData from './overall-data'
import { BarLineChart } from './bar-line-chart'

const ChartTooltipContent = {
  discrimination:
    'Các cột màu đỏ biểu thị câu hỏi có độ phân cách rất kém, không phân biệt được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ phân cách tạm được và tốt, giúp phân biệt rõ ràng giữa thí sinh giỏi và yếu.',
  difficulty:
    'Các cột màu đỏ biểu thị câu hỏi có độ khó rất kém, tức quá dễ hoặc quá khó, không đánh giá được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ khó phù hợp, giúp kiểm tra hiệu quả và phân loại thí sinh.',
  r_pbis:
    'Các cột màu đỏ biểu thị câu hỏi có hệ số tương quan rất kém, không liên kết chặt chẽ với điểm số tổng thể, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có hệ số tương quan tốt, phản ánh khả năng phân loại chính xác năng lực thí sinh.',
}

const RaschAnalysis = () => {
  const { projectId } = useParams()
  const getGeneralDetailsQuery = useGetGeneralDetailsQuery(projectId!)
  const {
    avg_difficulty_index: average_difficulty,
    avg_score: average_score,
    // exam_id,
    avg_discrimination_index: average_discrimination,
    // cronbach_alpha,
    avg_infit: average_infit,
    avg_outfit: average_outfit,
    avg_reliability: average_reliability,

    projects: { total_options, total_questions, total_students },
  } = getGeneralDetailsQuery.data?.data ||
  ({
    created_at: '',
    exam_id: '',
    project_id: '',
    avg_discrimination_index: 0,
    avg_score: 0,
    avg_difficulty_index: 0,
    avg_rpbis: 0,
    cronbach_alpha: 0,
    id: '',
    projects: {},
  } as GetGeneralDetailsResType['data'])

  const histogramDataQuery = useGetHistogramQuery(projectId as any)
  const { score, difficulty, infit_outfit } =
    histogramDataQuery.data?.data ||
    ({
      score: [],
      difficulty: [],
      discrimination: [],
      r_pbis: [],
      infit_outfit: [],
      scatter: [],
    } as GetHistogramResType['data'])

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      <AverageDetails
        average={{
          average_score,
          average_difficulty,
          average_discrimination,
          average_infit,
          average_outfit,
          average_reliability,
        }}
        total_questions={total_questions}
      />

      <div className="col-span-8 rounded-lg bg-background">
        <InfitDeviationChart data={infit_outfit} isLoading={false} />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <OverallData
          data={{ total_options, total_questions, total_students }}
        />
      </div>

      <div className="col-span-8 rounded-lg bg-background">
        <LargeBarChart data={score} />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={histogramDataQuery.isLoading}
          name={'Biểu đồ phân bố độ khó'}
          data={difficulty}
          tootlTip={ChartTooltipContent.difficulty}
          type="difficulty"
        />
      </div>
    </div>
  )
}

export default RaschAnalysis
