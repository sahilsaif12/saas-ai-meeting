import { SidebarProvider } from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/modules/dashboard/ui/components/dashboard-sidebar'
import React from 'react'

interface Props {
  children: React.ReactNode
}
function layout({ children }: Props) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className='flex flex-col bg-muted h-screen'>
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout