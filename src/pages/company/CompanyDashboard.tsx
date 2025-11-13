import { useState, useEffect } from 'react';
import { Users, Activity, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CompanyStats {
  totalUsers: number;
  activeUsers: number;
  todayTransactions: number;
  transactionVolume: number;
  pendingReports: number;
  activeNotifications: number;
}

export default function CompanyDashboard() {
  const [stats, setStats] = useState<CompanyStats>({
    totalUsers: 0,
    activeUsers: 0,
    todayTransactions: 0,
    transactionVolume: 0,
    pendingReports: 0,
    activeNotifications: 0,
  });

  useEffect(() => {
    // TODO: Fetch company-specific stats from Firestore/Supabase
    // Filter by companyId from auth context
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Company Dashboard</h1>
        <p className="text-dark-300 mt-1">Welcome back! Here&apos;s your company overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Account Users</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                {stats.activeUsers} active
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Today's Transactions */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Today&apos;s Transactions</p>
              <h3 className="text-3xl font-bold text-white">{stats.todayTransactions}</h3>
              <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                <Activity className="w-4 h-4" />
                Live updates
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100 mb-1">Transaction Volume</p>
              <h3 className="text-3xl font-bold">₹{stats.transactionVolume.toLocaleString()}</h3>
              <p className="text-sm text-orange-100 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                This month
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Pending Reports */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Pending Reports</p>
              <h3 className="text-3xl font-bold text-orange-600">{stats.pendingReports}</h3>
              <p className="text-sm text-gray-500 mt-2">Needs review</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Active Notifications */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Active Notifications</p>
              <h3 className="text-3xl font-bold text-white">{stats.activeNotifications}</h3>
              <p className="text-sm text-gray-500 mt-2">Sent to users</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <Activity className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white cursor-pointer hover:shadow-xl transition-shadow">
          <div>
            <p className="text-sm text-blue-100 mb-1">Quick Actions</p>
            <h3 className="text-xl font-bold mb-2">Create New User</h3>
            <p className="text-sm text-blue-100">Add account users to your company</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {/* TODO: Map recent transactions */}
            <div className="text-center py-8 text-gray-500">
              No recent transactions
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-4">
            {/* TODO: Map recent reports */}
            <div className="text-center py-8 text-gray-500">
              No pending reports
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



