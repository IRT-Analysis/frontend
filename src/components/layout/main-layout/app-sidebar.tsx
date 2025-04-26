import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
  useSidebar,
} from '@/components/ui/sidebar'
import { MENU_ITEM } from '@/constants'
import { ChevronDown, LogOut } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Logo } from '@/components/ui/logo'
import { useGlobal } from '@/context/global-context'
import { DarkModeToggle } from './dark-mode-toggle'
import { AnalyzeType } from '@/types/ctt-analysis.type'
import { useSignOutMutation } from '@/queries/useAuth'
import { Button } from '@/components/ui/button'

type Params = {
  projectId: string
  analysisType: AnalyzeType
}

export function AppSidebar() {
  const { projectId: projectIdParam, analysisType } = useParams<Params>()
  const {
    state: { analysis },
    dispatch,
  } = useGlobal()

  const navigate = useNavigate()

  const { active, setActive } = useSidebar()
  const signOutMutation = useSignOutMutation()

  useEffect(() => {
    if (projectIdParam && !analysis?.projectId && analysisType) {
      dispatch({
        type: 'ANALYZE',
        payload: {
          ...analysis,
          projectId: projectIdParam,
          type: analysisType,
        },
      })
    }
  }, [projectIdParam, analysis, analysisType, dispatch])

  const projectId = analysis?.projectId || projectIdParam

  const signOutHandler = () => {
    if (signOutMutation.isPending) return
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        toast('Đăng xuất thành công!')
        dispatch({ type: 'SIGN_OUT' })
        navigate('/signin')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

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
              !projectId ? null : (
                <Collapsible key={item.title}>
                  <SidebarGroup className="p-0">
                    <SidebarGroupLabel className="p-0 pr-3" asChild>
                      <SidebarMenuItem className="flex-1">
                        <NavLink
                          to={
                            item.url.includes(':projectId')
                              ? item.url
                                  .replace(
                                    ':analysisType',
                                    analysisType || analysis?.type || ''
                                  )
                                  .replace(':projectId', projectId || '')
                              : item.url
                          }
                          className={({ isActive }) => {
                            if (isActive) setActive(item)
                            return 'w-full'
                          }}
                        >
                          <SidebarMenuButton
                            className="flex h-[48px] px-[16px] font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
                            asChild
                            isActive={active.value === item.value}
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
                                item.url.includes(':projectId')
                                  ? item.url
                                      .replace(
                                        ':analysisType',
                                        analysisType || analysis?.type || ''
                                      )
                                      .replace(':projectId', projectId || '') +
                                    subItem.url
                                  : item.url + subItem.url
                              }
                              className={({ isActive }) => {
                                if (isActive) setActive(subItem)
                                return ''
                              }}
                            >
                              <SidebarMenuButton
                                className="h-[40px] px-[16px] pl-10 font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
                                asChild
                                isActive={active.value === subItem.value}
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
                  to={
                    item.url.includes(':projectId')
                      ? item.url
                          .replace(
                            ':analysisType',
                            analysisType || analysis?.type || ''
                          )
                          .replace(':projectId', projectId || '')
                      : item.url
                  }
                  className={({ isActive }) => {
                    if (isActive) setActive(item)
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
                    isActive={active.value === item.value}
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
        <div className="flex items-center">
          <SidebarMenuButton
            className="h-[48px] px-[16px] font-semibold leading-[160%] text-[#64748B] hover:text-[#64748B] active:text-primary-600-base data-[active=true]:font-bold data-[active=true]:text-primary-600-base"
            asChild
          >
            <Button onClick={signOutHandler}>
              <LogOut />
              <span>Đăng xuất</span>
            </Button>
          </SidebarMenuButton>
          <div>
            <DarkModeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
