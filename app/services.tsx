import { Badge } from '@/components/ui/badge'
import StackedTabs from '@/components/stacked-tabs'

let ourservices = [{
    head: {
        title: 'Private Jet Charter',
        icon: '',
        disabled: false,
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
        icon: '',
        disabled: false,
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
        icon: '',
        disabled: false,
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
        icon: '',
        disabled: false,
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
        icon: '',
        disabled: true,
    },
    body: {
        title: 'Air Craft Management',
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
                <div className="col-span-6">
                    <Badge variant={'nohover'} className=' mb-4 bg-clay bg-opacity-[0.04] text-clay font-light px-3 py-2'>Our Services</Badge>
                    <h3 className=' h3 max-w-sm font-bold'>We Have Best Luxury
                        Services For You</h3>
                </div>
                <div className="col-span-6 flex items-end">
                    <p className=' p max-w-xl'>
                        When luxury and comfort matter, you can trust Viva Jets to give
                        you the best luxury experience that will last you a lifetime.
                        We take your flight puzzle pieces and put them together to
                        create a perfect journey for you.
                    </p>
                </div>
            </div>
            <StackedTabs services={ourservices} className='mt-16' />
        </section>
    )
}

export default services