import { ReusableTable } from '@/components/table/reusable-table'
import { QuestionAnalysisType } from '@/schema/analysis.schema'
import { columns } from './columns'

type Props = {
  data: (QuestionAnalysisType & { questionNumber: number })[]
  isPending: boolean
}

const ItemTable = ({ data, isPending }: Props) => {
  return (
    <ReusableTable<QuestionAnalysisType & { questionNumber: number }>
      key={data.length}
      columns={columns}
      data={data}
      isPending={isPending}
    />
  )
}
export default ItemTable
