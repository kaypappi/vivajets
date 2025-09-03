import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function WhatIsFractional() {
  const { t } = useTranslations('fractionalOwnership')
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/images/fraction-bg.png')",
        minHeight: '450px',
      }}
    >
      <div className="relative container mx-auto sm:px-0 px-4 py-12 sm:py-20 flex flex-col items-start">
        <h1 className="text-3xl sm:text-4xl md:text-5xl special-header text-white mb-4 sm:mb-6">
          {t('whatIs.title')}
        </h1>
        <p className="max-w-5xl text-white text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
          {t('whatIs.body')}
          <br />
          {t('whatIs.body2')}
        </p>
      </div>
    </section>
  )
}

export default WhatIsFractional
