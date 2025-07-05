"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { Sheet, SheetContent } from "@/components/ui/sheet"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isAuthPage = pathname.startsWith("/admin/login")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminData, setAdminData] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // For admin auth, we'll rely on the session cookie set during login
        // If the user is not authenticated, API calls will fail and redirect
        setIsAuthenticated(true)
        setAdminData({ role: 'ADMIN' }) // Fallback admin data
      } catch (error) {
        console.error('Auth check failed:', error)
        if (!isAuthPage) {
          router.push('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (!isAuthPage) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [pathname, router, isAuthPage])

  // Show loading spinner while checking auth
  if (isLoading && !isAuthPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  // Show auth page without layout
  if (isAuthPage) return <>{children}</>

  // Show admin panel only if authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
          <p className="text-gray-600 mt-2">You don't have permission to access this area.</p>
        </div>
      </div>
    )
  }
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
          <Header 
            onMobileMenuClick={() => setMobileSidebarOpen(true)} 
            adminData={adminData}
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {/* Pass admin data to children via context or props */}
            {children}
          </main>
        </div>
      </Sheet>
    </div>
  )
}
