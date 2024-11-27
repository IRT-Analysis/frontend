import { ReusableTable } from '@/components/table/reusable-table'
import { columns } from './columns'
import { MOCK_DATA } from './MOCK_DATA'

const StudentTable = () => {
  return (
    <div className="p-5">
      <ReusableTable
        columns={columns}
        data={MOCK_DATA}
        searchBy={['student_id']}
      />
    </div>
  )
}
export default StudentTable
