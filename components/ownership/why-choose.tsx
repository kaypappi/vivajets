import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function whyChoose() {
  const { t } = useTranslations('fractionalOwnership')
  return (
    <section className="py-24 sm:block hidden">
      <div className="container mx-auto mb-10 px-4">
        <h1 className="text-3xl sm:text-5xl special-header mb-10">
          {t('whyChoose.title')}
        </h1>

        <div className="w-full">
        <Image
          src="/assets/images/ui.png"
          alt="why-choose"
          width={1920}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      </div>
     
    </section>
  )
}

export default whyChoose
