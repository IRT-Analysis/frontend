import { ChartBar, History, Home, User } from 'lucide-react'

export const MenuItems = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
    value: 'home',
  },
  {
    title: 'Phân tích',
    url: '/analysis',
    icon: ChartBar,
    value: 'analysis',
  },
  {
    title: 'Lịch sử',
    url: '/history',
    icon: History,
    value: 'history',
  },
  {
    title: 'Hướng dẫn',
    url: '/tutorial',
    icon: User,
    value: 'tutorial',
  },
  //   {
  //     title: 'Settings',
  //     url: '/settings',
  //     icon: Settings,
  //   },
]
