import { cttAnalyzeService } from '@/services/analyze.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: cttAnalyzeService.analyze,
  })
}

export const useGetAllQuestionsAnalysisQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-items', projectId],
    queryFn: () => cttAnalyzeService.getAllQuestionAnalysis({ projectId }),
  })
}

export const useGetQuestionAnalysisQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['ctt-question', questionId],
    queryFn: () => cttAnalyzeService.getQuestionAnalysis({ questionId }),
  })
}

export const useGetGeneralDetailsQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-general', projectId],
    queryFn: () => cttAnalyzeService.getGeneralDetails({ projectId }),
  })
}

export const useGetHistogramQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-histogram', projectId],
    queryFn: () => cttAnalyzeService.getHistogramDetails({ projectId }),
  })
}

export const useGetOptionAnalysisQuery = (optionId: string) => {
  return useQuery({
    queryKey: ['option-analysis', optionId],
    queryFn: () => cttAnalyzeService.getOptionAnalysis({ optionId }),
  })
}

export const useGetOptionsAnalysisQuery = (
  questionId: string,
  enabled: boolean
) => {
  return useQuery({
    enabled,
    queryKey: ['options-analysis', questionId],
    queryFn: () => cttAnalyzeService.getOptionsAnalysis({ questionId }),
  })
}

export const useGetStudentResultQuery = (
  studentExamId: string,
  enabled: boolean = true
) => {
  return useQuery({
    enabled,
    queryKey: ['student-result', studentExamId],
    queryFn: () => cttAnalyzeService.getStudentResult({ studentExamId }),
  })
}

export const useGetStudentsAnalysisQuery = (
  examId: string,
  enabled: boolean = true
) => {
  return useQuery({
    enabled,
    queryKey: ['students-analysis', examId],
    queryFn: () => cttAnalyzeService.getStudentsAnalysis({ examId }),
  })
}
