import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Loader from "../../Components/Loader";
import { Link } from "react-router";

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
    <section className="min-h-screen lg:p-20 p-4">
      <div className="mx-auto">
        {/* Header (unchanged) */}
        <div className="text-center md:my-10 md:py-16 py-4 px-6 bg-primary rounded-xl shadow-2xl text-secondary">
          <h2 className="text-2xl md:text-5xl lg:text-6xl font-extrabold md:mb-6 mb-2">
            Our Decoration Packages
          </h2>
          <p className="max-w-4xl mx-auto text-sm md:text-base lg:text-lg  leading-relaxed">
            Explore our range of flexible and innovative services designed to
            meet your unique needs.
          </p>
        </div>


        <form className="my-12 bg-primary rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              {...register("search")}
              type="text"
              placeholder="Search by package name..."
              className="w-full px-6 py-4 text-lg border text-secondary outline-none border-gray-300 rounded-2xl"
            />

            <select
              {...register("type")}
              className="w-full px-6 py-4 text-lg border text-secondary bg-primary outline-none border-gray-300 rounded-2xl"
            >
              <option value="All">All Service Types</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Anniversary">Anniversary</option>
            </select>

            <div className="flex items-center gap-4">
              <input
                {...register("minPrice")}
                type="number"
                placeholder="Min Price"
                className="w-full px-6 py-4 text-lg border text-secondary outline-none border-gray-300 rounded-2xl"
              />
              <span className="text-gray-500 text-xl">—</span>
              <input
                {...register("maxPrice")}
                type="number"
                placeholder="Max Price"
                className="w-full px-6 py-4 text-lg border text-secondary outline-none border-gray-300 rounded-2xl"
              />
            </div>
          </div>
        </form>

        <p className="text-right text-gray-600 mb-6">
          Found{" "}
          <span className="font-bold text-secondary">{services.length}</span> of{" "}
          <span className="font-bold">{total}</span> packages
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {isLoading ? (
            <Loader />
          ) : services.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-2xl text-gray-500">No packages found.</p>
            </div>
          ) : (
            services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -12 }}
                className="group relative bg-primary rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                        Starting from
                      </p>
                      <p className="text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                        ৳{service.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-extrabold text-gray-500 group-hover:text-white transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 font-medium uppercase tracking-wider">
                    {service.type}
                  </p>
                  <div className="mt-5">
                    <span className="text-3xl font-bold text-secondary">
                      ৳{service.price?.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-1">/ package</span>
                  </div>
                  <Link
                    to={`/serviceDetails/${service._id}`}
                    className="btn hover:bg-base-100  hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all my-5"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>


        <div className="flex justify-center mt-14 gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-lg bg-base-100 disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num + 1)}
              className={`px-4 py-2 border rounded-lg text-gray-600 ${
                page === num + 1 ? "bg-secondary text-primary" : ""
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded-lg bg-base-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllServices;
