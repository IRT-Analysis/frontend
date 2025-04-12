import { ReusableTable } from '@/components/table/reusable-table'
import { useGetRaschAnalysisQuery } from '@/queries/useAnalyze'
import { useParams } from 'react-router-dom'
import { raschColumns } from './columns'

const RaschItemTable = () => {
  const { projectId } = useParams()

  const { data: response, isPending } = useGetRaschAnalysisQuery(
    projectId!,
    !!projectId
  )
  const data = response?.data.map((item, index) => ({
    ...item,
    questionNumber: index + 1,
  }))
  return (
    <ReusableTable
      columns={raschColumns}
      data={data ?? []}
      isPending={isPending}
    />
  )
}

export default RaschItemTable
