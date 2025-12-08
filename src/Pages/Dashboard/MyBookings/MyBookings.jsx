// MyBookings.jsx
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const MyBookings = () => {

const axiosSecure = useAxiosSecure()
const {user} = useAuth()



const {data : book = []  } = useQuery({
    queryKey: ["booking" , user?.email],
    queryFn : async () => { 
        const res = await axiosSecure.get(`/booking?email=${user?.email}`)
        return res.data
     }
})














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
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
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
              <td><div className="badge badge-outline badge badge-lg">{b.serviceType}</div></td>
              <td className="text-center">{b.bookingDate}</td>
              <td className="font-bold text-primary text-lg">৳{b.serviceCost}</td>
              <td><span className="badge badge-success badge-lg font-bold">Paid</span></td>
              <td className="text-center"><span className="text-success font-bold">Paid</span></td>
              <td className="text-center"><span className="text-success font-medium">Confirmed</span></td>
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