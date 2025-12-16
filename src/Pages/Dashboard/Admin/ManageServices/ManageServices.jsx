import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const limit = 20;
  const updateRef = useRef();

  // Filter form
  const {
    register: registerFilter,
    watch: watchFilter,
    handleSubmit: handleSubmitFilter,
  } = useForm({
    defaultValues: {
      search: "",
      type: "All",
      minPrice: "",
      maxPrice: "",
    },
  });

  const filters = watchFilter();

  // Update form
  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    reset: resetUpdateForm,
  } = useForm();

  // Fetch services with filters + pagination
  const {
    data = {},
    isLoading,
    refetch,
  } = useQuery({
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
      return res.data;
    },
  });

  const services = data.result || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / limit);

  // Open modal with service data
  const handleModal = (service) => {
    setSelectedService(service);
    resetUpdateForm({
      service_name: service.service_name || service.name,
      cost: service.cost || service.price,
      unit: service.unit,
      serviceCategory: service.serviceCategory || service.type,
      status: service.status || "Active",
      description: service.description || "",
    });
    updateRef.current.showModal();
  };

  // Update service
  const handleUpdateService = (data) => {
    if (!selectedService?._id) return;

    const updateInfo = {
      service_name: data.service_name,
      cost: Number(data.cost),
      unit: data.unit,
      serviceCategory: data.serviceCategory,
      status: data.status,
      description: data.description,
    };

    axiosSecure
      .patch(`/servicesDetails/${selectedService._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          updateRef.current.close();
          setSelectedService(null);
          Swal.fire({
            icon: "success",
            title: "Service Updated!",
            text: "Service has been successfully updated.",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: err.message || "Something went wrong. Please try again.",
        });
      });
  };

  // Delete service
  const handleServiceDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteService/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Service has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="text-3xl py-8 font-bold text-center bg-primary text-secondary">
        <h2>Manage Decoration Services</h2>
      </div>

      <div className="xl:p-8 p-4">
        <div className="flex justify-end items-center mb-4">
          <Link
            to="/dashboard/add-new-service"
            className="btn btn-primary btn-lg"
          >
            + Add New Service
          </Link>
        </div>
        <div className="flex justify-end items-center">
          <h1 className="text-2xl my-4 font-bold text-secondary">
            {services.length} of {total} Decorators
          </h1>
        </div>

        {/* Search + Filter */}
        <form
          onSubmit={handleSubmitFilter(() => refetch())}
          className="mb-8 flex flex-col lg:flex-row gap-4 items-end"
        >
          <input
            {...registerFilter("search")}
            type="text"
            placeholder="Search by service name..."
            className="input input-bordered outline-none border-gray-300 text-secondary input-lg flex-1"
          />
          <select
            {...registerFilter("type")}
            className="select select-bordered outline-none border-gray-300 text-gray-500 input-lg w-full lg:w-48"
          >
            <option value="All">All Categories</option>
            <option value="Home">Home</option>
            <option value="Wedding">Wedding</option>
            <option value="Office">Office</option>
            <option value="Seminar">Seminar</option>
            <option value="Meeting">Meeting</option>
            <option value="Birthday">Birthday</option>
            <option value="Corporate">Corporate</option>
          </select>
          <input
            {...registerFilter("minPrice")}
            type="number"
            placeholder="Min Price"
            className="input input-bordered outline-none border-gray-300 text-secondary  input-lg w-full lg:w-32"
          />
          <input
            {...registerFilter("maxPrice")}
            type="number"
            placeholder="Max Price"
            className="input input-bordered outline-none border-gray-300 text-secondary  input-lg w-full lg:w-32"
          />
        </form>



        <div className="overflow-x-auto bg-primary rounded-xl shadow-xl">
          <table className="table w-full">
            {/* ===== HEADER (DESKTOP ONLY) ===== */}
            <thead className="hidden xl:table-header-group">
              <tr className="bg-primary text-secondary">
                <th>Image</th>
                <th>Service Name</th>
                <th>Category</th>
                <th>Cost</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-xl">
                    <span className="loading loading-spinner loading-lg"></span>
                    Loading services...
                  </td>
                </tr>
              ) : services.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12 text-gray-500">
                    No services found matching your criteria.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service._id}
                    className="
                block xl:table-row
                border border-base-300
                rounded-xl xl:rounded-none
                mb-6 xl:mb-0
                bg-base-100
              "
                  >
                    {/* IMAGE */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Image</span>
                      <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20">
                          <img src={service.image} alt={service.service_name} />
                        </div>
                      </div>
                    </td>

                    {/* SERVICE NAME */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Service</span>
                      <span className="font-semibold max-w-xs truncate">
                        {service.service_name || service.name}
                      </span>
                    </td>

                    {/* CATEGORY */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Category</span>
                      <span className="badge badge-info px-3 py-2">
                        {service.serviceCategory || service.type}
                      </span>
                    </td>

                    {/* COST */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Cost</span>
                      <span className="font-bold text-primary">
                        ৳{(service.cost || service.price)?.toLocaleString()}
                      </span>
                    </td>

                    {/* UNIT */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Unit</span>
                      <span>
                        {service.unit ? `per ${service.unit}` : "Fixed"}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Status</span>
                      <span
                        className={`font-semibold ${
                          service.status === "Active"
                            ? "text-green-500"
                            : "text-red-600"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    {/* CREATED BY */}
                    <td className="flex justify-between xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">
                        Created By
                      </span>
                      <span className="text-sm opacity-75 max-w-xs truncate">
                        {service.createdByEmail}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="flex flex-col xl:flex-row gap-2 xl:table-cell p-4">
                      <span className="xl:hidden font-semibold">Actions</span>

                      <button
                        onClick={() => handleModal(service)}
                        className="btn btn-sm btn-outline btn-info"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleServiceDelete(service._id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>



        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="btn border-none bg-primary text-secondary disabled:opacity-40"
            >
              « Prev
            </button>
            {[...Array(Math.min(5, totalPages)).keys()]
              .map((n) => n + 1)
              .map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`btn btn-sm text-secondary mt-1 ${
                    page === num ? "btn-primary" : "btn-outline btn-ghost"
                  }`}
                >
                  {num}
                </button>
              ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="btn border-none bg-primary text-secondary disabled:opacity-40"
            >
              Next »
            </button>
          </div>
        )}

        {/* Update Modal */}
        <dialog ref={updateRef} className="modal">
          <form
            method="dialog"
            onSubmit={handleUpdateSubmit(handleUpdateService)}
            className="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto bg-primary text-secondary"
          >
            <h1 className="text-center font-extrabold text-3xl py-6 text-secondary">
              Update Service Details
            </h1>

            {selectedService && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                {/* Service Name */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Service Name </label>
                  <input
                    {...registerUpdate("service_name", { required: true })}
                    type="text"
                    className="input input-bordered  input-lg w-full"
                  />
                </div>

                {/* Cost */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Cost </label>
                  <input
                    {...registerUpdate("cost", {
                      required: true,
                      valueAsNumber: true,
                      min: { value: 0, message: "Cost must be positive" },
                    })}
                    type="number"
                    className="input input-bordered  input-lg w-full"
                  />
                </div>

                {/* Unit */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Unit </label>
                  <select
                    {...registerUpdate("unit", { required: true })}
                    className="select select-bordered outline-none input-lg w-full"
                  >
                    <option value="sqft">Per square feet</option>
                    <option value="floor">Per floor</option>
                    <option value="meter">Per meter</option>
                    <option value="event">Per event</option>
                    <option value="day">Per day</option>
                    <option value="room">Per room</option>
                    <option value="fixed">Fixed price</option>
                  </select>
                </div>

                {/* Category */}
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Category </label>
                  <select
                    {...registerUpdate("serviceCategory", { required: true })}
                    className="select select-bordered outline-none  input-lg w-full"
                  >
                    <option value="Home">Home</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Office">Office</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>

                {/* Status */}
                <div className="flex flex-col md:col-span-2 ">
                  <label className="font-semibold mb-2">Status</label>
                  <select
                    {...registerUpdate("status")}
                    className="select select-bordered outline-none input-lg w-full"
                  >
                    <option value="Active ">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Description */}
                <div className="flex flex-col md:col-span-2">
                  <label className="font-semibold mb-2">Description</label>
                  <textarea
                    {...registerUpdate("description")}
                    rows={4}
                    className="textarea textarea-bordered outline-none  textarea-lg w-full"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-10 flex-col md:flex-row">
              <button
                type="submit"
                className="btn btn-primary py-2 md:py-0 btn-lg flex-1 rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all"
              >
                Update Service
              </button>
              <button
                type="button"
                className="btn btn-primary btn-lg flex-1 py-2 md:py-0 rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all"
                onClick={() => {
                  updateRef.current.close();
                  setSelectedService(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ManageServices;
