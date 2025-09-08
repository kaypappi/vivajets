"use client";
import Header from "@/components/layouts/header";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "@/lib/useTranslations";

export default function ContactPage() {
  const { t } = useTranslations();
  return (
    <main className="relative min-h-screen ">
      {/* Sky background image */}
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/images/cloudbg.svg)' }}
      >
        <div className="absolute inset-0 bg-white/60" />
      </div>

      <Header isMuted={false} toggleMute={() => {}} showMuteButton={false} variant="dark" />

      <div className="container mx-auto px-4 pt-80 pb-20">
        <h1 className="special-header text-5xl md:text-7xl text-black mb-16">{t('contact.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard
            icon={<Phone className="text-green-600" size={22} />}
            title={t('contact.whatsapp.title')}
            description={t('contact.whatsapp.description')}
          >
            <a href={`https://wa.me/2348111113660`} className="text-sm text-black font-medium hover:underline">{t('contact.whatsapp.phone')}</a>
          </ContactCard>

          <ContactCard
            icon={<Phone className="text-blue-600" size={22} />}
            title={t('contact.call.title')}
            description={t('contact.call.description')}
          >
            <a href={`tel:${t('contact.call.phone')}`} className="text-sm text-black font-medium hover:underline">{t('contact.call.phone')}</a>
          </ContactCard>

          <ContactCard
            icon={<Phone className="text-blue-600" size={22} />}
            title={t('contact.mobile.title')}
            description={t('contact.mobile.description')}
          >
            <a href={`tel:${t('contact.mobile.phone')}`} className="text-sm text-black font-medium hover:underline">{t('contact.mobile.phone')}</a>
          </ContactCard>

          <ContactCard
            icon={<Mail className="text-blue-600" size={22} />}
            title={t('contact.email.title')}
            description={t('contact.email.description')}
          >
            <a href={`mailto:${t('contact.email.address')}`} className="text-sm text-black font-medium hover:underline">{t('contact.email.address')}</a>
          </ContactCard>

          <ContactCard
            icon={<MapPin className="text-blue-600" size={22} />}
            title={t('contact.office.title')}
            description={t('contact.office.description')}
          >
            <a
              href={t('contact.office.mapUrl')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black font-medium hover:underline"
            >
              {t('contact.office.address')}
            </a>
          </ContactCard>
        </div>
      </div>
    </main>
  );
}

function ContactCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white/90 backdrop-blur  p-6 -sm">
      <div className="w-9 h-9 rounded-md bg-blue-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold special-header text-black">{title}</h3>
      <p className="text-sm text-neutral-600 mt-2 mb-6">{description}</p>
      {children}
    </div>
  );
}
