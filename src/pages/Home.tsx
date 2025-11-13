import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import { Shield, Zap, Users, TrendingUp, Lock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section */}
      <section className="py-20 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How AuthoSec Technology Works
            </h2>
            <p className="text-lg text-dark-300 max-w-3xl mx-auto">
              Our revolutionary two-step verification process ensures maximum security
              for all B2B transactions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-dark-900">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Generate Payment QR
              </h3>
              <p className="text-dark-300">
                Company A generates a secure payment request QR code with encrypted transaction details
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-dark-900">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Scan & Verify
              </h3>
              <p className="text-dark-300">
                Company B scans the QR, reviews transaction details, and approves or rejects
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-dark-900">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Dual Confirmation
              </h3>
              <p className="text-dark-300">
                Second QR generated for mutual verification, creating an unbreakable security chain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose AuthoSec?
            </h2>
            <p className="text-lg text-dark-300">
              Built for modern businesses that demand security and efficiency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield size={24} />}
              title="Military-Grade Security"
              description="End-to-end encryption and dual verification protect every transaction from fraud"
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Lightning Fast"
              description="Complete secure transactions in seconds with our streamlined QR workflow"
            />
            <FeatureCard
              icon={<Users size={24} />}
              title="B2B Focused"
              description="Designed specifically for business-to-business transactions and workflows"
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Real-time Analytics"
              description="Track all transactions with comprehensive dashboards and reporting tools"
            />
            <FeatureCard
              icon={<Lock size={24} />}
              title="Fraud Prevention"
              description="Advanced verification makes unauthorized transactions virtually impossible"
            />
            <FeatureCard
              icon={<CheckCircle size={24} />}
              title="100% Traceable"
              description="Complete audit trail for compliance and accountability"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-dark-800 via-dark-900 to-black border-t border-dark-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Business Transactions?
          </h2>
          <p className="text-xl text-dark-300 mb-8">
            Join hundreds of companies already using AuthoSec for secure B2B payments
          </p>
          <Link
            to="/sign-up"
            className="inline-block firebase-gradient text-dark-900 px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all shadow-2xl hover:shadow-primary-500/50"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
