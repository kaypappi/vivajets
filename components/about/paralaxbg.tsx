import React from 'react'

/**
 * ParalaxBg
 * 
 * This component renders a full-screen section with a parallax background image.
 * The image is set via inline styles for maximum control and performance.
 * 
 * Parallax effect is achieved using CSS `background-attachment: fixed`.
 * 
 * Usage:
 * <ParalaxBg />
 */
const PARALLAX_IMAGE_URL = 'https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_1_dizi0b.jpg';

function ParalaxBg() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${PARALLAX_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', // Parallax effect
        minHeight: '100vh',
      }}
      aria-label="Parallax background section"
    >
      {/* 
        You can add overlay content here if needed, e.g.:
        <div className="z-10 text-white text-4xl font-bold">Your Content</div>
      */}
      {/* Decorative overlay for better contrast, optional */}
      <div
        className="absolute inset-0 bg-black opacity-30 pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

export default ParalaxBg
