import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaShareAlt, FaStar } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";

const ServiceDetails = () => {
  // const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: service = {} } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/servicesDetails/${id}`);
      return res.data;
    },
  });

  return (
<div className="min-h-screen bg-base-100 py-12 px-6 lg:px-12">
  <div className="max-w-screen-2xl mx-auto w-full">

    <div className="grid lg:grid-cols-2 gap-12 bg-base-200/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-base-300">


      <div className="relative group overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="text-white">
            <p className="text-5xl font-bold">৳{service.price}</p>
            <p className="text-lg opacity-90">Starting Price</p>
          </div>
        </div>

        <div className="absolute top-6 left-6 bg-primary text-primary-content px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
          Premium Package
        </div>
      </div>


      <div className="p-8 lg:p-16 flex flex-col justify-center">

        {/* Category */}
        <span className="badge badge-outline text-primary border-primary px-5 py-3 text-base font-medium mb-6">
          {service.type}
        </span>

        {/* Title */}
        <h1 className="text-4xl lg:text-6xl font-extrabold text-base-content mb-6 leading-tight">
          {service.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex text-yellow-500 text-2xl">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i < Math.floor(service.rating) ? "fill-current" : "opacity-30"}
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-base-content">{service.rating}</span>
          <span className="text-base-content/70">(248 reviews)</span>
        </div>

        {/* Description */}
        <p className="text-lg text-base-content/80 leading-relaxed mb-10">
          {service.description}
        </p>

        {/* Price */}
        <div className="mb-12">
          <p className="text-6xl font-black text-primary">
            ৳{service.price}
          </p>
          <p className="text-base-content/60 mt-2">One-time package price</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">
          <Link
            to="/book-now"
            className="btn btn-primary btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all flex-1 text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>

    {/* <div className="text-center mt-12">
      <p className="text-base-content/50 text-base">
        Trusted by 500+ couples across Bangladesh
      </p>
    </div> */}
  </div>
</div>
  );
};

export default ServiceDetails;

// server apis
// app.get("/servicesDetails/:id", async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: new ObjectId(id) };
//   const result = await servicesCollection.findOne(query);
//   res.send(result);
// });
