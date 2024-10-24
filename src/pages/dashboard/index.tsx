import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import banner from '/image.png'
import MockDescriptionImage from '/screen-01.png'

const cardData = [
  {
    title: 'CTT',
    content:
      'Phương pháp phân tích dựa trên lý thuyết trắc nghiệm cổ điển (Classical Test Theory)',
    action: () => {
      console.log('CTT analysis started')
    },
  },
  {
    title: 'Rasch',
    content:
      'Phương pháp phân tích dựa trên lý thuyết trắc nghiệm cổ điển (Classical Test Theory)',
    action: () => {
      console.log('Rasch analysis started')
    },
  },
  {
    title: 'IRT',
    content:
      'Phương pháp phân tích dựa trên lý thuyết trắc nghiệm cổ điển (Classical Test Theory)',
    action: () => {
      console.log('IRT analysis started')
    },
  },
]

const DashBoard = () => {
  return (
    <div className="flex flex-col items-center gap-[100px] p-[100px] 2xl:mx-auto 2xl:w-[1345px]">
      <div className="Banner flex items-center justify-between">
        <div className="flex basis-[600px] flex-col gap-2">
          <h1 className="text-[48px] font-extrabold">
            We make item analysis easy.
          </h1>
          <p className="text-2xl text-muted-foreground">
            All the tools you’ll need to be more productive and work smarter
            with documents.
          </p>
        </div>
        <div className="relative flex grow items-center justify-center py-[70px]">
          <div className="absolute right-0 top-0 size-[230px] rotate-[-4.683deg] rounded-2xl bg-[#C3D6FF]" />
          <div className="absolute bottom-0 left-[50px] size-[230px] rotate-[-23.885deg] rounded-2xl bg-[#F5F0E7]" />
          <div className="absolute top-0 size-[230px] rotate-[-15deg] rounded-2xl bg-[#F0ECF7]" />
          <img src={banner} alt="" className="z-0 h-[300px]" />
        </div>
      </div>
      <div className="flex flex-col gap-[60px]">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-[36px] font-bold leading-[1.25] tracking-[0.2px]">
            Khám phá các model có sẵn
          </h2>
          <p className="text-[20px] font-normal leading-[1.25] tracking-[0.2px]">
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum{' '}
          </p>
        </div>
        <div className="flex justify-center gap-5">
          {cardData.map((card) => (
            <Card className="basis-[360px]">
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
                <Button className="rounded-3 w-full bg-primary-600-base">
                  Phân tích
                </Button>
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
          <p className="max-w-[700px] text-center text-[20px] font-normal leading-[1.25] tracking-[0.2px]">
            lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem
            ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum psum lorem
            ipsum lorem ipsum
          </p>
        </div>
        <div className="flex items-center gap-[100px]">
          <div className="flex flex-col gap-8">
            <h3 className="text-[40px] font-bold leading-normal">
              Automated Reports & Widget Alerts
            </h3>
            <p className="font-roboto text-[18px] font-normal leading-[1.5] text-[#464646]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              nisi aliquet volutpat pellentesque volutpat est. Sapien in etiam
              vitae nibh nunc mattis imperdiet sed nullam. Vitae et, tortor
              pulvinar risus pulvinar sit amet.
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
            <p className="font-roboto text-[18px] font-normal leading-[1.5] text-[#464646]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum
              nisi aliquet volutpat pellentesque volutpat est. Sapien in etiam
              vitae nibh nunc mattis imperdiet sed nullam. Vitae et, tortor
              pulvinar risus pulvinar sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashBoard
