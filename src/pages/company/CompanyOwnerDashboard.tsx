import { useEffect, useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import api from '../../services/api';

interface DashboardStats {
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  users: {
    total: number;
    active: number;
    new: number;
  };
  transactions: {
    total: number;
    completed: number;
    pending: number;
  };
  profit: {
    margin: number;
    amount: number;
  };
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'critical';
  message: string;
  timestamp: string;
}

export default function CompanyOwnerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsData = await api.owner.getDashboardStats();
      const alertsData = { data: [] }; // Mock alerts for now
      setStats(statsData.data as DashboardStats);
      setAlerts(alertsData.data as Alert[]);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Owner Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Complete business overview and management</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-yellow-800">
                    {alerts.length} Alert{alerts.length > 1 ? 's' : ''} Require Attention
                  </h3>
                  <div className="mt-2 space-y-1">
                    {alerts.slice(0, 3).map((alert) => (
                      <p key={alert.id} className="text-sm text-yellow-700">
                        • {alert.message}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              {stats && (
                <span className={`flex items-center text-sm font-medium ${
                  stats.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stats.revenue.growth >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(stats.revenue.growth)}%
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-gray-600">Monthly Revenue</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              ${stats?.revenue.current.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Previous: ${stats?.revenue.previous.toLocaleString() || '0'}
            </p>
          </div>

          {/* Active Users Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600">
                +{stats?.users.new || 0} new
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats?.users.active.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total: {stats?.users.total.toLocaleString() || '0'}
            </p>
          </div>

          {/* Transactions Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-600">
                {stats?.transactions.pending || 0} pending
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Transactions</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats?.transactions.completed.toLocaleString() || '0'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Total: {stats?.transactions.total.toLocaleString() || '0'}
            </p>
          </div>

          {/* Profit Margin Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Profit Margin</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats?.profit.margin || 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Amount: ${stats?.profit.amount.toLocaleString() || '0'}
            </p>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Navigation Cards */}
          <DashboardCard
            title="Employee Performance"
            description="Track employee activity and productivity"
            icon={<Users className="h-6 w-6" />}
            link="/owner/employees"
            color="blue"
          />
          
          <DashboardCard
            title="Financial Management"
            description="Revenue, expenses, and P&L reports"
            icon={<DollarSign className="h-6 w-6" />}
            link="/owner/financial-management"
            color="green"
          />
          
          <DashboardCard
            title="Business Analytics"
            description="Advanced insights and predictions"
            icon={<TrendingUp className="h-6 w-6" />}
            link="/owner/analytics"
            color="purple"
          />
          
          <DashboardCard
            title="Merchant Management"
            description="Approve and manage all merchants"
            icon={<Building2 className="h-6 w-6" />}
            link="/owner/merchants"
            color="indigo"
          />
          
          <DashboardCard
            title="Security & Compliance"
            description="Audit logs and system monitoring"
            icon={<AlertCircle className="h-6 w-6" />}
            link="/owner/security"
            color="red"
          />
          
          <DashboardCard
            title="Company Settings"
            description="Manage profile, branding & subscriptions"
            icon={<Building2 className="h-6 w-6" />}
            link="/owner/settings"
            color="gray"
          />
        </div>
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  color: 'blue' | 'green' | 'purple' | 'indigo' | 'red' | 'gray';
}

function DashboardCard({ title, description, icon, link, color }: DashboardCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-200',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-200',
    indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
    red: 'bg-red-100 text-red-600 hover:bg-red-200',
    gray: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
  };

  return (
    <a
      href={link}
      className="block bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-indigo-600">
        View Details
        <ArrowUpRight className="h-4 w-4 ml-1" />
      </div>
    </a>
  );
}
