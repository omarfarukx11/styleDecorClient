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
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-primary">My Earnings 💰</h1>

    
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


      <div className="overflow-x-auto bg-base-100 rounded-lg border border-primary/20 shadow-md">
        <table className="table w-full text-base">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>SL</th>
              <th>Service Name</th>
              <th>Client Email</th>
              <th>Earned Amount</th>
              <th>Completed Date</th>
            </tr>
          </thead>

          <tbody>
            {earnings.length > 0 ? (
              earnings.map((e, index) => (
                <tr
                  key={index}
                  className="hover:bg-accent/20 transition-colors border-b border-neutral/20"
                >
                  <td>{index + 1}</td>
                  <td className="font-semibold">{e.serviceName}</td>
                  <td className="text-sm opacity-80">{e.clientEmail}</td>
                  <td className="text-success font-semibold">৳ {Number(e.amount || 0).toLocaleString()}</td>
                  <td className="opacity-70">{new Date(e.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 opacity-70">
                  No earnings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEarnings;
