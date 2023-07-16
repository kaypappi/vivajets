"use client"

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Card, CardContent } from './ui/card'
import { ReactComponent as ArrowRight } from '@/public/svgs/arrowcircleright.svg'
import Image from 'next/image'
import { motion } from 'framer-motion'



interface benefitsCardProps {
    benefits: {
        title: string,
        desc: string,
        image: string,
    }[]
}

const BenefitsCard = ({ benefits }: benefitsCardProps) => {
    const [activeBenefit, setActiveBenefit] = React.useState(0)
    return (
        <div className=' text-white grid grid-cols-12  gap-x-6'>
            <div className="col-span-5">
                <Card className="w-full h-full text-black shadow-[0px_0px_15px_0px_rgba(0,0,0,0.09)]  ">

                    <CardContent className='p-6'>
                        <ScrollArea type='scroll' dir='rtl' className=" h-max w-full rounded-md text-end ">
                            <div className="">
                                <div className='flex flex-col gap-y-2'>
                                    {benefits.map((faq, index) => (
                                        <div key={faq.title} onClick={() => setActiveBenefit(index)} className={`text-sm p-4 border rounded-md w-full flex items-center font-light cursor-pointer   transition-all duration-500  text-black ${index !== activeBenefit ? '' : ' border-clay text-clay'}`}>
                                            <ArrowRight className={`ml-auto w-6 h-6 ${index === activeBenefit ? 'text-clay' : ''}`} />  {faq.title}
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

                    <CardContent className=' w-full h-full '>
                        <motion.div
                            key={benefits[activeBenefit].image}
                            initial={{
                                opacity: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            
                            className='w-full h-full absolute top-0 left-0 right-0 bottom-0 '>
                            {benefits.map((benefit, index) => (
                                <Image key={benefit.title} style={{ zIndex: index === activeBenefit ? 1 : 0 }} width={700} height={700} className=' w-full h-full absolute top-0 left-0 right-0 bottom-0  object-cover ' src={benefit.image} alt={benefit.title} />
                            ))}
                        </motion.div>
                        <div className=' relative z-10 w-full h-full p-6 flex '>
                            <h6 className='h6 self-end font-medium max-w-md'> {benefits[activeBenefit].desc}</h6>
                        </div>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default BenefitsCard