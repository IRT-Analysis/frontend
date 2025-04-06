import { accountService } from '@/services/account.service'
import { useQuery } from '@tanstack/react-query'

export const useGetProfileQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['auth-profile'],
    queryFn: () => accountService.getProfile(),
    enabled,
  })
}

export const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => accountService.getProjects(),
  })
}
