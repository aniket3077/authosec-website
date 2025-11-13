import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Building2, CreditCard, TrendingUp, Activity, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';

interface DashboardStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  activeSubscriptions: number;
  monthlyRevenue: number;
  pendingFeedback: number;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats] = useState<DashboardStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    pendingFeedback: 0,
  });

  useEffect(() => {
    // TODO: Fetch dashboard stats from Firestore
    // const fetchStats = async () => {
    //   const companiesSnapshot = await getDocs(collection(db, 'companies'));
    //   const usersSnapshot = await getDocs(collection(db, 'account_users'));
    //   setStats({...});
    // };
    // fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-dark-300 mt-1">Welcome back! Here&apos;s your system overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Companies */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Total Companies</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalCompanies}</h3>
              <p className="text-sm text-green-400 mt-2">
                {stats.activeCompanies} active
              </p>
            </div>
            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <Building2 className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
              <p className="text-sm text-dark-400 mt-2">
                Account users
              </p>
            </div>
            <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Active Subscriptions</p>
              <h3 className="text-3xl font-bold text-white">{stats.activeSubscriptions}</h3>
              <p className="text-sm text-green-400 mt-2">
                Paid plans
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 rounded-xl shadow-xl border border-primary-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-100 mb-1">Monthly Revenue</p>
              <h3 className="text-3xl font-bold text-white">₹{stats.monthlyRevenue.toLocaleString()}</h3>
              <p className="text-sm text-primary-100 mt-2">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                This month
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Pending Feedback */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Pending Feedback</p>
              <h3 className="text-3xl font-bold text-white">{stats.pendingFeedback}</h3>
              <p className="text-sm text-primary-400 mt-2">
                Needs attention
              </p>
            </div>
            <div className="bg-primary-500/10 p-4 rounded-lg border border-primary-500/20">
              <Activity className="w-8 h-8 text-primary-400" />
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">System Status</p>
              <h3 className="text-xl font-bold text-green-400">All Systems Operational</h3>
              <p className="text-sm text-dark-400 mt-2">
                99.9% uptime
              </p>
            </div>
            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions / Feature Cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Management Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Companies Management */}
          <button
            onClick={() => navigate('/admin/companies')}
            className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Companies</h3>
            <p className="text-sm text-dark-300">Manage all registered companies</p>
          </button>

          {/* Users Management */}
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Users</h3>
            <p className="text-sm text-dark-300">View and manage all users</p>
          </button>

          {/* Subscriptions */}
          <button
            onClick={() => navigate('/admin/subscriptions')}
            className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <CreditCard className="w-6 h-6 text-green-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Subscriptions</h3>
            <p className="text-sm text-dark-300">Manage subscription plans</p>
          </button>

          {/* Feedback */}
          <button
            onClick={() => navigate('/admin/feedback')}
            className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:border-primary-500 transition-all text-left group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="bg-primary-500/10 p-3 rounded-lg border border-primary-500/20">
                <MessageSquare className="w-6 h-6 text-primary-400" />
              </div>
              <ArrowRight className="w-5 h-5 text-dark-500 group-hover:text-primary-400 transition-colors" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">Feedback</h3>
            <p className="text-sm text-dark-300">Review user feedback</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Companies */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Companies</h3>
          <div className="space-y-4">
            {/* TODO: Map recent companies */}
            <div className="text-center py-8 text-dark-400">
              No recent companies
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            {/* TODO: Map recent feedback */}
            <div className="text-center py-8 text-dark-400">
              No pending feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
