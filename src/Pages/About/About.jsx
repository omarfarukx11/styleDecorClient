import React from "react";
import { FaHeart, FaUsers, FaTrophy, FaStar, FaGem, FaPalette, FaRocket } from "react-icons/fa";
import { Link } from "react-router";
import Title from "../../utility/Title";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-10 text-base-200 transition-colors duration-500">
      <title>StyleDecor - About Us</title>
      <div className="max-w-7xl mx-auto">

        {/* --- Header Section --- */}
        <div className="text-center mb-20">
          <Title>About StyleDecor</Title>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-4">
            Turning your dreams into reality with creativity, passion, and perfection since 2018.
          </p>
        </div>

        {/* --- Story Section with Laser Border --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32 bg-secondary p-8 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
          <div className="relative p-[2px] overflow-hidden rounded-xl group">
            {/* Very Slow smooth Laser Border */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#3ABFF8_100%)] opacity-50"
            />
            <img
              src="https://i.ibb.co.com/PGDhs74D/home-decor-1100-x-921-wallpaper-afxadyvf33e1kh3c.jpg"
              alt="Luxury Decor"
              className="relative z-10 rounded-xl w-full object-cover h-[400px] grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-base-200">Our Story</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Founded with a vision to transform ordinary events into extraordinary memories, 
              <span className="text-info font-bold"> StyleDecor</span> has been the leading name in premium event decoration. We believe that every space has a story to tell.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              From grand royal weddings to modern corporate galas, we bring a meticulous eye for detail. Our mission is to make your special day truly unforgettable.
            </p>
          </div>
        </div>

        {/* --- Core Values Section --- */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-base-200">Why Choose Us</h2>
            <div className="h-1 w-20 bg-info mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <FaGem />, title: "Premium Quality", desc: "We source the finest materials, from fresh exotic florals to high-end silk fabrics." },
              { icon: <FaPalette />, title: "Bespoke Design", desc: "No two events are the same. We tailor every concept to your unique personality." },
              { icon: <FaRocket />, title: "Swift Execution", desc: "Our team ensures a stress-free experience with timely setup and flawless management." }
            ].map((value, i) => (
              <div key={i} className="p-8 bg-secondary rounded-2xl border border-white/5 hover:border-info/30 transition-all group">
                <div className="text-4xl text-info mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-base-200">{value.title}</h4>
                <p className="text-gray-400 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- Animated Stats Cards --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
          {[
            { icon: <FaUsers className="text-purple-400" />, val: "500+", label: "Happy Clients" },
            { icon: <FaTrophy className="text-yellow-400" />, val: "50+", label: "Awards Won" },
            { icon: <FaHeart className="text-pink-400" />, val: "1200+", label: "Events Done" },
            { icon: <FaStar className="text-yellow-500" />, val: "4.9", label: "Avg Rating" }
          ].map((stat, i) => (
            <div key={i} className="relative p-[1.5px] overflow-hidden rounded-3xl group">
               {/* Slow subtle laser border for stats */}
               <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,transparent_80%,#3ABFF8_100%)] opacity-30"
                />
              <div className="relative z-10 bg-secondary rounded-3xl p-8 text-center h-full border border-white/5 shadow-xl">
                <div className="text-4xl mx-auto mb-4">{stat.icon}</div>
                <h3 className="text-3xl font-black text-base-200">{stat.val}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1 font-bold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Final CTA --- */}
        <div className="text-center pb-20">
          <h2 className="text-4xl font-bold text-base-200 mb-8">
            Ready to Make Your Event Unforgettable?
          </h2>
          <Link to={'/services'} 
            className="btn btn-info btn-lg rounded-full font-bold px-12 shadow-2xl hover:shadow-info/40 transform hover:scale-105 transition-all text-primary">
            Start Planning Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;