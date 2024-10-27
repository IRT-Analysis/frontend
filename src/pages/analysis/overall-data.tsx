import { Ellipsis, NotebookText, SquareCheck, User } from 'lucide-react'

const OverallDataItems = [
  {
    title: 'Số câu',
    value: 120,
    icon: NotebookText,
    color: '#2563EB',
  },
  {
    title: 'Số thí sinh',
    value: 300,
    icon: User,
    color: '#38BDF8',
  },
  {
    title: 'Số lựa chọn',
    value: 4,
    icon: SquareCheck,
    color: 'pink',
  },
]

const OverallData = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-neutral-200 bg-white px-[20px] py-[30px] text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
      <div className="flex justify-between">
        <h1 className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
          Tổng quan
        </h1>
        <Ellipsis />
      </div>
      <div className="flex gap-4 rounded-lg">
        {OverallDataItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center gap-2 rounded-lg py-5 text-background"
            style={{ backgroundColor: item.color }}
          >
            <div className="rounded-full border p-3">
              <item.icon size={24} />
            </div>
            <h2 className="text-[12px] font-normal leading-[1.6]">
              {item.title}
            </h2>
            <p className="text-[16px] font-bold leading-[1.5] tracking-[0.2px]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-[12px] font-normal leading-[1.6] text-muted-foreground">
          Độ tin cậy (Kuder Richardson 20)
        </h2>
        <p className="text-[24px] font-bold leading-[1.25] tracking-[0.2px]">
          -0.6483
        </p>
      </div>
    </div>
  )
}
export default OverallData
