import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";
import Title from "../../../../utility/Title";
import { motion } from "framer-motion"; // Added animation import

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch earnings (array)
  const { data: earnings = [], isLoading } = useQuery({
    queryKey: ["decoratorEarnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator-earnings/${user?.email}`);
      return res.data; // must be array of objects
    },
  });


  if (isLoading) return <Loader />;

  const total = earnings.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="text-base-200">
      <title>StyelDecor - My Earning</title>
      <Title>My Earning</Title>

      <div className="xl:p-8 p-4 bg-primary overflow-hidden ">

        {/* Total Income Card Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card bg-base-100"
        >
          <div className="card-body">
            <h2 className="card-title text-xl">Total Income</h2>
            <p className="text-5xl font-extrabold mt-3">
              ৳ {total.toLocaleString()}
            </p>
            <p className="text-sm opacity-70 mt-1">
              Based on completed decoration projects
            </p>
          </div>
        </motion.div>

        <div className="bg-primary rounded-lg py-5">

          {/* Mobile View List Animation */}
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4 xl:hidden"
          >
            {earnings.length > 0 ? (
              earnings.map((e, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="rounded-lg p-4 transition-colors hover:bg-secondary bg-base-100 "
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">#</span>
                    <span>{index + 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold ">Service Name </span>
                    <span className="text-xs md:text-md">{e.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Client Email </span>
                    <span className="text-sm opacity-80">{e.clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Earned Amount </span>
                    <span className="font-semibold ">৳ {Number(e.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Completed Date </span>
                    <span className="opacity-70">{new Date(e.date).toLocaleDateString()}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6  opacity-70">
                No earnings yet.
              </div>
            )}
          </motion.div>


          {/* Desktop Table Animation */}
          <div className="hidden xl:block overflow-x-auto">
            <table className="table-auto w-full text-base">
              <thead className="bg-secondary text-base-200 text-sm xl:text-lg h-20">
                <tr className="">
                  <th className="px-3 py-2 text-center">#</th>
                  <th className="px-3 py-2 text-left">Service Name</th>
                  <th className="px-3 py-2 text-left">Client Email</th>
                  <th className="py-2 text-left ">Earned Amount</th>
                  <th className="px-3 py-2 text-left">Completed Date</th>
                </tr>
              </thead>
              <motion.tbody 
                variants={container}
                initial="hidden"
                animate="show"
              >
                {earnings.length > 0 ? (
                  earnings.map((e, index) => (
                    <motion.tr
                      key={index}
                      variants={item}
                      className="transition-colors h-20 hover:bg-secondary bg-base-100 "
                    >
                      <td className="px-3 py-2 text-center">{index + 1}</td>
                      <td className="px-3 py-2 font-semibold">{e.serviceName}</td>
                      <td className="px-3 py-2 text-sm opacity-80">{e.clientEmail}</td>
                      <td className="px-3 py-2  font-semibold ">
                        ৳ {Number(e.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 opacity-70">{new Date(e.date).toLocaleDateString()}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6  opacity-70">
                      No earnings yet.
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MyEarnings;