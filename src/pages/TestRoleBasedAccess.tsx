import { useState, useEffect } from 'react';
import { onAuthChange, User } from '../services/auth';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

interface UserProfile {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'ACCOUNT_USER';
  companyId: string | null;
  isActive: boolean;
}

export default function TestRoleBasedAccess() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      if (authUser) {
        loadUserProfile();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await api.users.getProfile();
      if (response.success && response.data) {
        const data = response.data as { user: UserProfile };
        setProfile(data.user);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading user profile..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Role-Based Access Test</h1>
        
        {!user ? (
          <div className="bg-dark-800 rounded-lg p-8 text-center">
            <p className="text-gray-400 mb-4">You are not authenticated</p>
            <p className="text-sm text-gray-500">
              Please sign in to see your role-based access information
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6">
            <p className="text-red-400">{error}</p>
          </div>
        ) : profile ? (
          <div className="space-y-6">
            <div className="bg-dark-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{profile.email || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-white">
                    {profile.firstName} {profile.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-white">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profile.role === 'SUPER_ADMIN' 
                        ? 'bg-purple-900 text-purple-200' 
                        : profile.role === 'COMPANY_ADMIN' 
                          ? 'bg-blue-900 text-blue-200' 
                          : 'bg-green-900 text-green-200'
                    }`}>
                      {profile.role.replace('_', ' ')}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <p className="text-white">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      profile.isActive 
                        ? 'bg-green-900 text-green-200' 
                        : 'bg-red-900 text-red-200'
                    }`}>
                      {profile.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-dark-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Access Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Dashboard Access</p>
                    <p className="text-sm text-gray-400">
                      {profile.role === 'SUPER_ADMIN' 
                        ? 'Admin Panel' 
                        : profile.role === 'COMPANY_ADMIN' 
                          ? 'Company Dashboard' 
                          : 'User Dashboard'}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    profile.isActive 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-red-900 text-red-200'
                  }`}>
                    {profile.isActive ? 'Granted' : 'Denied'}
                  </div>
                </div>

                {profile.role === 'SUPER_ADMIN' && (
                  <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <p className="font-medium text-purple-200">Admin Privileges</p>
                    <p className="text-sm text-purple-300 mt-1">
                      Full system access including all companies and users
                    </p>
                  </div>
                )}

                {profile.role === 'COMPANY_ADMIN' && (
                  <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="font-medium text-blue-200">Company Admin Privileges</p>
                    <p className="text-sm text-blue-300 mt-1">
                      Manage users and settings for your company
                    </p>
                  </div>
                )}

                {profile.role === 'ACCOUNT_USER' && (
                  <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <p className="font-medium text-green-200">User Privileges</p>
                    <p className="text-sm text-green-300 mt-1">
                      Access to personal dashboard and transactions
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-dark-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Next Steps</h2>
              <p className="text-gray-400 mb-4">
                Based on your role, you will be automatically redirected to the appropriate dashboard:
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>SUPER_ADMIN:</strong> Redirected to Admin Panel (/admin/dashboard)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>COMPANY_ADMIN:</strong> Redirected to Company Dashboard (/company/dashboard)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>
                    <strong>ACCOUNT_USER:</strong> Redirected to User Dashboard (/dashboard)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-dark-800 rounded-lg p-8 text-center">
            <p className="text-gray-400">No profile data available</p>
          </div>
        )}
      </div>
    </div>
  );
}
