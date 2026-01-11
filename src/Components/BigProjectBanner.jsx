import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Button from "../utility/Button";
import { Link } from "react-router";

const BigProjectBanner = () => {
  // Variant for the parent to stagger the children
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const imageSlideInVariants = {
    hidden: { x: 60, opacity: 0, scale: 0.98 }, 
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  const textClipVariants = {
    hidden: { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 },
    visible: { 
      clipPath: 'inset(0% 0% 0% 0%)', 
      opacity: 1,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
    },
  };

  return (
    <section className="relative bg-primary flex items-center justify-center overflow-hidden lg:py-20 py-5">
      <motion.div 
        variants={bannerVariants}
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        className="max-w-[1860px] xl:px-20 lg:px-8 px-5 mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10"
      >
        <div className="space-y-4 lg:col-span-5 max-w-[700px]">
          <motion.h1 
            variants={slideUpVariants} 
            className="text-3xl lg:text-5xl xl:text-7xl font-black text-base-200 leading-[1.05]"
          >
            Transforming <br />
            <motion.span 
              variants={textClipVariants} 
              className="text-transparent inline-block w-full bg-clip-text bg-linear-to-r pb-3 from-cyan-400 to-blue-500 text-3xl lg:text-5xl xl:text-7xl"
            >
              Living Spaces.
            </motion.span>
          </motion.h1>

          <motion.p 
            variants={slideUpVariants} 
            className="text-xl xl:text-2xl text-base-200/50 max-w-[500px]"
          >
            StyleDecor is a high-performance ecosystem designed to bridge the gap between 
            professional decorators and dream homes.
          </motion.p>

          <motion.div variants={slideUpVariants} className="pt-4">
            <Link to={'services'} className="inline-block w-64">
              <Button>
                Explore Projects <HiArrowRight className="inline-block ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right side image */}
        <motion.div 
          variants={imageSlideInVariants}
          className="lg:col-span-7 relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[900px] aspect-video rounded-xl overflow-hidden group">
            <img 
              src="https://i.ibb.co.com/7dMnxxy8/spacejoy-Rq-O6kwm4t-ZY-unsplash.jpg" 
              alt="Spacejoy Wide" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <motion.div 
            animate={{ scale: [1, 1.02, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -inset-4 border border-cyan-500/20 rounded-[2.5rem] -z-10 hidden md:block"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BigProjectBanner;