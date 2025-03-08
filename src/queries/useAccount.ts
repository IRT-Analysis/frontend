import { accountService } from '@/services/account.service'
import { useQuery } from '@tanstack/react-query'

export const useGetProfileQuery = () => {
  return useQuery({
    queryKey: ['auth-profile'],
    queryFn: () => accountService.getProfile(),
  })
}

export const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => accountService.getProjects(),
  })
}
