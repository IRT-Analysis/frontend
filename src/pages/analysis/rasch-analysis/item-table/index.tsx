import { ReusableTable } from '@/components/table/reusable-table'
import { raschColumns } from './columns'

type Props = {
  isPending: boolean
  data: any[]
}

const RaschItemTable = ({ isPending, data }: Props) => {
  return (
    <ReusableTable
      columns={raschColumns}
      data={data ?? []}
      isPending={isPending}
    />
  )
}

export default RaschItemTable
