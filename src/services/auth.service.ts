import http from '@/lib/httpClient'
import {
  SignInReqType,
  SignInResType,
  SignOutResType,
  SignUpReqType,
  SignUpResType,
} from '@/schema/auth.schema'

export const authService = {
  signUp({ email, password, option }: SignUpReqType) {
    return http.post<SignUpResType>('/auth/signup', { email, password, option })
  },

  signIn({ email, password }: SignInReqType) {
    return http.post<SignInResType>('/auth/signin', { email, password })
  },

  signOut() {
    return http.post<SignOutResType>('/auth/signout')
  },
}
