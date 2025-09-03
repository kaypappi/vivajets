// Video optimization utilities

export interface VideoOptimizationConfig {
  preloadDelay?: number;
  quality?: 'low' | 'medium' | 'high';
  enablePreloading?: boolean;
  enableLazyLoading?: boolean;
}

export const DEFAULT_VIDEO_CONFIG: VideoOptimizationConfig = {
  preloadDelay: 100,
  quality: 'medium',
  enablePreloading: true,
  enableLazyLoading: true,
};

// Check if device is on slow connection
export function isSlowConnection(): boolean {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const connection = (navigator as any).connection;
    return connection?.effectiveType === 'slow-2g' || 
           connection?.effectiveType === '2g' || 
           connection?.effectiveType === '3g';
  }
  return false;
}

// Check if device prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
}

// Get optimal video quality based on connection and device
export function getOptimalVideoQuality(): 'low' | 'medium' | 'high' {
  if (isSlowConnection()) {
    return 'low';
  }
  
  // Check for high-end devices
  if (typeof window !== 'undefined') {
    const isHighEnd = window.screen.width >= 1920 || 
                     window.devicePixelRatio >= 2;
    return isHighEnd ? 'high' : 'medium';
  }
  
  return 'medium';
}

// Video format detection and fallback
export function getVideoFormat(): 'mp4' | 'webm' | 'fallback' {
  if (typeof document !== 'undefined') {
    const video = document.createElement('video');
    if (video.canPlayType('video/webm').length > 0) {
      return 'webm';
    }
    if (video.canPlayType('video/mp4').length > 0) {
      return 'mp4';
    }
  }
  return 'fallback';
}

// Performance monitoring
export function measureVideoLoadTime(videoElement: HTMLVideoElement): Promise<number> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const handleCanPlay = () => {
      const loadTime = performance.now() - startTime;
      videoElement.removeEventListener('canplay', handleCanPlay);
      resolve(loadTime);
    };
    
    videoElement.addEventListener('canplay', handleCanPlay);
  });
}

// Debounce function for performance
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for performance
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
} 