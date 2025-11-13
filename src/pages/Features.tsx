import FeatureCard from '../components/FeatureCard';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import {
  Shield,
  QrCode,
  Lock,
  Smartphone,
  TrendingUp,
  Users,
  Clock,
  FileText,
  Bell,
  Database,
  Zap,
  CheckCircle,
} from 'lucide-react';

export default function Features() {
  const heroRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      animate(heroRef.current.children, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: (_el: any, i: number) => i * 200,
        ease: 'out(3)'
      });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 800,
            ease: 'out(3)'
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (coreRef.current) observer.observe(coreRef.current);
    if (techRef.current) observer.observe(techRef.current);
    if (securityRef.current) observer.observe(securityRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue py-20">
        <div ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ opacity: 0 }}>
            Powerful Features for Secure Transactions
          </h1>
          <p className="text-xl text-white/90" style={{ opacity: 0 }}>
            Everything you need to conduct secure, verified B2B transactions with confidence
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section ref={coreRef} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Core Features</h2>
          <p className="text-lg text-dark-300">
            The foundation of our secure payment platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<QrCode size={24} />}
            title="Advanced QR Verification"
            description="Revolutionary two-step QR verification process ensures both parties are authenticated before completing any transaction."
          />
          <FeatureCard
            icon={<Shield size={24} />}
            title="End-to-End Encryption"
            description="Military-grade AES-256 encryption protects all transaction data from generation to completion."
          />
          <FeatureCard
            icon={<Lock size={24} />}
            title="OTP-Secured Login"
            description="Multi-factor authentication with phone-based OTP ensures only authorized users can access the system."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="Company-to-Company"
            description="Designed specifically for B2B transactions with company-level verification and approval workflows."
          />
          <FeatureCard
            icon={<FileText size={24} />}
            title="Transaction History"
            description="Complete, immutable record of all transactions with searchable history and export capabilities."
          />
          <FeatureCard
            icon={<Bell size={24} />}
            title="Real-time Notifications"
            description="Instant push notifications for all transaction events, approvals, and security alerts."
          />
        </div>
      </section>

      {/* Technical Features */}
      <section ref={techRef} className="py-16 bg-dark-50" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-900 mb-4">Technical Excellence</h2>
            <p className="text-lg text-dark-600">
              Built on modern, scalable technology infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Database size={24} />}
              title="Supabase Integration"
              description="PostgreSQL database with Row Level Security (RLS) ensures data isolation and protection at the database level."
            />
            <FeatureCard
              icon={<Smartphone size={24} />}
              title="Cross-Platform Mobile App"
              description="React Native app works seamlessly on both iOS and Android with native performance."
            />
            <FeatureCard
              icon={<Zap size={24} />}
              title="Lightning Fast"
              description="Optimized performance ensures transactions complete in under 3 seconds from scan to confirmation."
            />
            <FeatureCard
              icon={<TrendingUp size={24} />}
              title="Analytics Dashboard"
              description="Comprehensive analytics showing transaction trends, volumes, and success rates over time."
            />
            <FeatureCard
              icon={<Clock size={24} />}
              title="24/7 Availability"
              description="Cloud-hosted infrastructure with 99.9% uptime SLA ensures your business never stops."
            />
            <FeatureCard
              icon={<CheckCircle size={24} />}
              title="Audit Trail"
              description="Complete audit logs with timestamps, user actions, and transaction details for compliance."
            />
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section ref={securityRef} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Security First</h2>
          <p className="text-lg text-dark-300">
            Multiple layers of protection keep your transactions safe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-800 border border-dark-700 p-8 rounded-xl hover:border-primary-500/50 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Payment Security</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Advanced verification prevents unauthorized transactions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Encrypted QR codes with time-based expiration</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Transaction approval workflow with reject option</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Amount verification before final confirmation</span>
              </li>
            </ul>
          </div>

          <div className="bg-dark-800 border border-dark-700 p-8 rounded-xl hover:border-primary-500/50 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Data Security</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Firebase Authentication with phone OTP</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Row Level Security in Supabase database</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">Encrypted storage of sensitive company data</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-primary-500 mr-2 mt-1 flex-shrink-0" size={20} />
                <span className="text-dark-300">HTTPS-only communication for all data transfer</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Businesses Choose Us</h2>
            <p className="text-xl text-white/90">
              The complete solution for secure B2B payments
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-primary-500/30">
              <h3 className="text-xl font-semibold mb-2">Eliminate Payment Fraud</h3>
              <p className="text-white/80">
                Dual verification makes it virtually impossible for unauthorized parties to complete transactions
              </p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-primary-500/30">
              <h3 className="text-xl font-semibold mb-2">Save Time & Money</h3>
              <p className="text-white/80">
                Automated verification reduces manual checks and speeds up payment processing
              </p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-primary-500/30">
              <h3 className="text-xl font-semibold mb-2">Build Trust</h3>
              <p className="text-white/80">
                Transparent, traceable transactions build confidence with business partners
              </p>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl border border-primary-500/30">
              <h3 className="text-xl font-semibold mb-2">Ensure Compliance</h3>
              <p className="text-white/80">
                Complete audit trails and transaction records simplify regulatory compliance
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
