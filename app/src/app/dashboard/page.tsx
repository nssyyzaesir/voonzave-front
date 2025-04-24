"use client"

import React from 'react'
import { 
  LucideUsers, 
  LucideShoppingCart, 
  LucideDollarSign, 
  LucideActivity,
  LucideArrowUpRight,
  LucideArrowDownRight
} from 'lucide-react'

// Componente de estatística
interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: {
    value: string | number
    isPositive: boolean
  }
  bgColor?: string
}

const StatCard = ({ title, value, icon, change, bgColor = 'bg-white dark:bg-gray-800' }: StatCardProps) => (
  <div className={`${bgColor} rounded-xl shadow-sm p-6`}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</h3>
        {change && (
          <div className="flex items-center mt-2">
            {change.isPositive ? (
              <LucideArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <LucideArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={change.isPositive ? 'text-green-500' : 'text-red-500'}>
              {change.value}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
        {icon}
      </div>
    </div>
  </div>
)

// Componente de tabela recente
interface RecentActivityProps {
  activities: {
    id: string
    user: string
    action: string
    timestamp: string
  }[]
}

const RecentActivity = ({ activities }: RecentActivityProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{activity.user}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{activity.action}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{activity.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default function DashboardPage() {
  // Dados de amostra
  const stats = [
    {
      title: "Total Users",
      value: "24,521",
      icon: <LucideUsers className="h-6 w-6 text-blue-500" />,
      change: { value: "12% vs last month", isPositive: true }
    },
    {
      title: "New Orders",
      value: "1,245",
      icon: <LucideShoppingCart className="h-6 w-6 text-blue-500" />,
      change: { value: "5% vs last month", isPositive: true }
    },
    {
      title: "Revenue",
      value: "$84,254",
      icon: <LucideDollarSign className="h-6 w-6 text-blue-500" />,
      change: { value: "8% vs last month", isPositive: true }
    },
    {
      title: "Active Sessions",
      value: "384",
      icon: <LucideActivity className="h-6 w-6 text-blue-500" />,
      change: { value: "3% vs last month", isPositive: false }
    }
  ]

  const recentActivities = [
    { id: "1", user: "John Doe", action: "Created a new account", timestamp: "5 min ago" },
    { id: "2", user: "Maria Silva", action: "Updated product details", timestamp: "1 hour ago" },
    { id: "3", user: "Alex Johnson", action: "Completed order #12345", timestamp: "2 hours ago" },
    { id: "4", user: "Sarah Williams", action: "Cancelled subscription", timestamp: "5 hours ago" },
    { id: "5", user: "Mike Taylor", action: "Submitted a support ticket", timestamp: "8 hours ago" }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity activities={recentActivities} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left font-medium">
              View Reports
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left font-medium">
              Manage Users
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left font-medium">
              System Settings
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-left font-medium">
              Update Database
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}