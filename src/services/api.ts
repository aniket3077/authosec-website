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
 * Helper function to validate API response structure
 */
function validateApiResponse<T>(data: any): ApiResponse<T> {
  // Ensure response has required structure
  if (typeof data === 'object' && data !== null) {
    return {
      success: data.success ?? true,
      data: data.data ?? data,
      error: data.error,
      message: data.message,
      timestamp: data.timestamp || new Date().toISOString(),
    };
  }
  
  // If data is not an object, wrap it
  return {
    success: true,
    data: data as T,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Helper function to check if response is JSON
 */
async function tryParseJson(response: Response): Promise<any> {
  // Read response body once (can only be read once)
  const text = await response.text();
  
  // If empty, return empty object
  if (!text.trim()) {
    return {};
  }
  
  // Check content type
  const contentType = response.headers.get('content-type');
  
  // If content type indicates JSON, try to parse
  if (contentType && contentType.includes('application/json')) {
    try {
      return JSON.parse(text);
    } catch (parseError) {
      throw new Error('Failed to parse JSON response');
    }
  }
  
  // If not JSON content type, try to parse anyway (some APIs return JSON without proper header)
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON response but got: ${contentType || 'unknown content type'}`);
  }
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

    const url = `${API_BASE_URL}${endpoint}`;
    
    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (networkError: any) {
      // Handle network errors (CORS, connection refused, etc.)
      const errorMessage = networkError.message || 'Network error';
      
      if (errorMessage.toLowerCase().includes('cors')) {
        throw new Error(`CORS error: Unable to connect to API at ${API_BASE_URL}. Please check CORS configuration.`);
      }
      
      if (errorMessage.toLowerCase().includes('failed to fetch') || 
          errorMessage.toLowerCase().includes('network request failed')) {
        throw new Error(`Network error: Unable to reach API at ${API_BASE_URL}. Please check if the server is running.`);
      }
      
      throw new Error(`Network error: ${errorMessage}`);
    }

    // Parse response with proper error handling
    let data: any;
    try {
      data = await tryParseJson(response);
    } catch (parseError: any) {
      console.error('JSON parse error:', parseError);
      throw new Error(parseError.message || 'Failed to parse server response');
    }

    // Validate response structure
    const validatedResponse = validateApiResponse<T>(data);

    // If response is not ok, throw error with details
    if (!response.ok) {
      const errorMessage = validatedResponse.error || 
                          validatedResponse.message || 
                          `API request failed with status ${response.status}`;
      
      const apiError = new Error(errorMessage) as any;
      apiError.status = response.status;
      apiError.response = validatedResponse;
      
      console.error(`API Error (${response.status}):`, {
        endpoint,
        status: response.status,
        error: errorMessage,
        data: validatedResponse,
      });
      
      throw apiError;
    }

    return validatedResponse;
  } catch (error: any) {
    // Re-throw if it's already a well-formed error
    if (error.message && error.status) {
      throw error;
    }
    
    // Log error for debugging
    console.error('API Error:', {
      endpoint,
      error: error.message || error,
      stack: error.stack,
    });
    
    // Create structured error
    const apiError = new Error(error.message || 'API request failed') as any;
    apiError.originalError = error;
    
    throw apiError;
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
