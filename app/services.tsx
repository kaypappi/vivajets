"use client"

import { Badge } from '@/components/ui/badge'
import StackedTabs from '@/components/stacked-tabs'
import { ReactComponent as SlantRightArrow } from '@/public/svgs/slant-right-arrow.svg'
import { motion } from "framer-motion";


let ourservices = [{
    head: {
        title: 'Private Jet Charter',
        icon: null,
        disabled: false,
        id: 0
    },
    body: {
        title: 'Private Jet Charter',
        desc: `Do you want to lease a private jet? Our expert team is 
        available to listen to your needs and give the best 
        private jet charter options.`,
        image: '/images/darkguy1.png',
        background: '#0D0E2B'
    }
}, {
    head: {
        title: 'Aircraft Management',
        icon: null,
        disabled: false,
        id: 1
    },
    body: {
        title: 'Air Craft Management',
        desc: `Do you want to lease a private jet? Our expert team is 
        available to listen to your needs and give the best 
        private jet charter options.`,
        image: '/images/darkguy1.png',
        background: '#996633'
    }
},
{
    head: {
        title: 'Aircraft Fractional Ownership',
        icon: null,
        disabled: false,
        id: 2
    },
    body: {
        title: 'Aircraft Fractional Ownership',
        desc: `Do you want to lease a private jet? Our expert team is 
        available to listen to your needs and give the best 
        private jet charter options.`,
        image: '/images/darkguy1.png',
        background: '#4472ff'
    }
},
{
    head: {
        title: 'Business Jet Charter',
        icon: null,
        disabled: false,
        id: 3
    },
    body: {
        title: 'Business Jet Charter',
        desc: `Do you want to lease a private jet? Our expert team is 
        available to listen to your needs and give the best 
        private jet charter options.`,
        image: '/images/darkguy1.png',
        background: '#f17c19'
    }
},
{
    head: {
        title: 'View All Services',
        icon: () => (<SlantRightArrow className='ml-2' />),
        disabled: true,
        id: 4
    },
    body: {
        title: 'View All Services',
        desc: `Do you want to lease a private jet? Our expert team is 
        available to listen to your needs and give the best 
        private jet charter options.`,
        image: '/images/darkguy1.png',
        background: '#996633'
    }
},]
const services = () => {
    return (
        <section className=' container mx-auto py-10 h-full min-h-[60rem]'>
            <div className="grid grid-cols-12">
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
                    <Badge variant={'nohover'} className=' mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2'>Our Services</Badge>
                    <h3 className=' h3 max-w-sm font-bold'>We Have Best Luxury
                        Services For You</h3>
                </motion.div>
                <div className="col-span-6 flex items-end">
                    <motion.p
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
                        className=' p max-w-xl'>
                        When luxury and comfort matter, you can trust Viva Jets to give
                        you the best luxury experience that will last you a lifetime.
                        We take your flight puzzle pieces and put them together to
                        create a perfect journey for you.
                    </motion.p>
                </div>
            </div>
            <StackedTabs services={ourservices} className='mt-16' />
        </section>
    )
}

export default services