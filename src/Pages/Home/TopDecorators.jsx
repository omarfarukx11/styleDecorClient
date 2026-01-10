import React from "react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DecoratorSkeleton from "../../Skelenton/DecoratorSkeleton";
import BigTitile from "../../utility/BigTitile";

const TopDecorators = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/topDecorators");
      return res.data;
    },
  });

  if (isLoading) return <DecoratorSkeleton />;

  return (
    <section className="bg-secondary bprder border-green-500 lg:pb-20 pb-5">
      <div className="xl:px-20 px-5 max-w-[1980px] mx-auto">
        <div className="text-center px-4 text-base-200 rounded-2xl mb-10">
        <BigTitile>Top Decorators</BigTitile>
          <p className="max-w-3xl mx-auto text-[10px] md:text-xs opacity-80 leading-relaxed">
            Discover our top decorators who bring creativity, expertise, and
            precision to every event. Handpicked for their unique skills and proven track record.
          </p>
        </div>

        {/* Grid: 5-column layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          {decorators.map((d) => (
            <div
              key={d._id}
              className="group flex flex-col h-full relative rounded-xl transition-all duration-300 overflow-hidden bg-primary border border-gray-100/10 shadow-sm hover:shadow-md"
            >
              {/* Image Section - Uniform height */}
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rating Badge on Image */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 z-10">
                  <FaStar className="text-yellow-400 text-[10px]" />
                  <span className="text-white text-[10px] font-bold">
                    {d.rating || "5.0"}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 md:p-5 flex flex-col grow">
                <h3 className="text-sm md:text-base font-bold text-gray-400 group-hover:text-base-200 transition-colors duration-300 line-clamp-1">
                  {d.name}
                </h3>

                {/* Star Row */}
                <div className="flex items-center mt-1 mb-3 text-yellow-500 gap-0.5">
                   {[...Array(5)].map((_, i) => (
                     <FaStar key={i} className="text-[10px]" />
                   ))}
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest">
                    Specialties
                  </p>
                  <p className="text-[11px] text-gray-400 leading-tight line-clamp-2">
                    {d.specialties}
                  </p>
                  <p className="text-[11px] text-gray-500 italic line-clamp-3 border-l border-gray-100/20">
                    {d.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;