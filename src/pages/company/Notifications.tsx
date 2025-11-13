import { useState } from 'react';
import { Send, Bell, Users, CheckCircle } from 'lucide-react';

interface Notification {
  title: string;
  message: string;
  targetUsers: 'all' | 'active' | 'specific';
  userIds?: string[];
}

export default function Notifications() {
  const [notification, setNotification] = useState<Notification>({
    title: '',
    message: '',
    targetUsers: 'all',
    userIds: [],
  });

  const handleSend = async () => {
    // TODO: Send notification to users via Supabase
    console.log('Sending notification:', notification);
    
    // Reset form
    setNotification({
      title: '',
      message: '',
      targetUsers: 'all',
      userIds: [],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Send Notifications</h1>
        <p className="text-dark-300 mt-1">Notify your account users about important updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notification Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-600" />
            Create Notification
          </h3>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Title
              </label>
              <input
                type="text"
                value={notification.title}
                onChange={(e) => setNotification({ ...notification, title: e.target.value })}
                placeholder="Enter notification title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                value={notification.message}
                onChange={(e) => setNotification({ ...notification, message: e.target.value })}
                rows={6}
                placeholder="Enter your message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Target Users */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Send To
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="targetUsers"
                    value="all"
                    checked={notification.targetUsers === 'all'}
                    onChange={(e) => setNotification({ ...notification, targetUsers: e.target.value as 'all' })}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">All Users</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="targetUsers"
                    value="active"
                    checked={notification.targetUsers === 'active'}
                    onChange={(e) => setNotification({ ...notification, targetUsers: e.target.value as 'active' })}
                    className="w-4 h-4 text-orange-600 focus:ring-orange-500"
                  />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Active Users Only</span>
                </label>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={!notification.title || !notification.message}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              Send Notification
            </button>
          </div>
        </div>

        {/* Preview & Stats */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Preview</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-semibold text-gray-900 mb-2">
                {notification.title || 'Notification Title'}
              </div>
              <div className="text-sm text-gray-600">
                {notification.message || 'Your message will appear here...'}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white">
            <div className="text-sm text-orange-100 mb-2">Recipients</div>
            <div className="text-3xl font-bold mb-2">
              {notification.targetUsers === 'all' ? 'All' : 'Active'} Users
            </div>
            <div className="text-sm text-orange-100">
              Notification will be delivered instantly
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Notifications</h4>
            <div className="space-y-3">
              <div className="text-center py-8 text-gray-500 text-sm">
                No notifications sent yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



