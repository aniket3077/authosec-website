import { Link } from 'react-router-dom';
import { QrCode, Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-800 text-dark-200 border-t border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <QrCode className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-white">AuthoSec</span>
            </div>
            <p className="text-dark-300 mb-4">
              Empowering secure B2B transactions with cutting-edge authentication technology.
              Building trust through verification.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-dark-300 hover:text-primary-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-dark-300 hover:text-primary-500 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-dark-300 hover:text-primary-500 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-dark-300 hover:text-primary-500 transition-colors text-sm">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-dark-300 hover:text-primary-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300 text-sm">info@dualqrpay.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-dark-300 text-sm">
                  123 Business Street<br />
                  Tech City, TC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-dark-400 text-sm">
              © {currentYear} AuthoSec. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-dark-400 hover:text-primary-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-dark-400 hover:text-primary-500 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
