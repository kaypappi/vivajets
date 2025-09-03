'use client'
import { useState, useEffect } from "react";
import { createClient } from 'contentful';
import PopularArticles from './popular-articles';
import LatestArticles from './latest-articles';

const client = createClient({
  space: "qlpjwgocwz50",
  accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw",
  environment: "master"
});

export interface NewsItem {
  fields: {
    title?: string;
    tittle?: string; // Keep both for compatibility
    description: string;
    date: string;
    publisher: string;
    url?: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

export default function NewsContent() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllNewsEntries = async () => {
      try {
        const entries: any = await client.getEntries({
          content_type: 'media',
          order: ['-fields.date'],
          limit: 20
        });
        setNewsItems(entries.items);
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching news entries: ${error}`);
        setIsLoading(false);
      }
    };
    getAllNewsEntries();
  }, []);



  const popularArticles = newsItems.slice(0, 5);
  const latestArticles = newsItems; // Pass all articles to LatestArticles component for load more functionality

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto sm:px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-screen">
          {/* Left Side - Popular Articles (White Background, Smaller) */}
          <div className="lg:col-span-5">
            <PopularArticles articles={popularArticles} isLoading={isLoading} />
          </div>
          
          {/* Right Side - Latest Articles (Bluish Background, Wider) */}
          <div className="lg:col-span-7">
            <LatestArticles articles={latestArticles} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
}