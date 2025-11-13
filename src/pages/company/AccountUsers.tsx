import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Shield, Mail, Phone } from 'lucide-react';

interface AccountUser {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

export default function AccountUsers() {
  const [users, setUsers] = useState<AccountUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // TODO: Fetch company's account users from Firestore
    // Filter by companyId from auth context
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Account Users</h1>
          <p className="text-dark-300 mt-1">Manage your company&apos;s account users</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Account User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-white">{users.length}</div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Active Users</div>
          <div className="text-3xl font-bold text-green-400">
            {users.filter(u => u.status === 'active').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Inactive Users</div>
          <div className="text-3xl font-bold text-gray-500">
            {users.filter(u => u.status === 'inactive').length}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">User</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Employee ID</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Department</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Last Login</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Shield className="w-4 h-4 text-gray-400" />
                    {user.employeeId}
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-700">{user.department}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    <button
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      title="Edit user"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No account users found</div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Add your first account user
            </button>
          </div>
        )}
      </div>
    </div>
  );
}



