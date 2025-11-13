import { useState } from 'react';
import {
  Briefcase,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Users,
  Calendar,
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  department: string;
  manager: string;
  progress: number;
  budget: number;
  spent: number;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
  teamSize: number;
}

export default function ProjectMonitoring() {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      name: 'Mobile App v2.0',
      department: 'Technology',
      manager: 'Rahul Verma',
      progress: 75,
      budget: 500000,
      spent: 380000,
      deadline: '2025-12-31',
      status: 'on-track',
      teamSize: 8,
    },
    {
      id: '2',
      name: 'Marketing Campaign Q4',
      department: 'Marketing',
      manager: 'Sneha Gupta',
      progress: 45,
      budget: 300000,
      spent: 145000,
      deadline: '2025-11-30',
      status: 'at-risk',
      teamSize: 5,
    },
    {
      id: '3',
      name: 'Infrastructure Upgrade',
      department: 'Operations',
      manager: 'Vikram Singh',
      progress: 30,
      budget: 800000,
      spent: 520000,
      deadline: '2025-11-20',
      status: 'delayed',
      teamSize: 12,
    },
  ]);

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Project Monitoring</h1>
            <p className="text-gray-400">Track projects, budgets & deadlines</p>
          </div>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Create Project
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Briefcase className="w-8 h-8 text-primary-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Projects</h3>
            <p className="text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">On Track</h3>
            <p className="text-3xl font-bold text-white">
              {projects.filter(p => p.status === 'on-track').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <AlertCircle className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">At Risk</h3>
            <p className="text-3xl font-bold text-white">
              {projects.filter(p => p.status === 'at-risk' || p.status === 'delayed').length}
            </p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <DollarSign className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Total Budget</h3>
            <p className="text-3xl font-bold text-white">
              ₹{(projects.reduce((sum, p) => sum + p.budget, 0) / 100000).toFixed(1)}L
            </p>
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-dark-800 rounded-lg border border-dark-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{project.name}</h3>
                    {project.status === 'on-track' && (
                      <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">
                        On Track
                      </span>
                    )}
                    {project.status === 'at-risk' && (
                      <span className="px-2 py-1 bg-yellow-900/30 text-yellow-400 rounded text-xs">
                        At Risk
                      </span>
                    )}
                    {project.status === 'delayed' && (
                      <span className="px-2 py-1 bg-red-900/30 text-red-400 rounded text-xs">
                        Delayed
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">{project.department} Department</p>
                </div>
                <button className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">
                  Assign Manager
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Project Manager</p>
                  <p className="text-white font-medium">{project.manager}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Team Size</p>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-primary-400 mr-2" />
                    <p className="text-white font-medium">{project.teamSize} members</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Deadline</p>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                    <p className="text-white font-medium">{project.deadline}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Budget Status</p>
                  <p className="text-white font-medium">
                    ₹{project.spent.toLocaleString()} / ₹{project.budget.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      project.status === 'on-track' ? 'bg-green-500' :
                      project.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Budget Utilization</span>
                  <span className="text-white font-medium">
                    {Math.round((project.spent / project.budget) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-dark-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(project.spent / project.budget) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600">
                  View Details
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Update Progress
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Department Budget Allocation */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-8">
          <h2 className="text-xl font-bold text-white mb-4">Department Budget Allocation</h2>
          <div className="space-y-4">
            {[
              { dept: 'Technology', budget: 1200000, projects: 3 },
              { dept: 'Marketing', budget: 800000, projects: 2 },
              { dept: 'Operations', budget: 1000000, projects: 4 },
              { dept: 'HR', budget: 400000, projects: 1 },
            ].map((dept) => (
              <div key={dept.dept} className="bg-dark-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-medium">{dept.dept}</p>
                    <p className="text-sm text-gray-400">{dept.projects} active projects</p>
                  </div>
                  <p className="text-lg font-bold text-primary-400">
                    ₹{(dept.budget / 100000).toFixed(1)}L
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
