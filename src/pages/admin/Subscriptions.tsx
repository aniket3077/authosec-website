import { useState, useEffect } from 'react';
import { CreditCard, Calendar, DollarSign, TrendingUp, Check, X } from 'lucide-react';

interface Subscription {
  id: string;
  companyId: string;
  companyName: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'expired' | 'cancelled';
  startDate: string;
  endDate: string;
  amount: number;
  autoRenew: boolean;
}

export default function Subscriptions() {
  const [subscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    // TODO: Fetch subscriptions from Supabase
  }, []);

  const planColors = {
    free: 'bg-gray-100 text-gray-700',
    basic: 'bg-green-100 text-green-700',
    pro: 'bg-blue-100 text-blue-700',
    enterprise: 'bg-purple-100 text-purple-700',
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700',
    expired: 'bg-red-100 text-red-700',
    cancelled: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
        <p className="text-dark-300 mt-1">Manage company subscription plans</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Active</div>
          <div className="text-3xl font-bold text-green-400">
            {subscriptions.filter(s => s.status === 'active').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Expired</div>
          <div className="text-3xl font-bold text-red-600">
            {subscriptions.filter(s => s.status === 'expired').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Monthly Revenue</div>
          <div className="text-2xl font-bold text-white">
            ₹{subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.amount, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="text-sm text-orange-100 mb-1">Growth</div>
          <div className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            +12%
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Company</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Plan</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Start Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">End Date</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Auto Renew</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{sub.companyName}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${planColors[sub.plan]}`}>
                    <CreditCard className="w-3 h-3" />
                    {sub.plan.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[sub.status]}`}>
                    {sub.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(sub.startDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(sub.endDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    ₹{sub.amount.toLocaleString()}
                  </div>
                </td>
                <td className="py-4 px-6">
                  {sub.autoRenew ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <X className="w-5 h-5 text-gray-400" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {subscriptions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No subscriptions found
          </div>
        )}
      </div>
    </div>
  );
}





