import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { signIn } from '../services/auth';
import { animate } from 'animejs';

export default function Login() {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      await signIn(email, password);
      setAlert({ type: 'success', message: 'Login successful! Redirecting...' });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error: any) {
      setAlert({
        type: 'error',
        message: error.message || 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div ref={cardRef} className="max-w-md w-full">
        <div className="text-center mb-8" style={{ opacity: 0 }}>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome Back</h1>
          <p className="text-lg text-white/90">Sign in to your company account</p>
        </div>

        <div className="bg-dark-800 rounded-xl shadow-lg p-8 border border-dark-700" style={{ opacity: 0 }}>
          {alert && (
            <div className="mb-6">
              <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                <Mail className="inline mr-2" size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                <Lock className="inline mr-2" size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-900 border border-dark-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder-dark-400"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-dark-700 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-dark-300">
                  Remember me
                </label>
              </div>

              <a href="/forgot-password" className="text-sm text-primary-400 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" loading={loading} fullWidth className="firebase-gradient text-dark-900 font-semibold hover:opacity-90">
              <span>Sign In</span>
            </Button>

            <p className="text-center text-dark-300 text-sm">
              Don&apos;t have an account?{' '}
              <a href="/register" className="text-primary-400 hover:underline font-semibold">
                Register here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
