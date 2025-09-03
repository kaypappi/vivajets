import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function Aquire() {
  const { t } = useTranslations('aircraftSales')
  return (
    <section className="relative bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-20">
        {/* Top Section - Aircraft Acquisition Text */}
        <div className="mb-20">
          <h1 className="text-3xl md:text-6xl special-header font-bold mb-8">
            {t('aquire.title')}
          </h1>
          
          <div className="max-w-5xl space-y-6 sm:text-base text-sm leading-relaxed">
            <p>
              {t('aquire.p1')}
            </p>
            
            <p>
              {t('aquire.p2')}
            </p>
            
            <p>
              {t('aquire.p3')}
            </p>
          </div>
        </div>

        {/* Bottom Section - Image and Benefits */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Side - Aircraft Image */}
          <div className="relative">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden">
              <Image
                src="/assets/images/engine.png"
                alt="Private jet aircraft"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl mt-10 special-header font-bold mb-8">
              {t('aquire.benefitsTitle')}
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('aquire.b1Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aquire.b1Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('aquire.b2Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aquire.b2Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('aquire.b3Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aquire.b3Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('aquire.b4Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('aquire.b4Body')}
                </p>
              </div>
            </div>
          </div>

          
        </div>
        <div className="w-full mt-20">
          <h3 className='text-3xl sm:text-4xl special-header font-bold mb-12'>{t('aquire.chartTitle')}</h3>
          {/* Desktop image */}
          <div className="w-full hidden sm:block">
            <Image
              src="/assets/images/chart2.svg"
              alt="Private jet aircraft"
              width={1000}
              height={1000}
              className="w-full h-auto object-contain"
            />
          </div>
          {/* Mobile image */}
          <div className="w-full block sm:hidden">
            <Image
              src="/assets/images/chart2_mobile.svg"
              alt="Private jet aircraft mobile"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
       
      </div>

      
    </section>
  )
}

export default Aquire
