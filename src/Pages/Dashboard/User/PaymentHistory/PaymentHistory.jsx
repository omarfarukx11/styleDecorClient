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
      <div>
        <h1 className="text-center bg-black font-extrabold text-3xl py-8 ">
        Your Payment History
      </h1>
      </div>

<div className="bg-primary rounded-lg p-5">

  {/* HEADER for XL+ */}
  <div className="hidden xl:flex bg-secondary justify-between text-primary rounded-md py-8 text-sm xl:text-base font-semibold">
    <div className="w-8 text-center">#</div>
    <div className="w-[200px] text-center">Service Name</div>
    <div className="w-[140px] text-center">Biller Name</div>
    <div className="w-[180px] text-center">User Email</div>
    <div className="w-40 text-center">Time</div>
    <div className="w-[140px] xl:pl-25 text-center">Amount</div>
    <div className="w-[320px] text-center">Transaction ID</div>
  </div>

  {/* BODY */}
  <div className="space-y-6 xl:space-y-4 space-x-5">
    {history.map((b, i) => (
      <div
        key={b._id}
        className="flex flex-col xl:flex-row xl:items-center xl:justify-between bg-primary py-8 text-sm text-secondary rounded-lg shadow p-3"
      >
        {/* # */}
        <div className="flex justify-between xl:w-8 px-1 py-1 font-semibold border-b xl:border-b-0">
          <span className="xl:hidden">#{i + 1}</span>
          <span className="hidden xl:block text-center">{i + 1}</span>
        </div>

        {/* Service Name */}
        <div className="flex justify-between xl:w-[200px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Service Name :</span>
          <span>{b.serviceName}</span>
        </div>

        {/* Biller Name */}
        <div className="flex justify-between xl:w-[140px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Biller :</span>
          <span>{b.userName}</span>
        </div>

        {/* User Email */}
        <div className="flex justify-between xl:w-[180px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Email :</span>
          <span>{b.userEmail}</span>
        </div>

        {/* Time */}
        <div className="flex justify-between xl:w-[160px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Time :</span>
          <span>{new Date(b.paidAt).toLocaleString()}</span>
        </div>

        {/* Amount */}
        <div className="flex justify-between xl:w-[100px] px-1 py-1 border-b xl:border-b-0 font-semibold">
          <span className="xl:hidden font-semibold">Amount :</span>
          <span>৳{b.amount}</span>
        </div>

        {/* Transaction ID */}
        <div className="flex justify-between xl:w-[220px] px-1 py-1 border-b xl:border-b-0">
          <span className="xl:hidden font-semibold">Txn ID :</span>
          <span className="-ml-10">{b.transactionId}</span>
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default PaymentHistory;
