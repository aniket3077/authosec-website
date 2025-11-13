import { Shield, Target, Users, Lightbulb } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

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

    // Animate sections on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

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
    }, observerOptions);

    if (problemRef.current) observer.observe(problemRef.current);
    if (solutionRef.current) observer.observe(solutionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-firebase-blue py-20">
        <div ref={heroRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ opacity: 0 }}>
            About AuthoSec
          </h1>
          <p className="text-xl text-white/90" style={{ opacity: 0 }}>
            Revolutionizing B2B transactions with cutting-edge authentication and verification technology
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section ref={problemRef} className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ opacity: 0 }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">The Problem</h2>
            <p className="text-dark-300 mb-4">
              In today&apos;s digital economy, businesses face increasing threats from payment fraud,
              unauthorized transactions, and identity theft. Traditional payment methods lack the
              verification mechanisms needed to ensure both parties are legitimate.
            </p>
            <p className="text-dark-300 mb-4">
              Single-factor authentication leaves businesses vulnerable to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-dark-300">Fraudulent payment requests</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-dark-300">Unauthorized fund transfers</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-dark-300">Lack of transaction traceability</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span className="text-dark-300">Complex verification processes</span>
              </li>
            </ul>
          </div>
          <div className="bg-dark-800 p-8 rounded-xl border-2 border-primary-500/50">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              $4.2 Billion Lost Annually
            </h3>
            <p className="text-dark-300">
              Businesses worldwide lose billions to payment fraud and unauthorized transactions
              due to inadequate verification systems.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section ref={solutionRef} className="py-16 bg-dark-800" style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-dark-900 p-8 rounded-xl shadow-lg border border-primary-500/50">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                The AuthoSec Solution
              </h3>
              <p className="text-dark-300">
                Our revolutionary authentication verification system creates an unbreakable chain of
                trust between both parties, eliminating fraud while maintaining simplicity.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Our Solution</h2>
              <p className="text-dark-300 mb-4">
                AuthoSec introduces a two-step verification process that ensures both the
                sender and receiver are legitimate, authenticated parties before any transaction
                is completed.
              </p>
              <p className="text-dark-300 mb-4">Key security features:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span className="text-dark-300">
                    <strong className="text-white">Advanced Verification:</strong> Two-way authentication for foolproof security
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span className="text-dark-300">
                    <strong className="text-white">End-to-End Encryption:</strong> Military-grade encryption for all data
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span className="text-dark-300">
                    <strong className="text-white">Blockchain-Inspired Traceability:</strong> Complete audit trail
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  <span className="text-dark-300">
                    <strong className="text-white">Real-time Notifications:</strong> Instant alerts for all parties
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-dark-300">
            Leveraging the best tools to ensure security, scalability, and reliability
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl hover:border-primary-500/50 transition-all">
            <h3 className="font-semibold text-xl text-white mb-3">Firebase</h3>
            <p className="text-dark-300">
              Authentication and real-time database for instant synchronization across all devices
            </p>
          </div>
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl hover:border-primary-500/50 transition-all">
            <h3 className="font-semibold text-xl text-white mb-3">Supabase</h3>
            <p className="text-dark-300">
              PostgreSQL database with Row Level Security for enterprise-grade data protection
            </p>
          </div>
          <div className="bg-dark-800 border border-dark-700 p-6 rounded-xl hover:border-primary-500/50 transition-all">
            <h3 className="font-semibold text-xl text-white mb-3">React Native</h3>
            <p className="text-dark-300">
              Cross-platform mobile app for seamless transaction management on iOS and Android
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-dark-900" size={32} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Our Mission</h3>
              <p className="text-dark-300">
                Make B2B transactions secure, fast, and fraud-proof for every business
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-dark-900" size={32} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Security First</h3>
              <p className="text-dark-300">
                Every feature designed with security as the top priority
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-dark-900" size={32} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Innovation</h3>
              <p className="text-dark-300">
                Continuously improving with cutting-edge technology
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 firebase-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-dark-900" size={32} />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Customer Focus</h3>
              <p className="text-dark-300">
                Building solutions that businesses actually need and love
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
