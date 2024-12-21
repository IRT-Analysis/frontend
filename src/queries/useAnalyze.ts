import { analyzeService } from '@/services/analyzeService'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: analyzeService.cttAnalysis,
  })
}

export const useGetItemsResultQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-items', id],
    queryFn: () => analyzeService.getCTTAnalysisResult(id),
  })
}

export const useGetGeneralDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-general', id],
    queryFn: () => analyzeService.getCTTAnalysisGeneralDetail(id),
  })
}
