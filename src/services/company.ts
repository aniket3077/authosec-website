import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Company, CompanyRegistrationData } from '../types';

const COMPANIES_COLLECTION = 'companies';

/**
 * Create a new company in Firestore
 */
export const createCompany = async (
  userId: string,
  data: Omit<CompanyRegistrationData, 'password'>
): Promise<void> => {
  try {
    const companyRef = doc(db, COMPANIES_COLLECTION, userId);
    await setDoc(companyRef, {
      ...data,
      id: userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isActive: true,
    });
    console.log('Company created successfully in Firestore:', userId);
  } catch (error: any) {
    console.error('Firestore error:', error.code, error.message);
    
    // Provide helpful error messages
    if (error.code === 'permission-denied') {
      throw new Error(
        'Firestore security rules are blocking this operation. ' +
        'Please update Firestore rules in Firebase Console to allow authenticated users to create their company profile. ' +
        'See FIRESTORE_SETUP_URGENT.md for instructions.'
      );
    } else if (error.code === 'unavailable') {
      throw new Error('Firestore database not set up. Please enable Firestore in Firebase Console.');
    } else if (error.message?.includes('400') || error.message?.includes('PERMISSION_DENIED')) {
      throw new Error(
        'Firestore database permissions error. ' +
        'Go to Firebase Console → Firestore Database → Rules and update them. ' +
        'See FIRESTORE_SETUP_URGENT.md for correct security rules.'
      );
    }
    
    throw new Error(`Failed to create company profile: ${error.message}. Check Firestore security rules.`);
  }
};

/**
 * Get company by user ID
 */
export const getCompanyByUserId = async (userId: string): Promise<Company | null> => {
  try {
    const companyRef = doc(db, COMPANIES_COLLECTION, userId);
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
      const data = companySnap.data();
      return {
        id: companySnap.id,
        name: data.name,
        email: data.email,
        businessType: data.businessType,
        registrationId: data.registrationId,
        contactNumber: data.contactNumber,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        isActive: data.isActive ?? true,
      } as Company;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch company');
  }
};

/**
 * Check if company with registration ID already exists
 */
export const checkCompanyExists = async (registrationId: string): Promise<boolean> => {
  try {
    const q = query(
      collection(db, COMPANIES_COLLECTION),
      where('registrationId', '==', registrationId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to check company existence');
  }
};

/**
 * Update company information
 */
export const updateCompany = async (
  userId: string,
  data: Partial<Company>
): Promise<void> => {
  try {
    const companyRef = doc(db, COMPANIES_COLLECTION, userId);
    await updateDoc(companyRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update company');
  }
};

/**
 * Get all companies (admin only)
 */
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COMPANIES_COLLECTION));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        businessType: data.businessType,
        registrationId: data.registrationId,
        contactNumber: data.contactNumber,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        isActive: data.isActive ?? true,
      } as Company;
    });
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch companies');
  }
};
