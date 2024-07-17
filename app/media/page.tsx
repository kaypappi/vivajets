'use client'
import React from 'react';
import media from '../../public/images/mediabg.png'
import { SiteHeader } from '@/components/layouts/site-header'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {LucideExternalLink} from 'lucide-react'
import { createClient } from 'contentful';
import Footer from '@/components/layouts/footer';

function Page() {
    const [mediaItems, setmediaItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const client = createClient({ space: "qlpjwgocwz50", accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw", environment: "master" });
    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        const getAllNewsEntries = async () => {
            try {
                const entries: any = await client.getEntries({
                    content_type: 'media',
                });
                setmediaItems(entries.items);
                setIsLoading(false);
            } catch (error) {
                console.log(`Error fetching news entries: ${error}`);
                setIsLoading(false);
            }
        };
        getAllNewsEntries();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        const date: Date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const filterPosts = (posts: any) => {
        if (searchInput) {
            posts = posts.filter((post: any) =>
                post.fields.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            posts = posts.filter((post: any) => post.fields.category === selectedCategory);
        }

        return posts;
    };

    const filteredPosts = filterPosts(mediaItems);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

    // Loader component
    const Loader = () => (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div 
                className="relative bg-cover bg-center h-[100vh]" 
                style={{backgroundImage: `url(${media.src})`}}
            >
                <SiteHeader/>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-6 py-16 h-full flex flex-col justify-center">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-white bg-[#16173EB2] rounded-full">
                            Media Section
                        </span>
                        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4">
                            VivaJets Media Section
                        </h1>
                        <p className="text-xl pt-4 text-gray-200">
                            Hot topics and new ideas, carefully selected to keep you ahead of the curve and informed about the latest developments in private jet travel.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <section className='py-10'>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                            {mediaItems.map((news, index) => (
                                <a key={index} href={news.fields.url} target="_blank" rel="noopener noreferrer" className="border-[#E5E7EF] bg-[#FAFBFF] border cursor-pointer rounded-lg p-4 mb-4 overflow-hidden transition-transform transform hover:scale-105">
                                    <img src={news.fields.image.fields.file.url}  className="w-full h-[250px] rounded-lg" alt={news.fields.tittle} />
                                    <div className="py-4">
                                        <div className='flex gap-5 mb-2 justify-between mt-1'>
                                            <p className="text-red-500 font-bold text-sm">{news.fields.publisher}</p>
                                            <p className="text-blue-800 font-bold text-sm">{formatDate(news.fields.date)}</p>
                                        </div>
                                        <div className='flex gap-3 justify-between'>
                                            <h3 className="text-lg font-semibold mb-2">{news.fields.tittle}</h3>
                                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                                <LucideExternalLink color='dodgerblue'/>
                                            </a>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Page