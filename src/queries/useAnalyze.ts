import { analyzeService } from '@/services/analyze.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: analyzeService.analyze,
  })
}

export const useGetAllQuestionsAnalysisQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-items', projectId],
    queryFn: () => analyzeService.getAllQuestionAnalysis({ projectId }),
  })
}

export const useGetQuestionAnalysisQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['ctt-question', questionId],
    queryFn: () => analyzeService.getQuestionAnalysis({ questionId }),
  })
}

export const useGetGeneralDetailsQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-general', projectId],
    queryFn: () => analyzeService.getGeneralDetails({ projectId }),
  })
}

export const useGetHistogramQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['ctt-histogram', projectId],
    queryFn: () => analyzeService.getHistogramDetails({ projectId }),
  })
}

export const useGetOptionAnalysisQuery = (optionId: string) => {
  return useQuery({
    queryKey: ['option-analysis', optionId],
    queryFn: () => analyzeService.getOptionAnalysis({ optionId }),
  })
}

export const useGetOptionsAnalysisQuery = (
  questionId: string,
  enabled: boolean
) => {
  return useQuery({
    enabled,
    queryKey: ['options-analysis', questionId],
    queryFn: () => analyzeService.getOptionsAnalysis({ questionId }),
  })
}

export const useGetStudentResultQuery = (
  studentExamId: string,
  enabled: boolean = true
) => {
  return useQuery({
    enabled,
    queryKey: ['student-result', studentExamId],
    queryFn: () => analyzeService.getStudentResult({ studentExamId }),
  })
}

export const useGetStudentsAnalysisQuery = (
  projectId: string,
  enabled: boolean = true
) => {
  return useQuery({
    enabled,
    queryKey: ['students-analysis', projectId],
    queryFn: () => analyzeService.getStudentsAnalysis({ projectId }),
  })
}

export const useGetRaschAnalysisQuery = (projectId: string, enabled = true) => {
  return useQuery({
    enabled,
    queryKey: ['rasch-analysis', projectId],
    queryFn: () => analyzeService.getRaschAnalysis({ projectId }),
  })
}
