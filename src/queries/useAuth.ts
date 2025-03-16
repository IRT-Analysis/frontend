import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth.service'
import { SignInReqType, SignUpReqType } from '@/schema/auth.schema'

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ['auth-signup'],
    mutationFn: ({ email, password, option }: SignUpReqType) =>
      authService.signUp({ email, password, option }),
  })
}

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ['auth-signin'],
    mutationFn: ({ email, password }: SignInReqType) =>
      authService.signIn({ email, password }),
  })
}

export const useSignOutMutation = () => {
  return useMutation({
    mutationKey: ['auth-signout'],
    mutationFn: () => authService.signOut(),
  })
}
