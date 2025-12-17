import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen py-20 px-6 text-secondary">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold  mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Have a question or ready to book your dream decoration? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info Cards */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-purple-600 rounded-full">
                  <FaPhone className="text-3xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold ">Phone</h3>
                  <p className="text-gray-500 text-lg">+880 123 456 7890</p>
                  <p className="text-gray-500">+880 987 654 3210</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-pink-600 rounded-full">
                  <FaEnvelope className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold ">Email</h3>
                  <p className="text-gray-500 text-lg">hello@decorator.com</p>
                  <p className="text-gray-500">support@decorator.com</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-purple-600 rounded-full">
                  <FaMapMarkerAlt className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold ">Location</h3>
                  <p className="text-gray-500 text-lg">Dhaka, Bangladesh</p>
                  <p className="text-gray-500">Mirpur DOHS, Road 12</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-transform">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-pink-600 rounded-full">
                  <FaClock className="text-3xl " />
                </div>
                <div>
                  <h3 className="text-2xl font-bold t">Open Hours</h3>
                  <p className="text-gray-500">Sat - Thu: 9:00 AM - 10:00 PM</p>
                  <p className="text-gray-500">Friday: Closed</p>
                </div>
              </div>
            </div>
          </div>


          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl">
            <h2 className="text-4xl font-bold  mb-8">Send Message</h2>
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full bg-white/10 outline-none  border-2 border-primary  placeholder-gray-400 "
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full bg-white/10 outline-none  border-2 border-primary placeholder-gray-400 "
              />
              <input
                type="text"
                placeholder="Subject"
                className="input input-bordered w-full bg-white/10 outline-none  border-2 border-primary placeholder-gray-400 "
              />
              <textarea
                rows="6"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full bg-white/10 outline-none  border-2 border-primary placeholder-gray-400 "
              ></textarea>
              
              <button className="btn  btn-primary btn-lg mt-10 w-full rounded-full text-lg font-bold shadow-xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;