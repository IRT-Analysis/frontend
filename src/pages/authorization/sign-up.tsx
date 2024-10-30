import { SignUp } from '@/components/ui/sign-input'
import { Introduction } from '@/components/ui/logo'

export function SignUpPage() {
  return (
    <>
      <div className="grid h-screen grid-cols-2 gap-4">
        <Introduction />
        <SignUp />
      </div>
    </>
  )
}
