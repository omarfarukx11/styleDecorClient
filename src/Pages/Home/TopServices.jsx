import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Button from "../../utility/Button";
import ServiceSkeleton from "../../Skelenton/ServiceSkeleton";
import { FaStar } from "react-icons/fa"; // Assuming you use react-icons
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

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  return (
    <section className="bg-primary">
      <div className="xl:px-16 px-5  max-w-[1980px] mx-auto">
        <div className="text-center text-base-200 rounded-xl pb-10">
          <BigTitile>Our Decoration Packages</BigTitile>
          <p className="max-w-xl mx-auto text-[10px] md:text-xs opacity-80">
            Explore our range of flexible and innovative services designed to
            meet your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 items-stretch">
          {service.map((service) => (
            <div
              key={service._id}
              className="group flex flex-col h-full relative rounded-xl hover:shadow-lg overflow-hidden transform transition-all duration-500 border bg-secondary border-gray-100/10 shadow-sm"
            >
              {/* Image Container */}
              <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Rating Badge on Image */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-[10px]" />
                  <span className="text-white text-[10px] font-bold">
                    {service.rating || "5.0"}
                  </span>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] uppercase">Starting from</p>
                    <p className="text-lg font-bold">৳{service.price}</p>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 md:p-5 flex flex-col grow">
                <h2 className="text-sm md:text-base font-bold text-gray-400 group-hover:text-base-200 transition-colors duration-300 line-clamp-1">
                  {service.name}
                </h2>

                <p className="mt-1 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                  {service.type}
                </p>

                <div className="mt-3 mb-4">
                  <span className="text-lg md:text-xl font-bold text-base-200">
                    ৳{service.price}
                  </span>
                  <span className="ml-1 text-[10px] text-base-200/70">
                    / package
                  </span>
                </div>

                {/* mt-auto ensures all buttons align at the bottom */}
                <div className="mt-auto">
                  <Link to={`/serviceDetails/${service._id}`} className="block">
                    <Button className="w-full py-2 text-xs">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center w-full pt-10">
          <div className="w-40 text-center">
            <Link to="services">
              <Button className="py-2 text-xs">View All</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopServices;
