import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader";

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

  return (
    <div>
      {/* HEADER */}
      <div className="text-primary bg-secondary text-center p-8 text-3xl">
        <h1>My Earnings 💰</h1>
      </div>

    
    <div className="xl:p-8 p-4">

        <div className="card bg-neutral text-white shadow-xl border border-primary/30">
        <div className="card-body">
          <h2 className="card-title text-xl">Total Income</h2>
          <p className="text-5xl font-extrabold text-white mt-3">
            ৳ {total.toLocaleString()}
          </p>
          <p className="text-sm opacity-70 mt-1">
            Based on completed decoration projects
          </p>
        </div>
      </div>

<div className="bg-primary rounded-lg py-5">

  {/* Mobile / Tablet: stacked cards */}
  <div className="space-y-4 xl:hidden">
    {earnings.length > 0 ? (
      earnings.map((e, index) => (
        <div
          key={index}
          className="bg-primary text-secondary rounded-lg shadow p-4 hover:bg-secondary/10 transition-colors"
        >
          <div className="flex justify-between">
            <span className="font-semibold">#</span>
            <span>{index + 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Service Name :</span>
            <span>{e.serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Client Email :</span>
            <span className="text-sm opacity-80">{e.clientEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Earned Amount :</span>
            <span className="font-semibold text-secondary">৳ {Number(e.amount || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Completed Date :</span>
            <span className="opacity-70">{new Date(e.date).toLocaleDateString()}</span>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center py-6 text-secondary opacity-70">
        No earnings yet.
      </div>
    )}
  </div>

  {/* XL+: full table */}
  <div className="hidden xl:block overflow-x-auto">
    <table className="table-auto w-full text-base">
      <thead className="bg-secondary text-primary text-sm xl:text-lg">
        <tr>
          <th className="px-3 py-2 text-center">#</th>
          <th className="px-3 py-2 text-left">Service Name</th>
          <th className="px-3 py-2 text-left">Client Email</th>
          <th className="py-2 text-left ">Earned Amount</th>
          <th className="px-3 py-2 text-left">Completed Date</th>
        </tr>
      </thead>
      <tbody>
        {earnings.length > 0 ? (
          earnings.map((e, index) => (
            <tr
              key={index}
              className="hover:bg-secondary/10 transition-colors text-secondary border-b border-primary/20"
            >
              <td className="px-3 py-2 text-center">{index + 1}</td>
              <td className="px-3 py-2 font-semibold">{e.serviceName}</td>
              <td className="px-3 py-2 text-sm opacity-80">{e.clientEmail}</td>
              <td className="px-3 py-2  font-semibold text-secondary">
                ৳ {Number(e.amount || 0).toLocaleString()}
              </td>
              <td className="px-3 py-2 opacity-70">{new Date(e.date).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center py-6 text-secondary opacity-70">
              No earnings yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


    </div>


    </div>
  );
};

export default MyEarnings;
