import React from "react";

const DecoratorSkeleton = () => {
  const skeletonCards = Array.from({ length: 10 });

  return (
    <section className="bg-secondary">
      <div className="xl:p-16 p-5 max-w-[1980px] mx-auto">
        <div className="text-center mb-10 animate-pulse">
          <div className="h-10 bg-gray-700/50 rounded-lg max-w-md mx-auto mb-4" />
          <div className="h-3 bg-gray-700/30 rounded-md max-w-sm mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {skeletonCards.map((_, index) => (
            <div key={index} className="flex flex-col h-full rounded-xl overflow-hidden border border-gray-100/10 bg-primary/40 animate-pulse">
              <div className="h-40 md:h-48 bg-gray-700/50 w-full relative">
                 <div className="absolute top-3 right-3 h-5 w-10 bg-gray-600/40 rounded-md" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-700/30 rounded w-1/3 mb-5" />
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700/30 rounded w-full" />
                  <div className="h-2 bg-gray-700/30 rounded w-5/6" />
                  <div className="h-2 bg-gray-700/30 rounded w-4/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DecoratorSkeleton;