import React from "react";

const ManageServices = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Manage Decoration Services</h2>
        <button className="btn btn-primary">+ Add New Service</button>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-neutral text-neutral-content">
              <th>Image</th>
              <th>Service Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-16 h-16">
                      <img src="https://i.ibb.co.com/7pP6Y8T/service1.jpg" />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">Luxury Wedding Setup</td>
                <td>Wedding</td>
                <td>৳ 1,20,000</td>
                <td>per event</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline mr-2">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServices;
