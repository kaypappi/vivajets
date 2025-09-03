'use client' 
import React from 'react'
import Hero from '@/components/ownership/hero'
import Header from '@/components/layouts/header'
import WhatIsFractional from '@/components/ownership/what-is-fractional'
import WhyChoose from '@/components/ownership/why-choose'
import WhoWeFly from '@/components/about/who-we-fly'
import HowItWorks from '@/components/ownership/how-it-works'
import ReadyWhenYouAre from '@/components/about/ready-when-you-are'

function page() {
  return (
    <div>
     <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} />
     <Hero/>
     <WhatIsFractional/>
     <WhyChoose/>
     {/* <WhoWeFly/> */}
     <HowItWorks/>
     <ReadyWhenYouAre/>
    </div>
  )
}

export default page
