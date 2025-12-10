import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 20;
  const AddRef = useRef();

  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      type: "All",
      minPrice: "",
      maxPrice: "",
    },
  });

  const filters = watch();

  // Fetch services with filters + pagination
  const { data = {}, isLoading , refetch} = useQuery({
    queryKey: ["manage-services", page, filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.type && filters.type !== "All")
        params.append("type", filters.type);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

      params.append("page", page);
      params.append("limit", limit);

      const res = await axiosSecure.get(`/allServices?${params.toString()}`);
      return res.data; // { result, total }
    },
  });
  const services = data.result || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);



  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Manage Decoration Services</h2>
        <Link to={'/dashboard/add-new-service'} className="btn btn-primary">
          + Add New Service
        </Link>
      </div>

      {/* Search + Filter */}
      <form className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          {...register("search")}
          type="text"
          placeholder="Search by service name..."
          className="px-4 py-2 border rounded-lg flex-1"
        />
        <select {...register("type")} className="px-4 py-2 border rounded-lg">
          <option value="All">All Categories</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Corporate">Corporate</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        <input
          {...register("minPrice")}
          type="number"
          placeholder="Min Price"
          className="px-4 py-2 border rounded-lg"
        />
        <input
          {...register("maxPrice")}
          type="number"
          placeholder="Max Price"
          className="px-4 py-2 border rounded-lg"
        />
      </form>

      {/* Table */}
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
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-xl">
                  Loading...
                </td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No services found.
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-16 h-16">
                        <img src={service.image} alt={service.name} />
                      </div>
                    </div>
                  </td>

                  <td className="font-semibold">{service.name}</td>
                  <td>{service.type}</td>
                  <td>৳ {service.price?.toLocaleString()}</td>
                  <td>per {service.unit || "package"}</td>
                  <td>
                    <span
                      className={`badge ${
                        service.status === "Active"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {service.status || "Active"}
                    </span>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline mr-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`px-4 py-2 border rounded-lg ${
              page === num + 1 ? "bg-primary text-white" : ""
            }`}
          >
            {num + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>


    </div>
  );
};

export default ManageServices;
