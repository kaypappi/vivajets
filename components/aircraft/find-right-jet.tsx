import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function FindRightJet() {
  const { t } = useTranslations('aircraftSales')
  return (
    <section className="relative bg-white text-black">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Title and Description */}
        <div className=" mb-16">
          <h2 className="text-3xl md:text-6xl special-header font-bold mb-8 text-black">
            {t('findRight.title')}
          </h2>
          <div className='max-w-5xl'>
            <p className="text-left leading-relaxed text-gray-700">
              {t('findRight.desc')}
            </p>
          </div>
        </div>

        {/* Large Image */}
        {/* Desktop Image */}
        <div className="relative w-full h-[700px] mb-8 hidden md:block">
          <Image
            src="/assets/images/light.png"
            alt="Private jet at night"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        {/* Mobile Image */}
        <div className="relative w-full h-[400px] mb-8 block md:hidden">
          <Image
            src="https://res.cloudinary.com/dljgzevaj/image/upload/v1757762213/_O4G4437_1_qyivn8.png"
            alt="Private jet at night (mobile)"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Bottom Image
        <div className="relative w-full h-[500px]">
          <Image
            src="/assets/images/float_3.png"
            alt="Private jet during day with open door"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div> */}
      </div>

      {/* Full Width Footer Background with Card Overlay */}
      <div className="relative w-full mt-20">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/images/jet.png"
            alt="Footer Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        
        {/* White Card Overlay */}
        <div className="relative z-10 flex items-center justify-center" style={{ height: '800px' }}>
          <div className="bg-white rounded-lg shadow-2xl p-12 sm:max-w-6xl sm:mx-4">
            {/* Title */}
            <h3 className="text-3xl md:text-5xl special-header font-bold text-black sm:text-center mb-6">
              {t('findRight.bottomTitle')}
            </h3>
            
            {/* Description */}
            <p className=" text-gray-700 sm:text-center mb-12 sm:max-w-4xl mx-auto leading-relaxed">
              {t('findRight.bottomDesc')}
            </p>
            
            {/* Points Grid - 3 per row */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Row 1 */}
              <div>
                <h4 className="text-xl special-header font-bold text-black mb-3">{t('findRight.mission.title')}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('findRight.mission.body')}
                </p>
              </div>
              
              <div>
                <h4 className="text-xl special-header font-bold text-black mb-3">{t('findRight.capacity.title')}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('findRight.capacity.body')}
                </p>
              </div>
              
              <div>
                <h4 className="text-xl special-header font-bold text-black mb-3">{t('findRight.budget.title')}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('findRight.budget.body')}
                </p>
              </div>
              
              {/* Row 2 */}
              <div>
                <h4 className="text-xl special-header font-bold text-black mb-3">{t('findRight.access.title')}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('findRight.access.body')}
                </p>
              </div>
              
              <div>
                <h4 className="text-xl special-header font-bold text-black mb-3">{t('findRight.amenities.title')}</h4>
                <p className="text-gray-700 leading-relaxed">
                  {t('findRight.amenities.body')}
                </p>
              </div>
              
              {/* Contact Us Button as 6th item */}
              <div className="flex items-center justify-center">
                <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                  {t('findRight.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindRightJet 