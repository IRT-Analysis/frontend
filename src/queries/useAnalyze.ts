import { cttAnalyzeService } from '@/services/analyze.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: cttAnalyzeService.analyze,
  })
}

export const useGetAllQuestionsAnalysisQuery = (examId: string) => {
  return useQuery({
    queryKey: ['ctt-items', examId],
    queryFn: () => cttAnalyzeService.getAllQuestionAnalysis({ examId }),
  })
}

export const useGetQuestionAnalysisQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['ctt-question', questionId],
    queryFn: () => cttAnalyzeService.getQuestionAnalysis({ questionId }),
  })
}

export const useGetGeneralDetailsQuery = (examId: string) => {
  return useQuery({
    queryKey: ['ctt-general', examId],
    queryFn: () => cttAnalyzeService.getGeneralDetails({ examId }),
  })
}

export const useGetHistogramQuery = (examId: string) => {
  return useQuery({
    queryKey: ['ctt-histogram', examId],
    queryFn: () => cttAnalyzeService.getHistogramDetails({ examId }),
  })
}

export const useGetOptionAnalysisQuery = (optionId: string) => {
  return useQuery({
    queryKey: ['option-analysis', optionId],
    queryFn: () => cttAnalyzeService.getOptionAnalysis({ optionId }),
  })
}

export const useGetOptionsAnalysisQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['options-analysis', questionId],
    queryFn: () => cttAnalyzeService.getOptionsAnalysis({ questionId }),
  })
}
