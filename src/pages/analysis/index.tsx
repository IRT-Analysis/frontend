import {
  useGetGeneralDetailsQuery,
  useGetHistogramQuery,
} from '@/queries/useAnalyze'
import { useParams } from 'react-router-dom'
import AverageDetails from './average-details'
import { BarLineChart } from './bar-line-chart'
import { LargeBarChart } from './barchart'
import OverallData from './overall-data'

// const placeholderData: CTTGeneralDetails = {
//   general: {
//     total_students: 0,
//     total_questions: 0,
//     total_options: 0,
//   },
//   histogram: {
//     score: [],
//     difficulty: [],
//     discrimination: [],
//     r_pbis: [],
//   },
//   average: {
//     average_score: 0,
//     average_difficulty: 0,
//     average_discrimination: 0,
//     average_rpbis: 0,
//   },
// }

const ChartTooltipContent = {
  discrimination:
    'Các cột màu đỏ biểu thị câu hỏi có độ phân cách rất kém, không phân biệt được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ phân cách tạm được và tốt, giúp phân biệt rõ ràng giữa thí sinh giỏi và yếu.',
  difficulty:
    'Các cột màu đỏ biểu thị câu hỏi có độ khó rất kém, tức quá dễ hoặc quá khó, không đánh giá được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ khó phù hợp, giúp kiểm tra hiệu quả và phân loại thí sinh.',
  r_pbis:
    'Các cột màu đỏ biểu thị câu hỏi có hệ số tương quan rất kém, không liên kết chặt chẽ với điểm số tổng thể, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có hệ số tương quan tốt, phản ánh khả năng phân loại chính xác năng lực thí sinh.',
}

const Analysis = () => {
  const { projectId } = useParams()
  const getGeneralDetailsQuery = useGetGeneralDetailsQuery(projectId!)
  const {
    data: {
      avg_difficulty_index: average_difficulty,
      // avg_score,
      exam_id,
      avg_discrimination_index: average_discrimination,
      // cronbach_alpha,
      // average_rpbis,
      projects: { total_options, total_questions, total_students },
    },
  } = getGeneralDetailsQuery.data!

  const histogramDataQuery = useGetHistogramQuery(exam_id)
  const { data: histogramData } = histogramDataQuery.data!

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      <AverageDetails
        average={{
          average_score: 0,
          average_difficulty,
          average_discrimination,
          average_rpbis: 0,
        }}
        total_questions={total_questions}
      />
      <div className="col-span-8 rounded-lg bg-background">
        <LargeBarChart data={histogramData.score} />
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
          data={histogramData.discrimination}
          tootlTip={ChartTooltipContent.discrimination}
          type="discrimination"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={histogramDataQuery.isLoading}
          name={'Biểu đồ phân bố độ khó'}
          data={histogramData.difficulty}
          tootlTip={ChartTooltipContent.difficulty}
          type="difficulty"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={histogramDataQuery.isLoading}
          name={'Biểu đồ phân bố hệ số tương quan (R_PBIS)'}
          data={histogramData.r_pbis}
          tootlTip={ChartTooltipContent.r_pbis}
          type="r_pbis"
        />
      </div>
    </div>
  )
}

export default Analysis
