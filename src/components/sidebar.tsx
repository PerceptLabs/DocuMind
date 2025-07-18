"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, Upload, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/upload", icon: Upload, label: "Upload" },
  { href: "/chat", icon: MessageSquare, label: "Chat" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <FileText className="h-6 w-6" />
            <span>LedgerMind</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <ThemeToggle />
      </div>
    </aside>
  )
}