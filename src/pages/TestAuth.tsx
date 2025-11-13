import { useState, useEffect } from 'react';
import { onAuthChange } from '../services/auth';
import type { User } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TestAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Firebase Authentication Test</h1>
        
        <div className="bg-dark-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium">Status:</span>{' '}
              {user ? (
                <span className="text-green-400">Authenticated ✓</span>
              ) : (
                <span className="text-yellow-400">Not Authenticated</span>
              )}
            </p>
          </div>
        </div>

        {user && (
          <div className="bg-dark-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">User Data</h2>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="font-medium">User ID:</span> {user.uid}
              </p>
              <p className="text-gray-300">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              {user.displayName && (
                <p className="text-gray-300">
                  <span className="font-medium">Display Name:</span> {user.displayName}
                </p>
              )}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!user && (
          <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-400">
              Please sign in to test authentication
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
