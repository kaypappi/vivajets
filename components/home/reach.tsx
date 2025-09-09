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
      <Image
        src="https://res.cloudinary.com/dljgzevaj/image/upload/v1757405178/Group_1000002981_1_ci8vmc.png"
        alt="World map background"
        fill
        priority
        className="object-cover object-center z-0"
      />
      {/* Overlay GIF, slide in from left when in view */}
      <div className="absolute inset-0 flex items-center justify-end z-0">
        <Image
          src="https://res.cloudinary.com/dljgzevaj/image/upload/v1757404190/Hawker-900XP_copy_1_1_qvk0ic.png"
          alt="World map background animated"
          width={800}
          height={600}
          priority={false}
          onLoadingComplete={() => setGifLoaded(true)}
          className={`
            object-cover object-center max-w-4xl w-full h-auto
            transition-all duration-1000 ease-out
            ${inView && gifLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
          `}
          unoptimized
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-10" />
      {/* Content container: on mobile, content at bottom; on desktop, left side */}
      <div className="absolute inset-0 flex flex-col justify-end sm:justify-center sm:items-start z-20">
        <div
          ref={ref}
          className={`
            max-w-lg
            px-4
            sm:px-0
            text-left
            transition-all
            duration-1000
            mb-10
            sm:mb-0
            sm:ml-16
            ${inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}
          `}
        >
          <h2 className="text-4xl md:text-5xl special-header font-bold text-white mb-4 leading-tight">
            {t('reach.title')}
          </h2>
          <p className="text-white/80 text-base md:text-lg">
            {t('reach.subtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}
