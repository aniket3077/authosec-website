// Company related types
export interface Company {
  id: string;
  name: string;
  email: string;
  businessType: string;
  registrationId: string;
  contactNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CompanyRegistrationData {
  name: string;
  email: string;
  businessType: string;
  registrationId: string;
  contactNumber: string;
  password: string;
}

// Transaction related types
export interface Transaction {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  amount: number;
  remarks?: string;
  status: 'pending' | 'accepted' | 'rejected';
  qrCode?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User related types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  companyId?: string;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  registerCompany: (data: CompanyRegistrationData) => Promise<void>;
}

// Dashboard stats
export interface DashboardStats {
  totalTransactions: number;
  pendingTransactions: number;
  acceptedTransactions: number;
  rejectedTransactions: number;
  totalAmount: number;
}
