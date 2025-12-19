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
  AreaChart,
  Area,
} from "recharts";
import {
  FaMoneyBillWave,
  FaChartBar,
  FaCalendarCheck,
  FaLayerGroup,
} from "react-icons/fa";
import { MdOutlinePayments, MdTrendingUp } from "react-icons/md";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";

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
      "Home",
      "Wedding",
      "Office",
      "Seminar",
      "Meeting",
      "Birthday",
      "Corporate",
      "Anniversary",
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

  return (
    <div>
      <div className="text-2xl text-white bg-primary p-8 border-b border-white text-center shadow-lg uppercase font-bold">
        <h1>StyleDecor Business Insights</h1>
      </div>

      <div className="p-8 bg-primary h-full min-h-screen">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stats shadow bg-base-100 border border-neutral">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaCalendarCheck size={30} />
              </div>
              <div className="stat-title text-secondary">Total Interest</div>
              <div className="stat-value text-secondary">
                {bookingData?.total || 0}
              </div>
              <div className="stat-desc text-info">Total Booking Attempts</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-neutral">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaLayerGroup size={30} />
              </div>
              <div className="stat-title text-secondary">Categories</div>
              <div className="stat-value text-secondary">
                {histogramData.length}
              </div>
              <div className="stat-desc text-secondary font-bold text-xs uppercase italic">
                Diversified Services
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="gap-8 mt-10">
          {/* Service Demand Histogram */}
          <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-neutral">
            <div className="flex items-center gap-2 mb-6 text-secondary font-bold text-lg">
              <FaChartBar className="text-accent" size={24} />
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
                    stroke="var(--color-neutral)"
                    vertical={false}
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--color-secondary)" }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={70}
                    tickMargin={10}
                  />
                  <YAxis
                    stroke="var(--color-secondary)"
                    fontSize={11}
                    tick={{ fill: "var(--color-secondary)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                    domain={[0, "dataMax + 5"]}
                    tickCount={6}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-primary)", opacity: 0.2 }}
                    contentStyle={{
                      backgroundColor: "var(--color-secondary)", 
                      border: "1px solid var(--color-primary)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    labelStyle={{ color: "green" }}
                    itemStyle={{
                      color: "green",
                      paddingTop: "4px",
                    }}
                    formatter={(value) => [`${value}`, "Total Bookings"]}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={32}>
                    {histogramData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index % 2 === 0
                            ? "var(--color-primary)"
                            : "var(--color-accent)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
