import { ReactNode, useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && cardRef.current) {
            animate(cardRef.current, {
              translateY: [50, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              ease: 'out(3)'
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-dark-800 p-6 rounded-xl hover:bg-dark-700 transition-all border border-dark-700 hover:border-primary-500/50 group"
      style={{ opacity: 0 }}
    >
      <div className="w-12 h-12 firebase-gradient rounded-lg flex items-center justify-center text-dark-900 mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-dark-300">{description}</p>
    </div>
  );
}
