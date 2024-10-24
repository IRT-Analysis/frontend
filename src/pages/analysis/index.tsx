import { User } from 'lucide-react'
import { Component } from './barchart'
import OverallData from './overall-data'
import { BarLineChart } from './bar-line-chart'

const OverallStats = [
  {
    icon: User,
    title: 'Total Users',
    value: 100,
  },
  {
    icon: User,
    title: 'Total Orders',
    value: 1000,
  },
  {
    icon: User,
    title: 'Total Revenue',
    value: 10000,
  },
  {
    icon: User,
    title: 'Total Products',
    value: 10000,
  },
]

const Analysis = () => {
  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      {OverallStats.map((stat, index) => (
        <div
          key={index}
          className="col-span-3 flex items-center justify-center gap-5 rounded-lg bg-background py-6"
        >
          <div className="flex size-[48px] items-center justify-center rounded-lg bg-slate-300">
            <stat.icon />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[24px] font-bold leading-[1.25] tracking-[0.2px]">
              {stat.value}
            </div>
            <div className="text-[14px] font-semibold leading-[1.6] tracking-[0.2px] text-muted-foreground">
              {stat.title}
            </div>
          </div>
        </div>
      ))}

      <div className="col-span-8 rounded-lg bg-background">
        <Component />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <OverallData />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart />
      </div>
    </div>
  )
}
export default Analysis
