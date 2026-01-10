import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";
import Button from "../../../../utility/Button";

const AddNewService = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset , formState : {errors }} = useForm();

  const handleAddService = async (data) => {
    try {
      const imageFile = data.image[0];

      const formData = new FormData();
      formData.append("image", imageFile);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const imageUrl = imgRes?.data?.data?.display_url;
      const serviceData = {
        name: data.name,
        type: data.type,
        price: Number(data.price),
        unit: data["unitType"],
        image: imageUrl,
        status: data.status || "Active",
        description: data.description,
      };

      const res = await axiosSecure.post("/newServices", serviceData);

      if (res.data.acknowledged === true) {
        reset();
        Swal.fire({
          icon: "success",
          title: "New Service Added!",
          text: "Your service has been added successfully.",
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: error.message || "Please try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-90px)] text-base-200">
      <div className="text-center lg:p-8 p-4 font-bold text-2xl bg-primary  border-b border-white uppercase">
        <p>Create New Service</p>
      </div>
    <title>StyelDecor - Create New Service</title>
      <div className="flex items-center justify-center p-4 bg-primary">
        <div className="w-11/12 max-w-2xl bg-primary  p-8  shadow-2xl border border-white rounded-xl">
          <form onSubmit={handleSubmit(handleAddService)} className="space-y-4">
            <div className="flex flex-col">
              <label className="font-medium">Service Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Luxury Wedding Setup"
                className="input input-bordered outline-none bg-base-100 w-full"
              />
               {errors.name?.type === "required" && (
              <p className="text-red-600">Name Required</p>
            )}
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Category / Type</label>
              <select
                {...register("type", { required: true })}
                className="input input-bordered outline-none bg-base-100 w-full"
                type="select"
              >
                <option value="">Select Category</option>
                <option value="Home">Home Decoration</option>
                <option value="Wedding">Wedding</option>
                <option value="Office">Office</option>
                <option value="Seminar">Seminar/Conference</option>
                <option value="Meeting">Meeting Room</option>
                <option value="Birthday">Birthday Party</option>
                <option value="Corporate">Corporate Events</option>
                <option value="Anniversary">Anniversary</option>
              </select>

              {errors.type?.type === "required" && (
              <p className="text-red-600">Category Required</p>
            )}
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="font-medium">Price (৳)</label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="120000"
                className="input input-bordered outline-none  bg-base-100 w-full"
              />
                {errors.price?.type === "required" && (
              <p className="text-red-600">Price Required</p>
            )}
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Unit Type</label>
              <select
                {...register("unitType", { required: true })}
                className="input input-bordered outline-none  bg-base-100 w-full"
              >
                <option value="">Select Unit</option>
                <option value="per sqft">Per Square Feet</option>
                <option value="per floor">Per Floor</option>
                <option value="per meter">Per Meter</option>
                <option value="per event">Per Event</option>
                <option value="per day">Per Day</option>
                <option value="per room">Per Room</option>
                <option value="fixed">Fixed Price</option>
              </select>
                {errors.unitType?.type === "required" && (
              <p className="text-red-600">Unit Required</p>
            )}
            </div>

            {/* Image (file upload) */}
            <div className="flex flex-col">
              <label className="font-medium">Image</label>
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="file-input file-input-bordered outline-none  bg-base-100 w-full"
              />
              {errors.image?.type === "required" && (
              <p className="text-red-600">Image Required</p>
            )}
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="font-medium">Status</label>
              <select
                {...register("status" , { required: true })}
                className="input input-bordered outline-none  bg-base-100 w-full"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status?.type === "required" && (
              <p className="text-red-600">Status Required</p>
            )}
            </div>



            {/* Description */}
            <div className="flex flex-col">
              <label className="font-medium">Description</label>
              <textarea
                {...register("description", { required: true })}
                rows={4}
                placeholder="Write service details..."
                className="textarea textarea-bordered outline-none  bg-base-100 w-full"
              />
              {errors.description && (
              <p className="text-red-600">Description Required</p>
            )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 flex-col lg:flex-row w-full justify-between mt-6">
              <button
                type="submit"
                className="flex-1 text-center"
              >
               <Button> Create Service</Button>
              </button>
              <Link to={'/dashboard/manage-services'}
                type="button"
                onClick={() => reset()}
                className="flex-1 text-center"
              >
               <Button >Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AddNewService;

