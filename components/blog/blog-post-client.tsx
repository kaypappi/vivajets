'use client'
import React, { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Link from 'next/link';
import Header from '@/components/layouts/header';
import styles from './blog-post.module.css';

interface BlogPostClientProps {
  singleBlogPost: any;
}

const options: any = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file } = node.data.target.fields;
      const imageUrl = file.url.startsWith('//') ? `https:${file.url}` : file.url;
      return (
        <div className="my-8">
          <img
            src={imageUrl}
            alt={file.fileName}
            className="w-full max-w-4xl mx-auto h-auto rounded-lg shadow-sm"
          />
        </div>
      );
    },
  },
};

export default function BlogPostClient({ singleBlogPost }: BlogPostClientProps) {
  const [isMuted, setIsMuted] = useState(true);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatDate = (dateString: any): string => {
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
    const date: Date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <main className="min-h-screen">
      <Header 
        isMuted={isMuted} 
        toggleMute={toggleMute} 
        showMuteButton={false}
        variant="dark"
      />
      <div className='my-16 stor px-4 sm:px-8 lg:px-16 mx-auto PortableText'>
        <div id="layout" className="flex justify-center items-center">
          <div className="content w-full max-w-6xl">
            <div className="posts mt-10">
              <Link href="/blog" className="text-md font-semibold mb-8 block text-gray-600 hover:text-gray-900 transition-colors">
                ← Back
              </Link>
              <section className="post PortableText">
                <header className="post-header mb-8">
                  {/* Title first */}
                  <h1 className="text-4xl special-header  text-gray-900 font-bold mb-6 leading-tight">
                    {singleBlogPost.title}
                  </h1>
                  
                  {/* Date and read time */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
                    <span className='font-medium flex items-center'>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(singleBlogPost.date)}
                    </span>
                    {singleBlogPost.readTime && (
                      <span className="font-medium text-blue-600 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {singleBlogPost.readTime} minutes read
                      </span>
                    )}
                  </div>
                  
                  {/* Image after title and date */}
                  {singleBlogPost.mainImage && (
                    <div className="mb-8">
                      <img
                        src={singleBlogPost.mainImage.fields.file.url.startsWith('//') ? 
                          `https:${singleBlogPost.mainImage.fields.file.url}` : 
                          singleBlogPost.mainImage.fields.file.url}
                        alt={singleBlogPost.title}
                        width={1200}
                        height={600}
                        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-sm"
                      />
                    </div>
                  )}
                </header>
                
                {/* Content */}
                <div className={`${styles.PortableText} prose prose-lg prose-gray max-w-none`}>
                  {singleBlogPost.body && documentToReactComponents(singleBlogPost.body, options)}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}