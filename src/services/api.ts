import { auth } from '../config/firebase';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

/**
 * Generic API fetch wrapper with Firebase token
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    // Get Firebase ID token
    const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Merge with any additional headers from options
    if (options?.headers) {
      Object.assign(headers, options.headers);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
}

// Default API client (uses current Firebase user)
const api = {
  transactions: {
    initiate: (data: { receiverPhone: string; amount: number; description?: string }) =>
      apiFetch('/api/transactions/initiate', {
        method: 'POST',
        body: JSON.stringify(data)
      }),

    getAll: (page = 1, limit = 20) =>
      apiFetch(`/api/transactions?page=${page}&limit=${limit}`),

    getById: (id: string) => apiFetch(`/api/transactions/${id}`),

    scanQR1: (qrData: string) =>
      apiFetch('/api/transactions/scan-qr1', {
        method: 'POST',
        body: JSON.stringify({ qrData })
      }),

    generateQR2: (transactionId: string) =>
      apiFetch('/api/transactions/generate-qr2', {
        method: 'POST',
        body: JSON.stringify({ transactionId })
      }),

    verifyOTP: (transactionId: string, otp: string) =>
      apiFetch('/api/transactions/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ transactionId, otp })
      }),
  },
  users: {
    getProfile: () => apiFetch('/api/users/profile'),
    syncUser: (data: { firstName?: string; lastName?: string; phone?: string }) =>
      apiFetch('/api/users/sync', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    updateProfile: (data: any) =>
      apiFetch('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
  },
  company: {
    getUsers: () => apiFetch('/api/company/users'),
    createUser: (data: {
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
      password: string;
    }) =>
      apiFetch('/api/company/users', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    getDashboard: () => apiFetch('/api/company/dashboard'),
    getAnalytics: (period?: string) => 
      apiFetch(`/api/company/analytics${period ? `?period=${period}` : ''}`),
    updateUserStatus: (userId: string, isActive: boolean) =>
      apiFetch(`/api/company/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive })
      }),
    getSettings: () => apiFetch('/api/company/settings'),
      updateSettings: (data: any) =>
      apiFetch('/api/company/settings', {
        method: 'PATCH',
        body: JSON.stringify(data)
      }),
  },
  // Owner Dashboard endpoints
  owner: {
    getDashboardStats: () => apiFetch('/api/owner/dashboard-stats'),
    getEmployees: () => apiFetch('/api/owner/employees'),
    getFinancialReports: (period: string) => 
      apiFetch(`/api/owner/financial-reports?period=${period}`),
    getAnalytics: () => apiFetch('/api/owner/analytics'),
    exportPerformanceReport: () => apiFetch('/api/owner/employees/export'),
    exportFinancialReport: (period: string, format: string) => 
      apiFetch(`/api/owner/financial-reports/export?period=${period}&format=${format}`),
  },
};

export default api;
