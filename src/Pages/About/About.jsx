import React from "react";
import { FaHeart, FaUsers, FaTrophy, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const About = () => {
  return (
    
    <div className="min-h-screen bg-linear-to-br  py-20 px-6 text-secondary">
      <title>StyelDecor - About</title>
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-secondary font-extrabold  mb-6">
            About Decorator
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Turning your dreams into reality with creativity, passion, and perfection since 2018.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20 bg-primary rounded-xl">
          <div>
            <img
              src="https://i.ibb.co.com/PGDhs74D/home-decor-1100-x-921-wallpaper-afxadyvf33e1kh3c.jpg"
              alt="Our Team"
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          <div className="">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">
              Founded with a vision to transform ordinary events into extraordinary memories, 
              Decorator has been the leading name in premium event decoration in Bangladesh.
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              From grand weddings to intimate celebrations, we bring creativity, elegance, 
              and perfection to every project — making your special day truly unforgettable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-primary backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <FaUsers className="text-5xl text-purple-400 mx-auto mb-4" />
            <h3 className="text-4xl font-black ">500+</h3>
            <p className="text-gray-500">Happy Clients</p>
          </div>
          <div className="bg-primary backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <FaTrophy className="text-5xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-4xl font-black ">50+</h3>
            <p className="text-gray-500">Awards Won</p>
          </div>
          <div className="bg-primary backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <FaHeart className="text-5xl text-pink-400 mx-auto mb-4" />
            <h3 className="text-4xl font-black ">1200+</h3>
            <p className="text-gray-500">Events Completed</p>
          </div>
          <div className="bg-primary backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <FaStar className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h3 className="text-4xl font-black ">4.9</h3>
            <p className="text-gray-500">Average Rating</p>
          </div>
        </div>

        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold  mb-8">
            Ready to Make Your Event Unforgettable?
          </h2>
          <Link to={'/services'} className="btn hover:bg-base-100  hover:text-secondary bg-secondary text-base-100 border-none btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;