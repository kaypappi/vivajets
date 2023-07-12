"use client"
import { Badge } from '@/components/ui/badge'
import { ReactComponent as AirPlane } from '@/public/svgs/airplane.svg'
import { ReactComponent as Certificate } from '@/public/svgs/certificate.svg'
import { ReactComponent as Pilot } from '@/public/svgs/pilot.svg'
import { motion } from 'framer-motion'
import React from 'react'


const services = [
    {
        title: 'Luxury Flight',
        desc: `Seat back, relax and be treated 
        right by our top notch services as 
        we take you to your destination`,
        icon: () => (<AirPlane className=' mb-4 w-12 h-12' />)
    },
    {
        title: 'Best Services',
        desc: `We offer you the best services an airline 
        company can offer you out here. Trust Vivajet to give you the very best`,
        icon: () => (<Certificate className=' mb-4 w-12 h-12' />)
    },
    {
        title: 'Certified Pilot',
        desc: `All of our pilots are certified and 
        this is certain, so be sure to be cared 
        for by professionals`,
        icon: () => (<Pilot className=' mb-4 w-12 h-12' />)
    },
]

const about = () => {
    return (
        <section className='bg-[#FFF8F2] w-full'>
            <div className=' container text-black py-16 flex flex-col items-center'>
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Badge variant={'nohover'} className=' mb-4 bg-dodger-blue bg-opacity-[0.16] text-dodger-blue font-light px-3 py-2'>About Us</Badge>
                </motion.div>
                <motion.h3 initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }} className="h3 font-bold max-w-lg text-center mt-8 mb-4">A Falcon Aerospace Tailored
                    For You</motion.h3>
                <motion.p initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }} className='p text-center opacity-70 max-w-4xl font-extralight'>VivaJets is a trademark/trade-name for Falcon Aerospace Company. A registered Business Aviation company in Nigeria.
                    Our focus is to provide exclusive all-round aviation services to our clients while ensuring we increase accessibility to
                    business aviation in Africa
                </motion.p>
                <motion.div
                    variants={{
                        hidden: {
                            y: 0,
                            opacity: 1
                        },
                        show: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                                staggerChildren: 0.3,
                                delayChildren: 0.3
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className=' grid grid-cols-12 gap-x-16  mt-14'>
                    {
                        services.map(service => (
                            <motion.div
                                key={service.title}
                                variants={{
                                    hidden: {
                                        x: -50,
                                        opacity: 0
                                    },
                                    show: {
                                        x: 0,
                                        opacity: 1,
                                        transition: {
                                            duration: 0.5
                                        }
                                    }
                                }}
                                className="col-span-4">
                                <div className="flex flex-col items-center">
                                    {service.icon()}
                                    <h5 className="h5 mb-3">{service.title}</h5>
                                    <p className="p max-w-xs opacity-60 text-center font-extralight">
                                        {service.desc}</p>
                                </div>
                            </motion.div>
                        ))
                    }
                </motion.div>
            </div>
        </section>
    )
}

export default about