
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/useTranslations";

export default function Hero() {
  const { t } = useTranslations('fractionalOwnership');
  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col justify-end">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/bg-aircraft.png"
          alt="Clouds background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 z-1" />

      {/* Content at the bottom */}
      <div className="relative z-10 w-full flex items-end justify-center min-h-[40vh] pb-8 md:pb-16">
        <div className="container mx-auto px-3 md:px-4 grid md:grid-cols-2 gap-8 md:gap-28 items-end">
          {/* Left side content */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-4xl md:text-6xl special-header font-bold leading-tight mt-[-80px] sm:mt-[-150px] md:mt-[-230px]">
              {t('hero.titleLine1')} <br className="hidden sm:block" />
              {t('hero.titleLine2')}
            </h1>
          </div>

          {/* Right side content */}
          <div className="text-white max-w-full md:max-w-4xl">
            <p className="mb-5 text-sm sm:text-base md:text-lg">
              {t('hero.body')}
            </p>
            <div className="flex flex-row items-center gap-3 sm:gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3"
              >
                {t('hero.ctaMoreInfo')}
              </Button>
              <a
                href="https://calendly.com/viva-jets-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-full text-xs sm:text-sm px-4 py-2 sm:px-6 sm:py-3"
                >
                  {t('hero.ctaAdvisor')}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
