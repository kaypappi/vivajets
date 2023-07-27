"use client";

import React, { useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Card, CardContent } from "./ui/card";
import { ReactComponent as ArrowRight } from "@/public/svgs/arrowcircleright.svg";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { is } from "date-fns/locale";

interface benefitsCardProps {
  benefits: {
    title: string;
    desc: string;
    image: string;
  }[];
  className?: string;
}

const MobileBenefitsCard: React.FC<benefitsCardProps> = ({
  benefits,
  className,
}) => {
  const [activeBenefit, setActiveBenefit] = React.useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveBenefit((prevActive) => (prevActive + 1) % benefits.length);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [benefits.length, activeBenefit]);

  return (
    <div
      id="contact-form"
      className={`text-white grid grid-cols-12  gap-x-6 ${className}`}
    >
      <div className="col-span-12 lg:col-span-5">
        <Card className="w-full h-full text-black shadow-[0px_0px_15px_0px_rgba(0,0,0,0.09)]  ">
          <CardContent className="p-6">
            <ScrollArea
              type="scroll"
              className=" h-max w-full rounded-md text-start "
            >
              <div className="">
                <div className="flex flex-col gap-y-2">
                  {benefits.map((faq, index) => {
                    const isOpen = index === activeBenefit;
                    return (
                      <div
                        key={faq.title}
                        onClick={() => setActiveBenefit(index)}
                        className={`text-sm p-4 border ${
                          index === activeBenefit &&
                          "lg:border-transparent bg-[#EAEFFF] lg:bg-transparent  lg:text-clay"
                        } relative rounded-md w-full flex flex-col  items-center font-light cursor-pointer   transition-all duration-500  text-black`}
                      >
                        <div className="w-full flex justify-between items-center lg:mb-0">

                          {faq.title}
                          <AnimatePresence initial={false} mode="wait">
                            <motion.div
                              key={isOpen ? "minus" : "plus"}
                              initial={{
                                rotate: 0,
                              }}
                              animate={{
                                rotate: isOpen ? 270 : 0,
                                transition: {
                                  type: "tween",
                                  duration: 0.15,
                                  ease: "circOut",
                                },
                              }}
                              exit={{
                                rotate: 0,
                                transition: {
                                  type: "tween",
                                  duration: 0.15,
                                  ease: "circIn",
                                },
                              }}
                            >
                              <ArrowRight
                                className={`ml-auto w-6 h-6 transition-all ${
                                  index === activeBenefit ? "text-clay" : ""
                                }`}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </div>
                        <motion.div
                          id={faq.title}
                          initial={false}
                          animate={
                            isOpen
                              ? {
                                  height: "auto",
                                  opacity: 1,
                                  display: "block",
                                  transition: {
                                    height: {
                                      duration: 0.4,
                                    },
                                    opacity: {
                                      duration: 0.25,
                                      delay: 0.3,
                                    },
                                  },
                                }
                              : {
                                  height: 0,
                                  opacity: 0,
                                  transition: {
                                    height: {
                                      duration: 0.4,
                                    },
                                    opacity: {
                                      duration: 0.25,
                                    },
                                  },
                                  transitionEnd: {
                                    display: "none",
                                  },
                                }
                          }
                          className="font-light text-brand/80 mt-2 text-start w-full"
                        >
                          {faq.desc}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MobileBenefitsCard;
