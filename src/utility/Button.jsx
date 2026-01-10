import React from 'react';

const Button = ({children}) => {
    return <button className="btn px-10 border-none xl:btn-lg rounded-full font-bold xl:text-xl text-sm shadow-lg transition-all transform hover:scale-105 hover:shadow-cyan-200/50 
            hover:bg-[#2A2A2A] bg-base-100 text-black hover:text-white">
            {children}
            </button>
};

export default Button;
// bg-[#A9DF59]