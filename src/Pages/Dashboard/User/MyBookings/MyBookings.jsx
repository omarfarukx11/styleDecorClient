import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const updateRef = useRef();
  const payRef = useRef();
  const [bookingData, setBookingData] = useState(null);
  const { register, handleSubmit, watch, reset } = useForm();

  const { data: book = [], refetch } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: centers = [], isLoading } = useQuery({
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
  const handlePayModal = () => payRef.current.showModal();

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="md:p-6 lg:p-10">
      <div className="text-center mb-10">
        <h1 className="lg:text-4xl font-bold">My Bookings</h1>
      </div>

      <div className=" bg-base-200 rounded-lg">
        <table className="md:table w-full md:table-auto">
          <thead>
            <tr className="bg-primary text-primary-content text-[8px] md:text-xl uppercase flex justify-between py-8 md:py-10 px-6  lg:px-10 mx-2 rounded-lg ">
              <th>#</th>
              <th>Service Name</th>
              <th>Category</th>
              <th className="px-2">Date</th>
              <th>Amount</th>
              <th>Booking Status</th>
              <th>Service Status</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {book.map((b, i) => (
              <tr
                key={b._id}
                className="hover:bg-base-200 transition-all md:text-lg text-[8px] lg:px-8 flex items-center justify-between my-5 py-5 mx-2 rounded-lg bg-base-100 shadow-2xl"
              >
                <td className="text-center font-bold px-2">{i + 1}</td>
                <td className="font-semibold">{b.serviceName}</td>
                <td className="px-2 md:px-0">{b.serviceType}</td>
                <td className="text-center ">{b.bookingDate}</td>
                <td className="font-bold text-primary px-2">৳{b.serviceCost}</td>

                <td className="text-center">
                  <span
                    className={`badge text-[8px] py-4 lg:w-[100px]  ${
                      b.bookingStatus === "Confirmed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {b.bookingStatus}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`badge text-[8px] py-4 lg:w-[100px] ${
                      b.decoratorStatus === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {b.decoratorStatus}
                  </span>
                </td>

                <td className="text-center">
                  <span
                    className={`badge text-[8px] py-4 lg:w-[80px] ${
                      b.paymentStatus === "paid"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>

                <td className="text-center">
                  <div className="flex flex-col md:flex-row justify-center gap-1">
                    <button
                      onClick={() => {
                        if (b.paymentStatus === "unpaid") {
                          handlePayModal();
                          setBookingData(b);
                        }
                      }}
                      className={`btn btn-xs lg:w-20 lg:h-8 w-12 ${
                        b.paymentStatus === "paid"
                          ? "btn-success"
                          : "btn-primary"
                      }`}
                      disabled={b.paymentStatus === "paid"}
                    >
                      {b.paymentStatus === "paid" ? "Paid" : "Pay"}
                    </button>

                    <button
                      onClick={() => {
                        handleModal();
                        setBookingData(b);
                      }}
                      className="btn btn-warning btn-xs lg:w-20 lg:h-8 w-12"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDeleteBooking(b._id)}
                      className="btn btn-error btn-xs lg:w-20 lg:h-8 w-12"
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

      {/* update modal section  */}
      <dialog ref={updateRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-8">
          <h1 className="text-5xl text-center font-bold mb-3">
            Booking Information
          </h1>
          <div className="bg-base-200 p-4 rounded-xl mb-5">
            <p className="text-lg">Service Name : {bookingData?.serviceName}</p>
            <p className="text-lg">
              Service Cost : ৳{bookingData?.serviceCost}
            </p>
            <p className="text-lg">Booker Name : {bookingData?.userName}</p>
            <p className="text-lg">Booker Email : {bookingData?.userEmail}</p>
          </div>
          <h1 className="text-4xl font-bold text-center text-primary mb-6">
            Update Your Booking
          </h1>
          <form
            onSubmit={handleSubmit(handleUpdateBooking)}
            className="space-y-5"
          >
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
      </dialog>

      {/* payment modal section  */}
      <dialog ref={payRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-8">
          <h1 className="text-center font-extrabold text-3xl py-5">
            Complete the payment for the services booked by{" "}
            {bookingData?.userName}
          </h1>
          <div className="bg-base-200 p-8 rounded-xl mb-5">
            <p className="text-lg">Service Name : {bookingData?.serviceName}</p>
            <p className="text-lg">
              Service Cost : ৳{bookingData?.serviceCost}
            </p>
            <p className="text-lg">Booker Name : {bookingData?.userName}</p>
            <p className="text-lg">Booker Email : {bookingData?.userEmail}</p>
            <p className="text-lg">
              Booker Address : {bookingData?.location}{" "}
              {bookingData?.BookingDistrict} {bookingData?.BookingRegion}
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="btn btn-primary flex-1"
              onClick={() => handlePayment(bookingData)}
            >
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
