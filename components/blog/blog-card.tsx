'use client'
import Image from "next/image";
import Link from "next/link";

interface ContentfulBlogPost {
  fields: {
    title: string;
    description?: string;
    date: string;
    category?: string;
    mainImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    readTime?: string;
    slug: string;
  };
  sys: {
    id: string;
  };
}

interface BlogCardProps {
  post: ContentfulBlogPost;
  formatDate: (date: string) => string;
}

export default function BlogCard({ post, formatDate }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.fields.slug}`} className="block group">
      <div>
        {/* Standalone Image, no rounded corners, no shadow */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={post.fields.mainImage?.fields?.file?.url ? 
              (post.fields.mainImage.fields.file.url.startsWith('//') ? 
                `https:${post.fields.mainImage.fields.file.url}` : 
                post.fields.mainImage.fields.file.url) : 
              '/assets/images/blog-bg.png'}
            alt={post.fields.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ borderRadius: 0 }}
          />
          {post.fields.category && (
            <div className="absolute top-4 right-4">
              <span
                className="text-white text-xs px-3 py-1 font-semibold"
                style={{
                  background: "linear-gradient(90deg, rgba(20,20,20,0.85) 0%, rgba(40,40,40,0.7) 100%)",
                  borderRadius: 0,
                  display: "inline-block"
                }}
              >
                {post.fields.category}
              </span>
            </div>
          )}
        </div>
        {/* Card Content below image, no shadow, no rounded corners */}
        <article className=" px-0 py-6">
          <h3 className="font-bold special-header text-gray-900 text-xl leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.fields.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <time>{formatDate(post.fields.date)}</time>
            {post.fields.readTime && (
              <span className="text-blue-600 font-medium">
                {post.fields.readTime} minutes read
              </span>
            )}
          </div>
          {post.fields.description && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {post.fields.description}
            </p>
          )}
        </article>
      </div>
    </Link>
  );
}