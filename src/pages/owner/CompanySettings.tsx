import { useState } from 'react';
import {
  Building,
  Palette,
  CreditCard,
  Key,
  Mail,
  Save,
  Upload,
} from 'lucide-react';

export default function CompanySettings() {
  const [companyData, setCompanyData] = useState({
    name: 'AuthoSec Technologies',
    email: 'contact@authosec.com',
    phone: '+91 9876543210',
    address: '123 Tech Park, Bangalore, India',
    website: 'https://authosec.com',
    logo: '',
    primaryColor: '#f97316',
    secondaryColor: '#1f2937',
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-dark-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Company Settings</h1>
            <p className="text-gray-400">Manage company profile, branding & integrations</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>

        {/* Company Profile */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <div className="flex items-center mb-4">
            <Building className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Company Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company-name" className="block text-gray-400 text-sm mb-2">Company Name</label>
              <input
                id="company-name"
                type="text"
                value={companyData.name}
                onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="company-email" className="block text-gray-400 text-sm mb-2">Email</label>
              <input
                id="company-email"
                type="email"
                value={companyData.email}
                onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="company-phone" className="block text-gray-400 text-sm mb-2">Phone</label>
              <input
                id="company-phone"
                type="tel"
                value={companyData.phone}
                onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="company-website" className="block text-gray-400 text-sm mb-2">Website</label>
              <input
                id="company-website"
                type="url"
                value={companyData.website}
                onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="company-address" className="block text-gray-400 text-sm mb-2">Address</label>
              <textarea
                id="company-address"
                value={companyData.address}
                onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Branding</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Company Logo</label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-dark-700 rounded-lg flex items-center justify-center border border-dark-600">
                  {companyData.logo ? (
                    <img src={companyData.logo} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Building className="w-12 h-12 text-gray-600" />
                  )}
                </div>
                <button className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="primary-color-picker" className="block text-gray-400 text-sm mb-2">Primary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    id="primary-color-picker"
                    type="color"
                    value={companyData.primaryColor}
                    onChange={(e) => setCompanyData({ ...companyData, primaryColor: e.target.value })}
                    className="w-12 h-12 bg-dark-700 border border-dark-600 rounded-lg cursor-pointer"
                    aria-label="Select primary brand color"
                  />
                  <label htmlFor="primary-color-value" className="sr-only">
                    Primary color value
                  </label>
                  <input
                    id="primary-color-value"
                    type="text"
                    value={companyData.primaryColor}
                    onChange={(e) => setCompanyData({ ...companyData, primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="secondary-color-picker" className="block text-gray-400 text-sm mb-2">Secondary Color</label>
                <div className="flex items-center space-x-3">
                  <input
                    id="secondary-color-picker"
                    type="color"
                    value={companyData.secondaryColor}
                    onChange={(e) => setCompanyData({ ...companyData, secondaryColor: e.target.value })}
                    className="w-12 h-12 bg-dark-700 border border-dark-600 rounded-lg cursor-pointer"
                    aria-label="Select secondary brand color"
                  />
                  <label htmlFor="secondary-color-value" className="sr-only">
                    Secondary color value
                  </label>
                  <input
                    id="secondary-color-value"
                    type="text"
                    value={companyData.secondaryColor}
                    onChange={(e) => setCompanyData({ ...companyData, secondaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Subscription & Billing</h2>
          </div>
          <div className="bg-dark-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Current Plan: Enterprise</p>
                <p className="text-sm text-gray-400">Next billing date: Dec 13, 2025</p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                Upgrade Plan
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-700 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Monthly Cost</p>
              <p className="text-2xl font-bold text-white">₹9,999</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Users Limit</p>
              <p className="text-2xl font-bold text-white">Unlimited</p>
            </div>
            <div className="bg-dark-700 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">API Calls</p>
              <p className="text-2xl font-bold text-white">100K/day</p>
            </div>
          </div>
        </div>

        {/* Payment Gateway Keys */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700 mb-6">
          <div className="flex items-center mb-4">
            <Key className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Payment Gateway API Keys</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="razorpay-key-id" className="block text-gray-400 text-sm mb-2">Razorpay Key ID</label>
              <input
                id="razorpay-key-id"
                type="text"
                placeholder="rzp_live_xxxxxxxxxxxx"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label htmlFor="razorpay-secret-key" className="block text-gray-400 text-sm mb-2">Razorpay Secret Key</label>
              <input
                id="razorpay-secret-key"
                type="password"
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Email & SMS Service Keys */}
        <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex items-center mb-4">
            <Mail className="w-6 h-6 text-primary-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Email & SMS Service Keys</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="sendgrid-api-key" className="block text-gray-400 text-sm mb-2">SendGrid API Key</label>
              <input
                id="sendgrid-api-key"
                type="password"
                placeholder="SG.xxxxxxxxxxxx"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label htmlFor="twilio-account-sid" className="block text-gray-400 text-sm mb-2">Twilio Account SID</label>
              <input
                id="twilio-account-sid"
                type="text"
                placeholder="ACxxxxxxxxxxxx"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label htmlFor="twilio-auth-token" className="block text-gray-400 text-sm mb-2">Twilio Auth Token</label>
              <input
                id="twilio-auth-token"
                type="password"
                placeholder="••••••••••••••••"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
            <div>
              <label htmlFor="twilio-phone-number" className="block text-gray-400 text-sm mb-2">Twilio Phone Number</label>
              <input
                id="twilio-phone-number"
                type="tel"
                placeholder="+1234567890"
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
