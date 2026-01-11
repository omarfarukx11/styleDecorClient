import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaPenNib } from "react-icons/fa";
import Button from "../utility/Button";

const HomeReviewSection = () => {
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.1 
      },
    },
  };

  const slideUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const cardVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 } 
    },
  };

  return (
    <section className="bg-secondary">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Triggers when 30% visible
        className="w-full max-w-[1980px] mx-auto py-16 px-5 md:px-20 "
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Side: Content */}
          <div className="flex-1 space-y-4">
            <motion.div
              variants={slideUpVariants}
              className="flex items-center gap-2"
            >
              <div className="flex text-yellow-400 text-lg">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>
              <span className="text-base-200/70 font-medium tracking-widest uppercase text-xs">
                Client Feedback
              </span>
            </motion.div>

            <motion.h2 
              variants={slideUpVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-base-200 leading-tight"
            >
              Your opinion builds <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">
                our Excellence.
              </span>
            </motion.h2>

            <motion.p 
              variants={slideUpVariants}
              className="text-base-200/80 text-lg max-w-xl"
            >
              We value every word from our clients. Share your experience with
              StyleDecor and help us grow better.
            </motion.p>
          </div>

          {/* Right Side: Action Button */}
          <div className="flex justify-center md:justify-end ">
            <motion.div 
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 w-full max-w-sm"
            >
              <p className="text-base-200 mb-6 font-medium text-lg italic">
                The best event planners in Bangladesh! Highly recommended.
              </p>
              
              {/* NAVIGATION BUTTON */}
              <div onClick={() => navigate("/rate-us")} className="w-full">
                <Button customClass="w-full py-4 text-lg shadow-xl shadow-purple-500/20">
                  Write a Review
                </Button>
              </div>
              
              <p className="text-gray-600 text-xs mt-4">
                Takes less than 60 seconds
              </p>
            </motion.div>
          </div>
        </div>

        {/* Subtle Bottom Border/Line for 1980px scale */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="mt-16 w-full h-[1px] bg-white/10 origin-left"
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default HomeReviewSection;