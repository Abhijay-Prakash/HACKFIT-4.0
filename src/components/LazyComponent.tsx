import React, { ReactNode, Suspense, lazy } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface LazyComponentProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  children,
  placeholder = (
    <div className="w-full h-96 bg-black/20 animate-pulse rounded-lg flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-lime-400/30 border-t-lime-400 rounded-full animate-spin" />
    </div>
  ),
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref}>
      {isIntersecting ? (
        <Suspense fallback={placeholder}>
          {children}
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
};