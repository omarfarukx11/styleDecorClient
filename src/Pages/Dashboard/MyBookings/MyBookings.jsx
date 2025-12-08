// MyBookings.jsx
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyBookings = () => {

const axiosSecure = useAxiosSecure()
const {user} = useAuth()



const {data : book = [],refetch} = useQuery({
    queryKey: ["booking" , user?.email],
    queryFn : async () => { 
        const res = await axiosSecure.get(`/booking?email=${user?.email}`)
        return res.data
     }
})



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
        axiosSecure.delete(`/booking/${id}`)
        .then((res) => {
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
           {
            book.map((b , i) =>
             <tr key={b._id} className="hover:bg-base-200 transition-all">
              <td className="text-center font-bold">{i + 1}</td>
              <td className="font-semibold text-lg">{b.serviceName}</td>
              <td>{b.serviceType} </td>
              <td className="text-center">{b.bookingDate}</td>
              <td className="font-bold text-primary text-lg">৳{b.serviceCost}</td>
              <td>{b.bookingStatus}</td>
              <td className="text-center">{b.paymentStatus}</td>
              <td className="text-center">
                <div className="space-x-5">
                  <button className="btn bg-primary text-white">Pay</button>
                  <button className="btn bg-yellow-500 text-white">Update</button>
                  <button onClick={( ) => { handleDeleteBooking(b._id)}} className="btn bg-red-900 text-white">Delete</button>
                </div>
              </td>
            </tr>
            )
           }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;