import { useState } from 'react';
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  Eye,
  Edit,
  UserX,
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  productivity: number;
  status: 'active' | 'idle' | 'offline';
  loginTime: string;
  tasksCompleted: number;
  totalTasks: number;
}

export default function EmployeePerformance() {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Manager',
      department: 'Sales',
      productivity: 92,
      status: 'active',
      loginTime: '09:00 AM',
      tasksCompleted: 45,
      totalTasks: 50,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'Developer',
      department: 'Tech',
      productivity: 88,
      status: 'active',
      loginTime: '08:45 AM',
      tasksCompleted: 38,
      totalTasks: 42,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'Support',
      department: 'Customer Service',
      productivity: 75,
      status: 'idle',
      loginTime: '09:30 AM',
      tasksCompleted: 28,
      totalTasks: 40,
    },
  ]);

  const downloadReport = () => {
    alert('Downloading performance report...');
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Employee Performance</h1>
            <p className="text-gray-400">Monitor and track employee productivity & activity</p>
          </div>
          <button
            onClick={downloadReport}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Users className="w-8 h-8 text-primary-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Employees</h3>
            <p className="text-3xl font-bold text-white">{employees.length}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Active Now</h3>
            <p className="text-3xl font-bold text-white">
              {employees.filter(e => e.status === 'active').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Avg Productivity</h3>
            <p className="text-3xl font-bold text-white">
              {Math.round(employees.reduce((sum, e) => sum + e.productivity, 0) / employees.length)}%
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Clock className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">On Leave</h3>
            <p className="text-3xl font-bold text-white">2</p>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-dark-700">
            <h2 className="text-xl font-bold text-white">All Employees</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Login Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Productivity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-700">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-dark-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{emp.name}</p>
                        <p className="text-sm text-gray-400">{emp.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{emp.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          emp.status === 'active' ? 'bg-green-400' :
                          emp.status === 'idle' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`} />
                        <span className="text-gray-300 capitalize">{emp.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{emp.loginTime}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-dark-600 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500"
                            style={{ width: `${emp.productivity}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-300">{emp.productivity}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300">
                        {emp.tasksCompleted}/{emp.totalTasks}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 text-blue-400 hover:bg-dark-700 rounded"
                          aria-label={`View details for ${emp.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-green-400 hover:bg-dark-700 rounded"
                          aria-label={`Edit ${emp.name}`}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-400 hover:bg-dark-700 rounded"
                          aria-label={`Remove ${emp.name}`}
                        >
                          <UserX className="w-4 h-4" />
                        </button>
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
