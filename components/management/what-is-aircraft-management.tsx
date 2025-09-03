"use client";

import Image from "next/image";
import { useTranslations } from "@/lib/useTranslations";

export default function WhatIsAircraftManagement() {
  const { t } = useTranslations('aircraftManagement');
  return (
    <section
      className="relative py-32 bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/images/magt.png')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto sm:px-0 px-3 text-white">
        <h2 className="text-4xl md:text-5xl font-bold special-header mb-6">
          {t('whatIs.title')}
        </h2>
        <p className="text-sm md:text-lg leading-relaxed max-w-5xl">
          {t('whatIs.body')}
        </p>
        <p className="text-sm md:text-lg leading-relaxed mt-4 max-w-5xl">
          {t('whatIs.body2')}
        </p>
      </div>
    </section>
  );
}
