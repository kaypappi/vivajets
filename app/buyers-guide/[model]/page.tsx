'use client'
import { useState, useEffect } from "react";
import Header from "@/components/layouts/header";
import TabsNav from "@/components/buyers-guide/tabs-nav";
import Gallery from "@/components/buyers-guide/gallery";
import BuyersGuideDetails from "@/components/buyers-guide/details";

const content: Record<string, { title: string; paragraphs: string[]; images: { src: string; alt: string }[] }> = {
  "global-7500": {
    title: "Bombardier Global 7500",
    paragraphs: [
      "The Bombardier Global 7500 stands in a league of its own as the flagship in the category of ultra‑long‑range business jets. Renowned for its ability to connect almost any two cities on the planet non‑stop, it's a true game‑changer in private aviation. Combining performance, luxury, and cutting‑edge technology, the Global 7500 redefines what a business jet can achieve.",
      
    ],
    images: [
      { src: "https://imq-prod-public.s3.us-east-1.amazonaws.com/image+(13).png", alt: "Bombardier Global 7500 cockpit" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755103723/203_cln61k.jpg", alt: "Bombardier Global 7500 interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755104330/bombardier-challenger-global-7500-2_ygc9z4.webp", alt: "Bombardier Global 7500 window view" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755104373/global-7500-vision-cockpit_wdqipn.avif", alt: "Bombardier Global 7500 engine detail" },
    ],
  },
  "challenger-604": {
    title: "Challenger 605",
    paragraphs: [
      "The Bombardier Challenger 605 is a large-cabin business jet designed for long-range travel, reliability, and comfort. As an upgrade to the Challenger 604, it offers enhanced avionics, a spacious cabin, and efficient fuel consumption, making it a preferred choice for corporate travel, government operations, and private ownership. In the African market, the Challenger 605 stands out due to its versatility and durability. Africa's diverse geography—ranging from remote locations to bustling financial hubs—requires an aircraft that can handle long distances, variable airport infrastructure, and operational efficiency. With a range of around 4,000 nautical miles, it can easily connect major African cities like Johannesburg to Lagos or Nairobi to Accra, as well as reach international business destinations like Dubai or London without refueling.",
    ],
    images: [
      { src: "https://imq-prod-public.s3.us-east-1.amazonaws.com/iStock-1695077051.png", alt: "Challenger 605 side view" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755104954/65e0cd882c351b6c63441ec8_65ca2b990dac03909b097bd0_Challenger-605_20INT_vg237e.webp", alt: "Challenger 605 interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105007/CL-605-Ext-JS_d3izlc.jpg", alt: "Challenger 605 engine" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105038/CH-605-Ext-402A7464__nv1rvn.webp", alt: "Challenger 605 cabin" },
    ],
  },
  g650: {
    title: "Gulfstream G650",
    paragraphs: [
      "A pioneer in the ultra-long-range jet category, the Gulfstream G550 combines performance, reliability, and luxury. Known for its unparalleled range, the G550 is perfect for global travelers seeking efficiency and comfort. Whether it's connecting Lagos to Tokyo or Cape Town to New York, the G550 offers nonstop travel in style.",
    ],
    images: [
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105189/Gulfstream_G650_For_Lease_1_eubigm.jpg", alt: "Gulfstream G550 exterior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105093/Gulfstream-G650-e1632249432496_aueqwm.png", alt: "Gulfstream G550 interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105137/65e0cd8e38b7d4ae41f1f16f_65ca688607e365863f9a2574_g650_20INT_gt9rb4.webp", alt: "Gulfstream G550 seating" },
      { src: "https://imq-prod-public.s3.us-east-1.amazonaws.com/iStock-1006204668.png ", alt: "Gulfstream G550 engine" },
    ],
  },
  "falcon-7x": {
    title: "Dassault Falcon 7X",
    paragraphs: [
      "The Dassault Falcon 7X is a revolutionary trijet that blends performance with unparalleled versatility. Known for its ability to access challenging airports, the Falcon 7X offers unmatched operational efficiency and luxurious comfort. Its unique design makes it a favorite for private owners and businesses requiring global reach with the ability to land in remote or compact locations.",
    ],
    images: [
      { src: "https://imq-prod-public.s3.us-east-1.amazonaws.com/iStock-545456506.png", alt: "Dassault Falcon 7X exterior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105277/sofas_owra4s.webp", alt: "Dassault Falcon 7X interior" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105277/sofas_owra4s.webp", alt: "Dassault Falcon 7X seating" },
      { src: "https://res.cloudinary.com/dljgzevaj/image/upload/v1755105369/Falcon-7X-88-left-side-JS_zwmqz7.jpg", alt: "Dassault Falcon 7X engine" },
    ],
  },
};



interface PageProps {
  params: Promise<{ model: string }>;
}

export default function BuyersGuidePage({ params }: PageProps) {
  const [model, setModel] = useState<string>("global-7500");
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
      setModel(resolvedParams.model || "global-7500");
    });
  }, [params]);

  const key = model as keyof typeof content;
  const data = content[key] ?? content["global-7500"];
  
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

