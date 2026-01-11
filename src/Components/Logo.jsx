import React from 'react';
import LogoImg from "../assets/ChatGPT Image Jan 12, 2026, 12_48_39 AM.png"
import { Link } from 'react-router';
const Logo = () => {
    return (
        <div>
            <Link to={"/"} >
            <img  className='w-22' src={LogoImg} alt="" />
            </Link>

        </div>
    );
};

export default Logo;