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
import { IconArrowLeft, IconCode, IconHome } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Home',
    url: '/home',
    icon: IconHome,
    tooltip: 'Home',
  },
  {
    title: 'My Projects',
    url: '/projects',
    icon: IconCode,
    tooltip: 'My Projects',
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
                      <a href={item.url || '#'}>
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
