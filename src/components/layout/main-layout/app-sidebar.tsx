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
import { MENU_ITEM } from '@/constants'
import { ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { toast } from 'sonner'

import { Logo } from '@/components/ui/logo'
import { DarkModeToggle } from './dark-mode-toggle'
import { useApp } from '@/components/context-provider'

export function AppSidebar() {
  const { id } = useParams()
  const { hasCreatedAnalysis } = useApp()

  const [activeLink, setActiveLink] =
    useState<(typeof MENU_ITEM)[number]['value']>()
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
          {MENU_ITEM.map((item) =>
            item.children ? (
              !hasCreatedAnalysis ? null : (
                <Collapsible key={item.title}>
                  <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="p-0 pr-3" asChild>
                      <SidebarMenuItem className="flex-1">
                        <NavLink
                          to={item.url.replace(':id', id || '')}
                          className={({ isActive }) => {
                            if (isActive) setActiveLink(item.value)
                            return 'w-full'
                          }}
                        >
                          <SidebarMenuButton
                            className="flex h-[48px] px-[16px] font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
                            asChild
                            isActive={activeLink === item.value}
                          >
                            <div>
                              <item.icon strokeWidth={3} />
                              <span>{item.title}</span>
                              {item.children && (
                                <CollapsibleTrigger asChild>
                                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                              )}
                            </div>
                          </SidebarMenuButton>
                        </NavLink>
                      </SidebarMenuItem>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent className="flex flex-col gap-1">
                        {item.children.map((subItem, index) => (
                          <SidebarMenuItem key={index} className="flex-1">
                            <NavLink
                              to={
                                item.url.replace(':id', id || '') + subItem.url
                              }
                              className={({ isActive }) => {
                                if (isActive) setActiveLink(subItem.value)
                                return ''
                              }}
                            >
                              <SidebarMenuButton
                                className="h-[40px] px-[16px] pl-10 font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
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
              )
            ) : (
              <SidebarMenuItem key={item.title}>
                <NavLink
                  to={item.url.replace(':id', id || '')}
                  className={({ isActive }) => {
                    if (isActive) setActiveLink(item.value)
                    return ''
                  }}
                  onClick={(e) => {
                    if (item.comingSoon) {
                      e.preventDefault()
                      toast('Tính năng sắp ra mắt!')
                    }
                  }}
                >
                  <SidebarMenuButton
                    className="h-[48px] px-[16px] font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
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
        {/* <NavLink
          to="/settings"
          className={({ isActive }) => {
            if (isActive) setActiveLink('settings')
            return 'w-full'
          }}
        >
          <SidebarMenuButton
            className="h-[48px] px-[16px] leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold font-semibold data-[active=true]:text-primary-600-base"
            asChild
            isActive={activeLink === 'settings'}
          >
            <div>
              <Settings />
              <span>Settings</span>
            </div>
          </SidebarMenuButton>
        </NavLink> */}
        <div className="flex items-center">
          <SidebarMenuButton
            className="h-[48px] px-[16px] font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
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
