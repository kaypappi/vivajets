"use client"
import { Badge } from '@/components/ui/badge'
import React from 'react'
import BenefitsCard from '@/components/benefits-card'
import { motion } from "framer-motion"


const ourBenefits = [
    {
        title: 'Safety and Security',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Luxury and Comfort',
        desc: `We can not over-emphasise on the luxury and comfort you stand to enjoy 
        while taking a trip with us.`,
        image: '/images/luxury.png',
    },
    {
        title: 'Experienced Crew',
        desc: `Our crew members are qualified and experienced, this assures you
        the very best treat while you fly.`,
        image: '/images/crew.png',
    },
    {
        title: 'Tourist Trips',
        desc: `We are the best plug to very beautiful tourist sites in 
        Nigeria and Africa.`,
        image: '/images/tourists.png',
    },
    {
        title: 'Fast and Affordable',
        desc: `Our services are very fast and affordable, our clients can
        attest to this facts.`,
        image: '/images/affordable.png',
    },
    {
        title: 'Modern Aircrafts',
        desc: `Our aircraft are modern and in the very best flying condition and 
        we assure you that we do constant maintenance of our aircrafts.`,
        image: '/images/modern.png',
    },
]

const benefits = () => {
    return (
        <section className='py-10 text-black bg-[#F0F4FF]'>
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
                        className="col-span-6">
                        <Badge variant={'nohover'} className=' mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2'>Our Benefits</Badge>
                        <h3 className=' h3 max-w-sm font-bold'>Learn More About
                            Private Jet Benefits</h3>
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
                        className="col-span-6 flex items-end">
                        <p className=' p max-w-xl'>
                            Where Ever you need to go in the world, Vivajet can take you there.
                            Our private jet charter with global coverage provides you
                            unparalleled freedom to suit your leisure or business travel.
                        </p>
                    </motion.div>
                </div>

                <BenefitsCard benefits={ourBenefits} />

            </div>
        </section>
    )
}

export default benefits