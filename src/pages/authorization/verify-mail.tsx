import { AuthLayout } from '@/components/layout/auth-layout'
import { VerifyMail } from '@/components/ui/sign-input'

export function VerifyMailPage() {
  return (
    <>
      <AuthLayout>
        <VerifyMail />
      </AuthLayout>
    </>
  )
}
