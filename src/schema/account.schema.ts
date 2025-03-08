import { ApiResponse } from '@/lib/httpClient'

export type UserType = {
  id: string
  email: string
  role: string
}

export type ProjectType = {
  id: string
  name: string
  description: string | ''
}

// ----------------------------------------------

export type MyProfileResType = ApiResponse<UserType>

// ----------------------------------------------

export type MyProjectsReqType = {
  userId: UserType['id']
}

export type MyProjectsResType = ApiResponse<ProjectType[]>
