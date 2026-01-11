import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";
import Button from "../../../../utility/Button";
import BigTitile from "../../../../utility/BigTitile";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const AssignRef = useRef();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["allBooking", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allBooking?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const allBooking = data?.result || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const { data: decorators = [] } = useQuery({
    queryKey: ["decorators", selectedService?.bookingDistrict],
    enabled: !!selectedService,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignDecorators?district=${selectedService?.bookingDistrict}&status=available`
      );
      return res.data;
    },
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const handleAssignDecorators = (decorator) => {
    const decoratorAssignInfo = {
      decoratorName: decorator.name,
      decoratorEmail: decorator.email,
      decoratorID: decorator._id,
      decoratorStatus: decorator.status,
      serviceId: selectedService._id,
      bookingRegion: selectedService.bookingRegion,
      bookingDistrict: selectedService.bookingDistrict,
    };
    axiosSecure
      .patch(`/afterAssign/${selectedService._id}`, decoratorAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          AssignRef.current?.close();
          Swal.fire({
            icon: "success",
            title: "Assign Decorators Success!",
            text: `Assign Decorators successful for ${selectedService.userName}`,
            timer: 2000,
          });
        }
      });
  };

  const handleModal = (booking) => {
    setSelectedService(booking);
    AssignRef.current?.showModal();
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="text-base-200">
      <BigTitile>All Bookings</BigTitile>
      <title>StyleDecor - All Bookings</title>
      <div className="xl:p-8 p-4 bg-primary">
        <div className="overflow-x-auto rounded-lg">
          <table className="table w-full border-separate border-spacing-y-2">
            <thead className="hidden xl:table-header-group">
              <tr className="bg-secondary text-base-200 h-20 ">
                <th className="rounded-l-xl">#</th>
                <th>Client Name</th>
                <th>Service Name</th>
                <th>District</th>
                <th>Date</th>
                <th>Booking Status</th>
                <th>Payment</th>
                <th className="rounded-r-xl">Service Status</th>
              </tr>
            </thead>

            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {allBooking.length === 0 ? (
                <motion.tr variants={rowVariants}>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-2xl font-bold bg-base-100 rounded-lg"
                  >
                    No Bookings Available
                  </td>
                </motion.tr>
              ) : (
                allBooking.map((booking, i) => (
                  <motion.tr
                    key={booking._id}
                    variants={rowVariants}
                    className="block xl:table-row hover:bg-secondary bg-base-100 border-b border-primary rounded-lg xl:rounded-none mb-4 xl:mb-0 2xl:text-xl sm:text-2xl xl:text-lg transition-all duration-300 shadow-md"
                  >
                    <td className="flex justify-between xl:table-cell px-4 py-4 xl:rounded-l-xl">
                      <span className="xl:hidden font-semibold">#</span>
                      <span>{(page - 1) * limit + i + 1}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">Client Name</span>
                      <span>{booking.userName}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">Service Name</span>
                      <span>{booking.serviceName}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">District Name</span>
                      <span>{booking.bookingDistrict}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">Booking Date</span>
                      <span>{booking.bookingDate}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">Booking Status</span>
                      <span className={booking.bookingStatus === "confirmed" ? "text-green-500" : "text-yellow-500 font-medium"}>
                        {booking.bookingStatus}
                      </span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4">
                      <span className="xl:hidden font-semibold">Payment Status</span>
                      <span className={`capitalize font-medium ${booking.paymentStatus === "paid" ? "text-green-500" : "text-red-500"}`}>
                        {booking.paymentStatus}
                      </span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-4 xl:rounded-r-xl">
                      <span className="xl:hidden font-semibold">Service Status</span>
                      {booking.paymentStatus === "paid" && !booking.decoratorEmail ? (
                        <button
                          onClick={() => handleModal(booking)}
                          className="btn rounded-full btn-sm bg-primary text-base-200 border-none font-bold text-xs shadow-xl transform hover:scale-105 transition-all"
                        >
                          Find Decorator
                        </button>
                      ) : booking.decoratorEmail ? (
                        <span className="text-info font-medium italic">
                          {booking.decoratorStatus}
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold opacity-70">Unpaid</span>
                      )}
                    </td>
                  </motion.tr>
                ))
              )}
            </motion.tbody>
          </table>
        </div>

        {/* Decorator Assignment Modal */}
        <dialog ref={AssignRef} className="modal">
          <div className="modal-box w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto p-0 bg-primary text-base-200 rounded-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6"
            >
              <div className="mb-6 border-b border-white/20 pb-4">
                <h2 className="text-2xl font-bold">Assign Decorators</h2>
                <p className="text-sm opacity-80">Showing available decorators for {selectedService?.bookingDistrict}</p>
              </div>

              {decorators.length === 0 ? (
                <div className="py-20 text-center">
                  <h1 className="text-2xl font-bold opacity-60">No Decorators Available</h1>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead className="text-base-200 opacity-70">
                      <tr>
                        <th>#</th>
                        <th>Decorator</th>
                        <th>Specialty</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {decorators.map((d, i) => (
                        <tr key={d._id} className="hover:bg-secondary/50 transition-colors">
                          <td>{i + 1}</td>
                          <td className="font-bold">{d.name}</td>
                          <td>{d.specialties}</td>
                          <td>
                            <span className="badge badge-success badge-outline text-green-400">{d.status}</span>
                          </td>
                          <td>
                            <button
                              onClick={() => handleAssignDecorators(d)}
                              className="btn btn-xs bg-base-100 text-base-200 border-none hover:bg-secondary"
                            >
                              Assign
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex justify-end pt-8">
                <button onClick={() => AssignRef.current.close()}>
                  <Button>Close</Button>
                </button>
              </div>
            </motion.div>
          </div>
        </dialog>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2 text-base-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="btn btn-outline btn-sm bg-secondary text-base-200 disabled:opacity-40"
            >
              « Prev
            </button>
            {[...Array(Math.min(5, totalPages)).keys()]
              .map((n) => n + 1)
              .map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`btn btn-sm text-base-200 border-secondary ${
                    page === num ? "btn-secondary" : "btn-outline btn-ghost"
                  }`}
                >
                  {num}
                </button>
              ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="btn btn-outline btn-sm bg-secondary text-base-200 disabled:opacity-40"
            >
              Next »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBookings;