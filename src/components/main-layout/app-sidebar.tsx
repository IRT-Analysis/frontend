import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MenuItems } from '@/constants/menu-item'
import { LogOut, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { DarkModeToggle } from './dark-mode-toggle'
import { useState } from 'react'
import { Logo } from '../ui/logo'

export function AppSidebar() {
  const [activeLink, setActiveLink] =
    useState<(typeof MenuItems)[number]['value']>()
  return (
    <Sidebar>
      <SidebarHeader className="h-[64px] items-center justify-center rounded-none border-b border-sidebar-border pb-2">
        <Logo
          className="gap-2 px-0 pt-0 text-foreground"
          logoUrl="/logo-blue.png"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {MenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => {
                      if (isActive) setActiveLink(item.value)
                      return ''
                      // return 'flex items-center gap-4 rounded-lg px-4 py-2 transition-colors'
                    }}
                  >
                    <SidebarMenuButton
                      className="h-[48px] px-[16px] leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
                      asChild
                      isActive={activeLink === item.value}
                    >
                      <div>
                        <item.icon strokeWidth={3} />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavLink
          to="/settings"
          className={({ isActive }) => {
            if (isActive) setActiveLink('settings')
            return 'w-full'
          }}
        >
          <SidebarMenuButton
            className="h-[48px] px-[16px] leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
            asChild
            isActive={activeLink === 'settings'}
          >
            <div>
              <Settings />
              <span>Settings</span>
            </div>
          </SidebarMenuButton>
        </NavLink>
        <div className="flex items-center">
          <SidebarMenuButton
            className="h-[48px] px-[16px] leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
            asChild
          >
            <div>
              <LogOut />
              <span>Logout</span>
            </div>
          </SidebarMenuButton>
          <div>
            <DarkModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
