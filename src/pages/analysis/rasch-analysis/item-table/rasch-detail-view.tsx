import { RaschQuestionAnalysisType } from '@/schema/analysis.schema'
import RaschMetricsTable from './metric-table'
import { RaschItemChart } from './rasch-item-chart'

const RaschItemDetailView = ({ item }: { item: RaschQuestionAnalysisType }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold">
        Phân tích Rasch - Câu {item.questionNumber}
      </h2>

      <div className="rounded-md border p-4">
        <h3 className="mb-2 text-lg font-semibold">Nội dung câu hỏi</h3>
        <p className="text-gray-800">{item.question_content}</p>

        {item.options && item.options.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {item.options.map((option) => (
              <div
                key={option.id}
                className="rounded-md border border-blue-200 bg-blue-50 p-3 text-center font-medium text-blue-600 shadow-sm"
              >
                {option.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[35%_65%] gap-6">
        <div className="rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">Thông số Rasch</h3>
          <RaschMetricsTable item={item} />
        </div>

        <div className="rounded-md border p-4">
          <h3 className="mb-4 text-lg font-semibold">
            Đường đặc trưng câu hỏi (ICC)
          </h3>
          <RaschItemChart item={item} />
        </div>
      </div>
    </div>
  )
}

export default RaschItemDetailView
