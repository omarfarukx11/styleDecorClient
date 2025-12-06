import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/Shered/Header/Navbar";
import Footer from "../Pages/Shered/Footer/Footer";
import Loader from "../Components/Loader";


const RootLayout = () => {
  const [loading, setLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // 1.5s loader
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader width={250} height={250} />; // Show loader while loading
  }

  return (
    <div className="w-[1800px] mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
