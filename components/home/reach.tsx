'use client'

import Image from "next/image";
import { useInView } from "../../lib/utils";
import { useState } from "react";
import { useTranslations } from "@/lib/useTranslations";

export default function Reach() {
  const { t } = useTranslations();
  const [ref, inView] = useInView();
  const [gifLoaded, setGifLoaded] = useState(false);
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* 
        Mobile Background Image:
        - Hidden on desktop (sm:hidden)
        - Optimized for mobile viewport
        - Uses object-cover to ensure proper scaling
        - Object position set to center top for better mobile layout
      */}
      <Image
        src="https://res.cloudinary.com/dljgzevaj/image/upload/v1758480885/Screenshot_2025-09-19_at_5.38.37_PM_2_jnsmch.png"
        alt="World map background - mobile"
        fill
        priority
        className="
          object-cover
          z-0
          object-[center_top]
          sm:hidden
          transition-all
          duration-300
        "
        sizes="100vw"
      />
      
      {/* 
        Desktop Background Image:
        - Hidden on mobile (hidden sm:block)
        - Optimized for desktop viewport
        - Uses object-center for proper desktop centering
        - Better resolution and aspect ratio for larger screens
      */}
      <Image
        src="https://res.cloudinary.com/dljgzevaj/image/upload/v1758480881/Group_1000002985_2_dej3rp.png"
        alt="World map background - desktop"
        fill
        priority
        className="
          object-cover
          z-0
          object-center
          hidden
          sm:block
          transition-all
          duration-300
        "
        sizes="100vw"
      />
      {/* Overlay GIF, slide in from left when in view */}
    
    
      {/* Content container: on mobile, content positioned higher; on desktop, left side */}
      <div className="absolute inset-0 text-black  flex flex-col justify-start pt-20 sm:justify-center sm:items-start z-20">
        <div
          ref={ref}
          className={`
            max-w-lg
            px-4
            sm:px-4
            rounded-xl
            text-left
            transition-all
            duration-1000
            bg-white
            p-6
            mx-4
            sm:mx-0
            mb-20
            sm:mb-0
            sm:ml-16
            ${inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-3xl md:text-5xl special-header font-bold  mb-4 leading-tight">
            {t('reach.title')}
          </h2>
          <p className=" text-base md:text-lg">
            {t('reach.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
