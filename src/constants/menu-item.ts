import { ChartBar, History, Home, ListOrdered, Users } from 'lucide-react'

export const MenuItems = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
    value: 'home',
  },
  {
    title: 'Phân tích',
    url: '/analysis/:id',
    icon: ChartBar,
    value: 'analysis',
    children: [
      {
        title: 'Thí sinh',
        url: '/students',
        icon: Users,
        value: 'students',
      },
      {
        title: 'Câu hỏi',
        url: '/items',
        icon: ListOrdered,
        value: 'items',
      },
    ],
  },
  {
    title: 'Lịch sử',
    url: '/history',
    icon: History,
    value: 'history',
  },
  // {
  //   title: 'Hướng dẫn',
  //   url: '/tutorial',
  //   icon: User,
  //   value: 'tutorial',
  // },
]
