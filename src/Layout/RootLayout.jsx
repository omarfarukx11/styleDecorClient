import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shered/Header/Navbar';
import Footer from '../Pages/Shered/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='bg-gray-400 w-[1500px] mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;