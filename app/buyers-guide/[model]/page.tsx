'use client'
import { useState, useEffect } from "react";
import Header from "@/components/layouts/header";
import TabsNav from "@/components/buyers-guide/tabs-nav";
import Gallery from "@/components/buyers-guide/gallery";
import BuyersGuideDetails from "@/components/buyers-guide/details";

const content: Record<string, { title: string; paragraphs: string[]; images: { src: string; alt: string }[] }> = {
  // "global-7500": {
  //   title: "Bombardier Global 7500",
  //   paragraphs: [
  //     "The Bombardier Global 7500 stands in a league of its own as the flagship in the category of ultra‑long‑range business jets. Renowned for its ability to connect almost any two cities on the planet non‑stop, it's a true game‑changer in private aviation. Combining performance, luxury, and cutting‑edge technology, the Global 7500 redefines what a business jet can achieve",
      
  //   ],
  //   images: [
  //     { src: "https://imq-prod-public.s3.us-east-1.amazonaws.com/image+(13).png", alt: "Bombardier Global 7500 cockpit" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755103723/203_cln61k.jpg", alt: "Bombardier Global 7500 interior" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755104330/bombardier-challenger-global-7500-2_ygc9z4.webp", alt: "Bombardier Global 7500 window view" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755104373/global-7500-vision-cockpit_wdqipn.avif", alt: "Bombardier Global 7500 engine detail" },
  //   ],
  // },
  "challenger-604": {
    title: "Challenger 604",
    paragraphs: [
      "The Bombardier Challenger 604 is a proven large‑cabin business jet known for reliability, range, and comfort. Favored by corporations and private owners alike, it delivers a spacious cabin with excellent operating economics. With a range of around 4,000 nautical miles, it connects key African cities—such as Johannesburg to Lagos or Nairobi to Accra—and reaches hubs like Dubai or London with ease.",
    ],
    images: [
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757889013/CDY_3_x99xkn.jpg", alt: "Challenger 604 side view" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757402914/95fe4380b0283236ed9bb29c40abb89ad180f459_dttkf1.jpg", alt: "Challenger 604 interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_6_mkatqi.jpg", alt: "Challenger 604 engine" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757402973/778a3b9c0e4ee888a76cba850daa6d865ff8c663_aklncs.jpg", alt: "Challenger 604 cabin" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757889015/CDY_26_pnfxji.jpg", alt: "Challenger 604 engine" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757403065/c76e59b54b6b9f33043a13f62de252f68f7242c5_inhdat.jpg", alt: "Challenger 604 cabin" },
    ],
  },
  "hawker-900xp": {
    title: "Hawker 900XP",
    paragraphs: [
      "The Hawker 900XP is a versatile midsize jet that blends range, efficiency, and comfort. Well‑suited to Africa’s diverse operating conditions, it offers strong short‑field performance and reliable operations into secondary airports. With a range near 2,800 nautical miles, it efficiently connects regional and international business hubs.",
    ],
    images: [
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757403289/af51d1e07e0ea9dbd351cdc1d1f3d6edade30724_oeoixd.jpg", alt: "Hawker 900XP exterior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757403282/0279257d18bc0af242cd503cdce2363e9440a127_yqpxqr.jpg", alt: "Hawker 900XP interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757403346/aad7548f58fdbc5ed230add36f570782d15a79f1-min_utnlf3.jpg", alt: "Hawker 900XP seating" },
      // { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117367/65afca92948f1867c7d148fe_53416350560_890915179a_k_ixncgk.webp", alt: "Hawker 900XP engine" },
    ],
  },
  // "hawker-850xp": {
  //   title: "Hawker 850XP",
  //   paragraphs: [
  //     "The Hawker 850XP combines robust performance with outstanding value in the midsize category. Its winglets and optimized aerodynamics improve climb and cruise efficiency, while the comfortable cabin supports productive travel for business teams. With range around 2,600 nautical miles, it's ideal for regional and medium‑haul missions.",
  //   ],
  //   images: [
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117661/hawker-800-800xp-1_fbhw2z.webp", alt: "Hawker 850XP exterior" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117661/1682544926_gf29sj.jpg", alt: "Hawker 850XP interior" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117662/PRIVAIRA-HAWKER-850-N858XP-interior-1024x767_k1g7ur.jpg", alt: "Hawker 850XP seating" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117662/hawker-beechcraft-850xp_mynmv5.jpg", alt: "Hawker 850XP engine" },
  //   ],
  // },
  // "legacy-600": {
  //   title: "Legacy 600",
  //   paragraphs: [
  //     "The Embraer Legacy 600 is a super‑midsize jet offering a large, comfortable cabin and exceptional baggage capacity. With robust systems derived from Embraer's commercial lineage, it delivers dependable operations and competitive operating costs. Its ~3,400 nm range supports intercontinental travel and high‑utilization missions across Africa and beyond.",
  //   ],
  //   images: [
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117972/Embraer_ERJ-135BJ_Legacy_600__London_Executive_Aviation_JP6974088_ctd7ud.jpg", alt: "Legacy 600 exterior" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117972/interior_07_kpkfmm.webp", alt: "Legacy 600 interior" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117973/Legacy_600_npvnu1.jpg", alt: "Legacy 600 seating" },
  //     { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1757117974/Legacy_650E_09_1600x1200_bouonv.jpg", alt: "Legacy 600 cabin" },
  //   ],
  // },
};



interface PageProps {
  params: Promise<{ model: string }>;
}

export default function BuyersGuidePage({ params }: PageProps) {
  const [model, setModel] = useState<string>("challenger-604");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
      setModel(resolvedParams.model || "challenger-604");
    });
  }, [params]);

  const key = model as keyof typeof content;
  const data = content[key] ?? content["challenger-604"];
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-[ghostwhite]">
     <Header 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        showMuteButton={false}
        variant="dark"
      />

      <main className="max-w-7xl mx-auto px-4 pt-28 pb-16">
        <div className="mb-8">
          <TabsNav />
        </div>

        <section className="mb-8">
          <h1 className="special-header text-4xl md:text-5xl tracking-tight text-black">{data.title}</h1>
          <div className="mt-4 space-y-4 text-neutral-400 leading-7 ">
            {data.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <Gallery images={data.images} />
        </section>

        <BuyersGuideDetails model={key as string} />
      </main>
    </div>
  );
}

