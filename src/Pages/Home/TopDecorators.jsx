import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TopDecorators = () => {
  // const {} = useAuth()
  const axiosSecure = useAxiosSecure();
  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/topDecorators");
      return res.data;
    },
  });
  useEffect(() => {}, []);

  return (
    <section className="xl:p-20 p-4">
      <div className="text-center my-10 py-10 px-4 bg-primary text-secondary rounded-2xl shadow-xl">
        <h2 className="text-5xl font-extrabold mb-6 ">
          Top Decorators
        </h2>

        <p className="max-w-3xl mx-auto text-sm   leading-relaxed">
          Discover our top decorators who bring creativity, expertise, and
          precision to every event. From luxurious weddings to corporate
          gatherings, birthday celebrations, and themed parties, each decorator
          is handpicked for their unique skills and proven track record. Explore
          their specialties, see their ratings, and choose the perfect
          professional to make your event unforgettable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {decorators.map((d) => (
          <div
            key={d._id}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 overflow-hidden border border-gray-100"
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={d.image}
                className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 
              bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <h3 className="text-2xl font-extrabold text-gray-800 group-hover:text-secondary transition-colors">
                {d.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mt-3 text-yellow-500">
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <FaStar className="text-xl" />
                <span className="ml-2 text-lg font-semibold text-gray-700">
                  {d.rating} / 5.0
                </span>
              </div>

              {/* Specialties */}
              <div className="mt-5">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                  Specialties
                </p>
                <p className="mt-2 text-base text-gray-700 font-medium leading-relaxed">
                  {d.specialties}
                </p>
                <p className="mt-2 text-base text-gray-700 font-medium leading-relaxed">
                  {d.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
