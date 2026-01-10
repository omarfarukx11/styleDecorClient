import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader";
import BigTitile from "../../../../utility/BigTitile";
import Button from "../../../../utility/Button";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updateRef = useRef();
  const payRef = useRef();
  const [bookingData, setBookingData] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();

  // Fetching user-specific bookings
  const { data: book = [], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  // Fetching service centers for the update form dropdowns
  const { data: centers = [], isLoading } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  // Dynamic Region/District Logic
  const selectedRegion = watch("BookingRegion");
  const regions = [...new Set(centers.map((c) => c.region))];
  const districts = selectedRegion
    ? centers.filter((c) => c.region === selectedRegion).map((c) => c.district)
    : [];

  // Logic: Update Booking
  const handleUpdateBooking = (data) => {
    axiosSecure
      .patch(`/booking/${bookingData._id}`, data)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          reset();
          updateRef.current.close();
          Swal.fire({
            icon: "success",
            title: "Booking Updated!",
            text: "Your booking has been successfully updated.",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err,
          text: "Something went wrong. Please try again.",
        });
      });
  };


  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  
  const handlePayment = async (bookingData) => {
    const paymentInfo = {
      cost: bookingData.serviceCost,
      userId: bookingData._id,
      serviceName: bookingData.serviceName,
      userEmail: bookingData.userEmail,
      userName: bookingData.userName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.assign(res.data.url);
  };

  const handleModal = () => updateRef.current.showModal();
  const closeUpdateModal = () => updateRef.current.close();
  const handlePayModal = () => payRef.current.showModal();


  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="text-base-200">
      <title>StyelDecor - My Booking</title>
      
      {/* Header */}
      <BigTitile>My Bookings</BigTitile>

      <div className="bg-primary min-h-screen p-2 md:p-8">
        <div className="hidden xl:flex bg-secondary text-base-200 py-6 xl:justify-between rounded-md text-sm xl:text-lg font-semibold px-4">
          <div className="w-12 text-center">#</div>
          <div className="flex-2 min-w-[200px] text-center">Service Name</div>
          <div className="flex-1 text-center">Category</div>
          <div className="flex-1 text-center">Date</div>
          <div className="flex-1 text-center">Amount</div>
          <div className="flex-1 text-center">Booking Status</div>
          <div className="flex-1 text-center">Service Status</div>
          <div className="flex-1 text-center">Payment Status</div>
          <div className="flex-[1.5] min-w-[200px] text-center">Action</div>
        </div>

        {/* Bookings List */}
        <div className="space-y-5 mt-5">
          {book.length === 0 ? (
            <p className="md:text-4xl text-center mt-10 font-bold uppercase">
              you didn't booking yet
            </p>
          ) : (
            book.map((b, i) => (
              <div
                key={b._id}
                className="flex flex-col text-xs bg-base-100 hover:bg-secondary xl:flex-row xl:items-center xl:justify-between rounded-lg p-2 2xl:text-xl xl:text-sm xl:px-4"
              >
                {/* Index */}
                <div className="flex justify-between xl:w-12 px-2 py-2 font-semibold">
                  <span className="xl:hidden">#</span>
                  <span className="xl:text-center text-end w-full xl:w-auto">{i + 1}</span>
                </div>

                {/* Service Name */}
                <div className="flex justify-between xl:flex-2 xl:min-w-[200px] px-2 py-2">
                  <span className="xl:hidden font-semibold">Service Name</span>
                  <span className="xl:text-start xl:w-full">{b.serviceName}</span>
                </div>

                {/* Category */}
                <div className="flex justify-between xl:flex-1 px-2 py-2">
                  <span className="xl:hidden font-semibold">Category</span>
                  <span className="xl:text-center xl:w-full">{b.serviceType}</span>
                </div>

                {/* Date */}
                <div className="flex justify-between xl:flex-1 px-2 py-2">
                  <span className="xl:hidden font-semibold">Date</span>
                  <span className="xl:text-center xl:w-full">{b.bookingDate}</span>
                </div>

                {/* Amount */}
                <div className="flex justify-between xl:flex-1 px-2 py-2 font-semibold">
                  <span className="xl:hidden font-semibold">Amount</span>
                  <span className="xl:text-center xl:w-full">৳{b.serviceCost}</span>
                </div>

                {/* Booking Status */}
                <div className="flex justify-between xl:flex-1 px-2 py-1">
                  <span className="xl:hidden font-semibold">Booking Status</span>
                  <div className="xl:w-full xl:flex xl:justify-center">
                    <span className={`px-2 py-1 rounded-xl text-md ${b.bookingStatus === "Confirmed" ? "text-green-500" : "text-yellow-500"}`}>
                      {b.bookingStatus}
                    </span>
                  </div>
                </div>

                {/* Service Status */}
                <div className="flex justify-between xl:flex-1 px-2 py-1">
                  <span className="xl:hidden font-semibold">Service Status</span>
                  <div className="xl:w-full xl:flex xl:justify-center">
                    <span className={`px-2 py-1 rounded-xl text-md capitalize ${b.decoratorStatus === "completed" ? "text-green-500" : "text-blue-500"}`}>
                      {b.decoratorStatus}
                    </span>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="flex justify-between xl:flex-1 px-2 py-1">
                  <span className="xl:hidden font-semibold">Payment</span>
                  <div className="xl:w-full xl:flex xl:justify-center">
                    <span className={`px-2 py-1 rounded-xl capitalize text-md ${b.paymentStatus === "paid" ? "text-green-500" : "text-red-500"}`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex xl:flex-row w-full  flex-col gap-2 xl:flex-[1.5] xl:min-w-[200px] px-2 py-2 justify-center">
                  {b.paymentStatus !== "paid" && (
                    <button
                      onClick={() => { handlePayModal(); setBookingData(b); }}
                      className="btn text-base-100 xl:btn-sm border-none"
                    >
                      Pay
                    </button>
                  )}

                  {b.decoratorStatus !== "completed" && (
                    <button
                      onClick={() => { handleModal(); setBookingData(b); }}
                      className="btn btn-warning xl:btn-sm border-none text-white"
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    className="btn btn-error xl:btn-sm border-none text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* UPDATE MODAL */}
      <dialog ref={updateRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-primary p-8 my-10 py-10 text-base-200">
          <h1 className="md:text-5xl text-2xl text-center font-bold mb-10">Booking Information</h1>
          <div className="bg-base-100 p-4 rounded-xl">
            <p className="text-lg">Service Name: {bookingData?.serviceName}</p>
            <p className="text-lg">Service Cost: ৳ {bookingData?.serviceCost}</p>
            <p className="text-lg">Booker Name: {bookingData?.userName}</p>
            <p className="text-lg">Booker Email: {bookingData?.userEmail}</p>
          </div>
          <h1 className="text-4xl font-bold text-center text-primary mb-6 mt-4">Update Your Booking</h1>
          <form onSubmit={handleSubmit(handleUpdateBooking)} className="space-y-5">
            <div>
              <label className="font-semibold">Booking Date</label>
              <input
                type="date"
                {...register("bookingDate", { required: true })}
                min={new Date().toISOString().split("T")[0]}
                className="input input-bordered bg-base-100 outline-none w-full"
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Region</label>
                <select
                  {...register("BookingRegion", { required: true })}
                  className="select select-bordered bg-base-100 outline-none w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-semibold">District</label>
                <select
                  {...register("BookingDistrict", { required: true })}
                  className="select select-bordered bg-base-100 outline-none w-full"
                  disabled={!selectedRegion}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="font-semibold">Full Address</label>
              <input
                {...register("location", { required: true })}
                placeholder="House, Road, Area, City"
                className="input input-bordered bg-base-100 outline-none w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 mt-6">
              <Button type="submit" className="btn hover:bg-base-100 flex-1 hover bg-secondary text-base-100 border-none btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all">
                Update Booking
              </Button>
              <button onClick={closeUpdateModal} className="w-full">
              <Button type="button"  className="btn hover:bg-base-100 flex-1 hover bg-secondary text-base-100 border-none btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all" onClick={() => updateRef.current.close()}>
                Cancel
              </Button>
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* PAYMENT MODAL */}
      <dialog ref={payRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-primary text-base-200 p-8">
          <h1 className="text-center font-extrabold text-3xl py-5">
            Complete payment for {bookingData?.userName}
          </h1>
          <div className="bg-base-100 shadow-2xl p-8 rounded-xl mb-5">
            <p className="text-lg">Service Name: {bookingData?.serviceName}</p>
            <p className="text-lg">Service Cost: ৳{bookingData?.serviceCost}</p>
            <p className="text-lg">Booker Name: {bookingData?.userName}</p>
            <p className="text-lg">Booker Email: {bookingData?.userEmail}</p>
            <p className="text-lg">
              Address: {bookingData?.location} {bookingData?.BookingDistrict} {bookingData?.BookingRegion}
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="flex-1"
              onClick={() => handlePayment(bookingData)}
            >
              <Button>Pay For Service</Button>
            </button>
            <button
              type="button"
              className="flex-1"
              onClick={() => payRef.current.close()}
            >
              <Button>Cancel</Button>
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;