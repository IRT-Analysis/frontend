import { Introduction } from '@/components/ui/logo'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="grid h-screen grid-cols-2 gap-4">
        <Introduction />
        {children}
      </div>
    </>
  )
}
