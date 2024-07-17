import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { createClient } from 'contentful';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { SiteHeader } from '@/components/layouts/site-header';
import Footer from '@/components/layouts/footer';

type Props = {
  params: { post: string; slug: string };
};

const client = createClient({
  space: "qlpjwgocwz50",
  accessToken: "c_JyKWxONFLuVIILAfKEqzurdpMJ1tIYwc0epHcIYUw",
  environment: "master"
});

async function getEntryBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: 'falconaeroBlog',
    'fields.slug': slug,
    limit: 1
  });

  return entries.items[0];
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const entry: any = await getEntryBySlug(slug);

  if (!entry) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${entry.fields.title} - Falconaero`,
    description: entry.fields.description || 'Default blog description',
    openGraph: {
      title: entry.fields.title,
      description: entry.fields.description || 'Default blog description',
      images: [
        {
          url: entry.fields.mainImage?.fields?.file?.url || '',
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
      images: [entry.fields.mainImage?.fields?.file?.url || ''],
    },
  };
}

const formatDate = (dateString: any): string => {
  const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const options: any = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file } = node.data.target.fields;
      return (
        <img
          src={file.url}
          alt={file.fileName}
          width={700}
          height={400}
          style={{
            maxWidth: '70%',
            height: 'auto',
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 8,
          }}
        />
      );
    },
  },
};

async function Page({ params }: Props) {
  const slug = params.slug;
  const entry: any = await getEntryBySlug(slug);

  if (!entry) {
    return <div>Post not found</div>;
  }

  const singleBlogPost: any = entry.fields;

  return (
    <div>
        <SiteHeader/>
         <div className='stor my-24 px-4 sm:px-20 mx-auto PortableText'>
      <div id="layout" className="flex justify-center items-center">
        <div className="content w-full max-w-5xl">
          <div className="posts mt-20">
            <Link href="/blog" className="text-md mt-72 text-blue-700 font-semibold mb-1 block">&larr; Go Back </Link>
            <section className="post PortableText">
              <header className="post-header">
                {singleBlogPost.mainImage && (
                  <img
                    src={singleBlogPost.mainImage.fields.file.url}
                    alt={singleBlogPost.title}
                    width={1200}
                    height={630}
                    className="rounded-xl w-full sm:h-[500px] object-cover"
                  />
                )}
                <h1 className="text-2xl sm:text-8xl text-gray-900 font-bold my-4 py-5">{singleBlogPost.title}</h1>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="flex justify-between mb-6">
                    <span className='font-bold'>{formatDate(singleBlogPost.date)}</span>
                    <p className="font-bold text-blue-800">{singleBlogPost.readTime} minutes read</p>
                  </span>
                </div>
              </header>
              <div className="mt-4">
                {documentToReactComponents(singleBlogPost.body, options)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
    </div>
  );
}

export default Page;