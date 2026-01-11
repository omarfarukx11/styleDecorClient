import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import {
  FaUserEdit,
  FaEnvelope,
  FaCamera,
  FaCircle,
  FaBriefcase,
  FaChartLine,
  FaMapMarkerAlt,
  FaMusic,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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
        if (res.data.success) photoURL = res.data.data.display_url;
      }

      await updataUserProfile({ displayName: name, photoURL });
      setShowForm(false);
      Swal.fire({
        title: "Profile Updated!",
        text: "Saved successfully.",
        icon: "success",
        background: "primary",
        color: "#base-200",
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[clac(100vh-90px)] bg-primary p-6 md:p-12 text-base-200">
      <title>Profile | StyleDecor</title>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block text-5xl">Profile</h1>
        <p className="text-base-200/50 text-sm">
          View all your profile details here.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 bg-base-100 rounded-xl p-8 flex flex-col items-center "
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-base-200">
              {user?.displayName || "User Name"}
            </h2>
            <p className="text-base-200/70 text-xs font-bold uppercase tracking-widest mt-1">
              Premium User
            </p>
          </div>

          <div className="relative">
            <div className="w-44 h-44 rounded-full border-4 border-base-200/10 overflow-hidden ">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/mR4t96H/user-placeholder.png"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-base-200 p-2 rounded-full text-secondary ">
              <FaCamera size={16} />
            </div>
          </div>

          <div className="mt-8">
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
              >
                <Button><FaUserEdit /> Edit Profile</Button>
              </button>
            )}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Bio & Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8"
        >
          <AnimatePresence mode="wait">
            {!showForm ? (
              /* RIGHT COLUMN: Bio & Details - Height matched to left */
              <div className="bg-base-100 rounded-xl p-8  h-full border border-base-200/5">
                <div className="flex justify-between items-center mb-8 border-b border-base-200/10 pb-4">
                  <h3 className="text-xl font-bold text-base-200">
                    Bio & other details
                  </h3>
                  <div className="w-3 h-3 rounded-full bg-green-500 "></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DetailItem label="Name" value={user?.displayName} />
                  <DetailItem label="Email" value={user?.email} />
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-base-100 rounded-xl p-8  h-full flex flex-col border border-base-200/5"
              >
                <h3 className="text-xl font-bold mb-6 text-base-200">
                  Update Identity
                </h3>

                {/* flex-grow on the form ensures the content stretches or the buttons stay at the bottom if needed */}
                <form
                  onSubmit={handleUpdate}
                  className="space-y-6 grow flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-base-200/50">
                        Full Name
                      </label>
                      <input
                        name="name"
                        defaultValue={user?.displayName}
                        className="w-full bg-primary border border-base-200/10 rounded-lg p-2 text-base-200 outline-none focus:border-base-200/40 transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-base-200/50">
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        name="photo"
                        className="file-input file-input-info w-full bg-primary border border-base-200/10 rounded-lg text-base-200 "
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center "
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>

                    {/* Second Button - Using the same Component and same classes */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowForm(false);
                      }}
                    >
                      <Button
                        type="button"
                        className="w-full h-14 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center "
                      >
                        Cancel Update
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="border-b border-base-200/5 pb-4">
    <p className="text-[10px] uppercase font-bold text-base-200/40 tracking-widest mb-1">
      {label}
    </p>
    <span className="text-base-200 font-semibold text-lg">
      {value || "Not Set"}
    </span>
  </div>
);

export default MyProfile;
