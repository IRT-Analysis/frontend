import { ItemPieChart } from './item-pie-chart'
import ItemTable from './item-table'

const Items = () => {
  return (
    <div className="flex gap-5 p-5">
      <ItemTable />
      <ItemPieChart />
    </div>
  )
}
export default Items
