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
    return  <Loader></Loader>
  }

 

  return (
    <div>
      <div className="text-2xl text-secondary bg-primary p-8 border-b border-white text-center">
        <h1>
        Your Payment History
      </h1>
      </div>

<div className="bg-primary p-2 md:p-8">
  {/* HEADER for XL+ */}
  <div className="hidden xl:flex bg-secondary xl:justify-between text-primary rounded-md py-8 text-sm xl:text-base font-semibold mb-3 px-4">
    <div className="w-12 text-center">#</div>
    <div className="flex-[1.5] text-center">Service Name</div>
    <div className="flex-1 text-center">Biller Name</div>
    <div className="flex-[1.5] text-center">User Email</div>
    <div className="flex-[1.5] text-center">Time</div>
    <div className="flex-1 text-center">Amount</div>
    <div className="flex-[2] text-center">Transaction ID</div>
  </div>

  {/* BODY */}
  <div className="space-y-6 xl:space-y-4">
    {history.map((b, i) => (
      <div
        key={b._id}
        className="flex flex-col xl:flex-row xl:items-center xl:justify-between bg-accent text-accent-content shadow-xl py-4 xl:py-8 text-sm rounded-lg p-3 xl:px-4"
      >
        {/* # */}
        <div className="flex justify-between xl:w-12 px-1 py-1 font-semibold border-b border-white xl:border-b-0">
          <span className="xl:hidden">#</span>
          <span className="xl:text-center w-full">{i + 1}</span>
        </div>

        {/* Service Name */}
        <div className="flex justify-between xl:flex-[1.5] px-1 py-1 border-b border-white xl:border-b-0">
          <span className="xl:hidden font-semibold">Service Name:</span>
          <span className="xl:text-center xl:w-full">{b.serviceName}</span>
        </div>

        {/* Biller Name */}
        <div className="flex justify-between xl:flex-1 px-1 py-1 border-b border-white xl:border-b-0">
          <span className="xl:hidden font-semibold">Biller:</span>
          <span className="xl:text-center xl:w-full">{b.userName}</span>
        </div>

        {/* User Email */}
        <div className="flex justify-between xl:flex-[1.5] px-1 py-1 border-b border-white xl:border-b-0">
          <span className="xl:hidden font-semibold">Email:</span>
          <span className="xl:text-center xl:w-full truncate">{b.userEmail}</span>
        </div>

        {/* Time */}
        <div className="flex justify-between xl:flex-[1.5] px-1 py-1 border-b border-white xl:border-b-0">
          <span className="xl:hidden font-semibold">Time:</span>
          <span className="xl:text-center xl:w-full xl:text-xs">
            {new Date(b.paidAt).toLocaleString()}
          </span>
        </div>

        {/* Amount */}
        <div className="flex justify-between xl:flex-1 px-1 py-1 border-b border-white xl:border-b-0 font-semibold">
          <span className="xl:hidden font-semibold">Amount:</span>
          <span className="xl:text-center xl:w-full">৳{b.amount}</span>
        </div>

        {/* Transaction ID */}
        <div className="flex justify-between xl:flex-[2] px-1 py-1 border-b border-white xl:border-b-0">
          <span className="xl:hidden font-semibold">Txn ID:</span>
          <span className="xl:text-center xl:w-full break-all xl:break-normal font-mono text-xs">
            {b.transactionId}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default PaymentHistory;
