import React from 'react';
import { createClient } from 'contentful';
import { Metadata, ResolvingMetadata } from 'next';
import BlogPostClient from '@/components/blog/blog-post-client';

type Props = {
  params: Promise<{ slug: string }>;
};

const client = createClient({
  space: "qlpjwgocwz50",
  accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw",
  environment: "master"
});

async function getEntryBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'falconaeroBlog', // Using the content type from your example
    'fields.slug': slug,
    limit: 1
  });

  return entries.items[0];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const entry: any = await getEntryBySlug(slug);

  if (!entry) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const imageUrl = entry.fields.mainImage?.fields?.file?.url;
  const processedImageUrl = imageUrl ? 
    (imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl) : '';

  return {
    title: `${entry.fields.title} - VivaJets`,
    description: entry.fields.description || 'Default blog description',
    openGraph: {
      title: entry.fields.title,
      description: entry.fields.description || 'Default blog description',
      images: [
        {
          url: processedImageUrl,
          width: 1200,
          height: 630,
          alt: entry.fields.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.fields.title,
      description: entry.fields.description || 'Default blog description',
      images: [processedImageUrl],
    },
  };
}

async function Page({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const entry: any = await getEntryBySlug(slug);

  if (!entry) {
    return (
      <div className='my-24 stor px-4 sm:px-20 mx-auto'>
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
          <a href="/blog" className="text-blue-600 hover:underline">
            &larr; Back to Blog
          </a>
        </div>
      </div>
    );
  }

  const singleBlogPost: any = entry.fields;

  return <BlogPostClient singleBlogPost={singleBlogPost} />;
}

export default Page;