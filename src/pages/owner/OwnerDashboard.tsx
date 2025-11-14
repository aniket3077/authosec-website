import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  TrendingUp,
  Users,
  CreditCard,
  DollarSign,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Shield,
  UserCog,
  Settings,
  Bell,
  Building,
} from 'lucide-react';

interface DashboardStats {
  revenue: number;
  revenueGrowth: number;
  users: number;
  usersGrowth: number;
  transactions: number;
  transactionsGrowth: number;
  profitMargin: number;
  profitGrowth: number;
}

interface StatCardProps {
  title: string;
  value: string;
  growth: number;
  icon: React.ReactNode;
  iconColor: string;
}

function StatCard({ title, value, growth, icon, iconColor }: StatCardProps) {
  return (
    <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${iconColor}`}>{icon}</div>
        {growth >= 0 ? (
          <span className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {growth}%
          </span>
        ) : (
          <span className="flex items-center text-red-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />
            {Math.abs(growth)}%
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    revenueGrowth: 0,
    users: 0,
    usersGrowth: 0,
    transactions: 0,
    transactionsGrowth: 0,
    profitMargin: 0,
    profitGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await api.owner.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data as DashboardStats);
      } else {
        setError('Failed to load dashboard statistics');
      }
    } catch (err: any) {
      console.error('Dashboard stats error:', err);
      setError(err.message || 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadDashboardStats}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Company Owner Dashboard</h1>
          <p className="text-gray-400">Complete business overview and management</p>
        </div>

        {/* Alert Banner */}
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
            <p className="text-yellow-400 font-medium">
              5 pending approvals require your attention
            </p>
            <button
              onClick={() => navigate('/owner/approvals')}
              className="ml-auto px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
            >
              Review Now
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${stats.revenue.toLocaleString()}`}
            growth={stats.revenueGrowth}
            icon={<DollarSign className="w-6 h-6" />}
            iconColor="bg-green-900/30 text-green-400"
          />
          <StatCard
            title="Total Users"
            value={stats.users.toLocaleString()}
            growth={stats.usersGrowth}
            icon={<Users className="w-6 h-6" />}
            iconColor="bg-blue-900/30 text-blue-400"
          />
          <StatCard
            title="Transactions"
            value={stats.transactions.toLocaleString()}
            growth={stats.transactionsGrowth}
            icon={<CreditCard className="w-6 h-6" />}
            iconColor="bg-purple-900/30 text-purple-400"
          />
          <StatCard
            title="Profit Margin"
            value={`${stats.profitMargin}%`}
            growth={stats.profitGrowth}
            icon={<TrendingUp className="w-6 h-6" />}
            iconColor="bg-primary-900/30 text-primary-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Financial Overview */}
          <div className="lg:col-span-2 bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Financial Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Revenue</span>
                <span className="text-white font-bold">₹1,25,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Expenses</span>
                <span className="text-white font-bold">₹82,000</span>
              </div>
              <div className="flex items-center justify-between border-t border-dark-700 pt-4">
                <span className="text-gray-400 font-semibold">Net Profit</span>
                <span className="text-green-400 font-bold text-lg">₹43,000</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/owner/financial-management')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <BarChart3 className="w-5 h-5 mr-3 text-primary-400" />
                Financial Reports
              </button>
              <button
                onClick={() => navigate('/owner/employees')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <Users className="w-5 h-5 mr-3 text-blue-400" />
                Employee Management
              </button>
              <button
                onClick={() => navigate('/owner/analytics')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <TrendingUp className="w-5 h-5 mr-3 text-green-400" />
                Business Analytics
              </button>
              <button
                onClick={() => navigate('/owner/merchants')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <Building className="w-5 h-5 mr-3 text-purple-400" />
                Merchant Management
              </button>
              <button
                onClick={() => navigate('/owner/projects')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <FileText className="w-5 h-5 mr-3 text-yellow-400" />
                Project Monitoring
              </button>
              <button
                onClick={() => navigate('/owner/security')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <Shield className="w-5 h-5 mr-3 text-red-400" />
                Security & Compliance
              </button>
              <button
                onClick={() => navigate('/owner/roles')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <UserCog className="w-5 h-5 mr-3 text-cyan-400" />
                Role Management
              </button>
              <button
                onClick={() => navigate('/owner/approvals')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <Bell className="w-5 h-5 mr-3 text-orange-400" />
                Approvals & Notifications
              </button>
              <button
                onClick={() => navigate('/owner/settings')}
                className="w-full px-4 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 flex items-center"
              >
                <Settings className="w-5 h-5 mr-3 text-gray-400" />
                Company Settings
              </button>
            </div>
          </div>
        </div>

        {/* Employee Performance & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Top Performers</h2>
            <div className="space-y-3">
              {[
                { name: 'John Doe', role: 'Sales Manager', productivity: 95 },
                { name: 'Jane Smith', role: 'Developer', productivity: 92 },
                { name: 'Mike Johnson', role: 'Support Lead', productivity: 88 },
              ].map((emp) => (
                <div key={emp.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{emp.name}</p>
                    <p className="text-sm text-gray-400">{emp.role}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden mr-3">
                      <div
                        className="h-full bg-primary-500"
                        style={{ width: `${emp.productivity}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-300">{emp.productivity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {[
                { id: 'TXN-001', amount: 5500, status: 'completed', time: '2 mins ago' },
                { id: 'TXN-002', amount: 12000, status: 'pending', time: '15 mins ago' },
                { id: 'TXN-003', amount: 3200, status: 'completed', time: '1 hour ago' },
              ].map((txn) => (
                <div key={txn.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{txn.id}</p>
                    <p className="text-sm text-gray-400">{txn.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">₹{txn.amount.toLocaleString()}</p>
                    {txn.status === 'completed' ? (
                      <span className="text-xs text-green-400 flex items-center justify-end">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs text-yellow-400 flex items-center justify-end">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <h2 className="text-xl font-bold text-white mb-4">Pending Approvals</h2>
          <div className="space-y-3">
            {[
              { type: 'Payment', desc: 'Large payment request - ₹2,50,000', priority: 'high' },
              { type: 'Merchant', desc: 'New merchant onboarding - Fresh Mart', priority: 'medium' },
              { type: 'Refund', desc: 'Customer refund request - ₹5,500', priority: 'low' },
            ].map((approval, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-dark-700 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-3 ${
                      approval.priority === 'high'
                        ? 'bg-red-400'
                        : approval.priority === 'medium'
                        ? 'bg-yellow-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <div>
                    <p className="text-white font-medium">{approval.type}</p>
                    <p className="text-sm text-gray-400">{approval.desc}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
