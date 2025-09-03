import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function Benefits() {
  const { t } = useTranslations('aircraftSales')
  return (
    <div className='relative bg-white'>
      <div className='container mx-auto px-4 py-20'>
        <h2 className='text-3xl sm:text-5xl font-bold special-header'>{t('benefits.title')}</h2>
        {/* Desktop image */}
        <div className="w-full h-auto mt-20 hidden sm:block">
          <Image
            src="/assets/images/benfit-img.svg"
            alt="benefit-bg"
            width={1200}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Mobile image */}
        <div className="w-full h-auto mt-20 block sm:hidden">
          <Image
            src="/assets/images/benefit_mobile.svg"
            alt="benefit-bg-mobile"
            width={600}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>

        <h2 className='text-4xl font-bold special-header mt-20'>{t('benefits.subtitle')}</h2>
      
        {/* Desktop steps image */}
        <div className="w-full h-auto mt-20 hidden sm:block">
          <Image
            src="/assets/images/steps.svg"
            alt="steps-bg"
            width={1200}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Mobile steps image */}
        <div className="w-full h-auto mt-20 block sm:hidden">
          <Image
            src="/assets/images/steps_mobile.svg"
            alt="steps_mobile"
            width={600}
            height={300}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
      {/* Full width footer background image */}
      <div className="w-full relative mt-24">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/images/bottom_plane.png"
            alt="Footer Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Spacer for height, adjust as needed */}
        <div className="relative z-10" style={{ height: '400px' }} />
      </div>
    </div>
  )
}

export default Benefits
