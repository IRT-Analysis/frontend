import { analyzeService } from '@/services/analyzeService'
import { useMutation } from '@tanstack/react-query'

export const useCTTAnalyzeMutation = () => {
  return useMutation({
    mutationKey: ['ctt-analyze'],
    mutationFn: analyzeService.cttAnalysis,
  })
}
