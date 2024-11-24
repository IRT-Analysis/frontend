import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { MenuItems } from '@/constants/menu-item'
import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../ui/collapsible'
import { Logo } from '../../ui/logo'
import { DarkModeToggle } from './dark-mode-toggle'

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
        <SidebarMenu className="gap-2">
          {MenuItems.map((item) =>
            item.children ? (
              <Collapsible key={item.title}>
                <SidebarGroup className="p-0">
                  <SidebarGroupLabel className="p-0 pr-3" asChild>
                    <CollapsibleTrigger>
                      <SidebarMenuItem className="flex-1">
                        <NavLink
                          to={item.url}
                          className={({ isActive }) => {
                            if (isActive) setActiveLink(item.value)
                            return ''
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
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      {item.children.map((subItem, index) => (
                        <SidebarMenuItem key={index} className="flex-1">
                          <NavLink
                            to={item.url + subItem.url}
                            className={({ isActive }) => {
                              if (isActive) setActiveLink(subItem.value)
                              return ''
                            }}
                          >
                            <SidebarMenuButton
                              className="h-[30px] px-[16px] pl-10 leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
                              asChild
                              isActive={activeLink === subItem.value}
                            >
                              <div>
                                <subItem.icon strokeWidth={3} />
                                <span>{subItem.title}</span>
                              </div>
                            </SidebarMenuButton>
                          </NavLink>
                        </SidebarMenuItem>
                      ))}
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) => {
                    if (isActive) setActiveLink(item.value)
                    return ''
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
            )
          )}
        </SidebarMenu>
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
