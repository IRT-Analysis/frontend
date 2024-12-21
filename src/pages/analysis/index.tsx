import { Blocks, ChartNoAxesColumn, GraduationCap, Split } from 'lucide-react'
import { BarLineChart } from './bar-line-chart'
import { Component } from './barchart'
import OverallData from './overall-data'
import { useParams } from 'react-router-dom'
import { useGetAverageDetalsQuery } from '@/queries/useAnalyze'

const OverallStats = [
  {
    icon: <GraduationCap color="#F6A723" />,
    title: 'Điểm trung bình',
    name: 'average_score',
    bgColor: '#FFFBEB',
  },
  {
    icon: <Blocks color="#007AFF" />,
    title: 'Độ khó',
    name: 'average_difficulty',
    bgColor: '#EFF6FF',
  },
  {
    icon: <Split color="#ED4F9D" />,
    name: 'average_discrimination',
    title: 'Độ phân cách',
    bgColor: '#FDF2F8',
  },
  {
    icon: <ChartNoAxesColumn color="#38BDF8" />,
    title: 'Hệ số R_PBIS',
    name: 'average_rpbis',
    bgColor: '#F8FAFC',
  },
] as const

const Analysis = () => {
  const { id } = useParams()
  const getAverageQuery = useGetAverageDetalsQuery(id!)
  const averageData = getAverageQuery.data?.data || {
    average_difficulty: 0,
    average_discrimination: 0,
    average_rpbis: 0,
    average_score: 0,
  }
  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      {OverallStats.map((stat, index) => (
        <div
          key={index}
          className="col-span-3 flex items-center justify-center gap-5 rounded-lg border border-neutral-200 bg-background py-6 text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
        >
          <div
            className={`flex size-[48px] items-center justify-center rounded-lg`}
            style={{ backgroundColor: stat.bgColor }}
          >
            {stat.icon}
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-[24px] font-bold leading-[1.25] tracking-[0.2px]">
              {averageData[stat.name]}
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
