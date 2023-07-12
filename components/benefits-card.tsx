"use client"

import React from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Card, CardContent } from './ui/card'
import { ReactComponent as ArrowRight } from '@/public/svgs/arrowcircleright.svg'
import Image from 'next/image'



interface benefitsCardProps {
    benefits: {
        title: string,
        desc: string,
        image: string,
    }[]
}

const benefitsCard = ({ benefits }: benefitsCardProps) => {
    const [activeBenefit, setActiveBenefit] = React.useState(0)
    return (
        <div className=' text-white grid grid-cols-12  gap-x-6'>
            <div className="col-span-5">
                <Card className="w-full h-full text-black shadow-[0px_0px_15px_0px_rgba(0,0,0,0.09)]  ">

                    <CardContent className='p-6'>
                        <ScrollArea type='scroll' dir='rtl' className=" h-96 w-full rounded-md text-end ">
                            <div className="">
                                <div className='flex flex-col gap-y-2'>
                                    {benefits.map((faq, index) => (
                                        <div onClick={() => setActiveBenefit(index)} className={`text-sm p-4 border rounded-md w-full flex items-center font-light cursor-pointer   transition  text-black ${index !== activeBenefit ? '' : ' border-clay text-clay'}`} key={faq.title}>
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
                        <Image width={700} height={700} className=' w-full h-full  object-cover absolute top-0 left-0 right-0 bottom-0 ' src={benefits[activeBenefit].image} alt={benefits[activeBenefit].title} />
                        <div className=' relative z-10 w-full h-full p-6 flex '>
                            <p className='p self-end   font-extralight'> {benefits[activeBenefit].desc}</p>
                        </div>
                    </CardContent>

                </Card>
            </div>
        </div>
    )
}

export default benefitsCard