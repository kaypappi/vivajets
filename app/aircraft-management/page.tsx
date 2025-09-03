'use client'

import Header from '@/components/layouts/header'
import { useState } from 'react'
import ManagementHero from '@/components/management/hero'
import WhatIsAircraftManagement from '@/components/management/what-is-aircraft-management'
import ManagementServices from '@/components/management/services'
import ReadyWhenYouAre from '@/components/about/ready-when-you-are'
import WhoWeFly from '@/components/about/who-we-fly'

export default function AircraftManagementPage() {
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => setIsMuted(!isMuted)

  return (
    <main>
      <Header isMuted={isMuted} toggleMute={toggleMute} showMuteButton={false} variant="dark" />
      <ManagementHero />
      <WhatIsAircraftManagement />
      <ManagementServices />
      {/* <WhoWeFly /> */}
      <ReadyWhenYouAre />

    </main>
  )
}
