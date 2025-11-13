import { useState } from 'react';
import {
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  AlertTriangle,
  Users,
  FileText,
} from 'lucide-react';

interface Approval {
  id: string;
  type: 'payment' | 'refund' | 'merchant' | 'leave' | 'system';
  title: string;
  description: string;
  requester: string;
  amount?: number;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApprovalsNotifications() {
  const [approvals, setApprovals] = useState<Approval[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Large Payment Request',
      description: 'Payment to vendor for infrastructure upgrade',
      requester: 'Vikram Singh',
      amount: 250000,
      timestamp: '2025-11-13 14:30',
      priority: 'high',
      status: 'pending',
    },
    {
      id: '2',
      type: 'refund',
      title: 'Customer Refund',
      description: 'Refund request for order #TXN-12345',
      requester: 'Customer Support',
      amount: 5500,
      timestamp: '2025-11-13 13:15',
      priority: 'medium',
      status: 'pending',
    },
    {
      id: '3',
      type: 'merchant',
      title: 'Merchant Onboarding',
      description: 'New merchant application: Fresh Mart',
      requester: 'Amit Patel',
      timestamp: '2025-11-13 11:00',
      priority: 'medium',
      status: 'pending',
    },
    {
      id: '4',
      type: 'leave',
      title: 'Leave Request',
      description: '5 days leave request',
      requester: 'John Doe',
      timestamp: '2025-11-13 09:30',
      priority: 'low',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => 
      a.id === id ? { ...a, status: 'approved' as const } : a
    ));
    alert('Approved successfully!');
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(a => 
      a.id === id ? { ...a, status: 'rejected' as const } : a
    ));
    alert('Rejected successfully!');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return <DollarSign className="w-5 h-5" />;
      case 'refund': return <DollarSign className="w-5 h-5" />;
      case 'merchant': return <Users className="w-5 h-5" />;
      case 'leave': return <FileText className="w-5 h-5" />;
      case 'system': return <AlertTriangle className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const pendingCount = approvals.filter(a => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Notifications & Approvals</h1>
            <p className="text-gray-400">Review and approve pending requests</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-dark-800 px-4 py-2 rounded-lg border border-dark-700">
              <span className="text-gray-400 text-sm">Pending: </span>
              <span className="text-white font-bold">{pendingCount}</span>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Mark All Read
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Clock className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Pending</h3>
            <p className="text-3xl font-bold text-white">{pendingCount}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Approved Today</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <XCircle className="w-8 h-8 text-red-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Rejected Today</h3>
            <p className="text-3xl font-bold text-white">3</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <AlertTriangle className="w-8 h-8 text-orange-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">High Priority</h3>
            <p className="text-3xl font-bold text-white">
              {approvals.filter(a => a.priority === 'high' && a.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* High Priority Alert */}
        {approvals.filter(a => a.priority === 'high' && a.status === 'pending').length > 0 && (
          <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-400 font-medium">
                {approvals.filter(a => a.priority === 'high' && a.status === 'pending').length} high priority item(s) require immediate attention!
              </p>
            </div>
          </div>
        )}

        {/* Approvals List */}
        <div className="space-y-4">
          {approvals.map((approval) => (
            <div
              key={approval.id}
              className={`bg-dark-800 rounded-lg border p-6 ${
                approval.priority === 'high' ? 'border-red-600' :
                approval.priority === 'medium' ? 'border-yellow-600' :
                'border-dark-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      approval.type === 'payment' ? 'bg-blue-900/30 text-blue-400' :
                      approval.type === 'refund' ? 'bg-green-900/30 text-green-400' :
                      approval.type === 'merchant' ? 'bg-purple-900/30 text-purple-400' :
                      approval.type === 'leave' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {getIcon(approval.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{approval.title}</h3>
                      <p className="text-sm text-gray-400">Requested by {approval.requester}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      approval.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                      approval.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {approval.priority.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-3">{approval.description}</p>

                  <div className="flex items-center space-x-6 text-sm">
                    {approval.amount && (
                      <div>
                        <span className="text-gray-400">Amount: </span>
                        <span className="text-white font-bold">₹{approval.amount.toLocaleString()}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-400">Time: </span>
                      <span className="text-gray-300">{approval.timestamp}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Type: </span>
                      <span className="text-gray-300 capitalize">{approval.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 ml-4">
                  {approval.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove(approval.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(approval.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-4 py-2 rounded-lg text-center ${
                      approval.status === 'approved' ? 'bg-green-900/30 text-green-400' :
                      'bg-red-900/30 text-red-400'
                    }`}>
                      {approval.status === 'approved' ? 'Approved' : 'Rejected'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
