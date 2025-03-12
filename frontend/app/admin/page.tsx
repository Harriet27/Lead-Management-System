import { Metadata } from 'next'
import AdminDashboard from '../../components/admin-dashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Lead Management System',
  description: 'Admin dashboard for managing leads',
}

export default function AdminPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Lead Management Dashboard</h1>
        <AdminDashboard />
      </div>
    </main>
  )
}

