import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export function Logo({
  className,
  logoUrl = '/logo.png',
}: {
  className?: string
  logoUrl?: string
}) {
  return (
    <>
      <Link
        className={cn(
          'item-center flex whitespace-normal px-9 pt-10 text-xl font-bold text-white',
          className
        )}
        to="/"
      >
        <img className="h-7 w-9 pr-2" src={logoUrl} alt="logo" />
        <h3> MCQinsight</h3>
      </Link>
    </>
  )
}

export function Banner() {
  return (
    <>
      <div className="space-y-1">
        <div className="mb-6 flex items-center justify-center">
          <img
            className="size-3/6 shrink-0"
            src="/introduction.png"
            alt="Banner"
          />
        </div>

        <div className="text-center text-xl font-bold text-white">
          Hệ thống phân tích kết quả trắc nghiệm
        </div>
        <h4 className="text-center text-sm text-[#F8FAFC]">
          Phân tích độ khó, độ phân biệt và hiệu quả câu hỏi một cách trực quan
        </h4>
      </div>
    </>
  )
}

export function Introduction() {
  return (
    <>
      <div className="grid-col-2 grid h-screen bg-blueCustom">
        <Logo />
        <Banner />
      </div>
    </>
  )
}
