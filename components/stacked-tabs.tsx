"use client";
import React, { useEffect, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button, ButtonProps, ButtonVariantProps } from "./ui/button";
import { VariantProps } from "class-variance-authority";
import Link from "next/link";

const CARD_OFFSET = 30;
const SCALE_FACTOR = 0.04;

function move<T>(array: T[], currentIndex: number, newPosition: number): T[] {
  if (
    currentIndex < 0 ||
    currentIndex >= array.length ||
    newPosition < 0 ||
    newPosition >= array.length
  ) {
    // Invalid index, return the original array
    return array;
  }

  const newArray = [...array];
  const item = newArray[currentIndex];
  newArray.splice(currentIndex, 1);
  newArray.splice(newPosition, 0, item);
  return newArray;
}

export interface TabsProps {
  services: Tab[];
  className?: string;
}
export interface Tab {
  head: {
    title: string;
    icon: null | Function;
    disabled: boolean;
    id: number;
  };
  body: {
    title: string;
    desc: string;
    image: string;
    background: string;
    cta: {
      text: string;
      link: string;
      variant: ButtonVariantProps;
      isExternal: boolean;
    }[];
  };
}

const StackedTabs: React.FC<TabsProps> = ({
  services,
  className,
  ...props
}) => {
  const [tabs, setTabs] = React.useState<Tab[]>([...services]);
  const [active, setActive] = React.useState(0);
  const moveToEnd = (from: number) => {
    setTabs(move(tabs, from, 0));
  };

  const handleTabClick = (index: string) => {
    const indexx = services.findIndex((tab) => tab.head.title === index);
    setActive(indexx);
  };
  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.head.id === active);
    moveToEnd(index);
  }, [active]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setActive((prevActive) => (prevActive + 1) % services.length);
    }, 7000);

    return () => clearTimeout(timeout);
  }, [services.length,active]);

  return (
    <Tabs value={services[active].head.title} className={`${className}`}>
      <TabsList className=" w-full bg-transparent">
        <motion.div
          variants={{
            hidden: { y: 100 },
            show: {
              y: 0,
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
          className=" w-full flex flex-wrap justify-center"
        >
          {services.map((tab, i) => {
            return (
              <motion.div
                key={tab.head.title}
                variants={{
                  hidden: {
                    y: 100,
                    opacity: 0,
                  },
                  show: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.5,
                    },
                  },
                }}
              >
                <TabsTrigger
                  disabled={tab.head.disabled}
                  onClick={() => handleTabClick(tab.head.title)}
                  value={tab.head.title}
                  key={tab.head.title}
                  className={`mb-2 hidden md:block text-slate-400 transition-all relative duration-500 font-extralight border border-transparent px-6 py-3 rounded-full data-[state=active]:text-clay  `}
                >
                    {i === active && (
                        <motion.div
                        transition={{
                            duration: 0.5,
                        }}
                          className="underline absolute left-0 right-0 bottom-0 top-0 border rounded-full border-clay text-clay"
                          layoutId="tabsborder"
                        />
                      )}
                  {tab.head.title} {tab.head.icon && tab.head.icon()}
                </TabsTrigger>
              </motion.div>
            );
          })}
        </motion.div>
      </TabsList>
      <div className=" relative flex items-center w-full justify-center mt-32">
        <ul className=" relative w-full h-full">
          {tabs.map((tab, index) => {
            const canDrag = index === 0;
            if (tab.head.disabled) {
              return;
            }
            return (
              <motion.div
                key={tab.head.title}
                style={{
                  cursor: canDrag ? "grab" : "auto",
                  transformOrigin: "top center",
                  listStyle: "none",
                  backgroundColor: tab.body.background,
                }}
                className=" absolute text-white  w-full min-h-max  bg-cover bg-center rounded-[2.5rem] p-8 lg:p-8 xl:p-16 pb-14 lg:pb-8 shadow-md"
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: tabs.length - index,
                }}
               onClick={() => handleTabClick(tab.head.title)}
              >
                <div className=" grid grid-cols-12 gap-x-4 h-full lg:min-h-[500px] xl:min-h-[400px]">
                  <div className="col-span-12 lg:col-span-5 mt-4 lg:mt-0 order-2 lg:order-1 flex flex-col h-full">
                    <h3 className=" h3 font-bold">{tab.body.title}</h3>
                    <p className=" p lg:max-w-md mt-6 mb-10">{tab.body.desc}</p>
                    <div className=" mt-auto flex lg:flex-col xl:flex-row gap-4">
                      {tab.body.cta.map((cta) => (
                        <Button
                          key={cta.text}
                          variant={cta.variant}
                          className="lg:w-full xl:w-auto "
                          size={'lg'}
                          asChild
                        >
                          
                          <Link target={cta.isExternal? '_blank':'_self'} href={cta.link}>{cta.text}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-7 order-1 lg:order-2">
                    <Image
                      width={1000}
                      height={1000}
                      className="w-full aspect-video lg:h-full lg:max-w-[35rem] ml-auto  rounded-[0.8125rem] object-cover "
                      src={tab.body.image}
                      alt={tab.body.title}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </ul>
      </div>
    </Tabs>
  );
};

export default StackedTabs;
