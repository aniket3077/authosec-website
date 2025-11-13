import { useState } from 'react';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart3,
  Activity,
  Zap,
  QrCode,
} from 'lucide-react';

export default function BusinessAnalytics() {
  const [period, setPeriod] = useState('month');

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Business Analytics</h1>
            <p className="text-gray-400">Revenue growth, trends & predictive analytics</p>
          </div>
          <div className="flex space-x-2">
            {['week', 'month', 'quarter', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-lg capitalize ${
                  period === p ? 'bg-primary-600 text-white' : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Revenue Growth</h3>
            <p className="text-3xl font-bold text-white">+28.5%</p>
            <p className="text-sm text-green-400 mt-2">↑ vs last {period}</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">User Growth</h3>
            <p className="text-3xl font-bold text-white">+15.2%</p>
            <p className="text-sm text-blue-400 mt-2">+342 new users</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <ShoppingCart className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">Avg Transaction</h3>
            <p className="text-3xl font-bold text-white">₹2,450</p>
            <p className="text-sm text-purple-400 mt-2">+8.3% increase</p>
          </div>
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <QrCode className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-gray-400 text-sm mb-1">QR Scans</h3>
            <p className="text-3xl font-bold text-white">12,543</p>
            <p className="text-sm text-yellow-400 mt-2">This {period}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Revenue Trend</h2>
              <BarChart3 className="w-5 h-5 text-primary-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-dark-700 rounded-lg">
              <p className="text-gray-400">Revenue trend chart</p>
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">User Growth</h2>
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-dark-700 rounded-lg">
              <p className="text-gray-400">User growth chart</p>
            </div>
          </div>
        </div>

        {/* Customer Behavior */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Customer Behavior Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Peak Transaction Hours</h3>
              <p className="text-2xl font-bold text-white">2 PM - 6 PM</p>
              <p className="text-sm text-green-400 mt-2">65% of daily transactions</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Avg Customer Lifetime</h3>
              <p className="text-2xl font-bold text-white">8.5 months</p>
              <p className="text-sm text-blue-400 mt-2">Retention rate: 78%</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Most Used Feature</h3>
              <p className="text-2xl font-bold text-white">QR Payments</p>
              <p className="text-sm text-purple-400 mt-2">82% user preference</p>
            </div>
          </div>
        </div>

        {/* Predictive Analytics */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex items-center mb-4">
            <Zap className="w-6 h-6 text-yellow-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Predictive Analytics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Expected Revenue (Next Month)</h3>
              <p className="text-3xl font-bold text-white">₹1,45,000</p>
              <p className="text-sm text-green-400 mt-2">Based on current trends +16% growth</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <h3 className="text-gray-400 text-sm mb-2">Projected User Base (3 Months)</h3>
              <p className="text-3xl font-bold text-white">3,200 users</p>
              <p className="text-sm text-blue-400 mt-2">Growth trajectory: +42%</p>
            </div>
          </div>
        </div>

        {/* QR Scan Analytics */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">QR Scan Analytics</h2>
          <div className="space-y-4">
            {[
              { location: 'Store A - Downtown', scans: 2543, revenue: 125000 },
              { location: 'Store B - Mall', scans: 1892, revenue: 98000 },
              { location: 'Store C - Airport', scans: 1654, revenue: 87500 },
              { location: 'Mobile App', scans: 6454, revenue: 312000 },
            ].map((item) => (
              <div key={item.location} className="flex items-center justify-between bg-dark-700 rounded-lg p-4">
                <div>
                  <p className="text-white font-medium">{item.location}</p>
                  <p className="text-sm text-gray-400">{item.scans.toLocaleString()} scans</p>
                </div>
                <p className="text-lg font-bold text-primary-400">₹{item.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
