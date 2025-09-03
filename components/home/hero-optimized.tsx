'use client'

import Image from "next/image";
import { useInView } from "../../lib/utils";
import { useEffect, useRef, useState, useCallback, useMemo, Suspense } from "react";
import VideoPreloader from "../ui/video-preloader";
import FlightBookingForm from "./flight-booking-form";
import QuoteModal from "../ui/quote-modal";
import { useTranslations } from "@/lib/useTranslations";

interface HeroProps {
  isMuted: boolean;
}

// Lazy load the video preloader
const LazyVideoPreloader = ({ src, onLoad, onError }: { src: string; onLoad?: () => void; onError?: () => void }) => {
  return (
    <Suspense fallback={null}>
      <VideoPreloader src={src} onLoad={onLoad} onError={onError} />
    </Suspense>
  );
};

export default function HeroOptimized({ isMuted }: HeroProps) {
  const { t } = useTranslations();
  const [ref, inView] = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoPreloaded, setIsVideoPreloaded] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Start preloading video when component mounts
  useEffect(() => {
    // Small delay to prioritize critical content first
    const timer = setTimeout(() => {
      setIsVideoPreloaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Handle user interaction to enable video autoplay
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      // Try to play video on first user interaction
      if (videoRef.current && isVideoLoaded) {
        videoRef.current.muted = true;
        videoRef.current.play().catch(() => {
          // Silent fail for autoplay restrictions
        });
      }
    };

    // Listen for various user interactions
    const events = ['touchstart', 'touchend', 'click', 'scroll', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [isVideoLoaded]);

  // Lazy load video only when component is in view and preloaded
  useEffect(() => {
    if (inView && isVideoPreloaded && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [inView, isVideoPreloaded, shouldLoadVideo]);

  // Handle video loading state
  const handleVideoLoad = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setIsVideoError(true);
    console.error("Video failed to load");
  }, []);

  // Optimized video mute handling
  useEffect(() => {
    if (videoRef.current && isVideoLoaded) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, isVideoLoaded]);

  // Optimized video play handling with better error handling
  useEffect(() => {
    if (videoRef.current && isVideoLoaded && shouldLoadVideo) {
      // Ensure video is muted for mobile autoplay
      videoRef.current.muted = true;
      
      const playVideo = async () => {
        try {
          await videoRef.current!.play();
        } catch (error: any) {
          // Only log if it's not a user interaction error
          if (error.name !== 'NotAllowedError') {
            console.error("Video autoplay was prevented: ", error);
          }
        }
      };
      
      playVideo();
    }
  }, [isVideoLoaded, shouldLoadVideo]);

  // Additional effect to retry playing video after user interaction
  useEffect(() => {
    if (videoRef.current && hasUserInteracted && isVideoLoaded) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Silent fail for autoplay restrictions
      });
    }
  }, [hasUserInteracted, isVideoLoaded]);

  // Memoized poster image to prevent unnecessary re-renders
  const posterImage = useMemo(() => (
    <Image
      src="/assets/images/static-bg.png"
      alt="Clouds at sunset"
      fill
      priority
      className="object-cover object-center"
      sizes="100vw"
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
    />
  ), []);

  return (
    <section className="relative min-h-[100svh] md:min-h-screen w-full overflow-visible md:overflow-hidden bg-black">
      {/* Video preloader - hidden but loads in background */}
      {isVideoPreloaded && (
        <LazyVideoPreloader
          src="/assets/images/video-bg.mp4"
          onLoad={() => console.log("Video preloaded successfully")}
          onError={() => console.log("Video preload failed")}
        />
      )}

      {/* Show poster image while video loads or if video fails */}
      {(!isVideoLoaded || isVideoError) && (
        <div className="absolute inset-0 z-0">
          {posterImage}
        </div>
      )}

      {/* Conditionally render video */}
      {shouldLoadVideo && !isVideoError && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src="/assets/images/video-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          poster="/assets/images/static-bg.png"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={() => {
            // Force play when video can play
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(() => {
                // Silent fail for autoplay restrictions
              });
            }
          }}
        >
          <source src="/assets/images/video-bg.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          {posterImage}
        </video>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-1" />
      
      {/* Content */}
      <div className="relative w-full z-10">
        <div className="min-h-[100svh] flex items-end pb-12">
          <div
            ref={ref}
            className={`container mx-auto px-4 pt-40 sm:pt-28 md:pt-0 pb-24 md:pb-16 transition-all duration-1000 ${
              inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
            }`}
          >
          {/* Mobile: single line, Desktop: with <br /> */}
          <h1 className="block sm:hidden text-4xl special-header font-bold text-white mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <h1 className="hidden sm:block max-w-5xl text-6xl md:text-6xl special-header font-bold text-white mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-white/80 text-sm md:text-lg max-w-3xl sm:mb-0 mb-4">
            {t('hero.subtitle')}
          </p>
          
          {/* Flight Booking Form - visible on all breakpoints, responsive styles inside form */}
            <div className="block">
              <FlightBookingForm className="mt-4 md:mt-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      
    </section>
  );
} 