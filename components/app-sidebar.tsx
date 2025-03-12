"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Calendar,
  ChevronDown,
  Home,
  LogOut,
  Settings,
  User,
  Users,
  BookOpen,
  BarChart3,
  Building,
  CheckSquare,
  MessageSquare,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type AppSidebarProps = {
  role: "admin" | "mentor" | "mentee" | "pc"
  userName: string
}

export function AppSidebar({ role, userName }: AppSidebarProps) {
  const pathname = usePathname()

  // Define navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        href: `/${role}/dashboard`,
        icon: Home,
      },
      {
        title: "Profile",
        href: `/${role}/profile`,
        icon: User,
      },
      {
        title: "Meetings",
        href: `/${role}/meetings`,
        icon: Calendar,
      },
    ]

    if (role === "admin") {
      return [
        ...baseItems,
        {
          title: "Mentors",
          href: "/admin/mentors",
          icon: Users,
        },
        {
          title: "Mentees",
          href: "/admin/mentees",
          icon: Users,
        },
        {
          title: "Allotment",
          href: "/admin/allotment",
          icon: CheckSquare,
        },
        {
          title: "Colleges",
          href: "/admin/colleges",
          icon: Building,
        },
        {
          title: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
        },
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Settings,
        },
      ]
    } else if (role === "mentor") {
      return [
        ...baseItems,
        {
          title: "My Mentees",
          href: "/mentor/mentees",
          icon: Users,
        },
        {
          title: "Availability",
          href: "/mentor/availability",
          icon: Calendar,
        },
        {
          title: "Feedback",
          href: "/mentor/feedback",
          icon: MessageSquare,
        },
      ]
    } else if (role === "pc") {
      return [
        ...baseItems,
        {
          title: "Mentees",
          href: "/pc/mentees",
          icon: Users,
        },
        {
          title: "Meetings",
          href: "/pc/meetings",
          icon: Calendar,
        },
        {
          title: "Analytics",
          href: "/pc/analytics",
          icon: BarChart3,
        },
      ]
    } else {
      // Mentee
      return [
        ...baseItems,
        {
          title: "My Mentors",
          href: "/mentee/mentors",
          icon: Users,
        },
        {
          title: "Book Session",
          href: "/mentee/book",
          icon: BookOpen,
        },
        {
          title: "Feedback",
          href: "/mentee/feedback",
          icon: MessageSquare,
        },
        {
          title: "Resources",
          href: "/mentee/resources",
          icon: BookOpen,
        },
      ]
    }
  }

  const navItems = getNavItems()

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <SidebarTrigger />
          <span className="font-semibold text-lg">Menter-Tgthr</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt={userName} />
                  <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                </Avatar>
                <span className="truncate">{userName}</span>
                <ChevronDown className="ml-auto h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuItem asChild>
                <Link href={`/${role}/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${role}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

