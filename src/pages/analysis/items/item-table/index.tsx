import { ReusableTable } from '@/components/table/reusable-table'
import { columns } from './columns'
import { Item, MOCK_ITEM_DATA } from './MOCK_DATA'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { DataType, MetricsTable } from './metric-table'
import { CustomAreaChart } from '@/components/chart/area-chart'

const data: DataType = [
  {
    name: 'Phân cách',
    A: 0.1,
    B: 0.5,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'Độ khó',
    A: 0.3,
    B: 0.6,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'rpbis',
    A: 0.1,
    B: 0.9,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'Tỉ lệ',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
  {
    name: 'Nhóm cao',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
  {
    name: 'Nhóm thấp',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
]

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const ItemTable = () => {
  const collapsibleContent = (_row: number) => (
    <CollapsibleContent asChild>
      <tr>
        <td colSpan={3} className="p-5">
          <MetricsTable data={data} />
        </td>
        <td colSpan={4}>
          <CustomAreaChart<(typeof chartData)[number]> data={chartData} />
        </td>
      </tr>
    </CollapsibleContent>
  )

  return (
    <ReusableTable<Item>
      columns={columns}
      data={MOCK_ITEM_DATA}
      collapsibleContent={collapsibleContent}
    />
  )
}
export default ItemTable
