"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Importar ícones necessários
import { 
  LucideHome, 
  LucideLayoutDashboard, 
  LucideBell, 
  LucideUsers, 
  LucideSettings, 
  LucideLogOut,
  LucideMenu,
  LucideX,
  LucideMoon,
  LucideSun
} from "lucide-react"
import { useTheme } from 'next-themes'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LucideLayoutDashboard },
    { name: 'Users', href: '/dashboard/users', icon: LucideUsers },
    { name: 'Notifications', href: '/dashboard/notifications', icon: LucideBell },
    { name: 'Settings', href: '/dashboard/settings', icon: LucideSettings },
  ]

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Voonzave</span>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
                    `}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-col px-2 space-y-1 mt-auto">
            <button
              onClick={toggleTheme}
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <><LucideSun className="mr-3 h-5 w-5" /> Light Mode</>
              ) : (
                <><LucideMoon className="mr-3 h-5 w-5" /> Dark Mode</>
              )}
            </button>
            <Link
              href="/auth/logout"
              className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <LucideLogOut className="mr-3 h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <div className={`
        md:hidden fixed inset-0 flex z-40 transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={toggleSidebar}
        />
        <div className={`
          fixed inset-y-0 left-0 flex flex-col w-full max-w-xs bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between px-4 pt-5 pb-4">
            <span className="text-xl font-bold text-gray-900 dark:text-white">Voonzave</span>
            <button
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close sidebar</span>
              <LucideX className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-base font-medium rounded-md
                      ${pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'}
                    `}
                    onClick={toggleSidebar}
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-col px-2 space-y-1">
            <button
              onClick={() => {
                toggleTheme()
                toggleSidebar()
              }}
              className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <><LucideSun className="mr-3 h-6 w-6" /> Light Mode</>
              ) : (
                <><LucideMoon className="mr-3 h-6 w-6" /> Dark Mode</>
              )}
            </button>
            <Link
              href="/auth/logout"
              className="flex items-center px-2 py-2 text-base font-medium text-gray-600 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <LucideLogOut className="mr-3 h-6 w-6" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <header className="sticky top-0 z-10 md:hidden flex items-center justify-between h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">Voonzave</span>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <LucideMenu className="h-6 w-6" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
}