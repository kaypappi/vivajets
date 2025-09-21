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
        Background image: 
        - Uses next/image for optimized loading.
        - Responsive scaling for all screen sizes, including mobile.
        - Uses object-cover to ensure the image covers the section.
        - Uses object-center for centering on desktop, but on mobile, object-[center_top] to keep the map visible and not overly cropped.
        - min-h-screen ensures the section is always at least the height of the viewport.
        - Responsive className for mobile and desktop.
      */}
      <Image
        src="https://res.cloudinary.com/dljgzevaj/image/upload/v1758466525/Group_1000002985_1_paetth.png"
        alt="World map background"
        fill
        priority
        // Responsive object position: center top on mobile, center on larger screens
        className="
          object-cover
          z-0
          object-[center_top]
          sm:object-center
          transition-all
          duration-300
        "
        sizes="100vw"
      />
      {/* Overlay GIF, slide in from left when in view */}
    
    
      {/* Content container: on mobile, content at bottom; on desktop, left side */}
      <div className="absolute inset-0 text-black  flex flex-col justify-end sm:justify-center sm:items-start z-20">
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
            mb-10
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
