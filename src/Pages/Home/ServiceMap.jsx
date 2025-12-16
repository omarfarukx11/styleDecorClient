import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { IoSearch } from "react-icons/io5";


const ServiceMap = () => {
  const axiosSecure = useAxiosSecure()
  const position = [23.6850, 90.3563];
 
  const mapRef = useRef(null)

  const {data : serviceData = [] } = useQuery({
    queryKey : ['serviceCenter'],
    queryFn: async () => {
      const res = await axiosSecure.get('/serviceCenter')
      return res.data
     }
  })



  const handleSearch = (e) => {
    e.preventDefault()
    const location = e.target.location.value;
    const district = serviceData.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
    if(district) {
      const coord = [district.latitude , district.longitude];
      mapRef.current.flyTo(coord , 12)
    }
  }
  


  return (
    <div className="xl:p-20 p-4 rounded-xl mb-10">
      <div className="bg-secondary p-10 text-primary rounded-xl">
        <h1 className="text-5xl font-bold ">
          We provide services all over Bangladesh
        </h1>
        <div className="my-10">
         <form onSubmit={handleSearch}>
           <label className="input  rounded-4xl outline-none  bg-primary text-secondary border-none shadow-2xl my-5">
            <IoSearch className="text-4xl text-secondary" />
            <input  name="location" placeholder="Search here" required />
            <button  className="py-2 px-4 bg-secondary text-white rounded-4xl ml-4 relative left-3 font-bold">
              Search
            </button>
          </label>
         </form>
        </div>
      </div>

      <div className="h-[800px] my-10">
        <MapContainer 
        center={position}
         zoom={7} 
         scrollWheelZoom={false}
         className="h-[800px]"
         ref={mapRef}
         >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            serviceData.map((data , index) => 

            <Marker key={index} position={[data.latitude , data.longitude]}>
            <Popup><strong>{data.district}</strong> Service Area : {data.covered_area.join(', ')}</Popup>
          </Marker>
            )
          }
        </MapContainer>
      </div>
    </div>
  );
};

export default ServiceMap;