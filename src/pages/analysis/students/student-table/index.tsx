import { ReusableTable } from '@/components/table/reusable-table'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getStudentTableColumns } from './columns'
import ExamResultsDialog from './exam-results-dialog'
import { useGetStudentsAnalysisQuery } from '@/queries/useAnalyze'
import { StudentExam } from '@/schema/analysis.schema'

export const assignGroupFromScore = (score: number | null): number => {
  if (score === null) return 0 // ungrouped or unknown
  if (score >= 80) return 5
  if (score >= 65) return 4
  if (score >= 50) return 3
  if (score >= 35) return 2
  return 1
}

const StudentTable = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const searchParams = new URLSearchParams(location.search)
  const examId = searchParams.get('examId')
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data, isLoading } = useGetStudentsAnalysisQuery(
    examId ?? 'd3b7dfa5-2802-4bfb-ad92-6d4ea544d3e9'
  )

  const handleViewExam = (studentId: string) => {
    setSelectedStudent(studentId)
    setIsDialogOpen(true)
  }

  const handleViewKidmap = (studentId: string) => {
    navigate(`/student-analysis/kidmap/${studentId}`)
  }

  const getGroupOptions = (students: StudentExam[]) => {
    const groups = new Set<number>()
    students.forEach((s) => groups.add(assignGroupFromScore(s.total_score)))
    return [...groups].sort((a, b) => b - a)
  }

  const groupOptions = getGroupOptions(data?.data ?? [])

  return (
    <div className="p-5">
      <ReusableTable
        columns={getStudentTableColumns(
          handleViewExam,
          handleViewKidmap,
          groupOptions
        )}
        data={data?.data ?? []}
        isPending={isLoading}
        searchBy={['student_id']}
      />
      <ExamResultsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        studentId={selectedStudent}
      />
    </div>
  )
}
export default StudentTable
