import { cttAnalyzeService } from '@/services/analyzeService'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: cttAnalyzeService.analyze,
  })
}

export const useGetItemsResultQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-items', id],
    queryFn: () => cttAnalyzeService.getAllQuestionAnalysis(id),
  })
}

export const useGetGeneralDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-general', id],
    queryFn: () => cttAnalyzeService.getGeneralDetails(id),
  })
}

export const useGetHistogramQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-histogram', id],
    queryFn: () => cttAnalyzeService.getHistogramDetails(id),
  })
}

export const useGetOptionAnalysisQuery = (questionId: string) => {
  return useQuery({
    queryKey: ['option-analysis', questionId],
    queryFn: () => cttAnalyzeService.getOptionAnlysis(questionId),
  })
}
