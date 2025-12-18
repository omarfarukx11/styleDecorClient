import React from 'react';
import { useQuery } from '@tanstack/react-query';
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

    const totalRevenue = allHistory.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRevenue = allHistory
        .filter(b => new Date(b.paidAt) > thirtyDaysAgo)
        .reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);

    return (
        <div>
            <div className="text-2xl text-white bg-primary py-8 border-b border-white text-center">
                <h1>
                     Revenue Monitoring
                </h1>
            </div>

            <div className='p-8 bg-primary h-screen'>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stats shadow bg-base-100 border border-neutral">
                    <div className="stat">
                        <div className="stat-figure text-secondary ">
                            <FaMoneyBillWave size={30} />
                        </div>
                        <div className="stat-title text-secondary opacity-70">Total Revenue</div>
                        <div className="stat-value text-secondary">৳{totalRevenue.toLocaleString()}</div>
                        <div className="stat-desc text-success font-bold flex items-center gap-1">
                            <MdTrendingUp /> Lifetime earnings
                        </div>
                    </div>
                </div>
                <div className="stats shadow bg-base-100 border border-neutral">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaChartLine size={30} />
                        </div>
                        <div className="stat-title text-secondary opacity-70">Last 30 Days</div>
                        <div className="stat-value text-secondary">৳{recentRevenue.toLocaleString()}</div>
                        <div className="stat-desc text-info">Recent successful payments</div>
                    </div>
                </div>
                <div className="stats shadow bg-base-100 border border-neutral">
                    <div className="stat">
                        <div className="stat-figure text-secondary ">
                            <FaHistory size={30} />
                        </div>
                        <div className="stat-title text-secondary opacity-70">Total </div>
                        <div className="stat-value text-secondary">{allHistory.length}</div>
                        <div className="stat-desc font-semibold text-secondary">Bookings transactions recorded</div>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-base-100 text-secondary p-1 rounded-xl shadow-2xl">
                <div className="p-4 flex items-center gap-2 font-bold text-lg border-b border-white/10">
                   <MdOutlinePayments /> Recent Revenue Breakdown
                </div>
                <div className="overflow-x-auto p-2 bg-base-100 rounded-b-xl">
                    <table className="table w-full">
                        <thead className="bg-secondary text-primary">
                            <tr>
                                <th>Service Name</th>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th className="text-right">Revenue</th>
                            </tr>
                        </thead>
                        <tbody className="text-secondary">
                            {allHistory.slice(0, 5).map((b) => (
                                <tr key={b._id} className="hover:bg-primary hover:text-white transition-all border-b border-base-200 last:border-0">
                                    <td className="font-semibold">{b.serviceName}</td>
                                    <td className="font-mono text-xs opacity-70">{b.transactionId}</td>
                                    <td className="text-xs">{new Date(b.paidAt).toLocaleDateString()}</td>
                                    <td className="text-right font-bold hover:text-white">৳{b.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            </div>
        </div>
    );
};

export default Revenue;