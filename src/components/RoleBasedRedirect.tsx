import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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

/**
 * Role-based redirect component
 * Authenticates user, fetches profile with role, then redirects to appropriate dashboard
 */
export default function RoleBasedRedirect() {
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
      // First, sync user to database
      await api.users.syncUser({});
      
      // Then fetch full profile with role
      const response = await api.users.getProfile();
      
      if (response.success && response.data) {
        setProfile(response.data as UserProfile);
      } else {
        setError('Failed to load user profile');
      }
    } catch (err: any) {
      console.error('Profile load error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
        <LoadingSpinner size="lg" text="Checking authentication..." />
        <p className="text-gray-400 mt-4">Please wait while we verify your account</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error || 'Failed to load profile'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if user is active
  if (!profile.isActive) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark-900">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Account Suspended</h2>
          <p className="text-gray-400">
            Your account has been suspended. Please contact your administrator for assistance.
          </p>
        </div>
      </div>
    );
  }

  // Role-based redirection
  if (profile.role === 'SUPER_ADMIN') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (profile.role === 'COMPANY_ADMIN') {
    // Company admins are company owners with full dashboard access
    return <Navigate to="/owner/dashboard" replace />;
  }

  // ACCOUNT_USER gets basic user dashboard
  // Users with companyId but not COMPANY_ADMIN get company dashboard
  if (profile.companyId && profile.role === 'ACCOUNT_USER') {
    return <Navigate to="/company/dashboard" replace />;
  }

  // Default fallback to basic dashboard
  return <Navigate to="/dashboard" replace />;
}
