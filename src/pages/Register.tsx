import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Mail, Phone, FileText, Lock } from 'lucide-react';
import { Button } from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { registerUser } from '../services/auth';
import { createCompany, checkCompanyExists } from '../services/company';
import type { CompanyRegistrationData } from '../types';
import { animate } from 'animejs';

export default function Register() {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<CompanyRegistrationData>({
    name: '',
    email: '',
    businessType: '',
    registrationId: '',
    contactNumber: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      animate(cardRef.current.children, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        delay: (_el: any, i: number) => i * 150,
        ease: 'out(3)'
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    // Validation
    if (formData.password !== confirmPassword) {
      setAlert({ type: 'error', message: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setAlert({ type: 'error', message: 'Password must be at least 8 characters long' });
      setLoading(false);
      return;
    }

    try {
      // Check if company with this registration ID already exists
      const exists = await checkCompanyExists(formData.registrationId);
      if (exists) {
        setAlert({
          type: 'error',
          message: 'A company with this registration ID already exists',
        });
        setLoading(false);
        return;
      }

      // Register user in Firebase Auth
      const user = await registerUser(formData.email, formData.password);
      console.log('User authentication successful, creating company profile...');

      // Create company profile in Firestore
      try {
        await createCompany(user.uid, {
          name: formData.name,
          email: formData.email,
          businessType: formData.businessType,
          registrationId: formData.registrationId,
          contactNumber: formData.contactNumber,
        });

        setAlert({
          type: 'success',
          message: 'Registration successful! Redirecting to dashboard...',
        });

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } catch (firestoreError: any) {
        console.error('Firestore error during company creation:', firestoreError);
        
        // User is created in Auth but Firestore failed
        let errorMessage = `Account created but profile setup failed: ${firestoreError.message}.`;
        
        if (firestoreError.message?.includes('permission') || firestoreError.message?.includes('security rules')) {
          errorMessage = 
            '✅ Your account was created successfully! ' +
            '❌ But company profile could not be saved due to Firestore security rules. ' +
            '\n\n🔧 FIX: Go to Firebase Console → Firestore Database → Rules tab → ' +
            'Update rules to allow authenticated users to create their company profile. ' +
            '\n\nSee FIRESTORE_RULES_FIX.md for detailed instructions with exact rules to copy-paste.';
        }
        
        setAlert({
          type: 'error',
          message: errorMessage,
        });
      }
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue py-12">
      <div ref={cardRef} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8" style={{ opacity: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-4">Register Your Company</h1>
          <p className="text-lg text-white/90">
            Join the secure B2B payment revolution
          </p>
        </div>

        <div className="bg-dark-800 rounded-xl shadow-lg p-8 border border-dark-700" style={{ opacity: 0 }}>
          {alert && (
            <div className="mb-6">
              <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                <Building className="inline mr-2" size={18} />
                Company Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="ABC Corporation Ltd."
              />
            </div>

            {/* Company Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                <Mail className="inline mr-2" size={18} />
                Company Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="info@company.com"
              />
            </div>

            {/* Business Type */}
            <div>
              <label htmlFor="businessType" className="block text-sm font-semibold text-white mb-2">
                <Building className="inline mr-2" size={18} />
                Business Type *
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select business type</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="services">Services</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Registration ID */}
            <div>
              <label htmlFor="registrationId" className="block text-sm font-semibold text-white mb-2">
                <FileText className="inline mr-2" size={18} />
                Company Registration ID *
              </label>
              <input
                type="text"
                id="registrationId"
                name="registrationId"
                value={formData.registrationId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="REG123456789"
              />
              <p className="text-sm text-dark-300 mt-1">
                Your official business registration number
              </p>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-semibold text-white mb-2">
                <Phone className="inline mr-2" size={18} />
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                <Lock className="inline mr-2" size={18} />
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="••••••••"
              />
              <p className="text-sm text-dark-300 mt-1">
                Minimum 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                <Lock className="inline mr-2" size={18} />
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="••••••••"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 mr-2"
              />
              <label htmlFor="terms" className="text-sm text-dark-300">
                I agree to the{' '}
                <a href="/terms" className="text-primary-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" loading={loading} fullWidth className="firebase-gradient text-dark-900 font-semibold hover:opacity-90">
              <span>Register Company</span>
            </Button>

            {/* Login Link */}
            <p className="text-center text-dark-300 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-primary-400 hover:underline font-semibold">
                Sign in here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
