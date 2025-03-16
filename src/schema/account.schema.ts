import { ApiResponse } from '@/lib/httpClient'
import { User } from '@supabase/supabase-js'

export type UserType = {
  id: string
  email: string
  name: string
  role: string
}

export type ProjectType = {
  created_at: string
  user_id: string
  name: string
  id: string
  total_questions: number
  total_students: number
  total_options: number
}

// ----------------------------------------------

export type MyProfileResType = ApiResponse<User>

// ----------------------------------------------

export type MyProjectsReqType = {
  userId: UserType['id']
}

export type MyProjectsResType = ApiResponse<ProjectType[]>
