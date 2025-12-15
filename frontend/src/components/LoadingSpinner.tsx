interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div
      className={`inline-block ${sizeClasses[size]} border-gray-200 dark:border-gray-700 border-t-vibrant-purple-600 dark:border-t-vibrant-purple-400 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-900 dark:text-gray-50 text-sm md:text-base font-medium">
          {message}
        </p>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          Loading...
        </p>
      </div>
    </div>
  );
}
