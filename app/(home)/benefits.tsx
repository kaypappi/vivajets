"use client";
import { Badge } from "@/components/ui/badge";
import React from "react";
import BenefitsCard from "@/components/benefits-card";
import { motion } from "framer-motion";

const ourBenefits = [
  {
    title: "Return on investment",
    desc: `Our SALES funnel ensures maximum return 
        on your investment.`,
    image: "/images/safety.png",
  },
  {
    title: "Luxury and Convenience",
    desc: `Enjoy the comfort, privacy, and flexibility of flying
    on a private jet tailored to your needs.`,
    image: "/images/luxury.png",
  },
  {
    title: "Time-Saving",
    desc: `Our crew members are qualified and experienced, this assures you
        the very best treat while you fly.`,
    image: "/images/crew.png",
  },
  {
    title: "Safety and Security",
    desc: `Rest assured knowing that our fleet and 
    operations meet the highest safety standards.`,
    image: "/images/tourists.png",
  },
  {
    title: "Cost-Effective",
    desc: `Fractional ownership allows you to enjoy the 
    benefits of private jet travel at a fraction of 
    the cost of sole ownership.`,
    image: "/images/affordable.png",
  },
  {
    title: "Expertise and Experience",
    desc: `Our dedicated team has the knowledge and
    experience to deliver the best aviation services 
    in the industry.`,
    image: "/images/modern.png",
  },
];

const benefits = () => {
  return (
    <section className="py-10 text-black bg-[#F0F4FF]">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-16 mb-14">
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
            className="col-span-6"
          >
            <Badge
              variant={"nohover"}
              className=" mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2"
            >
              Our Benefits
            </Badge>
            <h3 className=" h3 max-w-sm font-bold">
              Learn More About Private Jet Benefits
            </h3>
          </motion.div>
          <motion.div
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
            className="col-span-6 flex items-end"
          >
            <p className=" p max-w-xl">
              Where Ever you need to go in the world, Vivajet can take you
              there. Our private jet charter with global coverage provides you
              unparalleled freedom to suit your leisure or business travel.
            </p>
          </motion.div>
        </div>

        <BenefitsCard benefits={ourBenefits} />
      </div>
    </section>
  );
};

export default benefits;
