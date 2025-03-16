import { useGetProjectsQuery } from '@/queries/useAccount'
import ProjectTable from './project-table'

const History = () => {
  const getProjectsQuery = useGetProjectsQuery()
  const { data, isPending } = getProjectsQuery
  return (
    <div className="p-10">
      {/* <h1>History</h1> */}
      <ProjectTable data={data?.data ?? []} isPending={isPending} />
    </div>
  )
}
export default History
