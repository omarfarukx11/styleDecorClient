import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
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
    <section className="p-20 bg-[#f8f8f8]">
      <div className="text-center my-10  py-10 px-4 bg-primary  rounded-2xl">
        <h2 className="text-5xl font-extrabold mb-4 text-white ">
           Our Decoration Packages
          </h2>

        <p className=" max-w-xl mx-auto text-xs text-gray-100">
          Explore our range of flexible and innovative services designed to meet
          your unique needs. From expert consultation to hands-on execution, we
          ensure each solution is personalized, seamless, and impactful.
          Discover how our dynamic services can elevate your experience today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {service.map((service) => (
          <div key={service.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={service.image}
                alt={service.name}
                className="h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <p>{service.type}</p>
              <p className="font-bold text-primary text-lg">
                BDT {service.price}
              </p>
              <div className="card-actions">
                <button className="btn btn-primary hover:bg-white hover:text-primary hover:border-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopServices;
