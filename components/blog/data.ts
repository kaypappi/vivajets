export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Top Destinations' | 'New Offers' | 'Lifestyle';
  image: string;
  readTime: string;
}

export function generateBlogData(): BlogPost[] {
  const titles = [
    "The Ultimate Guide to Buying a Private Jet in Nigeria: Cost, Considerations, and Luxury",
    "Top 10 Luxury Destinations Accessible by Private Jet",
    "Private Jet vs Commercial Flight: A Comprehensive Comparison",
    "The Future of Private Aviation: Sustainable Flying",
    "Exclusive Airport Lounges: Where Luxury Meets Convenience",
    "Private Jet Etiquette: A Guide for First-Time Flyers",
    "The Best Time to Book Your Private Jet for Maximum Savings",
    "Corporate Travel Revolution: Why Businesses Choose Private Jets",
    "Luxury in the Sky: The Most Opulent Private Jet Interiors"
  ];

  const descriptions = [
    "Discover everything you need to know about purchasing a private jet in Nigeria, from costs and legal requirements to choosing the right aircraft for your needs.",
    "Explore the world's most exclusive destinations that are best accessed by private jet, from remote islands to luxury ski resorts.",
    "A detailed analysis of the benefits and considerations when choosing between private jet travel and commercial airlines.",
    "Learn about the latest innovations in sustainable aviation and how the private jet industry is adapting to environmental concerns.",
    "An insider's guide to the most luxurious airport lounges and VIP services available to private jet passengers.",
    "Essential tips and guidelines for first-time private jet passengers to ensure a smooth and enjoyable experience.",
    "Strategic insights on timing your private jet bookings to get the best deals and availability.",
    "How private jets are transforming corporate travel and boosting business efficiency.",
    "A showcase of the most luxurious and innovative private jet interiors money can buy."
  ];

  const images = [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Airport terminal
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Tropical destination
    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Business jet exterior
    "https://images.unsplash.com/photo-1583604442097-e2d3dec8a5c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Cockpit interior
    "https://images.unsplash.com/photo-1578661996442-748f4c7cc43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Luxury lounge
    "https://images.unsplash.com/photo-1555400082-9e4b98e80d59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Business meeting
    "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Private jet cabin
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Aircraft maintenance
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"  // Mountain landscape
  ];

  const categories: BlogPost['category'][] = ['Top Destinations', 'New Offers', 'Lifestyle'];
  const readTimes = ['5 min read', '7 min read', '10 min read', '8 min read', '6 min read'];

  return titles.map((title, index) => ({
    id: `blog-${index + 1}`,
    title,
    description: descriptions[index],
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    category: categories[index % categories.length],
    image: images[index],
    readTime: readTimes[index % readTimes.length]
  }));
};