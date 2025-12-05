import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ServiceMap = () => {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Service Coverage Area</h2>

      <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[23.8103, 90.4125]} // Dhaka
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[23.8103, 90.4125]}>
            <Popup>We serve Dhaka City!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default ServiceMap;
