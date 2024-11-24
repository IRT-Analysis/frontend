import { AuthLayout } from '@/components/layout/auth-layout'
import { SignIn } from '@/components/ui/sign-input'

export function SignInPage() {
  return (
    <>
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    </>
  )
}
