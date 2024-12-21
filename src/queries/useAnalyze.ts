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
    queryFn: () => cttAnalyzeService.getResult(id),
  })
}

export const useGetGeneralDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ['ctt-general', id],
    queryFn: () => cttAnalyzeService.getGeneralDetails(id),
  })
}

export const useGetAverageDetalsQuery = (id: string) => {
  console.log('query')
  return useQuery({
    queryKey: ['ctt-average', id],
    queryFn: () => cttAnalyzeService.getAverageDetails(id),
  })
}
