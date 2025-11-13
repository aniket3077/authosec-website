/**
 * Setup Admin Company Profile in Firestore
 * Run with: node setup-admin-company.js
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Your Firebase config (from website/.env)
const firebaseConfig = {
  apiKey: "AIzaSyCvxbfCKsrAFP74czasZDsZsZ6hJkzkAOA",
  authDomain: "authsec-dfeb9.firebaseapp.com",
  projectId: "authsec-dfeb9",
  storageBucket: "authsec-dfeb9.firebasestorage.app",
  messagingSenderId: "491740541704",
  appId: "1:491740541704:web:86644204db1cbc4359f2bd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function setupAdminCompany() {
  try {
    console.log('🔐 Signing in as admin...');
    
    // Sign in with admin credentials
    await signInWithEmailAndPassword(auth, 'admin@authsec.app', 'Admin@123456');
    const user = auth.currentUser;
    
    if (!user) {
      throw new Error('Failed to get current user');
    }
    
    console.log('✅ Signed in successfully. UID:', user.uid);
    console.log('📝 Creating company profile in Firestore...');
    
    // Create company profile
    const companyData = {
      name: 'AuthSec Platform Admin',
      email: 'admin@authsec.app',
      businessType: 'technology',
      registrationId: 'ADMIN-001',
      contactNumber: '+91-999-999-9999',
      address: 'Platform Administration',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      postalCode: '400001',
      userId: user.uid,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'companies', user.uid), companyData);
    
    console.log('✅ Company profile created successfully!');
    console.log('📊 Company Data:', companyData);
    console.log('\n🎉 Setup complete! You can now refresh the dashboard.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupAdminCompany();
