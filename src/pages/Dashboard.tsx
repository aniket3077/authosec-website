import { useState, useEffect } from 'react';
import { Building, TrendingUp, Clock, CheckCircle, XCircle, DollarSign, Settings, QrCode, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { getCompanyByUserId } from '../services/company';
import { getDashboardStats, getCompanyTransactions } from '../services/supabase';
import { auth } from '../config/firebase';
import type { Company, Transaction, DashboardStats } from '../types';

export default function Dashboard() {
  const [company, setCompany] = useState<Company | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setError('Please log in to view your dashboard');
        setLoading(false);
        return;
      }

      // Load company data from Firestore
      try {
        const companyData = await getCompanyByUserId(user.uid);
        if (!companyData) {
          setError('Company profile not found. Please complete your registration or contact support.');
          setLoading(false);
          return;
        }
        setCompany(companyData);
      } catch (firestoreError: any) {
        console.error('Firestore error:', firestoreError);
        if (firestoreError.message?.includes('Firestore')) {
          setError('Database not configured. Please ensure Firestore is enabled in Firebase Console.');
        } else {
          setError('Failed to load company profile. Firestore might not be set up yet.');
        }
        setLoading(false);
        return;
      }

      // Load dashboard statistics from Supabase (optional - will show 0 if not set up)
      try {
        const statsData = await getDashboardStats(user.uid);
        setStats(statsData);

        const transactionsData = await getCompanyTransactions(user.uid);
        setTransactions(transactionsData.slice(0, 10));
      } catch (supabaseError: any) {
        console.warn('Supabase data unavailable:', supabaseError);
        // Set default stats if Supabase is not configured
        setStats({
          totalTransactions: 0,
          pendingTransactions: 0,
          acceptedTransactions: 0,
          rejectedTransactions: 0,
          totalAmount: 0,
        });
        setTransactions([]);
      }
    } catch (err: any) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-dark-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Alert type="error" title="Error" message={error || 'Company data not found'} />
          
          {error?.includes('Firestore') && (
            <div className="mt-6 bg-dark-800 rounded-xl p-6 border border-primary-500/30">
              <h3 className="text-lg font-bold text-white mb-4">🔧 Setup Required: Enable Firestore Database</h3>
              <p className="text-dark-300 mb-4">
                Your Firebase project needs Firestore to store company data. Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-dark-300 mb-4">
                <li>Go to <a href="https://console.firebase.google.com/project/authsec-dfeb9/firestore" target="_blank" rel="noopener" className="text-primary-400 underline">Firebase Console - Firestore</a></li>
                <li>Click &quot;Create database&quot;</li>
                <li>Choose &quot;Start in production mode&quot; → Click &quot;Next&quot;</li>
                <li>Select a location → Click &quot;Enable&quot;</li>
                <li>Wait 2 minutes, then refresh this page</li>
              </ol>
              <a
                href="https://console.firebase.google.com/project/authsec-dfeb9/firestore"
                target="_blank"
                rel="noopener"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Open Firebase Console
              </a>
            </div>
          )}

          {!error?.includes('Firestore') && (
            <div className="mt-6 bg-dark-800 rounded-xl p-6 border border-dark-700">
              <h3 className="text-lg font-bold text-white mb-4">Need Help?</h3>
              <p className="text-dark-300 mb-4">
                Your account exists but the company profile couldn&apos;t be loaded. This might be because:
              </p>
              <ul className="list-disc list-inside space-y-2 text-dark-300">
                <li>Firestore database is not enabled</li>
                <li>The registration process was interrupted</li>
                <li>Database permissions need to be configured</li>
              </ul>
              <p className="text-dark-300 mt-4">
                Check the setup guide in <code className="bg-dark-900 px-2 py-1 rounded">FIRESTORE_SETUP_URGENT.md</code>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Company Dashboard</h1>
            <p className="text-dark-300">Welcome back, {company.name}</p>
          </div>
          <Link
            to="/settings"
            className="flex items-center px-4 py-2 bg-dark-800 border border-dark-700 text-white rounded-lg hover:bg-dark-700 transition-colors"
          >
            <Settings size={18} className="mr-2" />
            Settings
          </Link>
        </div>

        {/* Company Info Card */}
        <div className="bg-dark-800 rounded-xl shadow-md p-6 mb-8 border border-dark-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 firebase-gradient rounded-lg flex items-center justify-center">
                <Building className="text-primary-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{company.name}</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div>
                    <span className="text-dark-500">Email:</span>{' '}
                    <span className="text-white font-medium">{company.email}</span>
                  </div>
                  <div>
                    <span className="text-dark-500">Business Type:</span>{' '}
                    <span className="text-white font-medium capitalize">{company.businessType}</span>
                  </div>
                  <div>
                    <span className="text-dark-500">Registration ID:</span>{' '}
                    <span className="text-white font-medium">{company.registrationId}</span>
                  </div>
                  <div>
                    <span className="text-dark-500">Contact:</span>{' '}
                    <span className="text-white font-medium">{company.contactNumber}</span>
                  </div>
                </div>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                company.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {company.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-dark-800 rounded-xl shadow-md p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-300 text-sm font-medium">Total Transactions</span>
                <TrendingUp className="text-primary-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">{stats.totalTransactions}</div>
              <p className="text-xs text-dark-500 mt-1">All time transactions</p>
            </div>

            <div className="bg-dark-800 rounded-xl shadow-md p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-300 text-sm font-medium">Pending</span>
                <Clock className="text-yellow-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingTransactions}</div>
              <p className="text-xs text-dark-500 mt-1">Awaiting approval</p>
            </div>

            <div className="bg-dark-800 rounded-xl shadow-md p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-300 text-sm font-medium">Accepted</span>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-green-600">{stats.acceptedTransactions}</div>
              <p className="text-xs text-dark-500 mt-1">Successfully completed</p>
            </div>

            <div className="bg-dark-800 rounded-xl shadow-md p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-dark-300 text-sm font-medium">Total Amount</span>
                <DollarSign className="text-primary-600" size={20} />
              </div>
              <div className="text-3xl font-bold text-white">
                ${stats.totalAmount.toLocaleString()}
              </div>
              <p className="text-xs text-dark-500 mt-1">Total transaction value</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/settings"
            className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group"
          >
            <Settings className="mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold mb-2">Company Settings</h3>
            <p className="text-white/90 text-sm">Update your company profile and preferences</p>
          </Link>

          <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group cursor-pointer">
            <QrCode className="mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold mb-2">Generate QR Code</h3>
            <p className="text-white/90 text-sm">Create secure payment QR codes instantly</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-500 rounded-xl p-6 text-white hover:shadow-lg transition-shadow group cursor-pointer">
            <Activity className="mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-xl font-bold mb-2">Transaction History</h3>
            <p className="text-white/90 text-sm">View all your payment transactions</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-dark-800 rounded-xl shadow-md border border-dark-700">
          <div className="p-6 border-b border-dark-700">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
          </div>
          <div className="p-6">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-dark-500">No transactions yet</p>
                <p className="text-sm text-dark-400 mt-2">
                  Use the mobile app to start making secure payments
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-white">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-white">
                        From / To
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-white">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-dark-100">
                        <td className="py-3 px-4 text-sm text-dark-300">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div className="font-medium text-white">
                              {transaction.senderId === company.id ? (
                                <>To: {transaction.receiverName}</>
                              ) : (
                                <>From: {transaction.senderName}</>
                              )}
                            </div>
                            {transaction.remarks && (
                              <div className="text-dark-500 text-xs">{transaction.remarks}</div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold text-white">
                          ${transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              transaction.status === 'accepted'
                                ? 'bg-green-100 text-green-800'
                                : transaction.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {transaction.status === 'accepted' && <CheckCircle size={12} className="mr-1" />}
                            {transaction.status === 'pending' && <Clock size={12} className="mr-1" />}
                            {transaction.status === 'rejected' && <XCircle size={12} className="mr-1" />}
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Mobile App CTA */}
        <div className="mt-8 bg-primary-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Make Secure Payments?</h3>
          <p className="mb-6">
            Download our mobile app to generate QR codes and start processing transactions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-dark-800 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Download for iOS
            </button>
            <button className="bg-dark-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-dark-800 transition-colors">
              Download for Android
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
