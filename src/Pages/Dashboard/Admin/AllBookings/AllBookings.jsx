import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader";
import Button from "../../../../utility/Button";
import BigTitile from "../../../../utility/BigTitile";


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
      <title>StyelDecor - All Bookings</title>
      <div className="xl:p-8 p-4 bg-primary">
        <div className="rounded-lg">
          <table className="table w-full">
            <thead className="hidden xl:table-header-group">
              <tr className="bg-secondary text-base-200 h-20 ">
                <th>#</th>
                <th>Client Name</th>
                <th>Service Name</th>
                <th>District</th>
                <th>Date</th>
                <th>Booking Status</th>
                <th>Payment</th>
                <th>Service Status</th>
              </tr>
            </thead>

            <tbody>
              {allBooking.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-10 text-2xl font-bold bg-base-100 rounded-lg"
                  >
                    No Bookings Available
                  </td>
                </tr>
              ) : (
                allBooking.map((booking, i) => (
                  <tr
                    key={booking._id}
                    className="block xl:table-row hover:bg-secondary bg-base-100 border-b border-primary  rounded-lg xl:rounded-none  mb-4 xl:mb-0  shadow-2xl 2xl:text-xl sm:text-2xl  xl:text-lg
              "
                  >
                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">#</span>
                      <span className="text-center">
                        {(page - 1) * limit + i + 1}
                      </span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        Client Name
                      </span>
                      <span>{booking.userName}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        Service Name
                      </span>
                      <span>{booking.serviceName}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        District Name
                      </span>
                      <span>{booking.bookingDistrict}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        Booking Date
                      </span>
                      <span>{booking.bookingDate}</span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        Booking Status
                      </span>
                      <span
                        className={` ${
                          booking.bookingStatus === "confirmed"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-2">
                      <span className="xl:hidden font-semibold">
                        Payment Status
                      </span>
                      <span
                        className={`capitalize ${
                          booking.paymentStatus === "paid"
                            ? "text-green-500"
                            : "text-red-700"
                        }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>

                    <td className="flex justify-between xl:table-cell px-4 py-3">
                      <span className="xl:hidden font-semibold">
                        Service Status
                      </span>

                      {booking.paymentStatus === "paid" &&
                      !booking.decoratorEmail ? (
                        <button
                          onClick={() => handleModal(booking)}
                          className="btn rounded-full btn-sm hover bg-primary text-base-200 border-none  font-bold text-xs shadow-xl transform hover:scale-105 transition-all"
                        >
                          Find Decorator
                        </button>
                      ) : booking.decoratorEmail ? (
                        <span className="text-info xl:py-5">
                          {booking.decoratorStatus}
                        </span>
                      ) : (
                        <span className="text-red-600">Unpaid</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <dialog ref={AssignRef} className="modal">
          <div className="modal-box w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto p-6 bg-primary text-base-200 rounded-lg">
            {decorators.length === 0 ? (
              <h1 className="text-center text-2xl font-bold py-10 ">No Decorators Available</h1>
            ) : (
              <table className="table w-full rounded-lg">
                <thead className="hidden xl:table-header-group text-lg">
                  <tr className="bg-secondary text-base-200 ">
                    <th>#</th>
                    <th>Decorator</th>
                    <th>Service</th>
                    <th>District</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {decorators.map((d, i) => (
                    <tr
                      key={d._id}
                      className="block xl:table-row hover:bg-secondary bg-base-100 rounded-lg xl:rounded-none  mb-4 xl:mb-0  shadow-2xl 2xl:text-xl sm:text-2xl xl:text-lg
              "
                    >
                      <td className="flex justify-between xl:table-cell px-4 py-2">
                        <span className="xl:hidden font-semibold">#</span>
                        <span>{i + 1}</span>
                      </td>

                      {/* Decorator */}
                      <td className="flex justify-between xl:table-cell px-4 py-2">
                        <span className="xl:hidden font-semibold">
                          Decorator
                        </span>
                        <span>{d.name}</span>
                      </td>

                      {/* Service */}
                      <td className="flex justify-between xl:table-cell px-4 py-2">
                        <span className="xl:hidden font-semibold">Service</span>
                        <span>{d.specialties}</span>
                      </td>

                      {/* District */}
                      <td className="flex justify-between xl:table-cell px-4 py-2">
                        <span className="xl:hidden font-semibold">
                          District
                        </span>
                        <span>{d.district}</span>
                      </td>

                      {/* Status */}
                      <td className="flex justify-between xl:table-cell px-4 py-2">
                        <span className="xl:hidden font-semibold">Status</span>
                        <span className="px-3 py-1 text-green-400  text-sm">
                          {d.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="flex justify-between xl:table-cell px-4 py-3">
                        <span className="xl:hidden font-semibold">Action</span>
                        <button
                          onClick={() => handleAssignDecorators(d)}
                          className="btn btn-sm bg-primary text-base-200 hover:bg-base-100 hover border-none "
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* CLOSE BUTTON */}
            <div className="flex justify-end pt-6 ">
              <button
                onClick={() => AssignRef.current.close()}
              >
                <Button>Close</Button>
              </button>
            </div>
          </div>
        </dialog>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12  gap-2 text-base-200">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="btn btn-outline btn-sm bg-secondary text-base-200  disabled:opacity-40"
            >
              « Prev
            </button>
            {[...Array(Math.min(5, totalPages)).keys()]
              .map((n) => n + 1)
              .map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`btn btn-sm text-base-200 border-secondary  ${
                    page === num ? "btn-secondary " : "btn-outline btn-ghost"
                  }`}
                >
                  {num}
                </button>
              ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="btn btn-outline btn-sm  bg-secondary text-base-200 disabled:opacity-40"
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
