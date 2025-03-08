import { ChartBar, History, Home, ListOrdered, User, Users } from 'lucide-react'

export const MENU_ITEM = [
  {
    title: 'Trang chủ',
    url: '/',
    icon: Home,
    value: 'home',
    isVisible: true,
  },
  {
    title: 'Phân tích',
    url: '/analysis/:id',
    icon: ChartBar,
    value: 'analysis',
    isVisible: true,
    children: [
      {
        title: 'Thí sinh',
        url: '/students',
        icon: Users,
        value: 'students',
        isVisible: true,
      },
      {
        title: 'Câu hỏi',
        url: '/items',
        icon: ListOrdered,
        value: 'items',
        isVisible: true,
      },
    ],
  },
  {
    title: 'Lịch sử',
    url: '/history',
    icon: History,
    value: 'history',
    isVisible: true,
    comingSoon: true,
  },
  {
    title: 'Hướng dẫn',
    url: '/tutorial',
    icon: User,
    value: 'tutorial',
    isVisible: true,
    comingSoon: true,
  },
]

export enum Answers {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}
