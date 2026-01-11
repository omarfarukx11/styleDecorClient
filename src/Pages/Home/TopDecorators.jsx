import React from "react";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DecoratorSkeleton from "../../Skelenton/DecoratorSkeleton";
import BigTitile from "../../utility/BigTitile";
import { motion } from "framer-motion";

const TopDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const { data: decorators = [], isLoading } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/topDecorators");
      return res.data;
    },
  });

  // Animation Variants for the entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.1 
      },
    },
  };

  const slideUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  if (isLoading) return <DecoratorSkeleton />;

  return (
    <section className="bg-secondary lg:pb-20 pb-5 overflow-hidden">
      {/* Container triggered by scroll */}
      <motion.div 
        key={isLoading ? "loading" : "loaded"}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="xl:px-20 lg:px-8 px-5 max-w-[1860px] mx-auto"
      >
        <motion.div variants={slideUpVariants} className="text-center px-4 text-base-200 rounded-2xl mb-10">
          <BigTitile>Top Decorators</BigTitile>
          <p className="max-w-3xl mx-auto text-[10px] md:text-xs opacity-80 leading-relaxed">
            Discover our top decorators who bring creativity, expertise, and
            precision to every event. Handpicked for their unique skills and proven track record.
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-stretch">
          {decorators.map((d) => (
            <motion.div 
              key={d._id} 
              variants={slideUpVariants} 
              className="relative p-[1.5px] overflow-hidden rounded-xl h-full flex items-stretch"
            >

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50%", originY: "50%" }}
                className="absolute w-[250%] h-[250%] top-[-75%] left-[-75%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_180deg,#3ABFF8_360deg)] opacity-60"
              />


              <div className="relative z-10 flex flex-col w-full rounded-xl overflow-hidden bg-primary shadow-sm">
                

                <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 z-10 border border-white/10">
                    <FaStar className="text-yellow-400 text-[10px]" />
                    <span className="text-white text-[10px] font-bold">
                      {d.rating || "5.0"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 md:p-5 flex flex-col grow">
                  <h3 className="text-sm md:text-base font-bold text-base-200 line-clamp-1">
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TopDecorators;