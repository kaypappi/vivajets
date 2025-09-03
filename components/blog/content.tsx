'use client'
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import BlogCard from './blog-card';
import { createClient } from 'contentful';
import { useTranslations } from "@/lib/useTranslations";

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

type SortOption = 'newest' | 'oldest';
type FilterCategory = 'All' | 'Top Destinations' | 'New Offers' | 'Lifestyle';

export default function BlogContent() {
  const { t } = useTranslations();
  const [blogPosts, setBlogPosts] = useState<ContentfulBlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ContentfulBlogPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const filters: FilterCategory[] = ['All', 'Top Destinations', 'New Offers', 'Lifestyle'];

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
        setFilteredPosts(entries.items);
        setLoading(false);
      } catch (error) {
        console.log(`Error fetching blog posts ${error}`);
        setLoading(false);
      }
    };
    getAllEntries();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;
    
    // Apply category filter
    if (activeFilter !== 'All') {
      filtered = blogPosts.filter(post => post.fields.category === activeFilter);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      const dateA = new Date(a.fields.date).getTime();
      const dateB = new Date(b.fields.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredPosts(filtered);
  }, [activeFilter, sortBy, blogPosts]);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const date: Date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('blog.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Filter Tabs and Sort Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          {/* Filter Tabs */}
          {/* <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? 'bg-white text-blue-600 cursor-pointer  border border-gray-200'
                    : 'bg-[tranparent] text-[#0A2540] cursor-pointer border border-transparent'
                }`}
              >
                {filter}
              </button>
            ))}
          </div> */}

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium">
                {sortBy === 'newest' ? t('blog.sort.newestToOldest') : t('blog.sort.oldestToNewest')}
              </span>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSortBy('newest');
                    setSortDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {t('blog.sort.newestToOldest')}
                </button>
                <button
                  onClick={() => {
                    setSortBy('oldest');
                    setSortDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                >
                  {t('blog.sort.oldestToNewest')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard 
              key={post.sys.id} 
              post={post} 
              formatDate={formatDate}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('blog.empty')}</p>
          </div>
        )}
      </div>
    </section>
  );
}