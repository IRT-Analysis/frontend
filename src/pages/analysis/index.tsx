import { useGetGeneralDetailsQuery } from '@/queries/useAnalyze'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { useParams } from 'react-router-dom'
import AverageDetails from './average-details'
import { BarLineChart } from './bar-line-chart'
import { LargeBarChart } from './barchart'
import OverallData from './overall-data'

const placeholderData: CTTGeneralDetails = {
  general: {
    total_students: 0,
    total_questions: 0,
    total_options: 0,
  },
  histogram: {
    score: [],
    difficulty: [],
    discrimination: [],
    r_pbis: [],
  },
  average: {
    average_score: 0,
    average_difficulty: 0,
    average_discrimination: 0,
    average_rpbis: 0,
  },
}

const ChartTooltipContent = {
  discrimination:
    'Các cột màu đỏ biểu thị câu hỏi có độ phân cách rất kém, không phân biệt được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ phân cách tạm được và tốt, giúp phân biệt rõ ràng giữa thí sinh giỏi và yếu.',
  difficulty:
    'Các cột màu đỏ biểu thị câu hỏi có độ khó rất kém, tức quá dễ hoặc quá khó, không đánh giá được năng lực thí sinh, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có độ khó phù hợp, giúp kiểm tra hiệu quả và phân loại thí sinh.',
  r_pbis:
    'Các cột màu đỏ biểu thị câu hỏi có hệ số tương quan rất kém, không liên kết chặt chẽ với điểm số tổng thể, cần xem lại, trong khi các cột màu xanh biểu thị câu hỏi có hệ số tương quan tốt, phản ánh khả năng phân loại chính xác năng lực thí sinh.',
}

const Analysis = () => {
  const { id } = useParams()
  const getGeneralDetails = useGetGeneralDetailsQuery(id!)
  const {
    data: { general, histogram, average },
  } = getGeneralDetails.data ?? { data: placeholderData }

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      <AverageDetails
        average={average}
        total_questions={general.total_questions}
      />
      <div className="col-span-8 rounded-lg bg-background">
        <LargeBarChart data={histogram.score} />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <OverallData data={general} />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố độ phân cách'}
          data={histogram.discrimination}
          tootlTip={ChartTooltipContent.discrimination}
          type="discrimination"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố độ khó'}
          data={histogram.difficulty}
          tootlTip={ChartTooltipContent.difficulty}
          type="difficulty"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố hệ số tương quan (R_PBIS)'}
          data={histogram.r_pbis}
          tootlTip={ChartTooltipContent.r_pbis}
          type="r_pbis"
        />
      </div>
    </div>
  )
}

export default Analysis
