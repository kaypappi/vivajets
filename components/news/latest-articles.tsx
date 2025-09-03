'use client'
import { useState } from "react";
import Image from "next/image";
import { NewsItem } from './content';
import { ArticlesSkeleton } from './article-skeleton';
import { useTranslations } from "@/lib/useTranslations";

interface LatestArticlesProps {
  articles: NewsItem[];
  isLoading?: boolean;
}

// Calendar and ArrowTopRight SVGs (copied from popular-articles for consistency)
const CalendarIcon = () => (
  <svg className="w-4 h-4 mr-1 text-gray-400 inline-block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const ArrowTopRightIcon = () => (
  <svg className="w-4 h-4 ml-1 inline-block" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 7h10v10" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export default function LatestArticles({ articles, isLoading = false }: LatestArticlesProps) {
  const { t } = useTranslations();
  const [visibleCount, setVisibleCount] = useState(3);
  const [loadingMore, setLoadingMore] = useState(false);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const date: Date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const getPublisherImage = (publisher: string) => {
    const publisherLower = publisher.toLowerCase();
    const imageMap: { [key: string]: string } = {
      'the guardian': '/assets/images/guardian.png',
      'punch': '/assets/images/punch.png',
      'vanguard': '/assets/images/vanguard.png',
      'this day live': '/assets/images/thisday.png',
      'the nation': '/assets/images/nation.png'
    };
    return imageMap[publisherLower] || null;
  };

  const getPublisherFallback = (publisher: string) => {
    const publisherLower = publisher.toLowerCase();
    const logoMap: { [key: string]: string } = {
      'the guardian': 'TheGuardian',
      'punch': 'PUNCH',
      'vanguard': 'Vanguard',
      'thisday': 'ThisDay'
    };
    return logoMap[publisherLower] || publisher;
  };

  const getPublisherColor = (publisher: string) => {
    const publisherLower = publisher.toLowerCase();
    const colorMap: { [key: string]: string } = {
      'the guardian': 'bg-blue-100 text-blue-700 border-blue-200',
      'punch': 'bg-red-100 text-red-700 border-red-200',
      'vanguard': 'bg-red-200 text-red-800 border-red-300',
      'thisday': 'bg-red-100 text-red-700 border-red-200'
    };
    return colorMap[publisherLower] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const generateRandomDescription = (title: string): string => {
    const aviationDescriptions = [
      "VivaJets continues to revolutionize private aviation with cutting-edge technology and unparalleled service excellence for discerning travelers worldwide.",
      "Industry experts analyze the latest trends in luxury aviation as VivaJets sets new standards for premium flight experiences and customer satisfaction.",
      "Breaking developments in private jet services showcase VivaJets' commitment to innovation, safety, and personalized travel solutions for elite clientele.",
      "Aviation analysts report significant growth in demand for exclusive charter services, with VivaJets leading the market in reliability and luxury offerings.",
      "The future of private aviation takes shape as VivaJets introduces groundbreaking services that redefine luxury travel and operational excellence in the industry.",
      "Market leaders discuss the evolution of premium air travel, highlighting VivaJets' role in transforming client expectations and service delivery standards.",
      "Recent industry insights reveal how VivaJets maintains its competitive edge through strategic innovation and unwavering commitment to passenger comfort and safety.",
      "Aviation professionals recognize VivaJets' exceptional performance in delivering world-class charter experiences that exceed client expectations consistently.",
      "The private jet industry witnesses unprecedented growth as VivaJets expands its fleet and services to meet increasing demand for luxury aviation solutions.",
      "Expert commentary on aviation excellence highlights VivaJets' pioneering approach to customer service and technological advancement in private air travel."
    ];
    
    // Use title hash to ensure consistent description for same title
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const index = Math.abs(hash) % aviationDescriptions.length;
    return aviationDescriptions[index];
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setVisibleCount(prev => Math.min(prev + 3, articles.length));
    setLoadingMore(false);
  };

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 h-full">
        <h2 className="text-3xl md:text-4xl font-bold special-header text-gray-900 mb-8">
          {t('media.latest')}
        </h2>
        <ArticlesSkeleton count={3} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 h-full">
      <h2 className="text-3xl md:text-4xl font-bold special-header text-gray-900 mb-8">
        {t('media.latest')}
      </h2>
      <div className="grid gap-8">
        {visibleArticles.map((article, index) => (
          <article
            key={index}
            className="group flex flex-col  overflow-hidden transition- duration-300 hover:-lg bg-transparent"
          >
            {/* Image on top, full width */}
            <div className="relative w-full h-56 md:h-80 overflow-hidden">
              <Image
                src={
                  article.fields.image.fields.file.url.startsWith('http')
                    ? article.fields.image.fields.file.url
                    : `https:${article.fields.image.fields.file.url}`
                }
                alt={article.fields.title || article.fields.tittle || 'Article'}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 100vw"
                priority={index < 2}
              />
              <div className="absolute top-3 right-3 z-10">
                {(() => {
                  const publisherImage = getPublisherImage(article.fields.publisher);
                  return publisherImage ? (
                    <div className="flex items-center py-1 border-gray-200 bg-white rounded-lg p-2">
                      <Image
                        src={publisherImage}
                        alt={article.fields.publisher}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span
                      className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold ${getPublisherColor(article.fields.publisher)}`}
                    >
                      {getPublisherFallback(article.fields.publisher)}
                    </span>
                  );
                })()}
              </div>
            </div>
            {/* Content below image */}
            <div className="flex flex-col flex-1 px-1 pt-5 pb-3">
              <h3 className="font-bold special-header text-gray-900 text-xl md:text-2xl leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                {article.fields.url ? (
                  <a
                    href={article.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {article.fields.tittle || article.fields.title}
                  </a>
                ) : (
                  article.fields.tittle || article.fields.title
                )}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
                {generateRandomDescription(article.fields.tittle || article.fields.title || '')}
              </p>
              <div className="flex items-center justify-between mt-auto pt-2">
                <span className="flex items-center text-gray-500 text-sm">
                  <CalendarIcon />
                  {formatDate(article.fields.date)}
                </span>
                {article.fields.url && (
                  <a
                    href={article.fields.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium hover:underline group"
                  >
                    {t('media.readMore')}
                    <ArrowTopRightIcon />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
        
        {/* Loading more skeleton */}
        {loadingMore && (
          <ArticlesSkeleton count={3} />
        )}
      </div>
      
      {/* Load More Button */}
      {hasMoreArticles && !loadingMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-gray-100 cursor-pointer text-black font-semibold py-3 px-8 rounded-full  transform hover:-translate-y-0.5 transition-all duration-200"
            disabled={loadingMore}
          >
            {t('media.loadMore')}
          </button>
        </div>
      )}
      
      {loadingMore && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}