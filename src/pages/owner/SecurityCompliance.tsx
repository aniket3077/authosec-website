import { useState } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Database,
  Key,
  Eye,
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'suspicious';
}

export default function SecurityCompliance() {
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2025-11-13 14:32:15',
      user: 'admin@authosec.com',
      action: 'Login',
      resource: 'Admin Dashboard',
      ipAddress: '192.168.1.100',
      status: 'success',
    },
    {
      id: '2',
      timestamp: '2025-11-13 14:15:22',
      user: 'john@company.com',
      action: 'Delete Transaction',
      resource: 'Transaction #12345',
      ipAddress: '203.45.67.89',
      status: 'suspicious',
    },
    {
      id: '3',
      timestamp: '2025-11-13 13:45:10',
      user: 'unknown',
      action: 'Failed Login Attempt',
      resource: 'Admin Panel',
      ipAddress: '180.23.45.67',
      status: 'failed',
    },
  ]);

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Security & Compliance</h1>
            <p className="text-gray-400">Monitor security, audit logs & system health</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Generate Report
          </button>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Shield className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Security Status</h3>
            <p className="text-xl font-bold text-green-400">Secure</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Suspicious Activity</h3>
            <p className="text-3xl font-bold text-white">
              {auditLogs.filter(log => log.status === 'suspicious').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Activity className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Failed Logins</h3>
            <p className="text-3xl font-bold text-white">
              {auditLogs.filter(log => log.status === 'failed').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Database className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Last Backup</h3>
            <p className="text-lg font-bold text-white">2 hours ago</p>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <p className="text-yellow-400 font-medium mb-1">Security Alert</p>
              <p className="text-yellow-300 text-sm">
                Detected 3 suspicious activities in the last 24 hours. Review audit logs for details.
              </p>
            </div>
          </div>
        </div>

        {/* System Security Checklist */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">System Security Checklist</h2>
          <div className="space-y-3">
            {[
              { item: 'SSL Certificate', status: true, details: 'Valid until Dec 2026' },
              { item: 'Firebase Authentication', status: true, details: 'Active & Configured' },
              { item: 'Database Encryption', status: true, details: 'AES-256 Enabled' },
              { item: 'API Rate Limiting', status: true, details: '1000 req/hour' },
              { item: 'Two-Factor Authentication', status: false, details: 'Not Enabled' },
              { item: 'Automated Backups', status: true, details: 'Daily at 2:00 AM' },
            ].map((check, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-dark-700 rounded-lg p-4"
              >
                <div className="flex items-center">
                  {check.status ? (
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-3" />
                  )}
                  <div>
                    <p className="text-white font-medium">{check.item}</p>
                    <p className="text-sm text-gray-400">{check.details}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded text-xs ${
                    check.status
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-red-900/30 text-red-400'
                  }`}
                >
                  {check.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Encryption Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center mb-4">
              <Key className="w-6 h-6 text-primary-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Encryption Keys</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Database Encryption Key</p>
                <p className="text-white font-mono text-sm">****-****-****-****</p>
                <button className="mt-2 text-primary-400 text-sm hover:underline">
                  Rotate Key
                </button>
              </div>
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">API Encryption Key</p>
                <p className="text-white font-mono text-sm">****-****-****-****</p>
                <button className="mt-2 text-primary-400 text-sm hover:underline">
                  Rotate Key
                </button>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-blue-400 mr-2" />
              <h2 className="text-xl font-bold text-white">Backup Status</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-dark-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-400 text-sm">Last Successful Backup</p>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-white font-medium">Nov 13, 2025 - 02:00 AM</p>
                <p className="text-sm text-gray-400 mt-1">Size: 2.4 GB</p>
              </div>
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-gray-400 text-sm mb-1">Next Scheduled Backup</p>
                <p className="text-white font-medium">Nov 14, 2025 - 02:00 AM</p>
              </div>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Run Backup Now
              </button>
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-dark-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recent Audit Logs</h2>
            <button className="text-primary-400 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-dark-700/50">
                    <td className="px-6 py-4 text-gray-300 text-sm">{log.timestamp}</td>
                    <td className="px-6 py-4 text-gray-300">{log.user}</td>
                    <td className="px-6 py-4 text-gray-300">{log.action}</td>
                    <td className="px-6 py-4 text-gray-300">{log.resource}</td>
                    <td className="px-6 py-4 text-gray-300 font-mono text-sm">
                      {log.ipAddress}
                    </td>
                    <td className="px-6 py-4">
                      {log.status === 'success' && (
                        <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">
                          Success
                        </span>
                      )}
                      {log.status === 'failed' && (
                        <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">
                          Failed
                        </span>
                      )}
                      {log.status === 'suspicious' && (
                        <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs">
                          Suspicious
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-blue-400 hover:bg-dark-700 rounded" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
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
