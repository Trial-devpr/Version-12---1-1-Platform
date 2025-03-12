"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Determine role from pathname
  let role: "admin" | "mentor" | "mentee" | "pc" = "mentee"
  if (pathname.startsWith("/admin")) {
    role = "admin"
  } else if (pathname.startsWith("/mentor")) {
    role = "mentor"
  } else if (pathname.startsWith("/pc")) {
    role = "pc"
  }

  // Mock user data - in a real app, this would come from authentication
  const userNames = {
    admin: "Sarah Williams",
    mentor: "Dr. Michael Chen",
    mentee: "Jessica Parker",
    pc: "Prof. Robert Wilson",
  }

  return (
    <div className="flex h-screen">
      <AppSidebar role={role} userName={userNames[role]} />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  )
}

