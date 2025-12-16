import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";

const PaymentHistory = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const { user } = useAuth();

  const {
    data: history = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["payment-history", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data.bookingUpdate.modifiedCount);
          if (res.data.bookingUpdate.modifiedCount) {
            Swal.fire({
              icon: "success",
              title: "Booking Confirmed!",
              text: "Your service has been booked successfully.",
              timer: 2000,
            });
          }
          refetch();
        });
    }
  }, [sessionId, axiosSecure, refetch]);

  if (isLoading) {
    <Loader></Loader>
  }

  return (
    <div>
      <div>
        <h1 className="text-center bg-black font-extrabold text-3xl py-8 ">
        Your Payment History
      </h1>
      </div>

      <div className="p-8">
        <table className="lg:table lg:table-zebra w-full text-base">
        <thead className="bg-secondary text-primary text-sm uppercase">
          <tr>
            <th className="md:text-lg px-2 text-[10px]">#</th>
            <th className="md:text-lg px-2 text-[10px]">Service Name</th>
            <th className="md:text-lg px-2 text-[10px] ">Biller Name</th>
            <th className="md:text-lg px-2 text-[10px] ">User Email</th>
            <th className="md:text-lg px-2 text-[10px]">Time</th>
            <th className="md:text-lg px-2 text-[10px]">Amount</th>
            <th className="md:text-lg px-2 text-[10px]">Transaction ID</th>
          </tr>
        </thead>

        <tbody>
          {/* Row 1 */}
          {history.map((b, i) => (
            <tr key={b._id} className="bg-primary text-secondary">
              <td className="md:text-lg px-2 text-[10px] text-center font-bold">
                {i + 1}
              </td>
              <td className="md:text-lg px-2 text-[10px] font-semibold text-lg">
                {b.serviceName}
              </td>
              <td className="md:text-lg px-2 text-[10px] text-center">
                {b.userName}
              </td>
              <td className="md:text-lg px-2 text-[10px] text-center ">
                {b.userEmail}
              </td>
              <td className="md:text-lg px-2 text-[10px]">
                {new Date(b.paidAt).toLocaleString()}
              </td>
              <td className="md:text-lg px-2 text-[10px] font-bold text-primary text-lg">
                ৳{b.amount}
              </td>
              <td className="md:text-lg px-2 text-[10px]">{b.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
