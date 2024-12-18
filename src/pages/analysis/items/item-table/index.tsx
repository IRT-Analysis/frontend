import { ReusableTable } from '@/components/table/reusable-table'
import { columns } from './columns'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { MetricsTable } from './metric-table'
import { CustomAreaChart } from '@/components/chart/area-chart'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { CTTAnalysis } from '@/services/analyzeService'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const ItemTable = () => {
  const location = useLocation()
  const { analyzedData } = location.state as { analyzedData: CTTAnalysis }

  const responseArray = useMemo(
    () =>
      Object.entries(analyzedData).map(([key, value]) => ({
        id: key,
        ...value,
      })),
    [analyzedData]
  )
  const collapsibleContent = (row: number) => (
    <CollapsibleContent asChild>
      <tr>
        <td colSpan={3} className="p-5">
          <MetricsTable data={responseArray[row].options} />
        </td>
        <td colSpan={4}>
          <CustomAreaChart<(typeof chartData)[number]> data={chartData} />
        </td>
      </tr>
    </CollapsibleContent>
  )

  return (
    <ReusableTable<(typeof responseArray)[number]>
      columns={columns}
      data={responseArray}
      collapsibleContent={collapsibleContent}
    />
  )
}
export default ItemTable
