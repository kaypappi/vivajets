import { Badge } from '@/components/ui/badge'
import React from 'react'
import TestimonialCarousel from '@/components/testimonial-carousel'


const testimonialsData = [
    {
        name: 'Chioma Johnson',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/sunglass-girl.png'
    },
    {
        name: 'Barry James',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/sunglass-girl.png'
    },
    {
        name: 'Michel Owen',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/sunglass-girl.png'
    },
    {
        name: 'Nicki Minaj',
        testimony: `I had an amazing experience using Vivajets. The entire process was seamless and efficient, from selecting the jet to booking the flight. The platform provided a wide range of jet options and I was able to find one that perfectly suited my needs. The customer support was exceptional, always available to answer my questions and ensure a smooth experience. I highly recommend the jet hiring platform to anyone looking for a convenient and hassle-free way to book private jets.`,
        image: '/images/sunglass-girl.png'
    },
]

const carouselOptions = {
    loop:true,
    startIndex: 1,
    inViewThreshold: 1,
}

const testimonials = () => {
    return (
        <section className=' w-full '>
            <div className="container py-16 flex flex-col items-center text-center">
                <Badge variant={'nohover'} className=' mb-4 bg-dodger-blue bg-opacity-[0.16] text-dodger-blue font-light px-3 py-2'>Testimonials</Badge>
                <h3 className="h3 font-bold max-w-xl text-center mt-8 mb-4">What Client Says About Flights
                </h3>
                <p className='p text-center max-w-xl font-extralight'>With many satisfied and happy client’s to our name, you can trust us to give you nothing less than the best. Here what some of our satified clients have to say about us
                </p>
            </div>
            <TestimonialCarousel slides={testimonialsData} options={carouselOptions} />

        </section>
    )
}

export default testimonials