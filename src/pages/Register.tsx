import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

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

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    setError('');

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

    if (!phone.trim() || phone.length < 10) {
      setError('Please enter a valid phone number (10 digits)');
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
      const firebaseUser = await registerUser(email, password);
      
      // Get Firebase ID token
      const token = await firebaseUser.getIdToken();
      
      // Sync user to database with company info
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          companyName,
          businessType,
          registrationId,
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {step === 1 ? 'Create your account' : 'Company Registration'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {step === 1 ? (
              <>
                Or{' '}
                <Link to="/login" className="font-medium text-primary-500 hover:text-primary-400">
                  sign in to existing account
                </Link>
              </>
            ) : (
              <span>Step 2 of 2 - Enter your company details</span>
            )}
          </p>
          {/* Progress Indicator */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <div className={`h-2 w-20 rounded-full ${step >= 1 ? 'bg-primary-500' : 'bg-gray-700'}`} />
            <div className={`h-2 w-20 rounded-full ${step >= 2 ? 'bg-primary-500' : 'bg-gray-700'}`} />
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleNextStep : handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-900/20 border border-red-500/50 p-4">
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
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Next: Company Details →
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-dark-800 placeholder-gray-500 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-gray-700 text-sm font-medium rounded-md text-white bg-dark-800 hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <LoadingSpinner size="sm" /> : 'Complete Registration'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
