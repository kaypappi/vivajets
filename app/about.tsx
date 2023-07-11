
import { Badge } from '@/components/ui/badge'
import { ReactComponent as AirPlane } from '@/public/svgs/airplane.svg'
import React from 'react'

const about = () => {
    return (
        <section className='bg-[#FFF8F2] w-full'>
            <div className=' container text-black py-16 flex flex-col items-center'>
                <Badge variant={'nohover'} className=' mb-4 bg-dodger-blue bg-opacity-[0.16] text-dodger-blue font-light px-3 py-2'>About Us</Badge>
                <h3 className="h3 font-bold max-w-lg text-center mt-8 mb-4">A Falcon Aerospace Tailored
                    For You</h3>
                <p className='p text-center max-w-4xl font-extralight'>VivaJets is a trademark/trade-name for Falcon Aerospace Company. A registered Business Aviation company in Nigeria.
                    Our focus is to provide exclusive all-round aviation services to our clients while ensuring we increase accessibility to
                    business aviation in Africa</p>
                <div className=' grid grid-cols-12 gap-x-16  mt-14'>
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <AirPlane className=' mb-4 w-12 h-12' />
                            <h5 className="h5 mb-3">Luxury Flight</h5>
                            <p className="p max-w-xs text-center font-extralight">Seat back, relax and be treated
                                right by our top notch services as
                                we take you to your destination</p>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <AirPlane className=' mb-4 w-12 h-12' />
                            <h5 className="h5 mb-3">Luxury Flight</h5>
                            <p className="p max-w-xs text-center font-extralight">Seat back, relax and be treated
                                right by our top notch services as
                                we take you to your destination</p>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="flex flex-col items-center">
                            <AirPlane className=' mb-4 w-12 h-12 text-clay' />
                            <h5 className="h5 mb-3">Luxury Flight</h5>
                            <p className="p max-w-xs text-center font-extralight">Seat back, relax and be treated
                                right by our top notch services as
                                we take you to your destination</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default about