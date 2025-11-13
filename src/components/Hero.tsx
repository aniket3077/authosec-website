import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

// const Scene3D = lazy(() => import('./Scene3D'));

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Badge animation
    if (badgeRef.current) {
      animate(badgeRef.current, {
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'out(3)',
      });
    }

    // Title animation with stagger
    if (titleRef.current?.children) {
      animate(titleRef.current.children, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: (_el: any, i: number) => 300 + (i * 200),
        ease: 'out(3)',
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 800,
        ease: 'out(3)',
      });
    }

    // Buttons animation
    if (buttonsRef.current?.children) {
      animate(buttonsRef.current.children, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: (_el: any, i: number) => 1000 + (i * 150),
        ease: 'out(3)',
      });
    }

    // Stats animation
    if (statsRef.current?.children) {
      animate(statsRef.current.children, {
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: (_el: any, i: number) => 1200 + (i * 100),
        ease: 'out(4)',
      });
    }

    // Floating animation for background blurs
    animate('.blur-circle', {
      translateY: [-20, 20],
      duration: 4000,
      alternate: true,
      loop: true,
      ease: 'inOut(2)',
    });
  }, []);

  return (
    <div ref={heroRef} className="relative bg-dark-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="blur-circle absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="blur-circle absolute bottom-0 right-0 w-96 h-96 bg-firebase-blue rounded-full blur-3xl"></div>
        <div className="blur-circle absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-firebase-purple rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-sm font-semibold mb-6 text-primary-400" style={{ opacity: 0 }}>
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
            Trusted by Leading Businesses
          </div>

          {/* Main Headline */}
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span style={{ display: 'inline-block', opacity: 0 }}>Empowering Secure B2B</span>
            <br />
            <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent" style={{ display: 'inline-block', opacity: 0 }}>
              Transactions with AuthoSec
            </span>
          </h1>

          {/* Subheadline */}
          <p ref={subtitleRef} className="text-lg md:text-xl text-dark-200 mb-8 max-w-3xl mx-auto" style={{ opacity: 0 }}>
            Revolutionary authentication and verification system that ensures every business transaction
            is secure, verified, and traceable. Say goodbye to payment fraud.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group firebase-gradient text-dark-900 px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center space-x-2 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <span>Register Your Company</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/about"
              className="glass-effect text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all border border-dark-600"
              style={{ opacity: 0 }}
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" style={{ opacity: 0 }}>
              <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
              <div className="text-dark-300 text-sm">Registered Companies</div>
            </div>
            <div className="text-center" style={{ opacity: 0 }}>
              <div className="text-3xl font-bold text-primary-500 mb-2">10K+</div>
              <div className="text-dark-300 text-sm">Secure Transactions</div>
            </div>
            <div className="text-center" style={{ opacity: 0 }}>
              <div className="text-3xl font-bold text-primary-500 mb-2">99.9%</div>
              <div className="text-dark-300 text-sm">Security Rate</div>
            </div>
            <div className="text-center" style={{ opacity: 0 }}>
              <div className="text-3xl font-bold text-primary-500 mb-2">24/7</div>
              <div className="text-dark-300 text-sm">Support Available</div>
            </div>
          </div>

          {/* 3D Model Section */}
          <div className="mt-16">
            <div className="w-full h-[400px] rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">🔒</div>
                <div className="text-white text-xl font-semibold mb-2">Secure B2B Transactions</div>
                <div className="text-dark-300">3D Interactive Scene Coming Soon</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
