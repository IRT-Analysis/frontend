import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CreateAnalysisForm } from './create-analysis-form'
import banner from '/image.jpeg'
import MockDescriptionImage from '/screen-01.png'
import { useState } from 'react'
import { AnalyzeType } from '@/types/ctt-analysis.type'

const CardData = [
  {
    title: AnalyzeType.CTT,
    content:
      'Phân tích dựa trên lý thuyết trắc nghiệm cổ điển, tập trung vào đánh giá độ khó và độ phân cách của câu hỏi để đưa ra phân tích hiệu quả.',
  },
  {
    title: AnalyzeType.RASCH,
    content:
      'Phân tích theo mô hình Rasch, đơn giản hơn IRT, chỉ xét mối quan hệ giữa năng lực và độ khó, không có các yếu tố đoán mò hay độ phân cách.',
  },
  {
    title: AnalyzeType.IRT,
    content:
      'Phân tích dựa trên lý thuyết trắc nghiệm hiện đại, tập trung vào đánh giá mối quan hệ giữa năng lực thí sinh và độ khó của câu hỏi.',
  },
] as const

const DashBoard = () => {
  const [selectedType, setSelectedType] =
    useState<(typeof CardData)[number]['title']>()
  return (
    <Dialog>
      <div className="flex flex-col items-center gap-[100px] p-[100px] 2xl:mx-auto 2xl:w-[1345px]">
        <div className="Banner flex items-center justify-between">
          <div className="flex basis-[600px] flex-col gap-2">
            <h1 className="text-[48px] font-extrabold">
              Phân tích dễ dàng. Hiểu sâu hơn.
            </h1>
            <p className="text-2xl text-muted-foreground">
              Giải pháp tối ưu cho việc phân tích dữ liệu trắc nghiệm của bạn
              một cách nhanh chóng.
            </p>
          </div>
          <div className="relative flex grow items-center justify-center py-[70px]">
            <div className="absolute right-0 top-0 size-[230px] rotate-[-4.683deg] rounded-2xl bg-[#C3D6FF]" />
            <div className="absolute bottom-0 left-[50px] size-[230px] rotate-[-23.885deg] rounded-2xl bg-[#F5F0E7]" />
            <div className="absolute top-0 size-[230px] rotate-[-15deg] rounded-2xl bg-[#F0ECF7]" />
            <img src={banner} alt="" className="z-0 h-[300px] rounded-2xl" />
          </div>
        </div>
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-[36px] font-bold leading-[1.25] tracking-[0.2px]">
              Khám phá các phương pháp có sẵn
            </h2>
            <p className="w-[700px] text-center text-[18px] font-normal leading-[1.25] tracking-[0.2px] text-[#464646]">
              Từ lý thuyết trắc nghiệm cổ điển đến hiện đại,hệ thống cung cấp
              giải pháp phân tích tối ưu cho mọi nhu cầu đánh giá câu hỏi và
              năng lực thí sinh.
            </p>
          </div>
          <div className="flex justify-center gap-5">
            {CardData.map((card, index) => (
              <Card key={index} className="basis-[360px]">
                <CardHeader>
                  <CardTitle className="text-[24px] font-bold leading-[1.25]">
                    {card.title}
                  </CardTitle>
                  {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <p className="text-[16px] font-normal leading-[1.6]">
                    {card.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <DialogTrigger asChild>
                    <Button
                      className="rounded-3 w-full bg-primary-600-base"
                      onClick={() => setSelectedType(card.title)}
                    >
                      Phân tích
                    </Button>
                  </DialogTrigger>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-[36px] font-bold leading-[1.25] tracking-[0.2px]">
              Phân tích trắc nghiệm là gì?
            </h2>
            <p className="max-w-[700px] text-center text-[20px] font-normal leading-[1.25] tracking-[0.2px] text-[#464646]">
              Phân tích trắc nghiệm là quá trình đánh giá chất lượng câu hỏi
              trắc nghiệm để đảm bảo chúng đo lường chính xác năng lực của thí
              sinh. Quá trình này tập trung vào việc xác định độ khó, khả năng
              phân cách, độ tin cậy, và mức độ phù hợp của từng câu hỏi với mục
              tiêu kiểm tra, giúp tối ưu hóa hiệu quả bài thi.
            </p>
          </div>
          <div className="flex items-center gap-[100px]">
            <div className="flex flex-col gap-8">
              <h3 className="text-[40px] font-bold leading-normal">
                Automated Reports & Widget Alerts
              </h3>
              <p className="text-[18px] font-normal leading-[1.5] text-[#464646]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elementum nisi aliquet volutpat pellentesque volutpat est.
                Sapien in etiam vitae nibh nunc mattis imperdiet sed nullam.
                Vitae et, tortor pulvinar risus pulvinar sit amet.
              </p>
            </div>
            <img
              src={MockDescriptionImage}
              alt="Mock Description Image"
              className="h-auto max-w-[50%]"
            />
          </div>
          <div className="flex items-center gap-[100px]">
            <img
              src={MockDescriptionImage}
              alt="Mock Description Image"
              className="h-auto max-w-[50%]"
            />
            <div className="flex flex-col gap-8">
              <h3 className="text-[40px] font-bold leading-normal">
                Fully customizable to address your needs{' '}
              </h3>
              <p className="text-[18px] font-normal leading-[1.5] text-[#464646]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Elementum nisi aliquet volutpat pellentesque volutpat est.
                Sapien in etiam vitae nibh nunc mattis imperdiet sed nullam.
                Vitae et, tortor pulvinar risus pulvinar sit amet.
              </p>
            </div>
          </div>
        </div>
      </div>
      {selectedType && <CreateAnalysisForm type={selectedType} />}
    </Dialog>
  )
}
export default DashBoard
