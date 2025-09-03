'use client'

import Image from "next/image";
import { useInView } from "../../lib/utils";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";

interface HeroProps {
  isMuted: boolean;
}

export default function Hero({ isMuted }: HeroProps) {
  const [ref, inView] = useInView();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Lazy load video only when component is in view
  useEffect(() => {
    if (inView && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [inView, shouldLoadVideo]);

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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Only log if it's not a user interaction error
          if (error.name !== 'NotAllowedError') {
            console.error("Video autoplay was prevented: ", error);
          }
        });
      }
    }
  }, [isVideoLoaded, shouldLoadVideo]);

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
    />
  ), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
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
          poster="/assets/images/static-bg.png"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/assets/images/video-bg.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          {posterImage}
        </video>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-1" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full z-10 pb-12">
        <div
          ref={ref}
          className={`container mx-auto px-4 pb-20 transition-all duration-1000 ${
            inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-4xl sm:text-6xl special-header md:text-6xl font-bold text-white mb-4 leading-tight">
            Discover a New Altitude<br />of Comfort and Class
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            You can get the best private flight services from VivaJets. If you need a unique solution for work, pleasure, or travel. Make Vivajets your first choice today for your luxurious private plane travel
          </p>
        </div>
      </div>
    </section>
  );
}
