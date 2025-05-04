import { ReusableTable } from '@/components/table/reusable-table'
import { ProjectType } from '@/schema/account.schema'
import { columns } from './column'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/components/ui/sidebar'
import { MENU_ITEM } from '@/constants'
import { useGlobal } from '@/context/global-context'

const ProjectTable = ({
  data,
  isPending,
}: {
  data: ProjectType[]
  isPending: boolean
}) => {
  const navigate = useNavigate()
  const { dispatch } = useGlobal()
  const { setActive } = useSidebar()
  const handleClick = (row: ProjectType) => {
    navigate(`/analysis/${row.type}/${row.id}`)
    setActive(MENU_ITEM[1])
    dispatch({
      type: 'ANALYZE',
      payload: { type: row.type, projectId: row.id },
    })
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
