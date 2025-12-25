export default function EarnPointsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Section Header Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>

        {/* 3-Column Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Points Balance Skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full">
            <div className="h-12 bg-gray-100 rounded-t-xl mb-4"></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-24 bg-gray-200 rounded"></div>
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div className="h-2 w-1/3 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-3 w-40 bg-gray-200 rounded mt-2"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Daily Streak Skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full">
            <div className="h-12 bg-gray-100 rounded-t-xl mb-4"></div>
            <div className="p-4">
              <div className="h-10 w-32 bg-gray-200 rounded mb-6"></div>
              <div className="flex justify-between mb-6">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  ></div>
                ))}
              </div>
              <div className="h-4 w-40 bg-gray-200 rounded mb-4"></div>
              <div className="h-12 w-full bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Card 3: Featured Spotlight Skeleton */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full">
            <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 rounded-t-2xl"></div>
            <div className="p-4">
              <div className="flex justify-between gap-4 mb-4">
                <div className="w-24 h-24 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex justify-between gap-2">
                <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
                <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-40 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl border border-gray-200 h-32"
            >
              <div className="h-16 bg-gray-100 rounded-t-xl"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Third Row Skeleton */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-gray-200 rounded-full"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="h-20 bg-gray-100 rounded-t-2xl"></div>
          <div className="p-4 space-y-4">
            <div className="flex justify-evenly">
              <div className="text-center">
                <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded mx-auto"></div>
              </div>
              <div className="text-center">
                <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
            <div className="h-24 bg-gray-50 rounded-md"></div>
            <div className="flex justify-center gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gray-200"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

