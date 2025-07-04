"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/admin/login")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  if (isAuthPage) return <>{children}</>

  return (
    <div className="admin-panel flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64">
        <Sidebar isOpen={true} onClose={() => {}} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <Sidebar isOpen={true} onClose={() => setMobileSidebarOpen(false)} />
        </SheetContent>

        {/* Main layout */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMobileMenuClick={() => setMobileSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </Sheet>
    </div>
  )
}
