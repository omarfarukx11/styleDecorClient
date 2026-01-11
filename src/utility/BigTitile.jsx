import React from 'react';
import { motion } from "framer-motion"; // Added animation import

const BigTitile = ({children}) => {
    return (
        <div className='text-center'>
            <motion.h1 
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                    duration: 0.8, 
                    delay: 0.2, 
                    type: "spring", 
                    stiffness: 100 
                }}
                className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block 2xl:pt-10 md:mt-10 pt-5 lg:pb-5 pb-1 text-2xl md:text-4xl lg:text-5xl"
            >
                {children}
            </motion.h1>
        </div>
    );
};

export default BigTitile;