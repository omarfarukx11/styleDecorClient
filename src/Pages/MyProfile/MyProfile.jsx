import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { FaUserEdit, FaEnvelope, FaIdBadge } from "react-icons/fa";
import Button from "../../utility/Button";

const MyProfile = () => {
  const { user, updataUserProfile } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const profileImage = e.target.photo.files[0];

    try {
      let photoURL = user?.photoURL;
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
    // Adjusted calculation to account for Navbar (90px) and page padding
    <div className="min-h-[calc(100vh-120px)] text-base-200 p-4 md:p-0 bg-secondary">
      <title>StyleDecor - Profile</title>
      
      <div className="border border-white/20 rounded-2xl h-full overflow-hidden">
        <div className="flex flex-col items-center pt-12 pb-10 px-8">
          
          <div className="relative mb-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/mR4t96H/user-placeholder.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-secondary object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* User Info Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
              {user?.displayName}
            </h2>
            <p className="opacity-70 flex items-center justify-center gap-2 mt-2 text-sm">
              <FaEnvelope className="text-secondary" /> {user?.email}
            </p>
          </div>

          {!showForm ? (
            <div onClick={() => setShowForm(true)}>
              <Button>
                <div className="flex items-center gap-2">
                  <FaUserEdit size={18} /> Edit Details
                </div>
              </Button>
            </div>
          ) : (
            /* Update Form Section */
            <div className="lg:w-[60%] w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
              <form
                onSubmit={handleUpdate}
                className="bg-secondary/5 p-6 rounded-2xl border border-white/10 space-y-5"
              >
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase opacity-60 text-white">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 text-secondary" />
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.displayName}
                      className="input w-full bg-base-100/50 border border-white/10 rounded-xl pl-12 focus:ring-2 ring-secondary/50 text-white outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-bold uppercase opacity-60 text-white">
                    Update Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="file-input file-input-bordered w-full bg-base-100/50 rounded-xl border-white/10 text-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-secondary text-primary py-3 rounded-xl font-bold hover:bg-white transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-transparent border border-white/20 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
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
  );
};

export default MyProfile;