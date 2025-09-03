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
        src="/assets/images/reach-bg.png"
        alt="World map background"
        fill
        priority
        className="object-cover object-center z-0"
      />
      {/* Overlay GIF, fade in when loaded, hidden on mobile */}
      <Image
        src="/assets/images/reach-bg.gif"
        alt="World map background animated"
        fill
        priority={false}
        onLoadingComplete={() => setGifLoaded(true)}
        className={`object-cover object-center z-0 transition-opacity duration-700 ${gifLoaded ? 'opacity-100' : 'opacity-0'} block`}
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 z-10" />
      {/* Content container: on mobile, content at bottom; on desktop, right side */}
      <div className="absolute inset-0 flex flex-col justify-end sm:justify-center sm:items-end z-20">
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
            sm:mr-16
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
