import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="hero text-neutral-content xl:p-20 p-4">
      <div className="flex items-center w-full justify-between flex-col lg:flex-row-reverse gap-10">

        {/* BIGGER RESPONSIVE IMAGE */}
        <motion.img
          src="https://i.ibb.co.com/WpzJrV8M/dabito-living-room-7297f95db79240d095734d010681d23e.webp"
          className="
            w-[300px] h-[300px] 
            md:w-[450px] md:h-[450px] 
            lg:w-[550px] lg:h-[550px] 
            object-cover rounded-lg shadow-2xl
          "
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="lg:w-[50%] text-center lg:text-left"
        >
          <h1 className="text-5xl font-bold">
            Make Your Special Day Beautiful ✨
          </h1>
          <p className="py-6">
            StyleDecor provides premium decoration services for weddings,
            birthday parties, corporate events, and more.
          </p>

          <Link to="/services" className="btn hover:bg-base-100  hover:text-secondary bg-secondary text-base-100 border-none btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all">
            Book Decoration Service
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
