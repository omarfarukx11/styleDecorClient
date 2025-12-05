import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Contact Details */}
        <div>
          <h2 className="footer-title">Contact Us</h2>
          <p className="mt-2">📞 Phone: +880 1234-567890</p>
          <p>📧 Email: styledecor@gmail.com</p>
          <p>📍 Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="footer-title">Follow Us</h2>
          <div className="flex items-center gap-4 mt-3">
            <a className="btn btn-circle btn-outline" href="#">
              <FaFacebookF size={20} />
            </a>
            <a className="btn btn-circle btn-outline" href="#">
              <FaInstagram size={20} />
            </a>
            <a className="btn btn-circle btn-outline" href="#">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Business Hours */}
        <div>
          <h2 className="footer-title">Business Hours</h2>
          <p className="mt-2">🕒 Mon–Fri: 9:00 AM – 8:00 PM</p>
          <p>🕒 Saturday: 10:00 AM – 6:00 PM</p>
          <p>🛑 Sunday: Closed</p>
        </div>

      </div>

      <div className="text-center mt-10 border-t pt-5">
        <p>© {new Date().getFullYear()} StyleDecor. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
