import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoSearch } from "react-icons/io5";
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

  return (
    <section>
      <div className="xl:p-20 p-4 rounded-xl md:mb-10 max-w-[1980px] mx-auto ">
        <div className="text-base-200 p-10 rounded-xl flex items-center justify-center flex-col">
          <Title>We provide services all over Bangladesh</Title>
          <div className="md:my-10 flex justify-center sm:justify-start">
  <form onSubmit={handleSearch} className="w-full max-w-sm"> {/* Controlled small width */}
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
</div>
        </div>

        <div className="h-[800px] my-10">
          <MapContainer
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            className="h-[800px] z-0 relative"
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
        </div>
      </div>
    </section>
  );
};

export default ServiceMap;
