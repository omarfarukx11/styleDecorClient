import { motion } from "framer-motion";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">

        <motion.img
          src="https://i.ibb.co/yNcKsX7/decoration.jpg"
          className="max-w-sm rounded-lg shadow-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold">
            Make Your Special Day Beautiful ✨
          </h1>
          <p className="py-6">
            StyleDecor provides premium decoration services for weddings,
            birthday parties, corporate events and more.
          </p>

          <Link to="/booking" className="btn btn-primary">
            Book Decoration Service
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
