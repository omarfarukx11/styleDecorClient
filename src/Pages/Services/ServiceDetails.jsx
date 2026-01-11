import React, { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import Loader from "../../Components/Loader";
import NotFound from "../../Components/NotFound";
import Button from "../../utility/Button";

const ServiceDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const dialogRef = useRef();
  const navigate = useNavigate();

  const { data: service, isLoading: isServiceLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/servicesDetails/${id}`);
      return res.data;
    },
  });

  const { data: regionData = [], isLoading: isRegionLoading } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  const { register, handleSubmit, reset, control,formState : {errors }} = useForm();

  const selectedRegion = useWatch({ control, name: "bookingRegion" });

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
        bookingStatus: "pending",
        bookingRegion: "",
        paymentStatus: "unpaid",
        bookingDistrict: "",
        bookingDate: "",
        location: "",
      });
    }
  }, [service, user , reset]);

  const handleBooking = async (data) => {
    try {
      await axiosSecure.post("/booking", data);
      navigate("/dashboard/my-bookings");
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
        title: err.message || "Booking Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  const handleModal = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    dialogRef.current.showModal();
  };

  if (isServiceLoading || isRegionLoading) {
    return <Loader></Loader>;
  }

  if (!service || !service._id) {
    return <NotFound></NotFound>;
  }

  return (
    <div className="min-h-[calc(100vh-90px)] py-12 px-6 lg:px-12 text-base-200">
      <title>StyelDecor - Sevice Details</title>
      <div className="max-w-screen-2xl mx-auto w-full bg-secondary rounded-xl">
        <div className="grid lg:grid-cols-2 gap-12 backdrop-blur-xl shadow-sm rounded-xl overflow-hidden ">
          <div className="relative group overflow-hidden ">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="">
                <p className="text-5xl font-bold">৳{service.price}</p>
                <p className="text-lg opacity-90">Starting Price</p>
              </div>
            </div>
            <div className="absolute top-6 left-6 bg-primary  px-6 py-2 rounded-full font-semibold  text-sm shadow-lg">
              Premium Package
            </div>
          </div>

          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <span className="badge badge-outline  bg-primary border-primary px-5 py-3 text-base font-medium mb-6">
              {service.type}
            </span>

            <h1 className="text-2xl lg:text-6xl font-extrabold  mb-6 leading-tight">
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
              <span className="text-2xl font-bold ">
                {service.rating || "N/A"}
              </span>
            </div>

            <p className="text-lg  leading-relaxed mb-10">
              {service.description}
            </p>

            <div className="mb-12">
              <p className="text-2xl xl:text-6xl font-black ">
                ৳{service.price}
              </p>
              <p className=" mt-2">One-time package price</p>
            </div>

            <button
              onClick={handleModal}
            >
              <Button>Book Now</Button>
            </button>
          </div>
        </div>
      </div>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-primary p-8 text-base-200">
          <h3 className="text-3xl font-bold text-center  mb-6">
            Confirm Your Booking
          </h3>

          <form
            onSubmit={handleSubmit(handleBooking)}
            className="space-y-5 text-black"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base-200 ">
              <div>
                <label className="font-semibold">
                  Service Name
                </label>
                <input
                  {...register("serviceName")}
                  readOnly
                  className="input input-bordered outline-none bg-base-100  w-full"
                />
              </div>
              <div>
                <label className="font-semibold ">Price</label>
                <input
                  {...register("serviceCost")}
                  readOnly
                  className="input input-bordered outline-none bg-base-100 w-full"
                />
              </div>
              <div>
                <label className="font-semibold ">
                  Your Name
                </label>
                <input
                  {...register("userName")}
                  readOnly
                  className="input input-bordered outline-none bg-base-100 w-full"
                />
              </div>
              <div>
                <label className="font-semibold ">
                  Your Email
                </label>
                <input
                  {...register("userEmail")}
                  readOnly
                  className="input input-bordered outline-none bg-base-100 w-full"
                />
              </div>
            </div>

            <div className="text-base-200">
              <label className="font-semibold ">
                Booking Date
              </label>
              <input
                type="date"
                {...register("bookingDate", { required: true })}
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered bg-base-100 outline-none w-full"
              />
               {errors.bookingDate?.type === "required" && (
              <p className="text-red-600">Date Required</p>
            )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base-200">
              <div>
                <label className="font-semibold ">Region</label>
                <select
                  {...register("bookingRegion", { required: true })}
                  className="select select-bordered w-full bg-base-100 outline-none"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                 {errors.bookingRegion?.type === "required" && (
              <p className="text-red-600">Region Required</p>
            )}
              </div>

              <div>
                <label className="font-semibold ">District</label>
                <select
                  {...register("bookingDistrict", { required: true })}
                  className="select select-bordered bg-base-100 w-full outline-none"
                >
                  {districtByRegion(selectedRegion).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-base-200">
              <label className="font-semibold ">
                Full Address 
              </label>
              <input
                {...register("location", { required: true })}
                placeholder="House, Road, Area, City"
                className="input input-bordered outline-none bg-base-100 w-full"
              />
              {errors.location?.type === "required" && (
              <p className="text-red-600">Address Required</p>
            )}
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <button
                type="submit"
                className="flex-1"
              >
                <Button>Confirm Booking</Button>
              </button>
              <button
                type="button"
                className="flex-1"
                onClick={() => dialogRef.current.close()}
              >
                 <Button>Cancel</Button>
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ServiceDetails;