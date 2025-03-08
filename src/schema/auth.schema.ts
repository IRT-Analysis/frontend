import { ApiResponse } from '@/lib/httpClient'
import { AuthResponse, AuthTokenResponsePassword } from '@supabase/supabase-js'

export type SignInReqType = {
  email: string
  password: string
}

export type SignInResType = ApiResponse<AuthTokenResponsePassword['data']>

export type SignUpReqType = {
  email: string
  password: string
}

export type SignUpResType = ApiResponse<AuthResponse['data']>

export type SignOutResType = Omit<ApiResponse<null>, 'data'>
