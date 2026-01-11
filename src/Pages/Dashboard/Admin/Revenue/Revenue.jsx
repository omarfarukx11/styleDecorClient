import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";
import { FaMoneyBillWave, FaChartLine, FaHistory } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import Title from "../../../../utility/Title";
import { motion } from "framer-motion"; // Added Framer Motion

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allHistory = [], isLoading } = useQuery({
    queryKey: ["admin-revenue"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const totalRevenue = allHistory.reduce(
    (sum, b) => sum + (parseFloat(b.amount) || 0),
    0
  );

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentRevenue = allHistory
    .filter((b) => new Date(b.paidAt) > thirtyDaysAgo)
    .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const statsData = [
    {
      label: "Total Revenue",
      value: `৳${totalRevenue.toLocaleString()}`,
      icon: <FaMoneyBillWave size={25} />,
      desc: "Lifetime earnings",
      descColor: "text-success",
    },
    {
      label: "Last 30 Days",
      value: `৳${recentRevenue.toLocaleString()}`,
      icon: <FaChartLine size={25} />,
      desc: "Recent payments",
      descColor: "text-info",
    },
    {
      label: "Total Bookings",
      value: allHistory.length,
      icon: <FaHistory size={25} />,
      desc: "Transactions recorded",
      descColor: "text-base-200",
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div 
        variants={cardVariants}
        className="text-2xl bg-primary py-8 border-b border-white text-base-200 text-center uppercase"
      >
        <Title>Revenue Monitoring</Title>
      </motion.div>
      <title>StyleDecor - Revenue Monitoring</title>

      <div className="p-4 md:p-8 bg-primary">
        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -5 }} // Floating effect on hover
              className="stats  bg-base-100 w-full overflow-hidden"
            >
              <div className="stat px-4 py-5">
                <div className="stat-figure text-base-200">{stat.icon}</div>
                <div className="stat-title text-base-200 opacity-70 text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5 }}
                   className="stat-value text-base-200 text-2xl"
                >
                  {stat.value}
                </motion.div>
                <div className={`stat-desc font-bold ${stat.descColor}`}>
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Table Section */}
        <motion.div 
          variants={cardVariants}
          className="mt-8 bg-base-100 text-base-200 rounded-xl  overflow-hidden"
        >
          <div className="p-4 flex items-center gap-2 font-bold text-lg border-b border-neutral/10">
            <MdOutlinePayments className="text-success" /> Recent Revenue
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-primary text-base-200">
                <tr>
                  <th>Service</th>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th className="text-right">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {allHistory.slice(0, 5).map((b, i) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="bg-base-100 text-base-200 hover:bg-secondary transition-all cursor-default"
                  >
                    <td>{b.serviceName}</td>
                    <td className="font-mono text-xs opacity-60">
                      {b.transactionId}
                    </td>
                    <td>{new Date(b.paidAt).toLocaleDateString()}</td>
                    <td className="text-right font-bold text-success">৳{b.amount}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="sm:hidden divide-y divide-neutral/10">
            {allHistory.slice(0, 5).map((b, i) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="p-4 flex flex-col gap-1 active:bg-primary active:transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm w-2/3 leading-tight">
                    {b.serviceName}
                  </span>
                  <span className="font-bold text-success">৳{b.amount}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] opacity-70 uppercase tracking-tighter">
                  <span>{b.transactionId}</span>
                  <span>{new Date(b.paidAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Revenue;