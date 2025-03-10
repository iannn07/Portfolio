import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  IconArrowLeft,
  IconCode,
  IconHome,
  IconSchool,
} from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Gear 1 - Home',
    url: '/home',
    icon: IconHome,
    tooltip: 'Home',
  },
  {
    title: 'Gear 2 - Projects',
    url: '/projects',
    icon: IconCode,
    tooltip: 'My Projects',
  },
  {
    title: 'Gear 3 - Education',
    url: '/education',
    icon: IconSchool,
    tooltip: 'Education',
  },
  {
    title: 'Go back',
    icon: IconArrowLeft,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter((item) => !(!isMobile && item.title === 'Go back'))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => setOpenMobile(false)}
                      isActive={pathname === item.url}
                      tooltip={item.tooltip}
                    >
                      <a href={pathname === item.url ? '#' : item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
