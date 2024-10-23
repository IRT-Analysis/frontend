'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Link } from 'react-router-dom'

const menuItems: {
  title: string
  href: string
}[] = [
  {
    title: 'Trang chủ',
    href: '/',
  },
  {
    title: 'Menu',
    href: '/guest/menu',
  },
  {
    title: 'Đăng nhập',
    href: '/login',
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
  },
]

export default function NavItems({ className }: { className?: string }) {
  return (
    <AlertDialog>
      <>
        {menuItems.map((item) => (
          <Link to={item.href} key={item.href} className={className}>
            {item.title}
          </Link>
        ))}
      </>
      <AlertDialogTrigger asChild>
        <button>Đăng xuất</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc là mình muốn đăng xuất?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Đơn hàng sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {}}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
