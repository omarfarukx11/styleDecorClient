import { FaFacebookF, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { NavLink } from "react-router";
import Logo from "../../../Components/Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-white pt-10 pb-12 border-t border-white/5 w-full">
      <div className="max-w-[1980px] mx-auto px-10 md:px-20">
        
        {/* TOP SECTION: Logo as a standalone corner element */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="scale-110 lg:scale-125 origin-left">
            <Logo />
          </div>
          <div className="h-px grow bg-white/5 mx-12 hidden lg:block"></div>
          <p className="text-xs uppercase tracking-[0.4em] text-white/50 font-medium">
            Architectural Event Aesthetics
          </p>
        </div>

        {/* MIDDLE SECTION: The Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 items-start">
          
          {/* 1. Brand Tagline (Instead of Logo Details) */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Vision</h2>
            <p className="text-lg leading-relaxed text-white/40 italic">
              "We don't just decorate spaces; we curate memories through high-fidelity design."
            </p>
          </div>

          {/* 2. Navigation */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Navigation</h2>
            <ul className="space-y-4 text-white/60 text-lg">
              <li className="hover:text-cyan-400 transition-colors cursor-pointer"><NavLink to="/">Home</NavLink></li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer"><NavLink to="/services">Services</NavLink></li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer"><NavLink to="/about">About</NavLink></li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer"><NavLink to="/service-area">Service Area</NavLink></li>
              <li className="hover:text-cyan-400 transition-colors cursor-pointer"><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>

          {/* 3. Official Contact */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Contact</h2>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-white/60 group">
                <FaPhoneAlt size={16} className="group-hover:text-cyan-400 transition-colors" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-4 text-white/60 group">
                <FaEnvelope size={16} className="group-hover:text-cyan-400 transition-colors" />
                <span>styledecor@gmail.com</span>
              </li>
              <li className="flex items-center gap-4 text-white/60 group">
                <FaMapMarkerAlt size={16} className="group-hover:text-cyan-400 transition-colors" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* 4. Studio Hours */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Studio</h2>
            <div className="space-y-4 text-lg text-white/40">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon–Fri</span>
                <span className="text-white font-bold">9AM – 8PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span>
                <span className="text-white font-bold">10AM – 6PM</span>
              </div>
              <div className="flex justify-between text-red-500/60 font-bold uppercase text-xs pt-2">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* 5. Developer & Support */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-black mb-8 uppercase tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block">Developer</h2>
            <p className="mb-6 italic text-sm text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block uppercase">Omar Faruk</p>
            
            <div className="flex gap-3">
              <a href="https://wa.me/8801616264575" target="_blank" rel="noreferrer" 
                 className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-green-600 hover:text-white transition-all group">
                <FaWhatsapp size={22} className="group-hover:scale-110 transition-transform" />
              </a>
              
              <a href="https://facebook.com/share/1G9554JXsx/" target="_blank" rel="noreferrer" 
                 className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-blue-600 hover:text-white transition-all group">
                <FaFacebookF size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              <a href="https://linkedin.com/in/omar-farukx57" target="_blank" rel="noreferrer"
                 className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-blue-500 hover:text-white transition-all group">
                <FaLinkedinIn size={20} className="group-hover:scale-110 transition-transform" />
              </a>

              <a href="mailto:khfarukcht@gmail.com"
                 className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-red-500 hover:text-white transition-all group">
                <FaEnvelope size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-60">
          <p className="text-[10px] tracking-[0.4em] uppercase">
            © {currentYear} STYLEDECOR. DESIGNED FOR THE BOLD.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em]">
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;