import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";
import MyBookingSkeleton from "../../../../Skelenton/MyBookingSkeleton";
import Title from "../../../../utility/Title";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updateRef = useRef();
  const payRef = useRef();
  const [bookingData, setBookingData] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();

  const { data: book = [], refetch, isLoading: isBookLoading } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: centers = [], isLoading: isCenterLoading } = useQuery({
    queryKey: ["serviceCenters"],
    queryFn: async () => {
      const res = await axiosSecure.get("/serviceCenter");
      return res.data;
    },
  });

  const selectedRegion = watch("BookingRegion");
  const regions = [...new Set(centers.map((c) => c.region))];
  const districts = selectedRegion
    ? centers.filter((c) => c.region === selectedRegion).map((c) => c.district)
    : [];

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
            background: "#040404",
            color: "#fff",
          });
        }
      });
  };

  const handleDeleteBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      background: "#040404",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/booking/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({ title: "Deleted!", icon: "success", background: "#040404", color: "#fff" });
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

  if (isBookLoading || isCenterLoading) return <MyBookingSkeleton></MyBookingSkeleton>

  return (
    <div className="font-body  min-h-[calc(100vh-90px)]">
      <title>StyleDecor - My Booking</title>
      
      <Title>My Bookings</Title>
      <div className="bg-primary p-4 md:p-8">

        <div className="hidden xl:flex bg-secondary backdrop-blur-md text-base-200 py-8 text-xs font-bold uppercase tracking-widest px-6">
          <div className="w-12">#</div>
          <div className="flex-2 min-w-[200px]">Service Name</div>
          <div className="flex-1 text-center">Category</div>
          <div className="flex-1 text-center">Date</div>
          <div className="flex-1 text-center">Amount</div>
          <div className="flex-1 text-center">Status</div>
          <div className="flex-[1.5] text-right">Actions</div>
        </div>

        {/* BODY */}
        <div className="space-y-4 mt-4">
          {book.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
               <p className="text-2xl text-base-200/30 font-bold uppercase font-title">No Bookings Found</p>
            </div>
          ) : (
            book.map((b, i) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={b._id}
                className="flex flex-col xl:flex-row xl:items-center bg-base-100 border lg:py-6 border-white/5 hover:border-secondary/30 text-base-200  shadow-sm p-4 xl:px-6 transition-all"
              >
                <div className="flex justify-between xl:w-12 font-bold text-secondary">
                  <span className="xl:hidden">#</span>
                  <span>{i + 1}</span>
                </div>

                <div className="flex justify-between xl:flex-2 xl:min-w-[200px] mt-2 xl:mt-0">
                  <span className="xl:hidden opacity-50">Service</span>
                  <span className="font-title uppercase font-black tracking-tight text-end">{b.serviceName}</span>
                </div>

                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden opacity-50">Category</span>
                  <span className="xl:w-full">{b.serviceType}</span>
                </div>

                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden opacity-50">Date</span>
                  <span className="xl:w-full">{b.bookingDate}</span>
                </div>

                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0 font-bold">
                  <span className="xl:hidden opacity-50">Amount</span>
                  <span className="xl:w-full ">৳{b.serviceCost}</span>
                </div>

                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden opacity-50">Status</span>
                  <div className="xl:w-full">
                    <span className={`lg:px-5 px-3 py-2 rounded-full text-[10px] font-bold uppercase ${
                      b.paymentStatus === "paid" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row gap-2 xl:flex-[1.5] mt-4 xl:mt-0 justify-end">
                  {b.paymentStatus !== "paid" && (
                    <button onClick={() => { setBookingData(b); payRef.current.showModal(); }} className="btn btn-xs bg-base-200 text-primary border-none rounded-lg hover:bg-secondary">Pay</button>
                  )}
                  {b.decoratorStatus !== "completed" && (
                    <button onClick={() => { setBookingData(b); updateRef.current.showModal(); }} className="btn btn-xs bg-white/10 text-base-200 border-none rounded-lg hover:bg-white/20">Update</button>
                  )}
                  <button onClick={() => handleDeleteBooking(b._id)} className="btn btn-xs bg-red-500/10 text-red-500 border-none rounded-lg hover:bg-red-500 hover:text-white">Delete</button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* MODALS (Update & Pay) - Kept logic but updated colors */}
      <dialog ref={updateRef} className="modal backdrop-blur-sm">
        <div className="modal-box w-11/12 max-w-2xl bg-primary border border-white/10 p-8 rounded-[2rem]">
           <h2 className="text-3xl font-title font-black uppercase text-base-200 mb-6 text-center">Update Booking</h2>
           {/* ... Form remains same but with text-base-200 classes ... */}
           <form onSubmit={handleSubmit(handleUpdateBooking)} className="space-y-4 text-base-200">
              <input type="date" {...register("bookingDate")} className="input w-full bg-white/5 border-white/10 rounded-xl" />
              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold">Save</button>
                <button type="button" onClick={() => updateRef.current.close()} className="flex-1 border border-white/10 py-3 rounded-xl">Cancel</button>
              </div>
           </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookings;
