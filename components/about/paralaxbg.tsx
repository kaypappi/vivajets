import React from 'react'

/**
 * MobileBackground
 * 
 * Mobile-optimized background component that shows the full image without cropping.
 * Uses object-contain to ensure the entire image is visible on mobile screens.
 */
const MOBILE_IMAGE_URL = 'https://res.cloudinary.com/dljgzevaj/image/upload/v1758480887/Screenshot_2025-09-19_at_5.30.57_PM_1_gv9ofz.png';

function MobileBackground() {
  return (
    <div
      className="
        block
        sm:hidden
        absolute
        inset-0
        w-full
        h-full
        z-0
        pointer-events-none
      "
      style={{
        backgroundImage: `url(${MOBILE_IMAGE_URL})`,
        backgroundSize: 'contain', // Show full image without cropping
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#ffffff', // White background for any empty space
      }}
      aria-hidden="true"
    />
  );
}

/**
 * DesktopBackground
 * 
 * Desktop-optimized background component with parallax effect.
 * Uses background-attachment: fixed for smooth scrolling parallax.
 */
const DESKTOP_IMAGE_URL = 'https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_1_dizi0b.jpg';

function DesktopBackground() {
  return (
    <div
      className="
        hidden
        sm:block
        absolute
        inset-0
        w-full
        h-full
        z-0
        pointer-events-none
      "
      style={{
        backgroundImage: `url(${DESKTOP_IMAGE_URL})`,
        backgroundSize: 'cover', // Fill entire viewport
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Parallax effect
      }}
      aria-hidden="true"
    />
  );
}

/**
 * ParalaxBg
 * 
 * Main component that conditionally renders mobile or desktop background components.
 * 
 * - Mobile: Shows full image without cropping in a shorter section height
 * - Desktop: Shows parallax background effect, optimized for desktop viewport
 * - Each component is specifically designed for its target device
 * - Mobile section height is reduced to eliminate black bezels
 * 
 * Usage:
 * <ParalaxBg />
 */

function ParalaxBg() {
  return (
    <section
      // Responsive section: shorter height for mobile, full height for desktop
      className="relative w-full h-64 sm:min-h-screen sm:h-screen flex items-center justify-center overflow-hidden"
      aria-label="Parallax background section bg-white"
    >
      {/* 
        Conditional rendering of optimized background components:
        - Mobile: Shows full image without cropping in reduced height section
        - Desktop: Shows parallax background effect with full viewport coverage
        - Each component is specifically designed for its target device
      */}
      <MobileBackground />
      <DesktopBackground />
      
      {/* Decorative overlay for better contrast, optional */}
      {/* <div
        className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"
        aria-hidden="true"
      /> */}
      {/* 
        You can add overlay content here if needed, e.g.:
        <div className="z-20 text-white text-4xl font-bold">Your Content</div>
      */}
    </section>
  );
}

export default ParalaxBg
