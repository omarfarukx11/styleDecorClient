import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { FaUserEdit, FaEnvelope, FaIdBadge, FaCamera } from "react-icons/fa";
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
        icon: "success",
        background: "#040404",
        color: "#fff",
        confirmButtonColor: "oklch(var(--s))",
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants for internal elements
  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center p-6 font-body bg-primary overflow-hidden">
      <title>StyleDecor - Profile</title>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, scale: 0.95, y: 30 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            transition: { 
              duration: 0.8, 
              staggerChildren: 0.1, 
              delayChildren: 0.2 
            } 
          }
        }}
        className="w-full max-w-2xl backdrop-blur-2xl border border-white/10 rounded-4xl overflow-hidden bg-base-100/10 shadow-2xl"
      >
        <div className="p-8 md:p-12">
          {/* PROFILE HEADER AREA */}
          <div className="flex flex-col items-center text-center">
            <motion.div variants={itemVariants} className="relative group mb-6">
              <div className="absolute -inset-1 bg-linear-to-r from-secondary to-base-200 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/mR4t96H/user-placeholder.png"
                }
                alt="Profile"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/20 object-cover shadow-2xl"
              />
              <div className="absolute bottom-2 right-2 bg-secondary p-2 rounded-full border-4 border-primary text-primary-content">
                <FaCamera size={14} />
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-base-200 font-title">
              {user?.displayName}
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-2 text-base-200/60 flex items-center gap-2 text-lg">
              <FaEnvelope className="text-secondary" /> {user?.email}
            </motion.p>

            <motion.div variants={itemVariants} className="mt-8">
              {!showForm ? (
                <div onClick={() => setShowForm(true)}>
                  <Button className="px-8 py-3 rounded-full flex items-center">
                    <FaUserEdit className="mr-2" /> Edit Details
                  </Button>
                </div>
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest text-secondary animate-pulse">
                  Updating Profile
                </span>
              )}
            </motion.div>
          </div>

          {/* EDIT FORM SECTION */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 pt-10 border-t border-white/5 overflow-hidden"
              >
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-200 ml-1">
                      Full Identity Name
                    </label>
                    <div className="relative">
                      <FaIdBadge className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60" />
                      <input
                        type="text"
                        name="name"
                        defaultValue={user?.displayName}
                        className="w-full bg-base-100 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-base-200 focus:border-secondary/50 outline-none transition-all font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-200 ml-1">
                      New Profile Image
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="file-input w-full bg-base-100 rounded-2xl text-base-200
               file:bg-base-100 file:text-base-200 file:border-none 
               cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-base-200 text-primary py-4 rounded-2xl font-black uppercase tracking-tighter hover:bg-secondary transition-all disabled:opacity-50 active:scale-95"
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>

                    <Button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForm(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MyProfile;