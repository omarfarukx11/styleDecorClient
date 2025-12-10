import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";

const PaymentHistory = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const sessionId = searchParams.get("session_id");
  const { user } = useAuth();

    const { data: history = [] , refetch } = useQuery({
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
        .then(() => {
          refetch()
        });
    }
  }, [sessionId, axiosSecure , refetch]);



  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl border border-base-300">
        <h1 className="text-center font-extrabold text-5xl my-20">Your Payment History</h1>



      <table className="table table-zebra w-full text-base">
        <thead className="bg-linear-to-r from-primary to-secondary text-white text-sm uppercase">
          <tr>
            <th className="py-5">#</th>
            <th>Service Name</th>
            <th>Biller Name</th>
            <th>User Email</th>
            <th>Time</th>
            <th>Amount</th>
            <th>Transaction ID</th>
          </tr>
        </thead>

        <tbody>
          {/* Row 1 */}
          {history.map((b, i) => (
            <tr key={b._id} className="hover:bg-base-200 transition-all">
              <td className="text-center font-bold">{i + 1}</td>
              <td className="font-semibold text-lg">{b.serviceName}</td>
              <td className="text-center">{b.userName}</td>
              <td className="text-center">{b.userEmail}</td>
              <td>{new Date(b.paidAt).toLocaleString()}</td>
              <td className="font-bold text-primary text-lg">৳{b.amount}</td>
              <td>{b.transactionId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
