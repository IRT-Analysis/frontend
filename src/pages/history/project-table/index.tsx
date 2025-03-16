import { ReusableTable } from '@/components/table/reusable-table'
import { ProjectType } from '@/schema/account.schema'
import { columns } from './column'

const ProjectTable = ({
  data,
  isPending,
}: {
  data: ProjectType[]
  isPending: boolean
}) => {
  return (
    <ReusableTable<ProjectType>
      columns={columns}
      data={data!}
      isPending={isPending}
    />
  )
}
export default ProjectTable
