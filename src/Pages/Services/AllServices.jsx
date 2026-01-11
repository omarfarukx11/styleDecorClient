import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaStar } from "react-icons/fa";
import Button from "../../utility/Button";
import AllServicesSkeleton from "../../Skelenton/AllServicesSkeleton";
import Title from "../../utility/Title";

const AllServices = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 20;

  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      type: "All",
      minPrice: "",
      maxPrice: "",
    },
  });

  const filters = watch();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["services", filters, page],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.type && filters.type !== "All")
        params.append("type", filters.type);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      params.append("page", page);
      params.append("limit", limit);

      const res = await axiosSecure.get(`/allServices?${params.toString()}`);
      return res.data;
    },
  });

  const services = data.result || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <section className="">
      <div className="min-h-[calc(100vh-90px)] xl:px-20 lg:px-8 p-5 max-w-[1860px] mx-auto">
        <title>StyleDecor - Services</title>
        <div className="mx-auto">
          <div className="text-center px-5 rounded-xl text-base-200">
            <Title>Our Decoration Packages</Title>
            <p className="max-w-4xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed">
              Explore our range of flexible and innovative services designed to
              meet your unique needs. From expert consultation to hands-on execution.
            </p>
          </div>


          <form className="my-5 bg-primary rounded-lg p-5 border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                {...register("search")}
                type="text"
                placeholder="Search by package name..."
                className="w-full px-6 py-4 text-lg border text-base-200 outline-none border-gray-300 rounded-xl"
              />

              <select
                {...register("type")}
                className="w-full px-6 py-4 text-lg border text-base-200 bg-primary outline-none border-gray-300 rounded-xl"
              >
                <option value="All">All Service Types</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Wedding">Wedding</option>
                <option value="Birthday">Birthday</option>
                <option value="Corporate">Corporate</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Meeting">Meeting</option>
              </select>

              <div className="flex items-center gap-4">
                <input
                  {...register("minPrice")}
                  type="number"
                  placeholder="Min Price"
                  className="w-full px-6 py-4 text-lg border text-base-200 outline-none border-gray-300 rounded-xl"
                />
                <span className="text-gray-500 text-xl">—</span>
                <input
                  {...register("maxPrice")}
                  type="number"
                  placeholder="Max Price"
                  className="w-full px-6 py-4 text-lg border text-base-200 outline-none border-gray-300 rounded-xl"
                />
              </div>
            </div>
          </form>

          {/* Results Counter */}
          <p className="text-right text-gray-600 mb-6">
            Found{" "}
            <span className="font-bold text-base-200">{services.length}</span> of{" "}
            <span className="font-bold">{total}</span> packages
          </p>

          {/* Uniform Grid Section */}
          {isLoading ? (
            <AllServicesSkeleton></AllServicesSkeleton>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-stretch">
              {services.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-2xl text-gray-500">No packages found.</p>
                </div>
              ) : (
                services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: (index % 5) * 0.05 }} 
                    className="group flex flex-col h-full relative rounded-xl hover:shadow-sm overflow-hidden transition-all duration-500  bg-secondary shadow-sm"
                  >
                    {/* Image Section */}
                    <div className="relative h-40 md:h-48 overflow-hidden shrink-0">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 z-10">
                        <FaStar className="text-yellow-400 text-[10px]" />
                        <span className="text-white text-[10px] font-bold">
                          {service.rating || "5.0"}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 md:p-5 flex flex-col grow">
                      <h3 className="text-sm md:text-base font-bold text-base-200/50  group-hover:text-base-200/70 transition-colors duration-300 line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                        {service.type}
                      </p>

                      <div className="mt-3 mb-4">
                        <span className="text-lg md:text-xl font-bold text-base-200">
                          ৳{service.price?.toLocaleString()}
                        </span>
                        <span className="ml-1 text-[10px] text-base-200/70">
                          / package
                        </span>
                      </div>

                      {/* Button at the bottom */}
                      <div className="mt-auto">
                        <Link
                          to={`/serviceDetails/${service._id}`}
                          className="block"
                        >
                          <Button className="w-full py-2 text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-14 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 border rounded-lg bg-secondary text-base-200 border-none disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`px-4 py-2 border rounded-lg transition-colors border-gray-300 ${
                  page === num + 1 ? "bg-base-200 text-primary" : "text-gray-600"
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded-lg bg-secondary text-base-200 border-none disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllServices;