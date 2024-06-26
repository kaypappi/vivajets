"use client";

import { Badge } from "@/components/ui/badge";
import StackedTabs, { Tab } from "@/components/stacked-tabs";
import { motion } from "framer-motion";

import { useBreakpoint } from "@/hooks/tailwind";
import ServicesMobileCarousel from "@/components/services-mobile-carousel";

let ourservices: Tab[] = [
  {
    head: {
      title: "Private & Business Jet Charter",
      icon: null,
      disabled: false,
      id: 0,
    },
    body: {
      title: `Private & Business
      Jet Charter`,
      desc: `Experience the luxury and convenience of flying on
      a private jet. Our fleet of meticulously maintained 
      aircraft offers the ultimate in comfort and style. 
      From short-haul trips to long-distance journeys, 
      our dedicated team ensures every detail is taken care of, 
      providing you with a seamless travel experience.`,
      image: "/images/privatejet.png",
      background: "#131656",
      cta: [
        {
          text: "Get In Touch",
          link: "/contact",
          variant: "white",
          isExternal: false,
        },
      ],
    },
  },
  {
    head: {
      title: "Aircraft Management",
      icon: null,
      disabled: false,
      id: 1,
    },
    body: {
      title: "Aircraft Management",
      desc: `Maximize the value of your aircraft with our 
      comprehensive management services. With our team of 
      experienced professionals, we handle all aspects of 
      aircraft operations, including maintenance, crewing, 
      scheduling, and logistics. Let us take the worry out of 
      aircraft ownership, so you can enjoy your investment 
      to the fullest.`,
      image: "/images/aircraftmanagement.png",
      background: "#996633",
      cta: [
        {
          text: "Get In Touch",
          link: "/contact",
          variant: "white",
          isExternal: false,
        },
      ],
    },
  },
  {
    head: {
      title: "Aircraft Fractional Ownership",
      icon: null,
      disabled: false,
      id: 2,
    },
    body: {
      title: "Fractional Ownership",
      desc: `Experience the benefits of owning a private jet without
      the full financial commitment. Our fractional ownership
      program allows you to own a share of an aircraft, giving
      you access to all the perks of private jet travel at a 
     fraction of the cost. Enjoy the flexibility and convenience
      of flying at your own pace, while we handle the 
     maintenance and management of the aircraft.`,
      image: "/images/fractionalownership.png",
      background: "#0D0E2B",
      cta: [
        {
          text: "Get In Touch",
          link: "/contact",
          variant: "white",
          isExternal: false,
        },
        {
          text: "Download Brochure",
          link: "https://drive.google.com/file/d/12PUjTMwNPjfCmKtF2a5wSdUELf_rUsg2/view?usp=drive_link",
          variant: "outline",
          isExternal: true,
        },
      ],
    },
  },
  {
    head: {
      title: `Sales and Acquisition`,
      icon: null,
      disabled: false,
      id: 3,
    },
    body: {
      title: `Streamlined Sales and 
      Acquisition Services`,
      desc: `Looking to buy or sell an aircraft? Our streamlined sales 
      and acquisition services cater to your unique requirements. 
      Whether you are seeking the perfect aircraft to add to your 
      collection or are ready to part ways with your current one, 
      our experienced team leverages their extensive industry 
      knowledge and network to ensure a smooth and successful 
      transaction. Trust us to guide you through the process, providing 
      expert advice and personalized solutions every step of the way.`,
      image: "/images/sales.png",
      background: "#613810",
      cta: [
        {
          text: "Get In Touch",
          link: "/contact",
          variant: "white",
          isExternal: false,
        },
        {
          text: "Download Brochure",
          link: "https://drive.google.com/file/d/12PUjTMwNPjfCmKtF2a5wSdUELf_rUsg2/view?usp=drive_link",
          variant: "outline",
          isExternal: true,
        },
      ],
    },
  },
];
const Services = () => {
  const isDesktop =
  typeof window !== 'undefined' && window.matchMedia("(min-width: 768px)").matches;
  return (
    <section
      id="services"
      className=" container mx-auto py-10  lg:min-h-[60rem]"
    >
      <div className="grid grid-cols-12 gap-x-4">
        <motion.div
          initial={{
            x: -50,
          }}
          whileInView={{
            x: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
          className=" col-span-12 lg:col-span-6"
        >
          <Badge
            variant={"nohover"}
            className=" mb-0 lg:mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2"
          >
            Our Services
          </Badge>
          <h3 className=" h3 my-4 lg:my-0 max-w-xl font-bold">
            Experience the fusion of innovation, luxury and travel
          </h3>
        </motion.div>
        <div className="col-span-12 lg:col-span-6 flex items-end">
          <motion.p
            initial={{
              x: 50,
            }}
            whileInView={{
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
            }}
            className=" p w-full lg:max-w-lg text-brand/80"
          >
         Enjoy the benefits of private jet charter, luxury and aircraft ownership for a fraction of the cost with Vivajets, you can trust us to give you an experience of a lifetime while empowering your aviation investment today and for future legacies.
          </motion.p>
        </div>
      </div>
      {isDesktop ? (
        <StackedTabs services={ourservices} className="mt-16 mb-34 " />
      ) : (
        <ServicesMobileCarousel services={ourservices} className="mt-10" />
      )}
     
    </section>
  );
};

export default Services;
