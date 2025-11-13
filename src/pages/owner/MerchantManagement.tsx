import { useState } from 'react';
import {
  Store,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Eye,
  Edit,
} from 'lucide-react';

interface Merchant {
  id: string;
  name: string;
  email: string;
  businessName: string;
  status: 'active' | 'pending' | 'rejected';
  revenue: number;
  transactions: number;
  contractEnd: string;
  joinedDate: string;
}

export default function MerchantManagement() {
  const [merchants] = useState<Merchant[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@store.com',
      businessName: 'Kumar Electronics',
      status: 'active',
      revenue: 245000,
      transactions: 1543,
      contractEnd: '2025-12-31',
      joinedDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@fashion.com',
      businessName: 'Fashion Hub',
      status: 'active',
      revenue: 189000,
      transactions: 892,
      contractEnd: '2025-09-30',
      joinedDate: '2024-03-20',
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit@grocery.com',
      businessName: 'Fresh Mart',
      status: 'pending',
      revenue: 0,
      transactions: 0,
      contractEnd: '-',
      joinedDate: '2025-11-10',
    },
  ]);

  const handleApprove = (id: string) => {
    alert(`Approving merchant ${id}...`);
  };

  const handleReject = (id: string) => {
    alert(`Rejecting merchant ${id}...`);
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Merchant Management</h1>
            <p className="text-gray-400">Manage merchants, approvals & revenue tracking</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Add Merchant
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Store className="w-8 h-8 text-primary-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Merchants</h3>
            <p className="text-3xl font-bold text-white">{merchants.length}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Active</h3>
            <p className="text-3xl font-bold text-white">
              {merchants.filter(m => m.status === 'active').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Clock className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Pending Approval</h3>
            <p className="text-3xl font-bold text-white">
              {merchants.filter(m => m.status === 'pending').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">
              ₹{merchants.reduce((sum, m) => sum + m.revenue, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Pending Approvals */}
        {merchants.filter(m => m.status === 'pending').length > 0 && (
          <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              <p className="text-yellow-400 font-medium">
                {merchants.filter(m => m.status === 'pending').length} merchant(s) pending approval
              </p>
            </div>
          </div>
        )}

        {/* Merchant List */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-dark-700">
            <h2 className="text-xl font-bold text-white">All Merchants</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Transactions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Contract End
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {merchants.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-dark-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{merchant.name}</p>
                        <p className="text-sm text-gray-400">{merchant.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{merchant.businessName}</td>
                    <td className="px-6 py-4">
                      {merchant.status === 'active' && (
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">
                          Active
                        </span>
                      )}
                      {merchant.status === 'pending' && (
                        <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs">
                          Pending
                        </span>
                      )}
                      {merchant.status === 'rejected' && (
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      ₹{merchant.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{merchant.transactions}</td>
                    <td className="px-6 py-4 text-gray-300">{merchant.contractEnd}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        {merchant.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => handleApprove(merchant.id)}
                              className="p-2 text-green-400 hover:bg-dark-700 rounded"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(merchant.id)}
                              className="p-2 text-red-400 hover:bg-dark-700 rounded"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="p-2 text-blue-400 hover:bg-dark-700 rounded" title="View">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-400 hover:bg-dark-700 rounded" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-yellow-400 hover:bg-dark-700 rounded" title="Contract">
                              <FileText className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
