"use client";
import { Badge } from "@/components/ui/badge";
import { ReactComponent as AirPlane } from "@/public/svgs/airplane.svg";
import { ReactComponent as Certificate } from "@/public/svgs/certificate.svg";
import { ReactComponent as Moneybag } from "@/public/svgs/moneybag.svg";
import { motion } from "framer-motion";
import React from "react";

const services = [
  {
    title: "World-Class Services",
    desc: `Experience perfection and luxury with our world-class services tailored to your desires.`,
    icon: () => <Certificate className=" w-12 h-12" />,
  },
  {
    title: "Luxury Flight",
    desc: `Fly in comfort and style with our luxury flights. From exclusive lounges to elegant cabins, every detail exudes sophistication.`,
    icon: () => <AirPlane className=" w-12 h-12" />,
  },

  {
    title: "Maximum Returns",
    desc: `Enjoy remarkable returns with fractional ownership. Join a thriving community of high-net-worth individuals, access high-value assets, and grow your portfolio confidently.`,
    icon: () => <Moneybag className=" w-12 h-12" />,
  },
];

const slashMotion = {
  rest: { opacity: 1, ease: "easeOut", duration: 0.2 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const about = () => {
  return (
    <section
      id="about"
      className="bg-[#FFF8F2] w-full mt-20 md:mt-[50rem] lg:mt-28 xl:mt-20 "
    >
      <div className=" container text-black py-16 flex flex-col items-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
        >
          <Badge
            variant={"nohover"}
            className=" mb-4 bg-dodger-blue bg-opacity-[0.16] text-dodger-blue font-light px-3 py-2"
          >
            About Us
          </Badge>
        </motion.div>
        <motion.h3
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          className="h3 font-bold max-w-3xl capitalize text-center mt-4 mb-4"
        >
          Empowering your investments with an Extraordinary experience.
        </motion.h3>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          viewport={{ once: true }}
          className="p text-center opacity-70 max-w-5xl font-extralight"
        >
          VIVAJETS provides a full range of Aircraft Management Services,
          fractional ownership opportunities, and Aircraft sales and
          acquisition, built upon its broad experience in the business aviation
          industry. Our expertise ensures uncompromising safety, lower
          operational costs, efficient asset management, and maximum return on
          investment.
        </motion.p>
        <motion.div
          variants={{
            hidden: {
              y: 0,
              opacity: 1,
            },
            show: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                staggerChildren: 0.3,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className=" grid grid-cols-12 gap-y-8 gap-x-4 xl:gap-x-16  mt-14"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              whileHover="hover"
              variants={{
                hidden: {
                  x: -50,
                  opacity: 0,
                },
                show: {
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                  },
                },
              }}
              className=" col-span-12 md:col-span-4"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  variants={{
                    hover: {
                      y: [0, 10, 5, 10],
                      backgroundColor: "#D6E0FF",
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className=" rounded-md w-[3.75rem] h-[3.75rem] flex items-center justify-center mb-4 "
                >
                  {service.icon()}
                </motion.div>
                <h5 className="text-xl lg:text-2xl mb-3">{service.title}</h5>
                <p className="text-sm lg:text-base max-w-xs opacity-60 text-center font-extralight">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default about;
