import React from 'react';

const AllBookings = () => {
    return (
        <div>
      <h2 className="text-2xl font-bold mb-8">All Bookings</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-primary text-primary-content">
              <th>Booking ID</th>
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Assign Decorator</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i} className="hover">
                <td>#SD{i}001</td>
                <td>Ayesha Siddika</td>
                <td>Birthday Decoration</td>
                <td>20 Dec 2025</td>
                <td><span className="badge badge-info">Assigned</span></td>
                <td><span className="badge badge-success">Paid</span></td>
                <td>
                  <select className="select select-sm select-bordered">
                    <option>Assign Decorator</option>
                    <option>Karim Rahman</option>
                    <option>Rahim Uddin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllBookings;