import { AppSidebar } from '@/components/layout/main-layout/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import { AvatarDropdown } from './avatar-dropdown'
import HeaderTitle from './header-title'

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <SidebarTrigger />
            <HeaderTitle />
          </nav>
          <AvatarDropdown />
        </header>
        <main className="grow">
          <Outlet />
        </main>
        <footer className="flex h-10 items-center justify-center border-t bg-background">
          © 2024
        </footer>
      </div>
    </SidebarProvider>
  )
}
