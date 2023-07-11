import { Badge } from '@/components/ui/badge'
import React from 'react'
import BenefitsCard from '@/components/benefits-card'


const ourBenefits = [
    {
        title: 'Safety and Security',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Luxury and Comfort',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Experienced Crew',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Tourist Trips',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Fast and Affordable',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
    {
        title: 'Modern Aircrafts',
        desc: `Your safety and security is a priority to us, we make sure that all 
        regulations and proper information are duly given prior to each flight.`,
        image: '/images/safety.png',
    },
]

const benefits = () => {
    return (
        <div className='py-10 text-black bg-[#F0F4FF]'>
            <div className="container">
                <div className="grid grid-cols-12 gap-x-16 mb-14">
                    <div className="col-span-6">
                        <Badge variant={'nohover'} className=' mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2'>Our Benefits</Badge>
                        <h3 className=' h3 max-w-sm font-bold'>Learn More About
                            Private Jet Benefits</h3>
                    </div>
                    <div className="col-span-6 flex items-end">
                        <p className=' p max-w-xl'>
                            Where Ever you need to go in the world, Vivajet can take you there.
                            Our private jet charter with global coverage provides you
                            unparalleled freedom to suit your leisure or business travel.
                        </p>
                    </div>
                </div>
                
                    <BenefitsCard benefits={ourBenefits} />
                
            </div>
        </div>
    )
}

export default benefits