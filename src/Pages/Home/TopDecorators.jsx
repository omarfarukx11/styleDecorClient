import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const TopDecorators = () => {
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/top-decorators")
      .then(res => res.json())
      .then(data => setDecorators(data));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Top Decorators</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {decorators.map(d => (
          <div key={d._id} className="card bg-base-100 shadow-xl p-4">
            <img
              src={d.photo}
              alt={d.name}
              className="rounded-xl h-40 w-full object-cover"
            />
            <h3 className="text-xl font-bold mt-3">{d.name}</h3>

            {/* Rating */}
            <div className="flex items-center text-yellow-500 mt-1">
              <FaStar /> <span className="ml-1">{d.rating}</span>
            </div>

            {/* Specialties */}
            <p className="mt-2 text-sm text-gray-500">
              Specialties: {d.specialties.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDecorators;
