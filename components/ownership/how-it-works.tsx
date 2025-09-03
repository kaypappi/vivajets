import React from 'react'
import Image from 'next/image'
import { useTranslations } from '@/lib/useTranslations'

function HowItWorks() {
  const { t } = useTranslations('fractionalOwnership')
  return (
    <section className="relative bg-black text-white min-h-screen pb-10">
      <div className="container mx-auto px-4 pt-20">
        {/* Top Section - Aircraft Acquisition Text */}
       

        {/* Bottom Section - Image and Benefits */}
        <div className="grid md:grid-cols-2 gap-16 pt-20 items-start">
          {/* Left Side - Aircraft Image */}
          <div className="relative">
            <div className="relative w-full h-[350px] sm:h-[450px] md:h-[600px] overflow-hidden">
              <Image
                src="/assets/images/woman.png"
                alt="Private jet aircraft"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="space-y-12 ">
            <h2 className="text-3xl md:text-4xl mt-10 special-header font-bold mb-8">
              {t('howItWorks.title')}
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('howItWorks.step1Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('howItWorks.step1Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('howItWorks.step2Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('howItWorks.step2Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('howItWorks.step3Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('howItWorks.step3Body')}
                </p>
              </div>

              <div>
                <h3 className="text-xl special-header font-semibold mb-3">
                  {t('howItWorks.step4Title')}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {t('howItWorks.step4Body')}
                </p>
              </div>
            </div>
          </div>

          
        </div>
        
       
      </div>

      
    </section>
  )
}

export default HowItWorks
