'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from 'contentful';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SiteHeader } from '@/components/layouts/site-header';
import media from '../../public/images/blog.png'
import Footer from '@/components/layouts/footer';

function page() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const client = createClient({
    space: "qlpjwgocwz50",
    accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw",
    environment: "master"
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        const entries: any = await client.getEntries({
          content_type: 'falconaeroBlog',
        });
        setBlogPosts(entries.items);
        setLoading(false);
      } catch (error) {
        console.log(`Error fetching blog posts ${error}`);
        setLoading(false);
      }
    };
    getAllEntries();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const date: Date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const getShortDescription = (body: any): string => {
    if (body && body.content && body.content.length > 0) {
      const firstParagraph = body.content.find((item: any) => item.nodeType === 'paragraph');
      if (firstParagraph && firstParagraph.content && firstParagraph.content.length > 0) {
        const text = firstParagraph.content[0].value;
        return text.length > 200 ? text.substring(0, 200) + '...' : text;
      }
    }
    return '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-6xl text-blue-500" />
      </div>
    );
  }

  return (
    <div>
    <div 
                className="relative bg-cover bg-center h-[100vh]" 
                style={{backgroundImage: `url(${media.src})`}}
            >
                <SiteHeader/>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-6 py-16 h-full flex flex-col justify-center">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-[#16173EB2] rounded-full">
                        Blog Section
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
                        VivaJets Blogs
                        </h1>
                        <p className="text-xl pt-4 text-gray-200">
                        Hot topics and new ideas, carefully selected to keep you ahead of the curve and informed about the latest developments in private jet travel.
                        </p>
                    </div>
                </div>
            </div>
      <div className="container mx-3 sm:mx-auto px-4 py-8 mt-10">
        
        <p className='text-[#996633] flex  sm:w-[12%] mb-3 rounded-full px-4 py-3 font-semibold sm:bg-[#16173E0F]'>Trending article</p>
        <div className="space-y-12 mt-1 mb-16">
          {blogPosts.slice(0, 1).map((post, index) => (
            <div key={post.sys.id} className={` gap-8`}>
              <div className="md:w-[100%]">
                <img src={post.fields.mainImage.fields.file.url} alt={post.fields.title} className="w-full h-[350px] object-cover rounded-2xl" />
              </div>
              <div className="md:w-[100%] pt-14 bg-white shadow-sm rounded-2xl p-6">
                <p className="text-sm text-gray-500 mb-2">{formatDate(post.fields.date)} · {post.fields.readTime} min read</p>
                <h2 className="text-3xl font-bold mb-3">{post.fields.title}</h2>
                <p className="text-gray-600 mb-4">{getShortDescription(post.fields.body)}</p>
                <Link href={`/blog/${post.fields.slug}`} className="flex items-center mt-6 bg-blue-100 border-[#C0E1F4] border text-blue-900 text-sm font-bold hover:bg-[#C0E1F4] hover:text-blue-800 px-4 py-4 rounded-md transition duration-300 w-fit">
                  Read more <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div>
        <p className='text-[#996633] flex sm:w-[11%] mb-3 rounded-full px-4 py-3 font-semibold sm:bg-[#16173E0F]'>Recent Posts</p>
        <div>
 
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {blogPosts.slice(1).map((post) => (
      <div key={post.sys.id} className="bg-[#FAFBFF] border border-[#E5E7EF] rounded-lg p-4 overflow-hidden">
        <img 
          src={post.fields.mainImage.fields.file.url} 
          alt={post.fields.title} 
          className="w-full h-60 rounded-lg object-cover"
        />
        <div className="mt-3">
        <div className="flex space-x-2 mb-3">
            <span className="bg-[#EAEEFF] text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              {formatDate(post.fields.date)}
            </span>
            <span className="bg-[#EAEEFF] text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
              {post.fields.readTime} min read
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-2">{post.fields.title}</h3>
         
        
          <Link 
            href={`/blog/${post.fields.slug}`} 
            className="inline-flex items-center bg-blue-100 mt-5 text-blue-900 text-sm font-bold hover:bg-blue-200 px-4 py-2 rounded-md transition duration-300"
          >
            Read more <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page