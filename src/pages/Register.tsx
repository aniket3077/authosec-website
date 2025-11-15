import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowRight, AlertCircle } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Personal Info, 2: Company Info

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone number formatting to E.164 format
  const formatPhoneNumber = (phone: string): string => {
    // Trim whitespace
    let formatted = phone.trim();
    
    // Remove spaces, dashes, parentheses
    formatted = formatted.replace(/[\s\-()]/g, '');
    
    // If it already starts with +, check if valid
    if (formatted.startsWith('+')) {
      // Remove + for processing
      const digits = formatted.substring(1);
      // E.164 requires first digit after + to be 1-9
      if (/^[1-9]\d{0,13}$/.test(digits)) {
        return formatted;
      }
      // If invalid, remove + and continue
      formatted = digits;
    }
    
    // Remove all non-digit characters
    let cleaned = formatted.replace(/\D/g, '');
    
    // Remove leading zeros (country codes don't start with 0)
    while (cleaned.startsWith('0') && cleaned.length > 1) {
      cleaned = cleaned.substring(1);
    }
    
    // If it's a 10-digit number, assume India (+91)
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      return `+91${cleaned}`;
    }
    
    // If it's 11-15 digits and starts with 1-9 (valid country code), add +
    if (cleaned.length >= 10 && cleaned.length <= 15 && /^[1-9]/.test(cleaned)) {
      return `+${cleaned}`;
    }
    
    // Return original if we can't format it properly
    return phone;
  };

  // Phone number validation (E.164 format)
  const validatePhoneNumber = (phone: string): boolean => {
    // E.164 format: +[country code][number], total 1-15 digits after +
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
  };

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email || !email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    if (!phone || !phone.trim()) {
      setError('Please enter a valid phone number');
      return;
    }

    // Format phone number to E.164
    const formattedPhone = formatPhoneNumber(phone.trim());
    
    // Validate phone number format
    if (!validatePhoneNumber(formattedPhone)) {
      setError('Please enter a valid phone number with country code.\nExample: +919876543210 or 9876543210');
      return;
    }

    if (!companyName.trim()) {
      setError('Please enter your company name');
      return;
    }

    if (!businessType.trim()) {
      setError('Please select a business type');
      return;
    }

    if (!registrationId.trim()) {
      setError('Please enter your company registration ID');
      return;
    }

    setLoading(true);

    try {
      // Register user in Firebase Auth
      const firebaseUser = await registerUser(email.trim(), password);
      
      // Get Firebase ID token
      const token = await firebaseUser.getIdToken();
      
      // Sync user to database with company info (use formatted phone)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: formattedPhone,
          companyName: companyName.trim(),
          businessType: businessType.trim(),
          registrationId: registrationId.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.warn('Database sync failed:', data.error);
        // Continue anyway - user is registered in Firebase
      }

      navigate('/redirect');
    } catch (err: any) {
      setError(err.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tl from-primary-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
            {step === 1 ? 'Create Account' : 'Company Registration'}
          </h2>
          <p className="text-gray-400 text-base">
            {step === 1 ? (
              <>
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-primary-500 hover:text-primary-400 transition-colors">
                  Sign in
                </Link>
              </>
            ) : (
              <span>Step 2 of 2 - Company details</span>
            )}
          </p>
          {/* Progress Indicator */}
          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className={`h-2 w-24 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/50' : 'bg-dark-700'}`} />
            <div className={`h-2 w-24 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/50' : 'bg-dark-700'}`} />
          </div>
        </div>
        <div className="bg-dark-800/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-dark-700/50 hover:border-primary-500/30 transition-all duration-300">
        <form className="space-y-6" onSubmit={step === 1 ? handleNextStep : handleSubmit}>
          {error && (
            <div className="rounded-lg bg-red-900/20 border border-red-500/50 p-4 flex items-start space-x-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <>
              <div className="rounded-md shadow-sm space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="sr-only">
                      First Name
                    </label>
                    <input
                      id="first-name"
                      name="firstName"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="sr-only">
                      Last Name
                    </label>
                    <input
                      id="last-name"
                      name="lastName"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-primary-500 transition-all duration-300 shadow-lg hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Next: Company Details</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Phone number (10 digits)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="company-name" className="sr-only">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    name="companyName"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="business-type" className="sr-only">
                    Business Type
                  </label>
                  <select
                    id="business-type"
                    name="businessType"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm cursor-pointer"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                  >
                    <option value="">Select business type</option>
                    <option value="retail">Retail</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="services">Services</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="registration-id" className="sr-only">
                    Company Registration ID
                  </label>
                  <input
                    id="registration-id"
                    name="registrationId"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-dark-600 bg-dark-900/70 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500/50 hover:border-dark-500 transition-all sm:text-sm"
                    placeholder="Company registration ID (GST/CIN/etc)"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="group relative w-full flex justify-center py-3 px-4 border border-dark-600 text-sm font-medium rounded-lg text-white bg-dark-800/50 hover:bg-dark-700 hover:border-dark-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-primary-500 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-primary-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Complete Registration'}
                </button>
              </div>
            </>
          )}
        </form>
        </div>
      </div>
    </div>
  );
}
