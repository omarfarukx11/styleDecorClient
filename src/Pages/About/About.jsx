import React from "react";
import { FaHeart, FaUsers, FaTrophy, FaStar, FaGem, FaPalette, FaRocket } from "react-icons/fa";
import { Link } from "react-router";
import Title from "../../utility/Title";
import { motion } from "framer-motion";
import Button from "../../utility/Button";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen px-6 py-10 text-base-200 transition-colors duration-500 overflow-hidden">
      <title>StyleDecor - About Us</title>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-[1860px] xl:px-20 lg:px-5 px-5 mx-auto"
      >

        <motion.div variants={itemVariants} className="text-center mb-20">
          <Title>About StyleDecor</Title>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-4">
            Turning your dreams into reality with creativity, passion, and perfection since 2018.
          </p>
        </motion.div>

        {/* --- Story Section with Laser Border --- */}
        <motion.div 
          variants={itemVariants} 
          className="grid md:grid-cols-2 gap-12 items-center mb-32 bg-secondary rounded-xl relative overflow-hidden "
        >
          <div className="relative overflow-hidden rounded-xl group h-full min-h-[300px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#3ABFF8_100%)] opacity-50"
            />
            <img
              src="https://i.ibb.co.com/PGDhs74D/home-decor-1100-x-921-wallpaper-afxadyvf33e1kh3c.jpg"
              alt="Luxury Decor"
              className="relative z-10 rounded-xl w-full object-cover h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="space-y-6 p-8 md:p-0 md:pr-12">
            <h2 className="text-4xl font-bold text-base-200">Our Story</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded with a vision to transform ordinary events into extraordinary memories, 
              <span className="text-info font-bold"> StyleDecor</span> has been the leading name in premium event decoration. We believe that every space has a story to tell.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              From grand royal weddings to modern corporate galas, we bring a meticulous eye for detail. Our mission is to make your special day truly unforgettable.
            </p>
          </div>
        </motion.div>

        {/* --- Core Values Section --- */}
        <div className="mb-32">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-base-200">Why Choose Us</h2>
            <div className="h-1 w-20 bg-info mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FaGem />, title: "Premium Quality", desc: "We source the finest materials, from fresh exotic florals to high-end silk fabrics." },
              { icon: <FaPalette />, title: "Bespoke Design", desc: "No two events are the same. We tailor every concept to your unique personality." },
              { icon: <FaRocket />, title: "Swift Execution", desc: "Our team ensures a stress-free experience with timely setup and flawless management." }
            ].map((value, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="p-8 bg-secondary rounded-2xl border border-white/5 hover:border-info/30 transition-all group"
              >
                <div className="text-4xl text-info mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-base-200">{value.title}</h4>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { icon: <FaUsers className="text-purple-400" />, val: "500+", label: "Happy Clients" },
            { icon: <FaTrophy className="text-yellow-400" />, val: "50+", label: "Awards Won" },
            { icon: <FaHeart className="text-pink-400" />, val: "1200+", label: "Events Done" },
            { icon: <FaStar className="text-yellow-500" />, val: "4.9", label: "Avg Rating" }
          ].map((stat, i) => (
            <motion.div 
                key={i} 
                variants={itemVariants}
                className="relative p-[1.5px] overflow-hidden rounded-xl group"
            >


              <div className="relative z-10 bg-secondary rounded-xl p-8 text-center h-full">
                <div className="text-4xl mx-auto mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-black text-base-200">{stat.val}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Final CTA --- */}
        <motion.div variants={itemVariants} className="text-center pb-20">
          <h2 className="text-4xl font-bold text-base-200 mb-8">
            Ready to Make Your Event Unforgettable?
          </h2>
          <div className="flex justify-center w-full pt-10">
            <div className="w-80 text-center">
              <Link to="/services">
                <Button>Start Planning Now</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;