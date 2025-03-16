import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGlobal } from '@/context/global-context'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'

export const AvatarDropdown = () => {
  const {
    state: { user },
  } = useGlobal()
  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>BD</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <div className="flex flex-col items-start">
              <p className="text-sm font-bold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <ChevronDown className="text-[#94A3B8]" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuItem>Profile</DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button className="text-foreground" asChild>
      <Link to={'/signin'}>Đăng nhập</Link>
    </Button>
  )
}
