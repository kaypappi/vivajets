"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/header";
import ListAircraftModal from "@/components/ui/list-aircraft-modal";
import { useRouter } from "next/navigation";
import { useTranslations } from "@/lib/useTranslations";

export default function AircraftHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslations('aircraftSales');

  const handleBrowseAircraft = () => {
    router.push('/buyers-guide/global-7500');
  };

  const handleListAircraft = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="relative min-h-screen w-full bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/craft-bg.png"
          alt="Private jet on tarmac at sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-1" />

      {/* Header */}
      <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container mx-auto px-2 sm:px-4 grid md:grid-cols-2 gap-8 md:gap-16 items-end pt-10 sm:pt-36 pb-20 md:pb-32">
          {/* Left side - Title */}
          <div className="text-white">
            <h1 className="text-5xl sm:text-7xl special-header font-bold leading-tight sm:mt-[-100px] md:mt-[-200px]">
              {t('hero.title')}
            </h1>
          </div>

          {/* Right side - Content and Buttons */}
          <div className="text-white max-w-full md:max-w-3xl">
            <p className="mb-5 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed">
              {t('hero.body')}
            </p>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3"
                onClick={handleListAircraft}
              >
                {t('hero.ctaList')}
              </Button>
              <a
                href="https://buyersguide.viva-jets.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3"
                >
                  {t('hero.ctaBrowse')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator - hidden on small screens */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 ">
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
          <span className="text-white text-xs mt-2 opacity-70">{t('hero.scroll')}</span>
        </div>
      </div>

      {/* List Aircraft Modal */}
      <ListAircraftModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
