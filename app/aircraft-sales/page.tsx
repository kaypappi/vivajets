'use client'
import React from 'react'
import AircraftHero from '@/components/aircraft/hero'
import Header from '@/components/layouts/header'
import Benefits from '@/components/aircraft/benefits'
import Aquire from '@/components/aircraft/aquire'
import FindRightJet from '@/components/aircraft/find-right-jet'
import ReadyWhenYouAre from '@/components/about/ready-when-you-are'

export default function AircraftSalesPage() {
  return (
    <div>
      <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} />
      <AircraftHero />
      <Benefits />
      <Aquire />
      <FindRightJet />
      <ReadyWhenYouAre />
    </div>
  )
}
