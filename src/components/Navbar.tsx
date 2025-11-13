import { Link, useLocation } from 'react-router-dom';
import { Menu, X, QrCode } from 'lucide-react';
import { useState, useEffect } from 'react';
import { onAuthChange, User } from '../services/auth';
import api from '../services/api';

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

interface UserProfile {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  role: 'SUPER_ADMIN' | 'COMPANY_ADMIN' | 'ACCOUNT_USER';
  companyId: string | null;
  isActive: boolean;
}

export default function Navbar({ isAuthenticated = false, onSignOut }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      setUser(authUser);
      if (authUser) {
        loadUserProfile();
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await api.users.getProfile();
      if (response.success && response.data) {
        const data = response.data as { user: UserProfile };
        setProfile(data.user);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  const getDashboardLink = () => {
    if (!profile) return '/dashboard';
    
    switch (profile.role) {
      case 'SUPER_ADMIN':
        return '/admin/dashboard';
      case 'COMPANY_ADMIN':
        return '/company/dashboard';
      default:
        return '/dashboard';
    }
  };

  const getDashboardLabel = () => {
    if (!profile) return 'Dashboard';
    
    switch (profile.role) {
      case 'SUPER_ADMIN':
        return 'Admin Panel';
      case 'COMPANY_ADMIN':
        return 'Company Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/features', label: 'Features' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <QrCode className="h-8 w-8 text-primary-500 group-hover:text-primary-400 transition-colors" />
              <span className="text-xl font-semibold text-white">
                AuthoSec
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-dark-700 text-primary-500'
                    : 'text-dark-200 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-dark-200 hover:text-white px-4 py-2 rounded-lg hover:bg-dark-700 transition-all text-sm font-medium"
                >
                  {getDashboardLabel()}
                </Link>
                <button
                  onClick={onSignOut}
                  className="bg-dark-700 text-white px-4 py-2 rounded-lg hover:bg-dark-600 transition-all text-sm font-medium border border-dark-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="text-dark-200 hover:text-white px-4 py-2 rounded-lg hover:bg-dark-700 transition-all text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="firebase-gradient text-dark-900 px-4 py-2 rounded-lg hover:opacity-90 transition-all text-sm font-semibold shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark-600 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-800 border-t border-dark-700 animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  isActive(link.path)
                    ? 'bg-dark-700 text-primary-500'
                    : 'text-dark-200 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-dark-700 mt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-dark-200 hover:bg-dark-700 hover:text-white text-sm font-medium"
                  >
                    {getDashboardLabel()}
                  </Link>
                  <button
                    onClick={() => {
                      onSignOut?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg text-dark-200 hover:bg-dark-700 hover:text-white text-sm font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 rounded-lg firebase-gradient text-dark-900 hover:opacity-90 text-center text-sm font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
