import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader";

// Workflow steps
const decoratorFlow = [
  "decorator Assigned",
  "In Progress",
  "Materials Purchased",
  "Rider On The Way",
  "Decorator Reached",
  "completed",
];

// Get next step for a status
const getNextTask = (currentStatus) => {
  const index = decoratorFlow.indexOf(currentStatus);
  if (index === -1 || currentStatus === "completed") return "Task Finished 🎉";
  return decoratorFlow[index + 1];
};

const TodaySchedule = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // 1️⃣ Fetch decorator info
  const { data: decorator, isLoading: decoratorLoading } = useQuery({
    queryKey: ["decorator", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/decorator/${user?.email}`);
      return res.data;
    },
  });

  // 2️⃣ Fetch bookings assigned to decorator
  const { data: bookings = [], isLoading: bookingLoading } = useQuery({
    queryKey: ["booking", decorator?.email],
    enabled: !!decorator?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${decorator?.email}`);
      return res.data;
    },
  });

  if (decoratorLoading || bookingLoading) return <Loader />;

  // Filter incomplete bookings only
  const incompleteBookings = bookings.filter(
  (b) =>
    b.decoratorStatus !== "completed" &&
    b.decoratorStatus !== "decorator Assigned" // hide unaccepted tasks
);
  return (
    <div className="min-h-screen bg-primary">
      <div className="text-2xl text-white text-center py-8 border-b border-white">
        <h1>Today's Schedule</h1>
      </div>

      <div className="p-8">
        {incompleteBookings.length === 0 ? (
          <div className="text-center text-white mt-20">
            <h2 className="text-3xl bg-accent py-6 rounded-lg">
              No projects assigned 🎉
            </h2>
          </div>
        ) : (
          <div className="space-y-6">
            {incompleteBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col xl:flex-row gap-5 xl:items-center xl:justify-between bg-base-100 text-secondary rounded-xl shadow p-6 border-l-8 border-secondary"
              >
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-primary">
                    {booking.serviceName}
                  </h2>
                  <p className="mt-2 font-semibold">
                    📍 {booking.location}, {booking.bookingDistrict}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm opacity-70">
                    <span>👤 {booking.userName}</span>
                    <span>📧 {booking.userEmail}</span>
                  </div>
                </div>

                {/* Workflow step display */}
                <div className="xl:w-1/3 flex flex-col gap-2">
                  <span className="font-semibold text-lg">Current Status:</span>
                  <span className="text-blue-500 font-bold">
                    {booking.decoratorStatus}
                  </span>

                  <span className="font-semibold text-lg mt-2">Next Step:</span>
                  <span className="text-green-500 font-bold">
                    {getNextTask(booking.decoratorStatus)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
