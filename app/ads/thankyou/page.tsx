import React, { useEffect } from 'react'; 
import Image from 'next/image';
import thankYouImage from '../../../public/images/thankyou.png';
import { useRouter } from 'next/navigation';

interface Props {}

const ThankYouPage: React.FC<Props> = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('https://viva-jets.com');
    }, 2000);

   
    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-floating">
        <Image 
          src={thankYouImage}
          alt="Thank You Image"
          className="w-52 h-40 mx-auto mb-6" 
        />
      </div>
      <p className="text-4xl font-bold text-gray-800 text-center">Thank You Champion!</p>
      <p className="text-gray-600 text-center mt-2">
        We Have sent your report to your email!
      </p>

    </div>
  );
};

export default ThankYouPage;