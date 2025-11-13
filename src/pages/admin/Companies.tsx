import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Settings } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  subscriptionPlan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  totalUsers: number;
}

export default function Companies() {
  const [companies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [, setShowCreateModal] = useState(false);

  useEffect(() => {
    // TODO: Fetch companies from Firestore
    // const unsubscribe = onSnapshot(
    //   query(collection(db, 'companies'), orderBy('createdAt', 'desc')),
    //   (snapshot) => setCompanies(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    // );
    // return () => unsubscribe();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Companies</h1>
          <p className="text-dark-300 mt-1">Manage all registered companies</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 firebase-gradient text-dark-900 px-6 py-3 rounded-lg hover:opacity-90 transition-all shadow-lg font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Company
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Total Companies</div>
          <div className="text-3xl font-bold text-white">{companies.length}</div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Active</div>
          <div className="text-3xl font-bold text-green-400">
            {companies.filter(c => c.status === 'active').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Inactive</div>
          <div className="text-3xl font-bold text-dark-400">
            {companies.filter(c => c.status === 'inactive').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Suspended</div>
          <div className="text-3xl font-bold text-red-400">
            {companies.filter(c => c.status === 'suspended').length}
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
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-dark-400"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-dark-900 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-dark-800 rounded-xl shadow-lg border border-dark-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-dark-900 border-b border-dark-700">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Company</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Contact</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Plan</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Users</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-dark-300">Created</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-dark-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-dark-700/50 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-medium text-white">{company.name}</div>
                  <div className="text-sm text-dark-400">{company.email}</div>
                </td>
                <td className="py-4 px-6 text-sm text-dark-300">{company.contactNumber}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    company.subscriptionPlan === 'enterprise' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    company.subscriptionPlan === 'pro' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    company.subscriptionPlan === 'basic' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    'bg-dark-700 text-dark-300 border border-dark-600'
                  }`}>
                    {company.subscriptionPlan.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-dark-300">{company.totalUsers}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    company.status === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                    company.status === 'suspended' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    'bg-dark-700 text-dark-300 border border-dark-600'
                  }`}>
                    {company.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-dark-400">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  <div className="flex justify-end gap-2">
                    <button 
                      className="p-2 text-dark-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-500/20"
                      aria-label="View company details"
                      title="View company details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-dark-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-colors border border-transparent hover:border-primary-500/20"
                      aria-label="Edit company"
                      title="Edit company"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-dark-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-colors border border-transparent hover:border-green-500/20"
                      aria-label="Company settings"
                      title="Company settings"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-dark-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                      aria-label="Delete company"
                      title="Delete company"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-dark-400 mb-2">No companies found</div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="text-primary-400 hover:text-primary-300 font-medium"
            >
              Add your first company
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
