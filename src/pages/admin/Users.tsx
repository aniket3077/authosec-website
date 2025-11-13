import { useState, useEffect } from 'react';
import { User, Mail, Phone, Building2, Shield, Search } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'company_admin' | 'account_user';
  companyId: string;
  companyName: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  useEffect(() => {
    // TODO: Fetch all users from Firestore
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">All Users</h1>
          <p className="text-dark-300 mt-1">Manage company admins and account users</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Total Users</div>
          <div className="text-3xl font-bold text-white">{users.length}</div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Company Admins</div>
          <div className="text-3xl font-bold text-blue-400">
            {users.filter(u => u.role === 'company_admin').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Account Users</div>
          <div className="text-3xl font-bold text-purple-400">
            {users.filter(u => u.role === 'account_user').length}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-white placeholder-dark-400"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 text-white"
            aria-label="Filter by role"
          >
            <option value="all">All Roles</option>
            <option value="company_admin">Company Admins</option>
            <option value="account_user">Account Users</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900 border-b border-dark-700">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">User</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Role</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Company</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Last Login</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-dark-700/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full firebase-gradient flex items-center justify-center text-dark-900 font-semibold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-dark-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit border ${
                    user.role === 'company_admin' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    <Shield className="w-3 h-3" />
                    {user.role === 'company_admin' ? 'Company Admin' : 'Account User'}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 text-sm text-dark-300">
                    <Building2 className="w-4 h-4 text-dark-400" />
                    {user.companyName}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    user.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-dark-700 text-dark-300 border-dark-600'
                  }`}>
                    {user.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-dark-400">
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-dark-400">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
