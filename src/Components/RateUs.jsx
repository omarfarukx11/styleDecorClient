import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Button from "../utility/Button";
import Loader from "./Loader";

const RateUs = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const reviewData = {
        userName: user?.displayName,
        userEmail: user?.email,
        userPhoto: user?.photoURL,
        rating: Number(data.rating),
        feedback: data.feedback,
        date: new Date().toISOString(),
      };

      const res = await axiosSecure.post("/new-review", reviewData);

      if (res.data.acknowledged) {
        reset();
        Swal.fire({
          icon: "success",
          title: "Thank You!",
          text: `Thanks for the review, ${user?.displayName}!`,
          timer: 2000,
          background: "var(--color-base-100)",
          color: "var(--color-base-200)",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to submit review",
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-primary text-base-200">
      <title>StyleDecor - Rate Us</title>

      <div className="max-w-[1980px] mx-auto px-10 lg:px-32 py-20">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: HEADER & USER IDENTITY (5 Columns) */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-6xl lg:text-8xl font-black text-base-200 leading-[0.9] mb-8 uppercase tracking-tighter">
                Your <br /> 
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Review.</span>
              </h1>
              <p className="text-xl text-base-200/70 max-w-sm leading-relaxed">
                Help us maintain our standards by sharing your honest feedback about our services.
              </p>
            </motion.div>

            {/* User ID Card using bg-primary */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-primary p-8 rounded-xl flex items-center gap-6 w-fit border border-white/10"
            >
              <img 
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                className="w-20 h-20 rounded-2xl object-cover shadow-lg ring-2 ring-white/10" 
                alt="Profile" 
              />
              <div>
                <p className="font-black text-base-200 text-2xl uppercase tracking-tighter leading-none">{user?.displayName}</p>
                <p className="text-sm text-base-200/50 mt-1 font-medium italic">{user?.email}</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: THE SUBMISSION PANEL (7 Columns) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-secondary border border-white/10 rounded-xl p-10 md:p-20"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                
                {/* RATING SECTION */}
                <div className="space-y-6">
                  <label className="text-xs uppercase tracking-[0.3em] text-base-200/50 font-black">Experience Rating</label>
                  <div className="rating rating-lg gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <input
                        key={num}
                        type="radio"
                        {...register("rating")}
                        value={num}
                        className="mask mask-star-2 bg-orange-400 w-12 h-12 hover:scale-125 transition-transform cursor-pointer"
                        defaultChecked={num === 5}
                      />
                    ))}
                  </div>
                </div>

                {/* FEEDBACK AREA */}
                <div className="space-y-4">
                   <div className="flex justify-between items-center px-2">
                      <label className="text-2xl font-bold text-base-200 uppercase tracking-tighter">Detailed Feedback</label>
                   </div>
                  <textarea
                    {...register("feedback", {
                      required: "Please tell us about your experience",
                      minLength: { value: 5, message: "A few more words please!" }
                    })}
                    rows={8}
                    placeholder="Describe the quality of our decoration and service..."
                    className="textarea w-full bg-base-100 text-base-200 text-xl placeholder:text-base-200/20 transition-all rounded-xl p-8 outline-none"
                  />
                  {errors.feedback && (
                    <p className="text-error text-sm font-bold mt-2">{errors.feedback.message}</p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <motion.div 
                  whileHover={{ scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <button type="submit" className="w-full">
                    <Button customClass="w-full py-6 text-2xl font-black uppercase tracking-widest rounded-[1.5rem]">
                       Submit Review
                    </Button>
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RateUs;