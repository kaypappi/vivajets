'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useInView } from "../../lib/utils";
import QuoteModal from "@/components/ui/quote-modal";
import { useTranslations } from "@/lib/useTranslations";

export default function Ready() {
  const { t } = useTranslations();
  const [ref, inView] = useInView();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  return (
    <section className="relative min-h-screen pt-10 w-full mt-10 overflow-hidden md:overflow-visible">
      <Image
        src='/assets/images/ready-bg-2.png'
        alt="World map background"
        fill
        priority
        className="object-contain md:object-cover object-center z-0"
      />
      <div className="absolute bottom-0 left-0 w-full z-20 pb-8 md:pb-20">
        <div
          ref={ref}
          className={`
            container mx-auto px-4
            flex flex-col md:flex-row
            items-start md:items-end
            justify-start md:justify-between
            transition-all duration-1000
            bg-black md:bg-transparent py-4 md:py-0
            ${inView ? 'animate-fade-in opacity-100' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="max-w-xl text-white mb-8 md:mb-0 pt-8 md:pt-80 text-left">
            <h2 className="text-2xl md:text-5xl font-bold special-header mb-4 text-left">{t('ready.title')}</h2>
            <p className="text-white/80 text-sm md:text-lg max-w-xl text-left">
              {t('ready.subtitle')}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto text-left">
            <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded-full border text-xs md:text-sm border-[#FDFCFF] text-white bg-transparent hover:bg-white hover:text-black transition font-medium flex items-center gap-2 justify-center md:justify-start"
              >
                Book A Flight <FiArrowUpRight className="inline-block text-base md:text-lg" />
              </button>
              <Link href="/contact" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm border border-[#FDFCFF] text-white bg-transparent hover:bg-white hover:text-black transition font-medium flex items-center gap-2 justify-center md:justify-start">
                  Contact Us <FiArrowUpRight className="inline-block text-base md:text-lg" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
      <style jsx>{`
        @media (max-width: 767px) {
          .container {
            align-items: flex-end !important;
          }
        }
      `}</style>
    </section>
  );
}
