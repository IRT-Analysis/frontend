import { ApiResponse } from '@/lib/httpClient'

type ProjectDetailsType = {
  name: string
  total_options: number
  total_students: number
  total_questions: number
}

export type QuestionAnalysisType = {
  id: string
  exam_id: string
  content: string
  question_analysis: {
    discrimination_index: number
    difficulty_index: number
    rpbis: number
    selection_rate: number
    group_choice_percentages: Record<string, number>[]
  }
}

export type OptionAnalysisType = {
  id: string
  content: string
  option_analysis: {
    discrimination_index: number
    rpbis: number
    selection_rate: number
    selected_by: number
    top_selected: number
    bottom_selected: number
  }
}

// ----------------------------------------------

export type AnalyzeQueryType = {
  type: string
}

export type AnalyzeResType = ApiResponse<{
  projectId: string
  examId: string[]
}>

// ----------------------------------------------

export type GetGeneralDetailsQueryType = {
  projectId: string
}

export type GetGeneralDetailsResType = ApiResponse<{
  created_at: string
  exam_id: string
  project_id: string
  avg_discrimination_index: number
  avg_rpbis: number
  avg_difficulty_index: number
  cronbach_alpha: number
  avg_score: number
  id: string
  projects: ProjectDetailsType
}>

// ----------------------------------------------

export type GetHistogramQueryType = {
  projectId: string
}

export type GetHistogramResType = ApiResponse<{
  score: Record<string, number>[]
  difficulty: Record<string, number>[]
  discrimination: Record<string, number>[]
  r_pbis: Record<string, number>[]
}>

// ----------------------------------------------

export type GetAllQuestionAnalysisQueryType = {
  projectId: string
}

export type GetAllQuestionAnalysisResType = ApiResponse<QuestionAnalysisType[]>

export type GetQuestionAnalysisQueryType = {
  questionId: string
}

export type GetQuestionAnalysisResType = ApiResponse<QuestionAnalysisType>

// ----------------------------------------------

export type GetOptionsAnalysisQueryType = {
  questionId: string
}

export type GetOptionsAnalysisResType = ApiResponse<OptionAnalysisType[]>

export type GetOptionAnalysisQueryType = {
  optionId: string
}

export type GetOptionAnalysisResType = ApiResponse<OptionAnalysisType>

// ----------------------------------------------

export type StudentAnswerResultType = {
  question_id: string
  question_content: string
  correct_option_id: string
  correct_option_content: string
  is_correct: boolean
  selected_option: {
    id: string
    content: string
  }
}

export type StudentResultType = StudentExam & {
  answers: StudentAnswerResultType[]
}

export type GetStudentResultQueryType = {
  studentExamId: string
}

export type GetStudentResultResType = ApiResponse<StudentResultType>

export type SupabaseStudentAnswerRaw = {
  is_correct: boolean
  selected_option: {
    id: string
    content: string
  }
  question: {
    id: string
    content: string
    correct_option: {
      id: string
      content: string
    }
  }
}

export type SupabaseStudentExamRaw = Omit<StudentExam, 'student_examId'> & {
  id: string
  answers: SupabaseStudentAnswerRaw[]
}

// ----------------------------------------------

export type StudentExam = {
  first_name: string
  middle_name: string
  last_name: string
  student_exam_id: string
  total_score: number | null
  exam_id: string
  grade: number | null
  student_id: string
}

export type GetStudentsAnalysisQueryType = {
  projectId: string
}

export type GetStudentsAnalysisResType = ApiResponse<StudentExam[]>
