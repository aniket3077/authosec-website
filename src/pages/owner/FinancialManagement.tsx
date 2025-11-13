import { useState } from 'react';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  FileText,
  PieChart,
} from 'lucide-react';

interface FinancialData {
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  taxAmount: number;
}

export default function FinancialManagement() {
  const [period, setPeriod] = useState('month');
  const [data] = useState<FinancialData>({
    revenue: 125000,
    expenses: 82000,
    profit: 43000,
    profitMargin: 34.4,
    taxAmount: 7740,
  });

  const exportReport = (format: string) => {
    alert(`Exporting ${period} report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Financial Management</h1>
            <p className="text-gray-400">Complete revenue, expense & profit analysis</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => exportReport('pdf')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="bg-dark-800 rounded-lg p-4 mb-6 border border-dark-700">
          <div className="flex space-x-2">
            {['day', 'week', 'month', 'quarter', 'year'].map((p) => (
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

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-white">₹{data.revenue.toLocaleString()}</p>
            <p className="text-sm text-green-400 mt-2">+18.5% from last {period}</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-red-400" />
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Expenses</h3>
            <p className="text-3xl font-bold text-white">₹{data.expenses.toLocaleString()}</p>
            <p className="text-sm text-red-400 mt-2">+5.2% from last {period}</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary-400" />
              <PieChart className="w-5 h-5 text-primary-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Net Profit</h3>
            <p className="text-3xl font-bold text-white">₹{data.profit.toLocaleString()}</p>
            <p className="text-sm text-primary-400 mt-2">Margin: {data.profitMargin}%</p>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-yellow-400" />
              <Calendar className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Tax Amount</h3>
            <p className="text-3xl font-bold text-white">₹{data.taxAmount.toLocaleString()}</p>
            <p className="text-sm text-yellow-400 mt-2">18% GST applicable</p>
          </div>
        </div>

        {/* Detailed Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profit & Loss Statement */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Profit & Loss Statement</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-gray-400">Revenue</span>
                <span className="text-white font-medium">₹1,25,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-gray-400">Cost of Goods Sold</span>
                <span className="text-white font-medium">₹45,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-gray-400 font-semibold">Gross Profit</span>
                <span className="text-green-400 font-bold">₹80,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-gray-400">Operating Expenses</span>
                <span className="text-white font-medium">₹37,000</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark-700">
                <span className="text-gray-400 font-semibold">Net Profit</span>
                <span className="text-primary-400 font-bold">₹43,000</span>
              </div>
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
            <h2 className="text-xl font-bold text-white mb-4">Expense Breakdown</h2>
            <div className="space-y-4">
              {[
                { category: 'Salaries', amount: 35000, percent: 42.7 },
                { category: 'Infrastructure', amount: 18000, percent: 22.0 },
                { category: 'Marketing', amount: 12000, percent: 14.6 },
                { category: 'Operations', amount: 10000, percent: 12.2 },
                { category: 'Others', amount: 7000, percent: 8.5 },
              ].map((expense) => (
                <div key={expense.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{expense.category}</span>
                    <span className="text-white">₹{expense.amount.toLocaleString()} ({expense.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500"
                      style={{ width: `${expense.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Trends Graph Placeholder */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mt-6">
          <h2 className="text-xl font-bold text-white mb-4">Revenue Trends</h2>
          <div className="h-64 flex items-center justify-center bg-dark-700 rounded-lg">
            <p className="text-gray-400">Graph visualization will be rendered here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
