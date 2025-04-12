import { ItemPieChart } from '../items/item-pie-chart'
import ReviewQuestionsCard from '../items/review-question-card'
import RaschItemTable from './item-table'

const RaschItems = () => {
  return (
    <div className="flex gap-5 p-5">
      <div className="grow">
        <RaschItemTable />
      </div>
      <div className="flex shrink-0 basis-[270px] flex-col gap-5">
        <ReviewQuestionsCard />
        <ItemPieChart />
      </div>
    </div>
  )
}
export default RaschItems
