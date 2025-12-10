import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedService, setSelectedService] = useState(null);
  const AssignRef = useRef();

  const { data: allBooking = [], isLoading } = useQuery({
    queryKey: ["allBooking"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBooking");
      return res.data;
    },
  });

  const decoratorsQuery = useQuery({
    queryKey: [
      "decorators", 
      selectedService?._id, 
      selectedService?.BookingDistrict, 
      "available"
    ],
    enabled: !!selectedService?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?status=available&district=${selectedService?.BookingDistrict}`
      );
      return res.data;
    },
  });

  const handleModal = (booking) => {
    setSelectedService(booking);
    AssignRef.current?.showModal();
  };

  const handleAssign = async (decoratorId) => {
    try {
      await axiosSecure.patch(`/assign-decorator/${selectedService._id}`, {
        decoratorId,
      });
      AssignRef.current?.close();
      setSelectedService(null);
    } catch (error) {
      console.error("Assignment failed:", error);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

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
              <th>Status</th>
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
                <td>{booking.BookingDistrict}</td>
                <td>{booking.bookingDate}</td>
                <td>
                  <span className={`badge ${booking.bookingStatus === 'confirmed' ? 'badge-success' : 'badge-warning'}`}>
                    {booking.bookingStatus}
                  </span>
                </td>
                <td>
                  <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-error'}`}>
                    {booking.paymentStatus}
                  </span>
                </td>
                <td>
                  {booking.paymentStatus === "paid" && !booking.decoratorId ? (
                    <button 
                      onClick={() => handleModal(booking)} 
                      className="btn btn-primary btn-sm"
                    >
                      Assign Decorator
                    </button>
                  ) : booking.decoratorId ? (
                    <span className="badge badge-info">Assigned</span>
                  ) : (
                    <span className="badge badge-disabled">Pending Payment</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog ref={AssignRef} className="modal">
        <div className="modal-box w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-xl mb-4">
            Assign Decorator for: {selectedService?.serviceName}
          </h3>
          
          <div className="mb-6 p-4 bg-base-200 rounded-lg">
            <p><strong>District:</strong> {selectedService?.BookingDistrict}</p>
            <p><strong>Date:</strong> {selectedService?.bookingDate}</p>
            <p><strong>Client:</strong> {selectedService?.userName}</p>
          </div>

          {decoratorsQuery.isLoading ? (
            <div className="text-center py-8">Loading decorators...</div>
          ) : decoratorsQuery.data?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-h-96 overflow-y-auto">
              {decoratorsQuery.data.map((decorator) => (
                <div key={decorator._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img 
                        src={decorator.image} 
                        alt={decorator.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{decorator.name}</h4>
                        <p className="text-sm text-gray-500">{decorator.district}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">{decorator.description}</p>
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span>Rating: {decorator.rating}</span>
                      <span>৳{decorator.hourlyRate}/hr</span>
                    </div>
                    <div className="badge badge-outline w-full justify-center">
                      {decorator.specialties}
                    </div>
                    <div className="card-actions justify-end mt-3">
                      <button
                        onClick={() => handleAssign(decorator._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-warning mb-4">
                No available decorators in {selectedService?.BookingDistrict}
              </p>
              <p className="text-sm text-gray-500">
                Add decorators for this district or check availability
              </p>
            </div>
          )}

          <div className="modal-action">
            <button 
              onClick={() => {
                AssignRef.current?.close();
                setSelectedService(null);
              }}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllBookings;
