import { ReusableTable } from '@/components/table/reusable-table'
import { ProjectType } from '@/schema/account.schema'
import { columns } from './column'
import { useNavigate } from 'react-router-dom'

const ProjectTable = ({
  data,
  isPending,
}: {
  data: ProjectType[]
  isPending: boolean
}) => {
  const navigate = useNavigate()
  const handleClick = (row: ProjectType) => {
    navigate(`/analysis/${row.type}/${row.id}`)
  }
  return (
    <ReusableTable<ProjectType>
      columns={columns}
      data={data!}
      isPending={isPending}
      onClick={handleClick}
    />
  )
}
export default ProjectTable
