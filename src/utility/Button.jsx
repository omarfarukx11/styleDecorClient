import React from "react";
import { HiArrowRight } from "react-icons/hi";

const Button = ({ children = "Hover Me !" }) => {
  return (
    <button
      className="group relative inline-flex items-center justify-center overflow-hidden 
                 rounded-md font-bold shadow-lg transition-all duration-300 transform w-full
                 md:px-6 py-3 text-sm h-auto min-h-0
                 px-2
                md:text-base 
                 xl:px-10 xl:text-xl
                 /* Base Background Color */
                 bg-[#4361ee] text-white 
                 hover:scale-105 hover:shadow-cyan-400/50"
    >
      {/* 1. THE EXPANDING COLOR LAYER */}
      <span
        className="absolute inset-0 w-0 h-0 transition-all duration-500 ease-out 
                   rounded-full bg-cyan-500 
                   left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   group-hover:w-full group-hover:h-[600px]"
      ></span>

      {/* 2. THE SVG DECORATIONS (Lowered opacity to let color show through) */}
      <span className="absolute bottom-0 left-0 h-full -ml-2 pointer-events-none opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full" viewBox="0 0 487 487">
          <path fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" />
        </svg>
      </span>

      {/* 3. THE CONTENT LAYER (Z-index 10 keeps this above the color expansion) */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
};

export default Button;