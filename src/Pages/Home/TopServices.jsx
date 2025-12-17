import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
const TopServices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: service = [] } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  return (
    <section className="xl:p-20 p-4 ">
      <div className="text-center md:my-10 md:py-10 py-4 my-4 px-4 bg-primary text-secondary rounded-xl">
        <h2 className="md:text-5xl text-2xl font-extrabold mb-4  ">
          Our Decoration Packages
        </h2>

        <p className=" max-w-xl mx-auto text-xs ">
          Explore our range of flexible and innovative services designed to meet
          your unique needs. From expert consultation to hands-on execution, we
          ensure each solution is personalized, seamless, and impactful.
          Discover how our dynamic services can elevate your experience today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {service.map((service) => (
          <div
            key={service._id}
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
                  <p className="md:text-3xl text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                    ৳{service.price}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-7">
              <h2 className="md:text-2xl text-xl font-extrabold text-gray-500 group-hover:text-white transition-colors duration-300">
                {service.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500 font-medium uppercase tracking-wider">
                {service.type}
              </p>

              <div className="mt-5">
                <span className="md:text-3xl text-xl font-bold text-secondary">
                  ৳{service.price}
                </span>
                <span className="ml-1 text-secondary">/ package</span>
              </div>

              <div className="mt-6">
                <Link
                  to={`/serviceDetails/${service._id}`}
                  className="btn hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 border-none btn-sm md:btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopServices;
