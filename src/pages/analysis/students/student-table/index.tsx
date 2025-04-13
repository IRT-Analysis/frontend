import { ReusableTable } from '@/components/table/reusable-table'
import { assignGroupFromScore } from '@/lib/utils'
import { useGetStudentsAnalysisQuery } from '@/queries/useAnalyze'
import {
  GetStudentsAnalysisQueryType,
  StudentExam,
} from '@/schema/analysis.schema'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getStudentTableColumns } from './columns'
import ExamResultsDialog from './exam-results-dialog'
import { KidmapDialog } from './kidmap-dialog'
import { AnalyzeType } from '@/types/ctt-analysis.type'

const StudentTable = () => {
  const { projectId, analysisType } = useParams<
    GetStudentsAnalysisQueryType & { analysisType: AnalyzeType }
  >()
  console.log(projectId)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)
  const [isKidmapDialogOpen, setIsKidmapDialogOpen] = useState(false)

  const { data, isLoading } = useGetStudentsAnalysisQuery(
    projectId ?? 'd3b7dfa5-2802-4bfb-ad92-6d4ea544d3e9'
  )

  const handleViewExam = (studentId: string) => {
    setSelectedStudent(studentId)
    setIsExamDialogOpen(true)
  }

  const handleViewKidmap = (studentId: string) => {
    setSelectedStudent(studentId)
    setIsKidmapDialogOpen(true)
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
          analysisType!,
          groupOptions
        )}
        data={data?.data ?? []}
        isPending={isLoading}
        searchBy={['student_id']}
      />
      <ExamResultsDialog
        isOpen={isExamDialogOpen}
        onClose={() => setIsExamDialogOpen(false)}
        studentId={selectedStudent}
      />

      <KidmapDialog
        isOpen={isKidmapDialogOpen}
        onClose={() => setIsKidmapDialogOpen(false)}
        studentId={selectedStudent}
      />
    </div>
  )
}
export default StudentTable
