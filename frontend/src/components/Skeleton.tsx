interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl md:rounded-2xl overflow-hidden">
      {/* Image skeleton */}
      <Skeleton className="w-full h-32 md:h-48 rounded-none" />

      {/* Content skeleton */}
      <div className="p-2 md:p-4">
        <Skeleton className="h-4 md:h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 md:h-5 w-1/2 mb-3 md:mb-4" />

        {/* Button skeleton */}
        <div className="text-right">
          <Skeleton className="h-7 md:h-8 w-24 md:w-28 ml-auto" />
        </div>
      </div>
    </div>
  );
}

export function NotificationSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3">
      <div className="flex items-start gap-2">
        {/* Icon skeleton */}
        <Skeleton className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0" />

        {/* Content skeleton */}
        <div className="flex-1 min-w-0">
          <Skeleton className="h-4 md:h-5 w-3/4 mb-1" />
          <Skeleton className="h-3 md:h-4 w-full mb-1" />
          <Skeleton className="h-3 md:h-4 w-5/6 mb-1.5" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
