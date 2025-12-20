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
     <title>StyelDecor - My Earning</title>
      <div className="bg-primary text-white py-8 text-center text-2xl border-b border-white">
        <h1>My Earnings</h1>
      </div>

    
    <div className="xl:p-8 p-4 bg-primary overflow-hidden ">

        <div className="card bg-base-100 text-secondary shadow-xl border border-primary/30">
        <div className="card-body">
          <h2 className="card-title text-xl">Total Income</h2>
          <p className="text-5xl font-extrabold mt-3">
            ৳ {total.toLocaleString()}
          </p>
          <p className="text-sm opacity-70 mt-1">
            Based on completed decoration projects
          </p>
        </div>
    </div>

<div className="bg-primary rounded-lg py-5">

  <div className="space-y-4 xl:hidden">
    {earnings.length > 0 ? (
      earnings.map((e, index) => (
        <div
          key={index}
          className="rounded-lg shadow p-4 transition-colors hover:bg-primary hover:text-white bg-base-100 text-secondary"
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
            <span className="font-semibold text-secondary">৳ {Number(e.amount || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Completed Date </span>
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


  <div className="hidden xl:block overflow-x-auto">
    <table className="table-auto w-full text-base">
      <thead className="bg-secondary text-primary text-sm xl:text-lg h-20">
        <tr className="">
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
              className="transition-colors border-b border-primary h-20 hover:bg-primary hover:text-white bg-base-100 text-secondary"
            >
              <td className="px-3 py-2 text-center">{index + 1}</td>
              <td className="px-3 py-2 font-semibold">{e.serviceName}</td>
              <td className="px-3 py-2 text-sm opacity-80">{e.clientEmail}</td>
              <td className="px-3 py-2  font-semibold ">
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
