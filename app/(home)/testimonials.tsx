"use client"

import { Badge } from '@/components/ui/badge'
import React from 'react'
import TestimonialCarousel from '@/components/testimonial-carousel'
import { motion } from 'framer-motion'


const testimonialsData = [
    {
        name: 'Accra to United States of America',
        testimony: `I had an amazing experience using VivaJetss. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/privatejet3.png'
    },
    {
        name: 'Lagos to London',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/privatejet2.png'
    },
    {
        name: 'Abuja to Canada',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/privatejet1.png'
    },
]

const carouselOptions = {
    loop: true,
    startIndex: 1,
    inViewThreshold: 1,
}

const testimonials = () => {
    return (
        <section className=' w-full pb-16 '>
            <div className="container pt-16 pb-20 flex flex-col items-center text-center">
                <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }}>
                    <Badge variant={'nohover'} className=' mb-4 bg-dodger-blue bg-opacity-[0.16] text-dodger-blue font-light px-3 py-2'>Testimonials</Badge>
                </motion.div>
                <motion.h3 initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }} className="h3 font-bold max-w-xl text-center mt-8 mb-4">What Client Says About Flights
                </motion.h3>
                <motion.p initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1, transition: { duration: 0.5 } }} viewport={{ once: true }} className='p text-center max-w-xl font-extralight'>With many satisfied and happy client’s to our name, you can trust us to give you nothing less than the best. Here what some of our satified clients have to say about us.

                </motion.p>
            </div>
            <TestimonialCarousel className='mb-10' slides={testimonialsData} options={carouselOptions} />

        </section>
    )
}

export default testimonials