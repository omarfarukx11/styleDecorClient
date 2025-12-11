import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const AssignRef = useRef();

  const { data: allBooking = [] } = useQuery({
    queryKey: ["allBooking"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooking");
      return res.data;
    },
  });

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
      decoratorId: decorator._id,
      decoratorStatus: decorator.status,
      serviceId: selectedService._id,
    };
    axiosSecure
      .patch(`/afterAssign/${selectedService._id}`, decoratorAssignInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
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

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-primary">All Bookings</h2>

      <div className="overflow-x-auto bg-base-200 rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th>SL</th>
              <th>User</th>
              <th>Service</th>
              <th>District</th>
              <th>Date</th>
              <th>Booking Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooking.map((booking, i) => (
              <tr key={booking._id} className="hover">
                <td>{i + 1}</td>
                <td>{booking.userName}</td>
                <td>{booking.serviceName}</td>
                <td>{booking.bookingDistrict}</td>
                <td>{booking.bookingDate}</td>
                <td>
                  <span
                    className={`badge ${
                      booking.bookingStatus === "confirmed"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      booking.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  {booking.paymentStatus === "paid" && !booking.decoratorId ? (
                    <button
                      onClick={() => handleModal(booking)}
                      className="btn btn-primary btn-sm"
                    >
                      Find Decorator
                    </button>
                  ) : booking.decoratorId ? (
                    <span className="badge badge-info">Assigned</span>
                  ) : (
                    <span className="badge badge-disabled">Not pay</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={AssignRef} className="modal">
        <div className="modal-box w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto p-10 ">
          <table className="table w-full ">
            <thead className="text-xl">
              <tr className="bg-primary text-primary-content">
                <th>SL</th>
                <th>Decorator</th>
                <th>Service</th>
                <th>District</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-base-300 border-2 text-xl">
              {decorators.length === 0 ? (
                <p>No Decorators Available</p>
              ) : (
                decorators.map((d, i) => (
                  <tr key={d._id} className="hover">
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.specialties}</td>
                    <td>{d.district}</td>
                    <td>{d.status}</td>
                    <td>
                      <button
                        onClick={() => 
                        {
                          handleAssignDecorators(d)
                        AssignRef.current.close()
                        }
                      }
                        className="btn btn-primary"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-end  pt-10">
            <button
              onClick={() => {
                AssignRef.current.close();
              }}
              className="btn px-8 py-6"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default AllBookings;
