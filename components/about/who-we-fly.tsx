import React from 'react';
import Image from 'next/image';

function WhoWeFly() {
  return (
    <section className="relative h-screen bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Cloud Background */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/main_cloud_bg.png"
          alt="Cloud background"
          fill
          className="object-cover opacity-70"
        />
      </div>

      {/* Main Content container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Central Image */}
        <div className="relative w-[550px] h-[650px] md:w-[600px] md:h-[700px]">
          <Image
            src="/assets/images/who_we_fly.png"
            alt="Who We Fly - Central Image"
            fill
            className="object-contain"
          />
        </div>

        {/* Floating Images */}
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/assets/images/float_1.png"
            alt="Busy Executives"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/assets/images/float_2.png"
            alt="Celebrities and Public Figures"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/assets/images/float_4.png"
            alt="Anyone Who Wants Flying To Feel Less Like A Task"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 w-64 h-64 md:w-96 md:h-96">
          <Image
            src="/assets/images/float_5.png"
            alt="Medical Teams"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default WhoWeFly;

