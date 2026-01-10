import { FaFacebookF, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../../Components/Logo";
 // Assuming your logo component path

const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-8 px-6 border-t border-gray-400 md:px-12 lg:px-24">
      <div className="max-w-[1980px] p-4 mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Identity */}
          <div className="space-y-4">
            <Logo></Logo>
            <p className="text-sm leading-relaxed opacity-80 mt-4">
              StyleDecor creates elegant and memorable experiences for your special events. 
              We bring your dreams to life with creative decoration and professional management.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="text-xl font-bold mb-6 border-b-2 border-secondary w-fit">Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary group-hover:text-primary transition-all">
                  <FaPhoneAlt size={14} />
                </div>
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary group-hover:text-primary transition-all">
                  <FaEnvelope size={14} />
                </div>
                <span>styledecor@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-secondary/10 rounded-full group-hover:bg-secondary group-hover:text-primary transition-all">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h2 className="text-xl font-bold mb-6 border-b-2 border-secondary w-fit">Business Hours</h2>
            <div className="space-y-3 opacity-90">
              <div className="flex justify-between">
                <span>Mon–Fri:</span>
                <span className="font-semibold text-white">9:00 AM – 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-white">10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between text-error font-medium">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Follow Us & Social Links */}
          <div>
            <h2 className="text-xl font-bold mb-6 border-b-2 border-secondary w-fit">Follow Us</h2>
            <p className="mb-4 text-sm opacity-80">Stay updated with our latest designs and events.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-secondary/50 rounded-full hover:bg-secondary hover:text-primary transition-all transform hover:-translate-y-1">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-secondary/50 rounded-full hover:bg-secondary hover:text-primary transition-all transform hover:-translate-y-1">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center border border-secondary/50 rounded-full hover:bg-secondary hover:text-primary transition-all transform hover:-translate-y-1">
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-16 pt-8 border-t border-secondary/10 text-center">
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} <span className="font-bold text-secondary">StyleDecor</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;