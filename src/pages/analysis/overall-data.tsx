import HoverCardIcon from '@/components/reusable-hover-with-icon'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { NotebookText, SquareCheck, User } from 'lucide-react'

const OverallDataItems = [
  {
    title: 'Số câu',
    icon: NotebookText,
    name: 'total_questions',
    color: '#2563EB',
  },
  {
    title: 'Số thí sinh',
    name: 'total_students',
    icon: User,
    color: '#38BDF8',
  },
  {
    title: 'Số lựa chọn',
    name: 'total_options',
    icon: SquareCheck,
    color: 'pink',
  },
] as const

const OverallData = ({ data }: { data: CTTGeneralDetails['general'] }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-white px-[20px] py-[30px] text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="flex justify-between">
        <h1 className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          Tổng quan
        </h1>
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="flex gap-1 text-[26px] font-bold leading-[1.25] tracking-[0.2px] text-blue-600">
          0.754
          <HoverCardIcon>
            {(() => {
              const KR20 = 0.754
              if (KR20 < 0.7) {
                return 'Bài kiểm tra có độ tin cậy thấp. Nên xem xét cải thiện các câu hỏi để tăng tính nhất quán và khả năng đo lường năng lực thí sinh.'
              } else if (KR20 < 0.8) {
                return 'Bài kiểm tra có độ tin cậy ở mức trung bình. Có thể chấp nhận được nhưng cần cải thiện thêm để đảm bảo đánh giá chính xác hơn.'
              } else {
                return 'Bài kiểm tra có độ tin cậy cao, các câu hỏi phù hợp và đo lường năng lực thí sinh hiệu quả.'
              }
            })()}
          </HoverCardIcon>
        </p>

        <h2 className="flex gap-1 text-[12px] font-normal leading-[1.6] text-muted-foreground">
          Độ tin cậy (Kuder Richardson 20)
          <HoverCardIcon size={11} className="w-[450px]">
            <MathJaxContext>
              <div className="flex flex-col gap-2">
                <p>
                  Độ tin cậy Kuder Richardson 20 (KR20) đánh giá mức độ tin cậy
                  của bài kiểm tra:
                </p>
                <MathJax className="text-center">
                  {
                    '\\(KR20 = \\frac{K}{K-1} \\left[ 1 - \\frac{\\sum p_i q_i}{\\sigma^2} \\right]\\)'
                  }
                </MathJax>
                <p>Trong đó:</p>
                <ul>
                  <li>
                    <MathJax>
                      {'\\(K\\)'}: Số lượng câu hỏi trong bài kiểm tra.
                    </MathJax>
                  </li>
                  <li>
                    <MathJax>
                      {'\\(p_i\\)'}: Tỷ lệ thí sinh trả lời đúng câu hỏi thứ \(
                      i \).
                    </MathJax>
                  </li>
                  <li>
                    <MathJax>
                      {'\\(q_i = 1 - p_i\\)'}: Tỷ lệ thí sinh trả lời sai câu
                      hỏi thứ \( i \).
                    </MathJax>
                  </li>
                  <li>
                    <MathJax>
                      {'\\(\\sigma^2\\)'}: Phương sai của tổng điểm bài kiểm
                      tra.
                    </MathJax>
                  </li>
                </ul>
              </div>
              <p className="mt-2">
                Giá trị cao: Bài kiểm tra có độ tin cậy cao, các câu hỏi nhất
                quán trong việc đo lường cùng một kiến thức hoặc kỹ năng.
                <br />
                Giá trị thấp: Bài kiểm tra có độ tin cậy thấp, các câu hỏi không
                đồng nhất hoặc không cùng đo lường một mục tiêu cụ thể.
              </p>
            </MathJaxContext>
          </HoverCardIcon>
        </h2>
      </div>

      <div className="flex gap-4 rounded-lg">
        {OverallDataItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-2 self-center rounded-lg py-5 text-background"
            style={{ backgroundColor: item.color }}
          >
            <div className="rounded-full border p-3">
              <item.icon size={24} />
            </div>
            <h2 className="text-[12px] font-normal leading-[1.6]">
              {item.title}
            </h2>
            <p className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
              {data[item.name]}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default OverallData
