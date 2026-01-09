import React from 'react';

const MyBookingSkeleton = () => {
    return (
       <div className="bg-primary min-h-screen p-4 md:p-8 animate-pulse">
      <div className="h-10 w-48 bg-white/5 rounded-xl mx-auto mb-10"></div>
      
      {/* Skeleton Header */}
      <div className="hidden xl:flex bg-white/5 h-16 rounded-t-2xl mb-4"></div>

      {/* Skeleton Rows */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex flex-col xl:flex-row items-center gap-4 bg-white/5 p-6 rounded-2xl mb-4 border border-white/5">
          <div className="w-10 h-6 bg-white/10 rounded"></div>
          <div className="flex-2 min-w-[200px] h-6 bg-white/10 rounded"></div>
          <div className="flex-1 h-6 bg-white/10 rounded"></div>
          <div className="flex-1 h-6 bg-white/10 rounded"></div>
          <div className="flex-1 h-6 bg-white/10 rounded"></div>
          <div className="flex-1 h-6 bg-white/10 rounded"></div>
          <div className="flex-[1.5] h-10 bg-white/10 rounded-xl w-full xl:w-auto"></div>
        </div>
      ))}
    </div>
    );
};

export default MyBookingSkeleton;