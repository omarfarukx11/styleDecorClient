import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  FaChartBar,
  FaCalendarCheck,
  FaLayerGroup,
} from "react-icons/fa";
import { motion } from "framer-motion"; // Added Framer Motion

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";
import Title from "../../../../utility/Title";

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookingData, isLoading: bLoading } = useQuery({
    queryKey: ["admin-all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooking");
      return res.data;
    },
  });

  if (bLoading) return <Loader />;

  const bookingsResult = bookingData?.result || [];
  
  const prepareHistogramData = () => {
    const categories = [
      "Home", "Wedding", "Office", "Seminar", 
      "Meeting", "Birthday", "Corporate", "Anniversary",
    ];

    const counts = {};
    categories.forEach((cat) => (counts[cat] = 0));
    bookingsResult.forEach((item) => {
      const type = item.serviceType;
      if (counts.hasOwnProperty(type)) {
        counts[type] += 1;
      }
    });

    return Object.keys(counts).map((key) => ({
      name: key,
      count: counts[key],
    }));
  };

  const histogramData = prepareHistogramData();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="text-base-200">
      <Title>StyleDecor Business Insights</Title>
      <title>StyleDecor - Analytics Dashboard</title>
      
      <motion.div 
        className="p-8 bg-primary h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="stats shadow-2xl bg-base-100">
            <div className="stat">
              <div className="stat-figure text-info">
                <FaCalendarCheck size={30} />
              </div>
              <div className="stat-title text-base-200 opacity-70">Total Interest</div>
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="stat-value"
              >
                {bookingData?.total || 0}
              </motion.div>
              <div className="stat-desc text-info">Total Bookings Recorded</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="stats shadow-2xl bg-base-100">
            <div className="stat">
              <div className="stat-figure text-info">
                <FaLayerGroup size={30} />
              </div>
              <div className="stat-title text-base-200 opacity-70">Categories</div>
              <motion.div 
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="stat-value"
              >
                {histogramData.length}
              </motion.div>
              <div className="text-info font-bold text-xs">
                Diversified Services
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <motion.div 
          variants={itemVariants}
          className="gap-8 mt-10"
        >
          <div className="bg-base-100 p-6 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-6 font-bold text-lg">
              <FaChartBar className="text-info" size={24} />
              <h3>Service Demand Distribution</h3>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={histogramData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="var(--color-info)"
                    vertical={false}
                    opacity={0.2}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-info)"
                    fontSize={11}
                    tick={{ fill: "var(--color-info)" }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke="var(--color-info)"
                    fontSize={11}
                    tick={{ fill: "var(--color-info)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    domain={[0, "dataMax + 5"]}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-secondary)", opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: "var(--color-primary)",
                      border: "none",
                      borderRadius: "12px",
                      color: "var(--color-base-200)",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                    }}
                    itemStyle={{ color: "var(--color-info)" }}
                  />
                  <Bar 
                    dataKey="count" 
                    radius={[6, 6, 0, 0]} 
                    barSize={32}
                    animationBegin={800}
                    animationDuration={1500}
                  >
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill="var(--color-base-200)"
                        style={{ filter: "drop-shadow(0px 4px 4px rgba(0,0,0,0.2))" }}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;