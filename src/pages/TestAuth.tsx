import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getCompanyByUserId } from '../services/company';
import { Company } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TestAuth() {
  const [user, setUser] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser({
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
        emailVerified: currentUser.emailVerified,
      });

      // Fetch company data
      getCompanyByUserId(currentUser.uid)
        .then(setCompany)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Authentication Test</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {/* User Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Information</h2>
              {user ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-600">No user is currently signed in.</p>
              )}
            </div>

            {/* Company Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h2>
              {company ? (
                <div className="bg-gray-50 p-4 rounded-md">
                  <pre className="text-sm overflow-auto">
                    {JSON.stringify(company, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-gray-600">No company data found for this user.</p>
              )}
            </div>

            {/* Firebase Config Status */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Firebase Status</h2>
              <div className="bg-gray-50 p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${user ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm">Authentication: {user ? 'Connected' : 'Not Connected'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${company !== null ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span className="text-sm">Firestore: {company !== null ? 'Data Available' : 'No Data'}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Refresh
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
