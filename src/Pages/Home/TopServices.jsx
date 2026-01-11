import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Button from "../../utility/Button";
import ServiceSkeleton from "../../Skelenton/ServiceSkeleton";
import { FaStar } from "react-icons/fa"; 
import BigTitile from "../../utility/BigTitile";

const TopServices = () => {
  const axiosSecure = useAxiosSecure();
  
  const { data: service = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  // Animation Variants
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

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  return (
    <section className="bg-primary">
      {/* initial="hidden": Start at 0 opacity and 40px down.
          whileInView="visible": Only play when scrolled into view.
          viewport={{ once: true, amount: 0.1 }}: Trigger when 10% of the section is visible.
      */}
      <motion.div 
        key={isLoading ? "loading" : "loaded"}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="xl:px-16 px-5 max-w-[1980px] mx-auto"
      >
        <motion.div variants={slideUpVariants} className="text-center text-base-200 rounded-xl pb-10">
          <BigTitile>Our Decoration Packages</BigTitile>
          <p className="max-w-xl mx-auto text-[10px] md:text-xs opacity-80">
            Explore our range of flexible and innovative services designed to
            meet your unique needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          {service.map((item) => (
            <motion.div
              key={item._id}
              variants={slideUpVariants}
              className="group flex flex-col h-full relative rounded-xl hover:shadow-lg overflow-hidden transform transition-all duration-500 border bg-secondary border-gray-100/10 shadow-sm"
            >
              {/* Image Container */}
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-[10px]" />
                  <span className="text-white text-[10px] font-bold">
                    {item.rating || "5.0"}
                  </span>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] uppercase">Starting from</p>
                    <p className="text-lg font-bold">৳{item.price}</p>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 md:p-5 flex flex-col grow">
                <h2 className="text-sm md:text-base font-bold text-gray-400 group-hover:text-base-200 transition-colors duration-300 line-clamp-1">
                  {item.name}
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                  {item.type}
                </p>

                <div className="mt-3 mb-4">
                  <span className="text-lg md:text-xl font-bold text-base-200">
                    ৳{item.price}
                  </span>
                  <span className="ml-1 text-[10px] text-base-200/70">
                    / package
                  </span>
                </div>

                <div className="mt-auto">
                  <Link to={`/serviceDetails/${item._id}`} className="block">
                    <Button className="w-full py-2 text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={slideUpVariants} className="flex justify-center w-full pt-10">
          <div className="w-40 text-center">
            <Link to="services">
              <Button className="py-2 text-xs">View All</Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TopServices;