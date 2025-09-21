import React from 'react'

/**
 * ParalaxBg
 * 
 * Renders a full-screen section with a parallax background image.
 * 
 * - Uses a responsive <img> for mobile to ensure the image covers the full width without bezels.
 * - Uses CSS background with `background-attachment: fixed` for desktop/larger screens for parallax effect.
 * - Ensures the image is always fully visible and covers the viewport on all devices.
 * - Includes an overlay for contrast.
 * 
 * Usage:
 * <ParalaxBg />
 */
const PARALLAX_IMAGE_URL = 'https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_1_dizi0b.jpg';

function ParalaxBg() {
  return (
    <section
      // Responsive section: relative for overlay, min-h-screen for full viewport height
      className="relative w-full min-h-screen hidden sm:block h-screen flex items-center justify-center overflow-hidden"
      aria-label="Parallax background section"
    >
      {/* 
        Responsive background:
        - On mobile: absolutely positioned <img> ensures full coverage, no bezels.
        - On desktop: background image with parallax effect.
        - Tailwind's 'sm:' breakpoint switches to background image for parallax.
      */}
      {/* Mobile: Use <img> for perfect edge-to-edge coverage */}
      <img
        src={PARALLAX_IMAGE_URL}
        alt="Parallax background"
        className="
          block
          sm:hidden
          absolute
          inset-0
          w-full
          h-full
          object-cover
          object-center
          z-0
          select-none
          pointer-events-none
        "
        draggable={false}
        aria-hidden="true"
      />
      {/* Desktop: Use background image with parallax effect */}
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
          backgroundImage: `url(${PARALLAX_IMAGE_URL})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // Parallax effect for desktop
        }}
        aria-hidden="true"
      />
      {/* Decorative overlay for better contrast, optional */}
      <div
        className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"
        aria-hidden="true"
      />
      {/* 
        You can add overlay content here if needed, e.g.:
        <div className="z-20 text-white text-4xl font-bold">Your Content</div>
      */}
    </section>
  );
}

export default ParalaxBg
