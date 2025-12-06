import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="flex items-center justify-between flex-col lg:flex-row-reverse p-20 gap-10">

        {/* BIGGER RESPONSIVE IMAGE */}
        <motion.img
          src="https://i.ibb.co.com/WpzJrV8M/dabito-living-room-7297f95db79240d095734d010681d23e.webp"
          className="
            w-[300px] h-[300px] 
            md:w-[450px] md:h-[450px] 
            lg:w-[550px] lg:h-[550px] 
            object-cover rounded-lg shadow-2xl
          "
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .5 }}
        />

        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .5 }}
          className="lg:w-[50%] text-center lg:text-left"
        >
          <h1 className="text-5xl font-bold">
            Make Your Special Day Beautiful ✨
          </h1>
          <p className="py-6">
            StyleDecor provides premium decoration services for weddings,
            birthday parties, corporate events, and more.
          </p>

          <Link to="/services" className="btn btn-primary hover:bg-white hover:text-primary hover:border-primary">
            Book Decoration Service
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
