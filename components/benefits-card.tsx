"use client";

import React, { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { ReactComponent as ArrowRight } from "@/public/svgs/arrowcircleright.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

interface benefitsCardProps {
  benefits: {
    title: string;
    desc: string;
    image: string;
  }[];
className?:string
}

const BenefitsCard:React.FC<benefitsCardProps> = ({ benefits,className }) => {
  const [activeBenefit, setActiveBenefit] = React.useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveBenefit((prevActive) => (prevActive + 1) % benefits.length);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [benefits.length, activeBenefit]);

  return (
    <div id="contact-form" className={`text-white grid grid-cols-12  gap-x-6 ${className}`}>
      <div className="col-span-5">
        <Card className="w-full h-full text-black shadow-[0px_0px_15px_0px_rgba(0,0,0,0.09)]  ">
          <CardContent className="p-6">
            <ScrollArea
              type="scroll"
              dir="rtl"
              className=" h-max w-full rounded-md text-end "
            >
              <div className="">
                <div className="flex flex-col gap-y-2">
                  {benefits.map((faq, index) => (
                    <div
                      key={faq.title}
                      onClick={() => setActiveBenefit(index)}
                      className={`text-sm p-4 border ${
                        index === activeBenefit &&
                        "border-transparent text-clay"
                      } relative rounded-md w-full flex items-center font-light cursor-pointer   transition-all duration-500  text-black`}
                    >
                      {index === activeBenefit && (
                        <motion.div
                          className="underline absolute left-0 right-0 bottom-0 top-0 border rounded-md border-clay text-clay"
                          layoutId="benefits-underline"
                        />
                      )}
                      <ArrowRight
                        className={`ml-auto w-6 h-6 ${
                          index === activeBenefit ? "text-clay" : ""
                        }`}
                      />{" "}
                      {faq.title}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-7">
        <Card className="w-full h-full text-white relative flex overflow-hidden ">
          <CardContent className=" w-full h-full ">
            <AnimatePresence>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  animate={{
                    opacity: index === activeBenefit ? 1 : 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="w-full h-full absolute top-0 left-0 right-0 bottom-0 "
                >
                  <Image
                    key={benefit.title}
                    width={700}
                    height={700}
                    className=" w-full h-full absolute top-0 left-0 right-0 bottom-0  object-cover "
                    src={benefit.image}
                    alt={benefit.title}
                    priority
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <div className=" relative z-10 w-full h-full p-6 flex ">
              <h6 className="h6 self-end font-medium max-w-md">
                {" "}
                {benefits[activeBenefit].desc}
              </h6>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BenefitsCard;
