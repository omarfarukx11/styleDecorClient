import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";
import { FaMoneyBillWave, FaChartLine, FaHistory } from "react-icons/fa"; // React Icons
import { MdOutlinePayments, MdTrendingUp } from "react-icons/md"; // React Icons

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

  return (
    <div className="">
      <div className="text-2xl bg-primary py-8 border-b border-white text-base-200 text-center uppercase">
        <h1>Revenue Monitoring</h1>
      </div>
      <title>StyelDecor - Revenue Monitoring</title>
      <div className="p-4 md:p-8 bg-primary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
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
          ].map((stat, idx) => (
            <div
              key={idx}
              className="stats shadow-2xl bg-base-100 w-full "
            >
              <div className="stat px-4 py-5">
                <div className="stat-figure text-base-200">{stat.icon}</div>
                <div className="stat-title text-base-200 opacity-70 text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="stat-value text-base-200 text-2xl">
                  {" "}
                  {stat.value}{" "}
                </div>
                <div className={`stat-desc font-bold ${stat.descColor}`}>
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-8 bg-base-100 text-base-200 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-4 flex items-center gap-2 font-bold text-lg border-b border-neutral/10">
            <MdOutlinePayments /> Recent Revenue
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
                {allHistory.slice(0, 5).map((b) => (
                  <tr
                    key={b._id}
                    className="bg-base-100 text-base-200 hover:bg-secondary  transition-all"
                  >
                    <td>{b.serviceName}</td>
                    <td className="font-mono text-xs opacity-60">
                      {b.transactionId}
                    </td>
                    <td>{new Date(b.paidAt).toLocaleDateString()}</td>
                    <td className="text-right font-bold">৳{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sm:hidden divide-y divide-neutral/10">
            {allHistory.slice(0, 5).map((b) => (
              <div
                key={b._id}
                className="p-4 flex flex-col gap-1 active:bg-primary active:transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm w-2/3 leading-tight">
                    {b.serviceName}
                  </span>
                  <span className="font-bold text-base-200">৳{b.amount}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] opacity-70 uppercase tracking-tighter">
                  <span>{b.transactionId}</span>
                  <span>{new Date(b.paidAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
