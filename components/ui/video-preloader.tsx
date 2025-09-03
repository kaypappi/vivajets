'use client'

import { useEffect, useRef } from 'react';

interface VideoPreloaderProps {
  src: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function VideoPreloader({ src, onLoad, onError }: VideoPreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    const handleCanPlay = () => {
      onLoad?.();
    };

    const handleError = () => {
      onError?.();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Start loading the video
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src, onLoad, onError]);

  return (
    <video
      ref={videoRef}
      src={src}
      preload="metadata"
      muted
      style={{ display: 'none' }}
    />
  );
} 