import React from "react";
import Swal from "sweetalert2";
import { 
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, 
  FaWhatsapp 
} from "react-icons/fa";
import Button from "../../utility/Button";
import Title from "../../utility/Title";

const Contact = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for reaching out to StyleDecor. We will reply within 24 hours.",
      icon: "success",
      confirmButtonColor: "#9333ea", 
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      // This ensures the form data is removed after the alert
      form.reset();
    });
  };

  return (
    <div className="min-h-screen text-base-200 pb-10 px-5">
      <title>StyleDecor - Contact Us</title>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <Title>Get In Touch</Title>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Whether it's a grand wedding or an intimate birthday, our team is ready to decorate your moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Info Section */}
          <div className="space-y-5">
            
            {/* Phone Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-sm hover:scale-105 transition-transform border border-white/20">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-purple-600 rounded-2xl">
                  <FaPhone className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Call Us</h3>
                  <p className="text-gray-400 font-medium">+880 123 456 7890</p>
                  <p className="text-gray-500 text-sm">Sat - Thu, 9am - 10pm</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-sm hover:scale-105 transition-transform border border-white/20">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-green-500 rounded-2xl">
                  <FaWhatsapp className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">WhatsApp</h3>
                  <p className="text-gray-400 mb-1">Available for quick chat</p>
                  <a href="https://wa.me/8801616264575" target="_blank" rel="noreferrer" className="text-green-400 font-semibold hover:underline cursor-pointer">
                    Start Chat Now
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-sm hover:scale-105 transition-transform border border-white/20">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-pink-600 rounded-2xl">
                  <FaEnvelope className="text-2xl text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Email Us</h3>
                  <p className="text-gray-400">hello@styledecor.com</p>
                  <p className="text-gray-400">booking@styledecor.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-sm border border-white/20">
            <h2 className="text-4xl font-bold mb-8">Send Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input required name="name" type="text" placeholder="Full Name" className="input input-bordered w-full bg-base-100 border-2 border-primary focus:border-purple-500 outline-none" />
                <input required name="phone" type="text" placeholder="Phone Number" className="input input-bordered w-full bg-base-100 border-2 border-primary focus:border-purple-500 outline-none" />
              </div>
              
              <input required name="email" type="email" placeholder="Email Address" className="input input-bordered w-full bg-base-100 border-2 border-primary focus:border-purple-500 outline-none" />
              
              <select name="service" defaultValue="" className="select select-bordered w-full bg-base-100 border-2 border-primary focus:border-purple-500 outline-none text-gray-400">
                <option value="" disabled>Select Service</option>
                <option value="wedding">Wedding Decoration</option>
                <option value="birthday">Birthday Party</option>
                <option value="corporate">Corporate Event</option>
              </select>
              
              <textarea required name="message" rows="4" placeholder="Tell us about your event..." className="textarea textarea-bordered w-full bg-base-100 border-2 border-primary focus:border-purple-500 outline-none"></textarea>
              
              <button type="submit" className="w-full">
                <Button>Send Message</Button>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;