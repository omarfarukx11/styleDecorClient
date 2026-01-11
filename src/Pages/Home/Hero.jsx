import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router"; 
import Button from "../../utility/Button";

const Hero = () => {
  // Animation for the container to orchestrate children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,
      },
    },
  };

  // Slide up and fade in for paragraphs and buttons
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  // Split text animation for the heading
  const wordVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative w-full h-[80vh] lg:min-h-screen overflow-hidden flex items-center justify-center bg-[#2A2A2A]">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
      >
        <img
          // src="https://i.ibb.co.com/PGDhs74D/home-decor-1100-x-921-wallpaper-afxadyvf33e1kh3c.jpg"
           src="https://i.ibb.co.com/qLqvyzZT/istockphoto-2164617622-612x612.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#2A2A2A] via-transparent to-[#2A2A2A]/50" />
      </motion.div>

      {/* CONTENT AREA */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6 text-center text-white"
      >
        {/* HEADING WITH MASK REVEAL */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none overflow-hidden">
          <span className="block overflow-hidden">
            <motion.span variants={wordVariants} className="block">
              Make Your Special
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span 
              variants={wordVariants} 
              className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block"
            >
              Day Beautiful
            </motion.span>
          </span>
        </h1>

        {/* SUBHEADING WITH FADE IN UP */}
        <motion.p 
          variants={fadeInUp}
          className="mt-8 text-sm md:text-xl lg:text-2xl max-w-2xl mx-auto text-gray-300 leading-relaxed font-medium "
        >
          StyleDecor provides premium decoration services for home,weddings,
          birthday parties, corporate events, and more.
        </motion.p>

        {/* BUTTON WITH SCALE & HOVER */}
        <motion.div variants={fadeInUp}>
          <Link to="/services">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
               <div className="flex justify-center w-full pt-10">
                <div className="w-80 text-center">
                  <Link to="services">
                    <Button>Book Decoration Service</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>

      {/* ANIMATED SCROLL LINE */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 80 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-secondary to-transparent"
      />
    </section>
  );
};

export default Hero;