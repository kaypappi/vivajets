import { Button } from '@/components/ui/button'
import React from 'react'


const cta = () => {
    return (
        <section className=' bg-[#FFF8F2] w-full py-16 flex flex-col text-center items-center'>
            <h2 className="h2 max-w-5xl  font-bold">
                Tell us your requirements and one of our
                charter experts will send you a quote.
            </h2>
            <p className="p font-extralight max-w-xl mt-6 mb-14">What are your requirements? Be sure to get a quick response from one of our experts with the response and a quote.</p>
            <Button size={'lg'} variant={'clay'}>Book Now</Button>

        </section>
    )
}

export default cta