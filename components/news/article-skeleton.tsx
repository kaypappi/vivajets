interface ArticleSkeletonProps {
  count?: number;
}

export function LatestArticleSkeleton() {
  return (
    <article className="group flex flex-col overflow-hidden transition-duration-300 bg-transparent">
      {/* Image skeleton */}
      <div className="relative w-full h-56 md:h-80 bg-gray-200 animate-pulse rounded-lg overflow-hidden">
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gray-300 h-6 w-16 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="flex flex-col flex-1 px-1 pt-5 pb-3">
        {/* Title skeleton */}
        <div className="mb-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-1"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
      </div>
    </article>
  );
}

export function PopularArticleSkeleton() {
  return (
    <div>
      <article className="group py-6">
        {/* Publisher badge skeleton */}
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-gray-200 h-6 w-20 rounded-full animate-pulse"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="mb-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-4/5"></div>
        </div>
        
        {/* Description skeleton */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-1"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
      </article>
      <hr className="border-b border-gray-200" />
    </div>
  );
}

export function ArticlesSkeleton({ count = 3 }: ArticleSkeletonProps) {
  return (
    <div className="grid gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <LatestArticleSkeleton key={index} />
      ))}
    </div>
  );
}