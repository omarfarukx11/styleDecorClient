import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useForm} from "react-hook-form";
import Swal from "sweetalert2";

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

  const { data: centers = [] } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  const { register, handleSubmit, control, reset, watch } = useForm();

  const selectedRegion = watch("BookingRegion");

  const regions = [...new Set(centers.map((c) => c.region))];

  const districts = selectedRegion
    ? centers.filter((c) => c.region === selectedRegion).map((c) => c.district)
    : [];

 
  useEffect(() => {
    if (service && user) {
      reset({
        serviceName: service.name || "",
        serviceType: service.type || "",
        serviceCost: service.price || 0,
        userName: user.displayName || "",
        userEmail: user.email || "",
        bookingStatus : "pending",
        BookingRegion: "",
        paymentStatus : "unpaid",
        BookingDistrict: "",
        bookingDate: "",
        location: "",
      });
    }
  }, [service, user, reset]);


  const onSubmit = async (data) => {
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

  const handleBookNow = () => {
    if (!user) {
        navigate('/login')
      return;
    }
    dialogRef.current.showModal();
  };
  return (
    <div className="min-h-screen bg-base-100 py-12 px-6 lg:px-12">
      <div className="max-w-screen-2xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 bg-base-200/30 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-base-300">
          {/* Image Section */}
          <div className="relative group overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="text-white">
                <p className="text-5xl font-bold">৳{service.price}</p>
                <p className="text-lg opacity-90">Starting Price</p>
              </div>
            </div>
            <div className="absolute top-6 left-6 bg-primary text-primary-content px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
              Premium Package
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <span className="badge badge-outline text-primary border-primary px-5 py-3 text-base font-medium mb-6">
              {service.type}
            </span>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-base-content mb-6 leading-tight">
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
              <span className="text-2xl font-bold text-base-content">
                {service.rating || "N/A"}
              </span>
              <span className="text-base-content/70">(248 reviews)</span>
            </div>

            <p className="text-lg text-base-content/80 leading-relaxed mb-10">
              {service.description}
            </p>

            <div className="mb-12">
              <p className="text-6xl font-black text-primary">
                ৳{service.price}
              </p>
              <p className="text-base-content/60 mt-2">
                One-time package price
              </p>
            </div>

            <button
              onClick={handleBookNow}
              className="btn btn-primary btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-8">
          <h3 className="text-3xl font-bold text-center text-primary mb-6">
            Confirm Your Booking
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Read-only fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Service Name</label>
                <input
                  {...register("serviceName")}
                  readOnly
                  className="input input-bordered outline-none w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Price</label>
                <input
                  {...register("serviceCost")}
                  readOnly
                  className="input input-bordered outline-none w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Your Name</label>
                <input
                  {...register("userName")}
                  readOnly
                  className="input input-bordered outline-none w-full"
                />
              </div>
              <div>
                <label className="font-semibold">Your Email</label>
                <input
                  {...register("userEmail")}
                  readOnly
                  className="input input-bordered outline-none w-full"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Booking Date <span className="text-error">*</span>
              </label>
              <input
                type="date"
                {...register("bookingDate", { required: true })}
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered outline-none w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">
                  Region <span className="text-error">*</span>
                </label>
                <select
                  {...register("BookingRegion", { required: true })}
                  className="select select-bordered w-full"
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
                <label className="font-semibold">
                  District <span className="text-error">*</span>
                </label>
                <select
                  {...register("BookingDistrict", { required: true })}
                  className="select select-bordered w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold">
                Full Location / Address <span className="text-error">*</span>
              </label>
              <input
                {...register("location", { required: true })}
                placeholder="House, Road, Area, City"
                className="input input-bordered outline-none w-full"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="btn btn-primary flex-1">
                Confirm Booking
              </button>
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => dialogRef.current.close()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Click outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;
