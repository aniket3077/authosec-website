import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import Scene3D from './Scene3D';

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
      anime({
        targets: badgeRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutCubic',
      });
    }

    // Title animation with stagger
    if (titleRef.current?.children) {
      anime({
        targets: Array.from(titleRef.current.children),
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        delay: anime.stagger(200, {start: 300}),
        easing: 'easeOutCubic',
      });
    }

    // Subtitle animation
    if (subtitleRef.current) {
      anime({
        targets: subtitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 800,
        easing: 'easeOutCubic',
      });
    }

    // Buttons animation
    if (buttonsRef.current?.children) {
      anime({
        targets: Array.from(buttonsRef.current.children),
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(150, {start: 1000}),
        easing: 'easeOutCubic',
      });
    }

    // Stats animation
    if (statsRef.current?.children) {
      anime({
        targets: Array.from(statsRef.current.children),
        translateY: [50, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 800,
        delay: anime.stagger(100, {start: 1200}),
        easing: 'easeOutQuart',
      });
    }

    // Floating animation for background blurs
    anime({
      targets: '.blur-circle',
      translateY: [-20, 20],
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center px-4 py-2 glass-effect rounded-full text-sm font-semibold text-primary-400 opacity-0">
              <span className="w-2 h-2 bg-primary-500 rounded-full mr-2 animate-pulse"></span>
              Trusted by Leading Businesses
            </div>

            {/* Main Headline */}
            <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="block opacity-0">Empowering Secure B2B</span>
              <span className="bg-gradient-to-r from-primary-500 to-primary-400 bg-clip-text text-transparent block opacity-0">
                Transactions with AuthoSec
              </span>
            </h1>

            {/* Subheadline */}
            <p ref={subtitleRef} className="text-base md:text-lg text-dark-200 max-w-xl mx-auto lg:mx-0 opacity-0">
              Revolutionary authentication and verification system that ensures every business transaction
              is secure, verified, and traceable. Say goodbye to payment fraud.
            </p>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch">
              <Link
                to="/register"
                className="group firebase-gradient text-dark-900 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-2xl opacity-0"
              >
                <span>Register Your Company</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/about"
                className="glass-effect text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all border border-dark-600 opacity-0"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center opacity-0">
                <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
                <div className="text-dark-300 text-sm">Registered Companies</div>
              </div>
              <div className="text-center opacity-0">
                <div className="text-3xl font-bold text-primary-500 mb-2">10K+</div>
                <div className="text-dark-300 text-sm">Secure Transactions</div>
              </div>
              <div className="text-center opacity-0">
                <div className="text-3xl font-bold text-primary-500 mb-2">99.9%</div>
                <div className="text-dark-300 text-sm">Security Rate</div>
              </div>
              <div className="text-center opacity-0">
                <div className="text-3xl font-bold text-primary-500 mb-2">24/7</div>
                <div className="text-dark-300 text-sm">Support Available</div>
              </div>
            </div>
          </div>

          {/* 3D Model Section */}
          <div className="w-full lg:w-1/2">
            <Scene3D />
          </div>
        </div>
      </div>
    </div>
  );
}
