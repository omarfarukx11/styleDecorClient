import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { FaUserEdit, FaEnvelope, FaIdBadge, FaImage } from "react-icons/fa";

const MyProfile = () => {
  // Using your custom hook and axiosSecure
  const { user, updataUserProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Accessing form data manually
    const name = e.target.name.value;
    const profileImage = e.target.photo.files[0];

    try {
      let photoURL = user?.photoURL;

      // 1. Image Upload Logic (Matching your Register page)
      if (profileImage) {
        const formData = new FormData();
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        formData.append("image", profileImage);

        const res = await axios.post(image_API_URL, formData);
        if (res.data.success) {
          photoURL = res.data.data.display_url;
        }
      }

      await updataUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      setShowForm(false);
      Swal.fire({
        title: "Profile Updated!",
        icon: "success",
        confirmButtonColor: "oklch(var(--s))",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
        <div className="text-center py-8 text-white uppercase border-b border-white text-2xl bg-primary">
        my profile
      </div>

      <title>StyelDecor - Profile</title>

      <div className="bg-primary  md:p-8 p-4">
        <div className="border border-white rounded-lg">
          <div className="flex flex-col items-center  pt-12 pb-10 px-8">
            <div className="relative mb-6">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="w-40 h-40 rounded-4xl border-4 border-base-100 object-cover shadow-2xl"
              />
            </div>

            <div className="text-center mb-8 ">
              <h2 className="text-3xl font-black text-secondary uppercase tracking-tight">
                {user?.displayName}
              </h2>
              <p className="text-secondary opacity-60 flex items-center justify-center gap-2 mt-1">
                <FaEnvelope className="text-primary text-xs" /> {user?.email}
              </p>
            </div>

            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="btn hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50  transform hover:scale-105 transition-all"
              >
                <FaUserEdit size={18} /> Edit Details
              </button>
            ) : (
              <div className="lg:w-[50%] w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                <form
                  onSubmit={handleUpdate}
                  className="shadow-2xl border-white p-6 rounded-lg border space-y-4"
                >
                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-secondary/60">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30" />
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        className="input w-full bg-base-100 border-none rounded-xl text-secondary focus:ring-2 ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control">
                    <label className="label text-xs font-bold uppercase text-secondary">
                      Update Photo
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        className="file-input file-input-bordered w-full bg-base-100 rounded-xl text-secondary border-none"
                      />
                    </div>
                  </div>

                  <div className="flex sm:flex-row flex-col gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                       className="btn hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50  transform hover:scale-105 transition-all flex-1"
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="btn hover:bg-base-100 hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50  transform hover:scale-105 transition-all flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyProfile;
