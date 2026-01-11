import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import MyBookingSkeleton from "../../../../Skelenton/MyBookingSkeleton"; // Using existing skeleton for consistency
import Title from "../../../../utility/Title";

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
              title: "Payment & Booking success!",
              text: "Your service has been booked successfully.",
              background: "#040404",
              color: "#fff",
              confirmButtonColor: "oklch(var(--s))",
              timer: 2000,
            });
          }
          refetch();
        });
    }
  }, [sessionId, axiosSecure, refetch]);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <MyBookingSkeleton />;
  }

  return (
    <div className="font-body min-h-[calc(100vh-90px)]">
      <title>StyleDecor - Payment History</title>
  

     <Title>Payment History</Title>
      <div className="bg-primary p-4 md:p-8">
        <div className="hidden xl:flex bg-secondary backdrop-blur-md text-base-200 py-8 text-xs font-bold uppercase tracking-widest px-6 ">
          <div className="w-12">#</div>
          <div className="flex-[1.5] min-w-[200px]">Service Name</div>
          <div className="flex-1 text-center">Biller</div>
          <div className="flex-[1.5] text-center">Time</div>
          <div className="flex-1 text-center">Amount</div>
          <div className="flex-2 text-right">Transaction ID</div>
        </div>

        {/* BODY */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 mt-4"
        >
          {history.length === 0 ? (
            <motion.div 
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-20"
            >
              <p className="text-2xl text-base-200/30 font-bold uppercase font-title">
                No Transactions Found
              </p>
            </motion.div>
          ) : (
            history.map((b, i) => (
              <motion.div
                key={b._id}
                variants={itemVariants}
                className="flex flex-col xl:flex-row xl:items-center bg-base-100 lg:py-7 text-base-200 shadow-sm p-4 xl:px-6 transition-all"
              >
                {/* Index */}
                <div className="flex justify-between xl:w-12 font-bold ">
                  <span className="xl:hidden">#</span>
                  <span>{i + 1}</span>
                </div>

                {/* Service Name */}
                <div className="flex justify-between xl:flex-[1.5] xl:min-w-[200px] mt-2 xl:mt-0">
                  <span className="xl:hidden ">Service</span>
                  <span className="text-xs uppercase font-black tracking-tight text-end xl:text-left">
                    {b.serviceName}
                  </span>
                </div>

                {/* Biller Name */}
                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden  font-bold uppercase text-[10px] tracking-widest">Biller</span>
                  <span className="xl:w-full">{b.userName}</span>
                </div>

                {/* Time */}
                <div className="flex justify-between xl:flex-[1.5] xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden  font-bold uppercase text-[10px] tracking-widest">Date</span>
                  <span className="xl:w-full text-xs opacity-80">
                    {new Date(b.paidAt).toLocaleString()}
                  </span>
                </div>

                {/* Amount */}
                <div className="flex justify-between xl:flex-1 xl:text-center mt-2 xl:mt-0">
                  <span className="xl:hidden ">Amount</span>
                  <span className="xl:w-full ">৳{b.amount}</span>
                </div>

                {/* Transaction ID */}
                <div className="flex justify-between xl:flex-2 mt-4 xl:mt-0">
                  <span className="xl:hidden text-[10px] uppercase tracking-widest">TXN ID</span>
                  <div className="xl:w-full xl:text-right">
                    <span className="rounded-md text-[12px] text-base-200/70 select-all">
                      {b.transactionId}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentHistory;