import { CustomAreaChart } from '@/components/chart/area-chart'
import { ReusableTable } from '@/components/table/reusable-table'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { useGetItemsResultQuery } from '@/queries/useAnalyze'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { columns } from './columns'
import { MetricsTable } from './metric-table'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const ItemTable = () => {
  const { id } = useParams() as { id: string }
  const getItemsDataQuery = useGetItemsResultQuery(id)

  const analyzedData = getItemsDataQuery.data?.data
  const responseArray = useMemo(
    () =>
      Object.entries(analyzedData!).map(([key, value]) => ({
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
