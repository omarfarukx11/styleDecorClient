import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shered/Header/Navbar";
import Footer from "../Pages/Shered/Footer/Footer";
import Loader from "../Components/Loader";
import ScrollToTop from "../utility/ScrollToTop";


const RootLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader width={250} height={250} />;
  }

  return (
    <div className="bg-primary">
       <div className="fixed top-0 w-full z-300">
         <Navbar />
       </div>
      <div className="mt-20">
      <Outlet />
    </div>
      <Footer />
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default RootLayout;
