'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import logo1 from '../../public/images/font.png';
import logo2 from '../../public/images/logo2.png';
import cover from '../../public/images/cover.png';
import jets from '../../public/images/plane.jpg'

interface FormData {
  fullname: string;
  email: string;
  phoneNumber: string;
  travelType: string;
  travelFrequency: string;
  reason: string;
}

function Page() {

  const router = useRouter();

  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [travelType, setTravelType] = useState<string>('select an option');
  const [travelFrequency, setTravelFrequency] = useState<string>('select an option');
  const [reason, setReason] = useState<string>('select an option');
  const [message, setMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    try {
      const response: AxiosResponse = await axios.post<FormData>('/api/subscribe', {
        fullname,
        email,
        phoneNumber,
        travelType,
        travelFrequency,
        reason  
      });

      if (response.status === 200) {
        setMessage('Subscribed successfully!');
        setIsSubmitting(false);
        push();
      }

    } catch (error:any) {
      console.log('Error response:', error.response?.data);
      setIsSubmitting(false);
    }
  };

  const push = () => {
    router.push('/ads/thankyou');
  };


  const handleScroll = () => {
    const targetSection = document.getElementById('target-section');
    if (targetSection) {
      const targetOffset = targetSection.offsetTop;
      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <section className="h-[50vh] md:h-[60vh] relative">
        <Image
          src={jets}
          alt="Picture of the author"
          className="w-full object-cover brightness-50 h-[50vh] md:h-[60vh]"
        />
        <div className="absolute inset-0 items-center justify-center text-white text-center mt-16 ">
          <div className="flex justify-center">
            <Image src={logo2} alt="Logo 2" className="h-10 w-auto" />
            <Image src={logo1} alt="Logo 1" className="h-10 w-auto" />
          </div>
          <p className="text-white text-2xl md:text-4xl font-bold text-center mb-2 mt-8 px-4">
            Get Your FREE Report on Business Aviation Investments
          </p>
          <p className="text-gray-100 text-xl md:text-2xl text-center px-4 mb-6">
            The Comprehensive Guide to Fractional Jet Ownership.
          </p>
          <button
            className="bg-blue-600 text-white py-4 px-8 rounded-md text-xl mt-4"
            onClick={handleScroll}
          >
            Send My Free Report Now
          </button>
        </div>
      </section>

      <div className="md:flex gap-10 p-10 px-10 md:p-16 md:px-28">
        {/* Image (on top on small screens, side by side on larger screens) */}
        <div className="md:w-1/2">
          <Image src={cover} alt="Image Description" className="h-full w-full rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pr-4">
          <p className="text-gray-800 mb-4 mt-6 text-xl">
            This FREE report is your golden ticket to a world where investment innovation meets the thrill of luxury travel.
          </p>
          <p className="text-gray-800 mb-4 mt-6 font-bold text-xl">
            🌟 Inside Your Guide:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li className="text-gray-900 mb-5">🛩️ Uncover the Power of Fractional Ownership: Delve into the world of fractional jet ownership and learn how it can revolutionize your portfolio's performance.</li>
            <li className="text-gray-900 mb-5">📈 Dive deep into the system: Gain insights on how you can follow our well-designed process in achieving your investment goals</li>
            <li className="text-gray-900 mb-5">✈️ Beyond Investments: A Jet-Set Lifestyle: Peek into the exclusive realm where opportunities come with the added perks of first-class experiences.</li>
            <li className="text-gray-900 mb-5">🗺️ Your Flight Path to More Wealth: Access step-by-step guidance to navigate fractional jet ownership and embark on your journey to sustainable profit</li>
          </ul>
        </div>
      </div>

      <section className="bg-gray-50">
        <div className="p-10 px-10 md:p-16 md:px-96">
          <div className="md:pl-4 mt-6 md:mt-0">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <section id="target-section">
                <p className="text-gray-800 text-xl font-bold mb-4 text-center">Claim Your Free Copy Now!</p>
                <div className="mb-4">
                  <label htmlFor="fullname" className="block text-gray-700 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numberPhone" className="block text-gray-700 text-sm mb-2">Phone Number(optional)</label>
                  <input
                    type="number"
                    id="numberPhone"
                    name="numberPhone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="travel-type" className="block text-gray-700 text-sm mb-2">What type of travel are you interested in?</label>
                  <select
                    id="travel-type"
                    name="travelType"
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                    required
                  >
                    <option disabled value="select an option">Select an option</option>
                    <option value="business">Business Travel</option>
                    <option value="leisure">Leisure Travel</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="travel-frequency" className="block text-gray-700 text-sm mb-2">How frequently do you travel?</label>
                  <select
                    id="travel-frequency"
                    name="travelFrequency"
                    value={travelFrequency}
                    onChange={(e) => setTravelFrequency(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                    required
                  >
                    <option disabled value="select an option">Select an option</option>
                    <option value="rare">Rarely (1-2 trips per year)</option>
                    <option value="occasional">Occasionally (3-5 trips per year)</option>
                    <option value="frequent">Frequently (6 or more trips per year)</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="private-aviation" className="block text-gray-700 text-sm mb-2">Are you considering private aviation for?</label>
                  <select
                    id="private-aviation"
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-2 py-2 border rounded-lg"
                    required
                  >
                    <option disabled value="select an option">Select an option</option>
                    <option value="fractional">Fractional Ownership</option>
                    <option value="chartering">Chartering private jets</option>
                    <option value="management">Aircraft management</option>
                    <option value="learning">Not sure/interested in learning</option>
                  </select>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
                <p className="text-green-600 mt-4 text-center">{message}</p>
              </section>
            </form>
          </div>
        </div>
      </section>

      <div>
        <div className="md:p-16 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 pushing text-gray-800">Strap in and Get your FREE report</h2>
          <p className="text-gray-800 mb-14">Enter your email and unlock the door to a world of investment possibilities. Join the league of savvy investors who are harnessing the power of fractional jet ownership to reach unparalleled success.</p>
          <button onClick={handleScroll} className="bg-blue-600 text-white py-4 px-6 rounded-lg">Send My Free Report</button>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-16 flex justify-between">
        <div>
          <Image src={logo1} alt="Logo 1" className="h-12 w-auto" />
          <p className="text-gray-300 mt-2">The Adrenalina hub, 369 Borno Way - by Spencer, Yaba, Lagos</p>
        </div>
        <div className="hidden md:block space-x-4">
          <Link href="#" className="text-gray-300">Privacy Policy</Link>
          <Link href="#" className="text-gray-300">Terms of Use</Link>
          <Link href="#" className="text-gray-300">Contact Us</Link>
        </div>
      </footer>
    </div>
  );
}

export default Page;
