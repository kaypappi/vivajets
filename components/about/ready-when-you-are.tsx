"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import QuoteModal from '@/components/ui/quote-modal';
import { useTranslations } from '@/lib/useTranslations';

const ReadyWhenYouAre = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const { t } = useTranslations('readyWhenYouAre');

  return (
    <section className="bg-[#1c1c1c] text-white py-12 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-left">
            <h2 className="special-header text-2xl sm:text-3xl md:text-6xl font-bold mb-4 md:mb-6">
              {t('title')}
            </h2>
            <p className="text-gray-100 text-sm sm:text-base md:text-lg max-w-2xl mx-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row gap-3 sm:gap-4 w-full md:w-auto mt-6 md:mt-0">
            <button 
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 rounded-full border text-xs md:text-sm border-[#FDFCFF] text-white bg-transparent hover:bg-white hover:text-black transition font-medium flex items-center gap-2 justify-center"
            >
              {t('ctaBook')} <FiArrowUpRight className="inline-block text-base md:text-lg" />
            </button>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm border border-[#FDFCFF] text-white bg-transparent hover:bg-white hover:text-black transition font-medium flex items-center gap-2 justify-center">
                {t('ctaContact')} <FiArrowUpRight className="inline-block text-base md:text-lg" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <QuoteModal 
        isOpen={isQuoteModalOpen} 
        onClose={() => setIsQuoteModalOpen(false)} 
      />
    </section>
  );
};

export default ReadyWhenYouAre;
