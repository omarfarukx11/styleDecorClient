import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoSearch } from "react-icons/io5";
import { motion } from "framer-motion"; // Added motion import
import Button from "../../utility/Button";
import Title from "../../utility/Title";

const ServiceMap = () => {
  const axiosSecure = useAxiosSecure();
  const position = [23.685, 90.3563];

  const mapRef = useRef(null);

  const { data: serviceData = [] } = useQuery({
    queryKey: ["serviceCenter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceData.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12);
    }
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <section className="overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="rounded-xl max-w-[1980px] lg:px-20 mx-auto "
      >
        <div className="text-base-200 rounded-xl flex items-center justify-center flex-col">
          <motion.div variants={itemVariants}>
            <Title>We provide services all over Bangladesh</Title>
          </motion.div>

          <motion.div variants={itemVariants} className="md:my-10 flex justify-center sm:justify-start">
            <form onSubmit={handleSearch} className="w-full max-w-sm">
              <label className="flex items-center bg-accent rounded-lg shadow-sm overflow-hidden transition-all ">
                <IoSearch className="text-xl text-base-200/50 ml-3 shrink-0" />
                <input
                  name="location"
                  placeholder="Search location..."
                  required
                  className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-base-200 placeholder:text-base-200/30 w-full"
                />
                <div className="shrink-0">
                  <Button>
                    <span className="text-xs md:text-sm">Search</span>
                  </Button>
                </div>
              </label>
            </form>
          </motion.div>
        </div>

        {/* Map Container with Animation */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.4 } }
          }}
          className="h-[800px] lg:mb-20 mb-5 mt-5 px-5"
        >
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="h-[800px] z-0 relative rounded-2xl overflow-hidden border border-white/10"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceData.map((data, index) => (
              <Marker key={index} position={[data.latitude, data.longitude]}>
                <Popup>
                  <strong>{data.district}</strong> Service Area :{" "}
                  {data.covered_area.join(", ")}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServiceMap;