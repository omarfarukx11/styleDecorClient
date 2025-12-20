import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useForm, useWatch} from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const dialogRef = useRef();
  const navigate = useNavigate()

  const { data: service = {} } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/servicesDetails/${id}`);
      return res.data;
    },
  });

  const { data: regionData = [] , isLoading } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  

  const { register, handleSubmit, reset, control} = useForm();

  const selectedRegion = useWatch({control , name: "bookingRegion"});

  const regionsDuplicate = regionData.map((r) => r.region);
  const regions = [...new Set(regionsDuplicate)];

  const districtByRegion = (region) => {
    const regionDistrict = regionData.filter((r) => r.region === region);
    const districts = regionDistrict.map((d) => d.district);
    return districts;
  };

 
  useEffect(() => {
    if (service && user) {
      reset({
        serviceName: service.name || "",
        serviceType: service.type || "",
        serviceCost: service.price || 0,
        userName: user.displayName || "",
        userEmail: user.email || "",
        bookingStatus : "pending",
        bookingRegion: "",
        paymentStatus : "unpaid",
        bookingDistrict: "",
        bookingDate: "",
        location: "",
      });
    }
  }, [service, user, reset]);


  const handleBooking  = async (data) => {
    try {
      await axiosSecure.post("/booking", data);
        navigate('/dashboard/my-bookings')
       Swal.fire({
        icon: "success",
        title: "Booking Confirmed!",
        text: "Your service has been booked successfully.",
        timer: 2000,
      });
      dialogRef.current.close();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: { err },
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleModal = () => {
    if (!user) {
        navigate('/login')
      return;
    }
    dialogRef.current.showModal();
  };


  if(isLoading){
    return <Loader></Loader>
  }

  return (
    <div className="min-h-screen py-12 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 bg-primary backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-base-300">
          {/* Image Section */}
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
            <div className="absolute top-6 left-6 bg-primary text-primary-content px-6 py-2 rounded-full font-semibold text-secondary text-sm shadow-lg">
              Premium Package
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <span className="badge badge-outline text-secondary bg-primary border-primary px-5 py-3 text-base font-medium mb-6">
              {service.type}
            </span>

            <h1 className="text-2xl lg:text-6xl font-extrabold text-secondary mb-6 leading-tight">
              {service.name}
            </h1>

            <div className="flex items-center gap-3 mb-8">
              <div className="flex text-yellow-500 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(service.rating || 0)
                        ? "fill-current"
                        : "opacity-30"
                    }
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-secondary">
                {service.rating || "N/A"}
              </span>
              <span className="text-secondary">(248 reviews)</span>
            </div>

            <p className="text-lg text-secondary leading-relaxed mb-10">
              {service.description}
            </p>

            <div className="mb-12">
              <p className="text-2xl xl:text-6xl font-black text-secondary">
                ৳{service.price}
              </p>
              <p className="text-secondary mt-2">
                One-time package price
              </p>
            </div>

            <button
              onClick={handleModal}
              className="btn hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>


      {/* Booking Modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-primary  p-8">
          <h3 className="text-3xl font-bold text-center text-secondary mb-6">
            Confirm Your Booking
          </h3>

          <form onSubmit={handleSubmit(handleBooking)} className="space-y-5 text-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-secondary ">
              <div>
                <label className="font-semibold text-secondary">Service Name</label>
                <input
                  {...register("serviceName")}
                  readOnly
                  className="input input-bordered outline-none text-secondary bg-accent  w-full"
                />
              </div>
              <div>
                <label className="font-semibold text-secondary">Price</label>
                <input
                  {...register("serviceCost")}
                  readOnly
                  className="input input-bordered outline-none text-secondary bg-accent w-full"
                />
              </div>
              <div>
                <label className="font-semibold text-secondary">Your Name</label>
                <input
                  {...register("userName")}
                  readOnly
                  className="input input-bordered outline-none text-secondary bg-accent w-full"
                />
              </div>
              <div>
                <label className="font-semibold text-secondary">Your Email</label>
                <input
                  {...register("userEmail")}
                  readOnly
                  className="input input-bordered outline-none text-secondary bg-accent w-full"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-secondary">
                Booking Date
              </label>
              <input
                type="date"
                {...register("bookingDate", { required: true })}
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered text-secondary bg-accent outline-none w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-secondary">
                  Region
                </label>
                <select
                  {...register("bookingRegion", { required: true })}
                  className="select select-bordered w-full text-secondary bg-accent outline-none" 
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-secondary">
                  District
                </label>
                <select
                  {...register("bookingDistrict", { required: true })}
                  className="select select-bordered text-secondary bg-accent w-full outline-none"text-secondary bg-accent 
                >
                  {districtByRegion(selectedRegion).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-secondary">
                Full Address <span className="text-error">*</span>
              </label>
              <input
                {...register("location", { required: true })}
                placeholder="House, Road, Area, City"
                className="input input-bordered outline-none text-secondary bg-accent w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <button type="submit" className="btn hover:bg-base-100 flex-1 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all py-2">
                Confirm Booking
              </button>
              <button
                type="button"
                className="btn hover:bg-base-100 flex-1 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all py-2"
                onClick={() => dialogRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
