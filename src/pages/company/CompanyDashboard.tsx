import { useState, useEffect } from 'react';
import { Users, Activity, DollarSign, TrendingUp, ArrowUpRight, Bell, FileText } from 'lucide-react';
import { onAuthChange, User } from '../../services/auth';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { Link } from 'react-router-dom';

interface DashboardData {
  company: {
    id: string;
    name: string;
    subscriptionTier: string;
    isActive: boolean;
  };
  users: {
    total: number;
    active: number;
    inactive: number;
    newThisMonth: number;
    byRole: { role: string; count: number }[];
  };
  transactions: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    today: number;
    totalAmount: number;
    byStatus: { status: string; count: number }[];
  };
  recentTransactions: any[];
  recentActivities: any[];
  notifications: {
    unread: number;
  };
}

export default function CompanyDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      if (authUser) {
        loadDashboard();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.company.getDashboard();
      if (response.success && response.data) {
        setData(response.data as DashboardData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!user || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Please log in to view dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{data.company.name}</h1>
        <p className="text-dark-300 mt-1">Company Dashboard - {data.company.subscriptionTier} Plan</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Account Users</p>
              <h3 className="text-3xl font-bold text-white">{data.users.total}</h3>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                {data.users.active} active
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
              <h3 className="text-3xl font-bold text-white">{data.transactions.today}</h3>
              <p className="text-sm text-blue-600 mt-2 flex items-center gap-1">
                <Activity className="w-4 h-4" />
                {data.transactions.pending} pending
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Transaction Volume */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-100 mb-1">Total Volume</p>
              <h3 className="text-3xl font-bold">₹{Number(data.transactions.totalAmount).toLocaleString()}</h3>
              <p className="text-sm text-primary-100 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {data.transactions.completed} completed
              </p>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Total Transactions</p>
              <h3 className="text-3xl font-bold text-white">{data.transactions.total}</h3>
              <p className="text-sm text-gray-500 mt-2">{data.transactions.failed} failed</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-dark-300 mb-1">Notifications</p>
              <h3 className="text-3xl font-bold text-white">{data.notifications.unread}</h3>
              <p className="text-sm text-gray-500 mt-2">Unread</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <Bell className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <Link 
          to="/company/users"
          className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div>
            <p className="text-sm text-blue-100 mb-1">Quick Actions</p>
            <h3 className="text-xl font-bold mb-2">Manage Users</h3>
            <p className="text-sm text-blue-100">Add or edit account users</p>
          </div>
        </Link>
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



