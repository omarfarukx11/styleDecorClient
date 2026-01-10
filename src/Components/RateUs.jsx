import React from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import Button from "../utility/Button";
import Title from "../utility/Title";


const RateUs = () => {
  const { user } = useAuth(); // Destructuring user from Auth
  const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // try {
    //   const reviewData = {
    //     userName: user?.displayName,
    //     userEmail: user?.email,
    //     userPhoto: user?.photoURL,
    //     rating: Number(data.rating),
    //     feedback: data.feedback,
    //     date: new Date().toISOString(),
    //   };

    //   const res = await axiosSecure.post("/new-review", reviewData);

    //   if (res.data.acknowledged) {
    //     reset();
    //     Swal.fire({
    //       icon: "success",
    //       title: "Thank You!",
    //       text: `Thanks for the review, ${user?.displayName}!`,
    //       timer: 2000,
    //       background: "var(--color-base-100)",
    //       color: "var(--color-base-200)",
    //     });
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: error.message || "Failed to submit review",
    //   });
    // }
    console.log(data)
  };

  return (
    <div className="min-h-[calc(100vh-90px)] text-base-200 bg-primary">
      <title>StyleDecor - Rate Us</title>
      
      <Title>Your Feedback Matters</Title>

      <div className="flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-primary p-8 shadow-2xl border border-white/20 rounded-xl"
        >
          {/* USER INFO PREVIEW */}
          <div className="flex flex-col items-center mb-8 border-b border-white/10 pb-6">
            <div className="w-20 h-20 rounded-full border-2 border-secondary overflow-hidden mb-3">
                <img 
                    src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} 
                    alt="User" 
                    className="w-full h-full object-cover"
                />
            </div>
            <h3 className="text-xl font-bold">{user?.displayName}</h3>
            <p className="text-sm text-base-200/50">{user?.email}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Rating Stars Area */}
            <div className="flex flex-col items-center gap-3">
              <label className="text-lg font-semibold">How was your experience?</label>
              <div className="rating rating-lg">
                <input type="radio" {...register("rating")} value="1" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" {...register("rating")} value="2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" {...register("rating")} value="3" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" {...register("rating")} value="4" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" {...register("rating")} value="5" className="mask mask-star-2 bg-orange-400" defaultChecked />
              </div>
            </div>

            {/* Feedback Message */}
            <div className="flex flex-col">
              <label className="font-medium mb-2">Write your thoughts</label>
              <textarea
                {...register("feedback", { 
                  required: "Please write a few words about our service",
                  minLength: { value: 5, message: "Feedback is too short" }
                })}
                rows={4}
                placeholder="What did you like the most?"
                className="textarea textarea-bordered outline-none bg-base-100 w-full focus:border-secondary transition-all"
              />
              {errors.feedback && (
                <p className="text-error text-sm mt-1">{errors.feedback.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button type="submit" className="w-full">
                <Button>Submit Review</Button>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RateUs;