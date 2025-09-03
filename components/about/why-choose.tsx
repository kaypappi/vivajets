
import Image from "next/image";
import { useTranslations } from "@/lib/useTranslations";

const features = (t: (key: string) => string) => [
  {
    icon: "/assets/images/people.svg",
    title: t("whyCharter.features.f1.title"),
    description: t("whyCharter.features.f1.desc"),
  },
  {
    icon: "/assets/images/building.svg",
    title: t("whyCharter.features.f2.title"),
  },
  {
    icon: "/assets/images/controls.svg",
    title: t("whyCharter.features.f3.title"),
  },
  {
    icon: "/assets/images/chair.svg",
    title: t("whyCharter.features.f4.title"),
  },
  {
    icon: "/assets/images/Group.svg",
    title: t("whyCharter.features.f5.title"),
  },
];

const WhyChoose = () => {
  const { t } = useTranslations('aircraftCharter');
  return (
    <section
      className="py-10 sm:py-20 bg-cover bg-center sm:pt-64"
      style={{ backgroundImage: "url('/assets/images/why-choose-section.png')" }}
    >
      <div className="container mx-auto px-4 pt-20 text-white">
        <div className="mb-20 text-left sm:text-center">
          <h2 className="text-4xl md:text-5xl font-bold special-header">{t('whyCharter.title')}</h2>
          <p className="max-w-5xl mt-4 text-lg mx-0 sm:mx-auto">
            {t('whyCharter.intro')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16 mt-10">
          {features(t).map((feature, index) => (
            <div key={index} className="flex items-start gap-4 py-5">
              <Image src={feature.icon} alt="" width={40} height={40} />
              <div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                {feature.description && <p className="text-white">{feature.description}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="relative">
          <Image
            src="/assets/images/why_image.png"
            alt="Man in a private jet"
            width={1200}
            height={600}
            className="rounded-lg mx-auto"
          />
        
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
