import { AuthLayout } from '@/components/layout/auth-layout'
import { SignUp } from '@/components/ui/sign-input'

export function SignUpPage() {
  return (
    <>
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    </>
  )
}
