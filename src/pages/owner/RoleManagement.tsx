import { useState } from 'react';
import {
  Users,
  Shield,
  Lock,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  permissions: {
    category: string;
    access: ('view' | 'create' | 'edit' | 'delete')[];
  }[];
}

export default function RoleManagement() {
  const [roles] = useState<Role[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access',
      usersCount: 2,
      permissions: [
        { category: 'Financial Data', access: ['view', 'create', 'edit', 'delete'] },
        { category: 'User Management', access: ['view', 'create', 'edit', 'delete'] },
        { category: 'System Settings', access: ['view', 'create', 'edit', 'delete'] },
      ],
    },
    {
      id: '2',
      name: 'Manager',
      description: 'Department management access',
      usersCount: 8,
      permissions: [
        { category: 'Financial Data', access: ['view'] },
        { category: 'User Management', access: ['view', 'edit'] },
        { category: 'System Settings', access: ['view'] },
      ],
    },
    {
      id: '3',
      name: 'Employee',
      description: 'Basic access',
      usersCount: 45,
      permissions: [
        { category: 'Financial Data', access: ['view'] },
        { category: 'User Management', access: ['view'] },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Role & Access Management</h1>
            <p className="text-gray-400">Create roles, define permissions & control access</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create New Role
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Shield className="w-8 h-8 text-primary-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Roles</h3>
            <p className="text-3xl font-bold text-white">{roles.length}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-white">
              {roles.reduce((sum, r) => sum + r.usersCount, 0)}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Lock className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Restricted Areas</h3>
            <p className="text-3xl font-bold text-white">12</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Active Permissions</h3>
            <p className="text-3xl font-bold text-white">48</p>
          </div>
        </div>

        {/* Roles List */}
        <div className="space-y-6">
          {roles.map((role) => (
            <div key={role.id} className="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{role.name}</h3>
                  <p className="text-gray-400 text-sm">{role.description}</p>
                  <p className="text-primary-400 text-sm mt-1">
                    {role.usersCount} user{role.usersCount !== 1 ? 's' : ''} assigned
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 text-blue-400 hover:bg-dark-700 rounded"
                    title="View"
                    aria-label={`View role ${role.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-green-400 hover:bg-dark-700 rounded"
                    title="Edit"
                    aria-label={`Edit role ${role.name}`}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 text-red-400 hover:bg-dark-700 rounded"
                    title="Delete"
                    aria-label={`Delete role ${role.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-dark-700 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Permissions</h4>
                <div className="space-y-3">
                  {role.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-300">{perm.category}</span>
                      <div className="flex space-x-2">
                        {['view', 'create', 'edit', 'delete'].map((action) => (
                          <span
                            key={action}
                            className={`px-2 py-1 rounded text-xs ${
                              perm.access.includes(action as any)
                                ? 'bg-green-900/30 text-green-400'
                                : 'bg-dark-800 text-gray-500'
                            }`}
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Permission Categories */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Available Permission Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Financial Data',
              'User Management',
              'System Settings',
              'Reports & Analytics',
              'Employee Data',
              'Merchant Management',
              'Transaction History',
              'Audit Logs',
              'Security Settings',
            ].map((category) => (
              <div key={category} className="bg-dark-700 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-primary-400 mr-2" />
                  <span className="text-gray-300">{category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Assignment */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick User Assignment</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-dark-700 rounded-lg p-4">
              <div>
                <p className="text-white font-medium">John Doe</p>
                <p className="text-sm text-gray-400">john@company.com</p>
              </div>
              <label htmlFor="john-role-select" className="sr-only">
                Assign role to John Doe
              </label>
              <select
                id="john-role-select"
                className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white"
                aria-label="Assign role to John Doe"
                defaultValue="Super Admin"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className="flex items-center justify-between bg-dark-700 rounded-lg p-4">
              <div>
                <p className="text-white font-medium">Jane Smith</p>
                <p className="text-sm text-gray-400">jane@company.com</p>
              </div>
              <label htmlFor="jane-role-select" className="sr-only">
                Assign role to Jane Smith
              </label>
              <select
                id="jane-role-select"
                className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white"
                aria-label="Assign role to Jane Smith"
                defaultValue="Employee"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
