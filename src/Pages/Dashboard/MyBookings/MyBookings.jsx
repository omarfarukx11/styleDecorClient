// MyBookings.jsx
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updateRef = useRef();
  const payRef = useRef()
  const [bookingData , setBookingData] = useState(null)
  const { register, handleSubmit , watch } = useForm();

  const { data: book = [] , refetch } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  // ----------regions api -----------
    const { data: centers = [] } = useQuery({
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
        title:err,
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
        cost : bookingData.serviceCost ,
        userId : bookingData._id,
        serviceName : bookingData.serviceName,
        userEmail : bookingData.userEmail
      }
      const res = await axiosSecure.post('/create-checkout-session' , paymentInfo)
      window.location.assign(res.data.url)

   }

  const handleModal = () => {
    updateRef.current.showModal();
  };
  const handlePayModal = () => {
    payRef.current.showModal();
  };


  return (
    <div className="p-6 lg:p-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">My Bookings</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-2xl border border-base-300">
        <table className="table table-zebra w-full text-base">
          <thead className="bg-linear-to-r from-primary to-secondary text-white text-sm uppercase">
            <tr>
              <th className="py-5">#</th>
              <th>Service Name</th>
              <th>Category</th>
              <th className="pl-20">Date</th>
              <th>Amount</th>
              <th>Booking Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            {book.map((b, i) => (
              <tr key={b._id} className="hover:bg-base-200 transition-all">
                <td className="text-center font-bold">{i + 1}</td>
                <td className="font-semibold text-lg">{b.serviceName}</td>
                <td>{b.serviceType} </td>
                <td className="text-center">{b.bookingDate}</td>
                <td className="font-bold text-primary text-lg">
                  ৳{b.serviceCost}
                </td>
                <td>{b.bookingStatus}</td>
                <td className="text-center">{b.paymentStatus}</td>
                <td className="text-center">
                  <div className="space-x-5">
                    {
                      b.paymentStatus === "unpaid" ? 
                      <button 
                      onClick={() => {
                        handlePayModal();
                        setBookingData(b)
                      }}
                      className="btn bg-primary text-white">
                      Pay
                    </button> : 
                    <button className="btn bg-green-500 text-white">Paid</button>
                    }
                    <button
                      onClick={() => {
                        handleModal();
                        setBookingData(b)
                      }}
                      className="btn bg-yellow-500 text-white"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteBooking(b._id);
      
                      }}
                      className="btn bg-red-900 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


{/*------------------- modal section ----------------- */}

      <dialog ref={updateRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-8">
            <h1 className="text-5xl text-center font-bold mb-3">Booking Information</h1>
          <div className="bg-base-200 p-4 rounded-xl mb-5">
              <p className="text-lg">Service Name : {bookingData?.serviceName}</p>
              <p className="text-lg">Service Cost : ৳{bookingData?.serviceCost}</p>
              <p className="text-lg">Booker Name :  {bookingData?.userName}</p>
              <p className="text-lg">Booker Email : {bookingData?.userEmail}</p>
          </div>

          <h1 className="text-4xl font-bold text-center text-primary mb-6">
            Update Your Booking
          </h1>
          <form
            onSubmit={handleSubmit(handleUpdateBooking)}
            className="space-y-5"
          >
            {/* Read-only fields */}

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
                Update Booking
              </button>
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => updateRef.current.close()}
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

    <dialog ref={payRef} className="modal">
     <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-8">
              <h1 className="text-center font-extrabold text-3xl py-5">Complete the payment for the services booked by {bookingData?.userName}</h1>
       <div className="bg-base-200 p-8 rounded-xl mb-5">
              <p className="text-lg">Service Name : {bookingData?.serviceName}</p>
              <p className="text-lg">Service Cost : ৳{bookingData?.serviceCost}</p>
              <p className="text-lg">Booker Name :  {bookingData?.userName}</p>
              <p className="text-lg">Booker Email : {bookingData?.userEmail}</p>
              <p className="text-lg">Booker Address : {bookingData?.location} {bookingData?.BookingDistrict} {bookingData?.BookingRegion}</p>
          </div>
           <div className="flex gap-3 mt-6">
              <button onClick={() => { handlePayment(bookingData)}} type="submit" className="btn btn-primary flex-1">
                Pay For Service
              </button>
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={() => payRef.current.close()}
              >
                Cancel
              </button>
            </div>
     </div>
    </dialog>


    </div>
  );
};

export default MyBookings;
