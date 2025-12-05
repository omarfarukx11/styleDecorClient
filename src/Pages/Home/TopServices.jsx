import { useState, useEffect } from "react";

const TopServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Our Decoration Packages</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(service => (
          <div key={service.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={service.image} alt={service.name} className="h-56 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.name}</h2>
              <p>{service.description.slice(0, 60)}...</p>
              <p className="font-bold text-primary text-lg">
                BDT {service.cost} / {service.unit}
              </p>
              <div className="card-actions">
                <button className="btn btn-primary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopServices;
