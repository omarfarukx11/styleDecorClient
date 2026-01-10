import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-20 right-5 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="relative p-0.5 overflow-hidden rounded-full flex items-center justify-center group"
          >
            {/* THE RUNNING BORDER ANIMATION */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200%] h-[200%] bg-[conic-gradient(transparent,transparent,transparent,#3ABFF8)]"
            />

            {/* THE BUTTON CONTENT */}
            <button
              onClick={scrollToTop}
              className="relative p-3 rounded-full bg-primary text-info shadow-2xl focus:outline-none border-none cursor-pointer flex items-center justify-center z-10 transition-colors group-hover:bg-opacity-90"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScrollToTop;