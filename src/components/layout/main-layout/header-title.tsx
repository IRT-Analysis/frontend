import { useSidebar } from '@/components/ui/sidebar'

const HeaderTitle = () => {
  const { active } = useSidebar()
  return (
    <h1 className="flex-shrink-0 text-2xl font-bold leading-[125%] text-foreground transition-colors">
      {active.title}
    </h1>
  )
}
export default HeaderTitle
