import React from 'react';

const BigTitile = ({children}) => {
    return <div className='text-center'><h1 className="text-transparent  bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 inline-block lg:pt-20 pt-5 lg:pb-5 pb-1 text-2xl lg:text-5xl">{children}</h1></div>
};

export default BigTitile;