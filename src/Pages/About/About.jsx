import React from "react";
import { FaHeart, FaUsers, FaTrophy, FaStar } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br  py-20 px-6 text-secondary">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl text-secondary font-extrabold  mb-6">
            About Decorator
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Turning your dreams into reality with creativity, passion, and perfection since 2018.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <img
              src="https://i.ibb.co.com/whbwykpC/download-1.jpg"
              alt="Our Team"
              className="rounded-3xl shadow-2xl w-full"
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
          <button className="btn btn-primary btn-lg rounded-full px-12 text-xl font-bold shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;