"use client";

import Image from "next/image";
import { useTranslations } from "@/lib/useTranslations";

const services = (t: (key: string) => string) => [
  {
    title: t("services.list.ops.title"),
    description: t("services.list.ops.description"),
    image: "/assets/images/get_image_1.png",
  },
  {
    title: t("services.list.crew.title"),
    description: t("services.list.crew.description"),
    image: "/assets/images/get_image_2.png",
  },
  {
    title: t("services.list.maintenance.title"),
    description: t("services.list.maintenance.description"),
    image: "/assets/images/get_image_3.png",
  },
  {
    title: t("services.list.finance.title"),
    description: t("services.list.finance.description"),
    image: "/assets/images/get_image_4.png",
  },
  {
    title: t("services.list.compliance.title"),
    description: t("services.list.compliance.description"),
    image: "/assets/images/get_image_5.png",
  },
  {
    title: t("services.list.tripSupport.title"),
    description: t("services.list.tripSupport.description"),
    image: "/assets/images/woman.png",
  },
];

export default function ManagementServices() {
  const { t } = useTranslations('aircraftManagement');
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold special-header mb-12 text-black">
          {t('services.title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services(t).map((service) => (
            <div
              key={service.title}
              className="relative h-[450px] rounded-md overflow-hidden group shadow-md"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="font-semibold special-header text-xl mb-2">{service.title}</h3>
                <p className="text-sm leading-snug">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
