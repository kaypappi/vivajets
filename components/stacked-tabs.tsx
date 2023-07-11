"use client"
import React, { useEffect, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { motion } from "framer-motion";
import Image from 'next/image';
import { Button } from './ui/button';







const CARD_OFFSET = 30;
const SCALE_FACTOR = 0.04;

function move<T>(array: T[], currentIndex: number, newPosition: number): T[] {
    if (currentIndex < 0 || currentIndex >= array.length || newPosition < 0 || newPosition >= array.length) {
        // Invalid index, return the original array
        return array;
    }


    const item = array[currentIndex];
    array.splice(currentIndex, 1);
    array.splice(newPosition, 0, item);
    return array;
}


interface TabsProps {
    services: Tab[],
    className?: string
}
interface Tab {
    head: {
        title: string,
        icon: string,
        disabled: boolean,
    },
    body: {
        title: string,
        desc: string,
        image: string,
        background: string,
    }
}

const stackedTabs: React.FC<TabsProps> = ({services,className,...props}) => {
    const [tabs, setTabs] = React.useState<Tab[]>([...services])
    const [active, setActive] = React.useState(0)
    const moveToEnd = (from: number) => {
        setTabs(move(tabs, from, 0))
    };

    const tabsHead = services.map((tab, i) => tab.head.title)

    const handleTabClick = (index: string) => {
        //setActive(index);
        //moveToEnd(index);
        const indexx = services.findIndex((tab) => tab.head.title === index)
        setActive(indexx);

    }
    useEffect(() => {
        console.log(active)
        moveToEnd(active);
    }, [active])
    return (
        <Tabs value={tabs[active].head.title} className={`${className}`}>
            <TabsList className=' w-full bg-transparent'>
                {services.map((tab, i) => {
                    return (
                        <TabsTrigger disabled={tab.head.disabled} onClick={() => handleTabClick(tab.head.title)} value={tab} key={tab.head.title} className={`mb-2 text-slate-400 px-6 py-3 rounded-full ${active===i ? 'text-clay border-clay border': ' text-slate-400'}`}>
                            {tab.head.title}
                        </TabsTrigger>
                    )
                })}

            </TabsList>
            <div className=' relative flex items-center w-full justify-center mt-40' >
                <ul className=' relative w-full h-full' >
                    {tabs.map((tab, index) => {
                        const canDrag = index === 0;
                        if(tab.head.disabled){
                            return
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
                                className=' absolute text-white  w-full min-h-max bg-cover bg-center rounded-[2.5rem] p-16 shadow-md'
                                animate={{
                                    top: index * -CARD_OFFSET,
                                    scale: 1 - index * SCALE_FACTOR,
                                    zIndex: tabs.length - index
                                }}
                                drag={canDrag ? "y" : false}
                                dragConstraints={{
                                    top: 0,
                                    bottom: 0
                                }}
                                onDragEnd={() => moveToEnd(index)}

                            >

                                <div className=' grid grid-cols-12 gap-x-4 h-full'>
                                    <div className="col-span-5 flex flex-col h-full">
                                        <h3 className=' h3 font-bold'>{tab.body.title}</h3>
                                        <p className=' p max-w-md mt-6'>{tab.body.desc}</p>
                                        <div className=' mt-auto '>
                                            <Button size={'lg'} variant={'white'}>Get in touch</Button>
                                        </div>
                                    </div>
                                    <div className="col-span-7">
                                        <Image width={1000} height={1000} className='w-full h-full max-w-[35rem] ml-auto max-h-[22rem] object-cover ' src={tab.body.image} alt={tab.body.title} />
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </ul>
            </div>
        </Tabs>
    )
}

export default stackedTabs