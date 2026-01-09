import React from "react";

const AllServicesSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 });

  return (
    <section className="min-h-screen lg:p-20 p-4 bg-primary/5">
      <div className="mx-auto">

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {skeletonCards.map((_, index) => (
            <div key={index} className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100/10 bg-secondary/20 animate-pulse">
              <div className="h-40 md:h-48 bg-gray-700/50 w-full" />
              <div className="p-5 flex flex-col grow">
                <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-700/30 rounded w-1/2 mb-4" />
                <div className="h-8 bg-gray-700/50 rounded w-2/3 mb-4" />
                <div className="mt-auto h-10 bg-gray-700/50 rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllServicesSkeleton;