import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeIn' | 'slideInLeft' | 'slideInRight' | 'scale';
  delay?: number;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animationType = 'fadeUp',
  delay = 0,
  threshold = 0.1,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    freezeOnceVisible: true,
  });

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-700 ease-out';
    
    if (!isIntersecting) {
      switch (animationType) {
        case 'fadeUp':
          return `${baseClasses} opacity-0 transform translate-y-8`;
        case 'fadeIn':
          return `${baseClasses} opacity-0`;
        case 'slideInLeft':
          return `${baseClasses} opacity-0 transform -translate-x-8`;
        case 'slideInRight':
          return `${baseClasses} opacity-0 transform translate-x-8`;
        case 'scale':
          return `${baseClasses} opacity-0 transform scale-95`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 transform translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};