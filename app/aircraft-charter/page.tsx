"use client";
import AboutHero from "@/components/about/hero";
import WhatYouGet from "@/components/about/what-you-get";
import WhyChoose from "@/components/about/why-choose";
import WhyVivaJets from "@/components/about/why-vivajets";
import Header from "@/components/layouts/header";
import WhoWeFly from "@/components/about/who-we-fly";
import ReadyWhenYouAre from "@/components/about/ready-when-you-are";
import { useState } from "react";

const AboutPage = () => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <main>
      <Header
        isMuted={isMuted}
        toggleMute={toggleMute}
        showMuteButton={false}
      />
      <AboutHero />
      <WhyChoose />
      <WhatYouGet />
      {/* <WhoWeFly /> */}

      {/* <WhyVivaJets /> */}
      <ReadyWhenYouAre />
    </main>
  );
};

export default AboutPage;
