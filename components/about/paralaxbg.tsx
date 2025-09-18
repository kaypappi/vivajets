import React from 'react'

/**
 * ParalaxBg
 * 
 * This component renders a full-screen section with a parallax background image.
 * The parallax effect is only enabled on desktop for better mobile compatibility.
 * On mobile, the image is shown as a normal background (no parallax/fixed attachment).
 * 
 * Usage:
 * <ParalaxBg />
 */
const PARALLAX_IMAGE_URL = 'https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_1_dizi0b.jpg';

function ParalaxBg() {
  return (
    <section
      className="
        w-full relative overflow-hidden flex items-center justify-center
        bg-center bg-no-repeat
        aspect-[16/9] bg-contain
        md:aspect-auto md:h-screen md:bg-cover md:bg-fixed
      "
      style={{
        backgroundImage: `url(${PARALLAX_IMAGE_URL})`,
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
