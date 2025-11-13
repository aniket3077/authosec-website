import { useState, useEffect } from 'react';
import { MessageSquare, Clock, CheckCircle, XCircle, Send } from 'lucide-react';

interface Feedback {
  id: string;
  companyId: string;
  companyName: string;
  subject: string;
  message: string;
  status: 'pending' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
  response?: string;
}

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    // TODO: Fetch feedback from Firestore
  }, []);

  const handleRespond = async () => {
    if (!selectedFeedback || !response.trim()) return;
    
    // TODO: Update feedback in Firestore with response
    setSelectedFeedback(null);
    setResponse('');
  };

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    resolved: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };

  const statusIcons = {
    pending: Clock,
    resolved: CheckCircle,
    closed: XCircle,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-black p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Feedback Management</h1>
        <p className="text-dark-300 mt-1">Review and respond to company feedback</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Pending</div>
          <div className="text-3xl font-bold text-orange-600">
            {feedbacks.filter(f => f.status === 'pending').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Resolved</div>
          <div className="text-3xl font-bold text-green-400">
            {feedbacks.filter(f => f.status === 'resolved').length}
          </div>
        </div>
        <div className="bg-dark-800 p-6 rounded-xl shadow-lg border border-dark-700">
          <div className="text-sm text-dark-300 mb-1">Total</div>
          <div className="text-3xl font-bold text-white">{feedbacks.length}</div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-dark-800 rounded-xl shadow-lg border border-dark-700">
        <div className="divide-y divide-gray-100">
          {feedbacks.map((feedback) => {
            const StatusIcon = statusIcons[feedback.status];
            return (
              <div
                key={feedback.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedFeedback(feedback)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                      <h3 className="font-semibold text-gray-900">{feedback.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusColors[feedback.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        {feedback.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{feedback.message}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{feedback.companyName}</span>
                      <span>•</span>
                      <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {feedbacks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No feedback received yet
            </div>
          )}
        </div>
      </div>

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Respond to Feedback</h3>
            
            <div className="mb-4">
              <div className="text-sm text-dark-300 mb-1">From: {selectedFeedback.companyName}</div>
              <div className="font-semibold text-gray-900 mb-2">{selectedFeedback.subject}</div>
              <div className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedFeedback.message}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Type your response..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedFeedback(null);
                  setResponse('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRespond}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



