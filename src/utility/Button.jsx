import React from "react";

const Button = ({ children }) => {
  return (
    <button
      className="btn border-none rounded-full font-bold shadow-lg transition-all transform w-full
  px-6 py-2 text-sm h-auto min-h-0
  
  /* Tablet / Medium Screens */
  md:px-8 md:text-base 
  
  /* Desktop / XL Screens */
  xl:px-8  xl:text-xl xl:btn-lg
  
  /* Animation & Colors */
  hover:scale-105 hover:shadow-cyan-200/50 
  bg-base-100 text-black 
  hover:bg-[#2A2A2A] hover:text-white
  
  /* Interaction */
  active:scale-95
"
    >
      {children}
    </button>
  );
};

export default Button;
// bg-[#A9DF59]
