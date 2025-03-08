import http from '@/lib/httpClient'
import { MyProfileResType, MyProjectsResType } from '@/schema/account.schema'

export const accountService = {
  getProfile() {
    return http.get<MyProfileResType>('/my/profile')
  },
  getProjects() {
    return http.get<MyProjectsResType>('/my/projects')
  },
}
