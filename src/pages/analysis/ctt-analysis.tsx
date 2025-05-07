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
import { BarLineChart } from './bar-line-chart'
import { LargeBarChart } from './barchart'
import OverallData from './overall-data'
import ScatteredChart from '@/components/chart/scatter-chart'

const ChartTooltipContent = {
  discrimination:
    'Các cột màu đỏ biểu thị câu hỏi có độ phân cách rất kém, không phân biệt được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ phân cách tạm được và tốt, giúp phân biệt rõ ràng giữa thí sinh giỏi và yếu.',
  difficulty:
    'Các cột màu đỏ biểu thị câu hỏi có độ khó rất kém, tức quá dễ hoặc quá khó, không đánh giá được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ khó phù hợp, giúp kiểm tra hiệu quả và phân loại thí sinh.',
  r_pbis:
    'Các cột màu đỏ biểu thị câu hỏi có hệ số tương quan rất kém, không liên kết chặt chẽ với điểm số tổng thể, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có hệ số tương quan tốt, phản ánh khả năng phân loại chính xác năng lực thí sinh.',
}

const CTTAnalysis = () => {
  const { projectId } = useParams()
  console.log(projectId)
  const getGeneralDetailsQuery = useGetGeneralDetailsQuery(projectId!)
  const {
    avg_difficulty_index: average_difficulty,
    avg_score: average_score,
    // exam_id,
    avg_discrimination_index: average_discrimination,
    // cronbach_alpha,
    avg_rpbis: average_rpbis,
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
  const {
    score,
    difficulty,
    discrimination,
    r_pbis,
    scatter: scatter_plot,
  } = histogramDataQuery.data?.data ||
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
          average_rpbis,
        }}
        total_questions={total_questions}
      />
      <div className="col-span-8 rounded-lg bg-background">
        <LargeBarChart data={score} />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <OverallData
          data={{ total_options, total_questions, total_students }}
        />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={histogramDataQuery.isLoading}
          name={'Biểu đồ phân bố độ phân cách'}
          data={discrimination}
          tootlTip={ChartTooltipContent.discrimination}
          type="discrimination"
        />
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
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={histogramDataQuery.isLoading}
          name={'Biểu đồ phân bố hệ số tương quan (R_PBIS)'}
          data={r_pbis}
          tootlTip={ChartTooltipContent.r_pbis}
          type="r_pbis"
        />
      </div>
      <div className="col-span-12 rounded-lg bg-background">
        <ScatteredChart
          data={scatter_plot}
          isLoading={histogramDataQuery.isLoading}
        />
      </div>
    </div>
  )
}

export default CTTAnalysis
