"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/useTranslations";
import QuoteModal from "@/components/ui/quote-modal";
import { useState } from "react";

export default function ManagementHero() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t } = useTranslations('aircraftManagement');

  return (
    <section className="relative min-h-screen w-full bg-[#F5F5F5] flex items-center">
      {/* Plane Image */}
      <div className="absolute mt-44 sm:mt-24 -top-12 sm:-top-24 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none">
        <Image
          src="/assets/images/plane2.svg"
          alt="VivaJets Plane"
          width={1920}
          height={400}
          priority
          className="w-full h-auto"
        />
      </div>

      <div className="container mx-auto z-10 sm:pt-[600px] px-4 grid md:grid-cols-2 gap-16 items-center  md:pb-32 relative">
        {/* Headline */}
        <div className="sm:mt-0 mt-60">
          <h1 className="text-4xl md:text-6xl special-header font-bold leading-tight text-black">
            {t('hero.titleMain')} <br/>
            {t('hero.titleSecond')}
          </h1>
        </div>

        {/* Supporting copy */}
        <div className="max-w-3xl text-black">
          <p className="mb-8 text-sm md:text-base  leading-relaxed">
            {t('hero.body')}
          </p>

          <div className="flex items-center gap-2">
            {/* <Button
              size="sm"
              className="rounded-full bg-black text-white hover:bg-black/90 px-4 py-2 text-xs sm:px-8 sm:py-4  sm:size-lg"
              onClick={() => setIsQuoteModalOpen(true)}
            >
              Request A Quote
            </Button> */}
           <a
                href="https://calendly.com/viva-jets-sales/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-black  text-black hover:bg-black hover:text-white px-4 text-xs sm:px-8 sm:py-4  sm:size-lg"
                >
                  {t('cta.talkToUs')}
                </Button>
              </a>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </section>
  );
}
