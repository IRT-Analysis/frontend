import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Outlet } from 'react-router-dom'
import { DarkModeToggle } from '../dark-mode-toggle'
import NavItems from './nav-items'

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="relative flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <SidebarTrigger />
            <NavItems className="flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground" />
          </nav>
          <div className="ml-auto">
            <DarkModeToggle />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
