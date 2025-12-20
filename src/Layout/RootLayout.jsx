import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shered/Header/Navbar";
import Footer from "../Pages/Shered/Footer/Footer";
import Loader from "../Components/Loader";


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
    <div>
        <Navbar />
      <div className="max-w-[1800px] mx-auto">
      <Outlet />
    </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
