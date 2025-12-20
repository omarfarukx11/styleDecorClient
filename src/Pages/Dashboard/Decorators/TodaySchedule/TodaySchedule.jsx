import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Loader";

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
  const incompleteBookings = bookings.filter(
    (b) =>
      b.decoratorStatus !== "completed" &&
      b.decoratorStatus !== "decorator Assigned"
  );

  return (
    <div className="bg-primary">
      <div className="text-2xl text-white text-center py-8 border-b border-white uppercase">
        <h1>Today's Work Schedule</h1>
      </div>
      <title>StyelDecor - Schedule</title>
      <div className="p-8">
        {incompleteBookings.length === 0 ? (
          <div className="text-center bg-base-100 text-secondary rounded-lg py-8">
            <h2 className="text-5xl py-6 rounded-lg">
              No projects scheduled for today!
            </h2>
            <p className="text-lg ">
              You currently have no tasks for today. Once a task is assigned and
              accepted, it will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {incompleteBookings.map((booking) => {
              let nextAction = "";
              if (booking.decoratorStatus === "In Progress") {
                nextAction = `Purchase materials for ${booking.serviceName}`;
              } else if (booking.decoratorStatus === "Planning Phase") {
                nextAction = `Go to client location ${booking.location}, ${booking.bookingDistrict}`;
              } else if (booking.decoratorStatus === "On the Way to Venue") {
                nextAction = "Start decorating at client's site";
              } else if (booking.decoratorStatus === "Setup in Progress") {
                nextAction = "Start decorating at client's site";
              } else if (booking.decoratorStatus === "Working") {
                nextAction = "Finish the decoration work";
              }
              else {
                nextAction = "No Action Required";
              }

              return (
                <div
                  key={booking._id}
                  className="bg-base-100 flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 md:p-10 text-secondary rounded-xl shadow border-l-4 border-primary gap-6"
                >
                  <div>
                    <span className="text-info font-bold text-xl lg:text-3xl">
                      {nextAction}
                    </span>
                    <p className="mt-2 font-semibold text-md md:text-xl lg:text-2xl">
                      This is your schedule for today
                    </p>
                  </div>

                  {/* Current Service Info */}
                  <div>
                    <p className="mt-2 text-lg md:text-xl lg:text-2xl font-medium">
                      Your current service
                    </p>
                    <div className="mt-2 text-sm md:text-base space-y-1 md:space-y-2">
                      <p className="text-blue-500 font-semibold">
                        {booking.serviceName}
                      </p>
                      <p>Client: {booking.userName}</p>
                      <p>
                        Location: {booking.location}, {booking.bookingDistrict}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodaySchedule;
