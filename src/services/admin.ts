import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============================================
// COMPANY MANAGEMENT
// ============================================

export interface CompanyData {
  name: string;
  email: string;
  contactNumber: string;
  businessType?: string;
  registrationId?: string;
  subscriptionPlan: 'free' | 'basic' | 'pro' | 'enterprise';
  subscriptionExpiry?: Date;
  status: 'active' | 'inactive' | 'suspended';
  settings?: {
    maxUsers: number;
    features: string[];
  };
}

/**
 * Create a new company
 */
export async function createCompany(data: CompanyData, adminId: string) {
  try {
    const companyRef = await addDoc(collection(db, 'companies'), {
      ...data,
      createdBy: adminId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { success: true, companyId: companyRef.id };
  } catch (error: any) {
    console.error('Create company error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get all companies
 */
export async function getAllCompanies() {
  try {
    const companiesSnapshot = await getDocs(
      query(collection(db, 'companies'), orderBy('createdAt', 'desc'))
    );

    const companies = companiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      subscriptionExpiry: doc.data().subscriptionExpiry?.toDate().toISOString(),
    }));

    return { success: true, companies };
  } catch (error: any) {
    console.error('Get companies error:', error);
    return { success: false, error: error.message, companies: [] };
  }
}

/**
 * Get company by ID
 */
export async function getCompanyById(companyId: string) {
  try {
    const companyDoc = await getDoc(doc(db, 'companies', companyId));

    if (!companyDoc.exists()) {
      return { success: false, error: 'Company not found' };
    }

    const company = {
      id: companyDoc.id,
      ...companyDoc.data(),
      createdAt: companyDoc.data().createdAt?.toDate().toISOString(),
    };

    return { success: true, company };
  } catch (error: any) {
    console.error('Get company error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update company status
 */
export async function updateCompanyStatus(
  companyId: string,
  status: 'active' | 'inactive' | 'suspended'
) {
  try {
    await updateDoc(doc(db, 'companies', companyId), {
      status,
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Update company status error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update company subscription
 */
export async function updateCompanySubscription(
  companyId: string,
  plan: 'free' | 'basic' | 'pro' | 'enterprise',
  expiryDate?: Date
) {
  try {
    await updateDoc(doc(db, 'companies', companyId), {
      subscriptionPlan: plan,
      subscriptionExpiry: expiryDate ? Timestamp.fromDate(expiryDate) : null,
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Update subscription error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete company
 */
export async function deleteCompany(companyId: string) {
  try {
    await deleteDoc(doc(db, 'companies', companyId));
    return { success: true };
  } catch (error: any) {
    console.error('Delete company error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// USER MANAGEMENT
// ============================================

/**
 * Get all users (company admins + account users)
 */
export async function getAllUsers() {
  try {
    // Get company admins
    const adminSnapshot = await getDocs(collection(db, 'company_admins'));
    const admins = adminSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      role: 'company_admin',
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      lastLogin: doc.data().lastLogin?.toDate().toISOString(),
    }));

    // Get account users
    const userSnapshot = await getDocs(collection(db, 'account_users'));
    const users = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      role: 'account_user',
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      lastLogin: doc.data().lastLogin?.toDate().toISOString(),
    }));

    const allUsers = [...admins, ...users];

    return { success: true, users: allUsers };
  } catch (error: any) {
    console.error('Get all users error:', error);
    return { success: false, error: error.message, users: [] };
  }
}

/**
 * Get users by company ID
 */
export async function getUsersByCompany(companyId: string) {
  try {
    const usersSnapshot = await getDocs(
      query(collection(db, 'account_users'), where('companyId', '==', companyId))
    );

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      lastLogin: doc.data().lastLogin?.toDate().toISOString(),
    }));

    return { success: true, users };
  } catch (error: any) {
    console.error('Get company users error:', error);
    return { success: false, error: error.message, users: [] };
  }
}

// ============================================
// FEEDBACK MANAGEMENT
// ============================================

export interface FeedbackData {
  companyId: string;
  subject: string;
  message: string;
  status?: 'pending' | 'resolved' | 'closed';
}

/**
 * Get all feedback
 */
export async function getAllFeedback() {
  try {
    const feedbackSnapshot = await getDocs(
      query(collection(db, 'feedback'), orderBy('createdAt', 'desc'))
    );

    const feedback = feedbackSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
      resolvedAt: doc.data().resolvedAt?.toDate().toISOString(),
    }));

    return { success: true, feedback };
  } catch (error: any) {
    console.error('Get feedback error:', error);
    return { success: false, error: error.message, feedback: [] };
  }
}

/**
 * Respond to feedback
 */
export async function respondToFeedback(
  feedbackId: string,
  adminId: string,
  response: string
) {
  try {
    await updateDoc(doc(db, 'feedback', feedbackId), {
      status: 'resolved',
      response,
      resolvedBy: adminId,
      resolvedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Respond to feedback error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Close feedback
 */
export async function closeFeedback(feedbackId: string) {
  try {
    await updateDoc(doc(db, 'feedback', feedbackId), {
      status: 'closed',
      resolvedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('Close feedback error:', error);
    return { success: false, error: error.message };
  }
}

// ============================================
// STATISTICS
// ============================================

/**
 * Get admin dashboard statistics
 */
export async function getAdminStats() {
  try {
    // Get companies count
    const companiesSnapshot = await getDocs(collection(db, 'companies'));
    const totalCompanies = companiesSnapshot.size;
    const activeCompanies = companiesSnapshot.docs.filter(
      doc => doc.data().status === 'active'
    ).length;

    // Get users count
    const adminSnapshot = await getDocs(collection(db, 'company_admins'));
    const userSnapshot = await getDocs(collection(db, 'account_users'));
    const totalUsers = adminSnapshot.size + userSnapshot.size;

    // Get active subscriptions
    const activeSubscriptions = companiesSnapshot.docs.filter(
      doc => doc.data().subscriptionPlan !== 'free'
    ).length;

    // Get pending feedback
    const feedbackSnapshot = await getDocs(
      query(collection(db, 'feedback'), where('status', '==', 'pending'))
    );
    const pendingFeedback = feedbackSnapshot.size;

    return {
      success: true,
      stats: {
        totalCompanies,
        activeCompanies,
        totalUsers,
        activeSubscriptions,
        pendingFeedback,
        monthlyRevenue: 0, // TODO: Calculate from subscriptions
      },
    };
  } catch (error: any) {
    console.error('Get admin stats error:', error);
    return { success: false, error: error.message };
  }
}
