import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaMoneyBillWave,
  FaTasks,
  FaCalendarCheck,
  FaUserTie,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import useRole from "../Hooks/useRole";
import Loader from "../Components/Loader";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();


  useEffect(() => {
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };


  if (roleLoading) return <Loader />;

  const commonMenu = (
    <>
      <div className="border-t border-white my-2"></div>
      <li>
        <NavLink
          to="/dashboard/my-profile"
          onClick={closeMobileMenu}
          className="flex items-center gap-3"
        >
          <FaUser className="text-xl" />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3 mb-2"
        >
          <FaHome className="text-xl" />
          <span>Back to Home</span>
        </NavLink>
      </li>
    </>
  );

  const userMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-bookings" onClick={closeMobileMenu}>
          <FaClipboardList className="text-xl" />
          <span>My Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history" onClick={closeMobileMenu}>
          <FaMoneyBillWave className="text-xl" />
          <span>Payment History</span>
        </NavLink>
      </li>
    </>
  );

  const decoratorMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-projects" onClick={closeMobileMenu}>
          <FaTasks className="text-xl" />
          <span>My Assigned Projects</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/today-schedule" onClick={closeMobileMenu}>
          <FaCalendarCheck className="text-xl" />
          <span>Today's Schedule</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-earnings" onClick={closeMobileMenu}>
          <FaMoneyBillWave className="text-xl" />
          <span>Earnings Summary</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-payment-history" onClick={closeMobileMenu}>
          <FaMoneyBillWave className="text-xl" />
          <span>All Payemt History</span>
        </NavLink>
      </li>
    </>
  );

  const adminMenu = (
    <>
      <li>
        <NavLink to="/dashboard/manage-decorators" onClick={closeMobileMenu}>
          <FaUserTie className="text-xl" />
          <span>Manage Decorators</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-services" onClick={closeMobileMenu}>
          <MdOutlineDesignServices className="text-xl" />
          <span>Services & Packages</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-bookings" onClick={closeMobileMenu}>
          <FaClipboardList className="text-xl" />
          <span>All Bookings</span>
        </NavLink>
      </li>

      <div className="border-b border-white my-4"></div>
      <li>
        <NavLink to="/dashboard/revenue" onClick={closeMobileMenu}>
          <FaMoneyBillWave className="text-xl" />
          <span>Revenue Monitoring</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/analytics" onClick={closeMobileMenu}>
          <FaChartBar className="text-xl" />
          <span>Analytics & Charts</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen bg-base-100 max-w-[1800px] mx-auto ">
      <title>StyelDecor - Dashbord</title>
      <div className="absolute top-5 left-4 z-50 xl:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mt-4"
        >
          {!isMobileMenuOpen && <FaBars size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        ></div>
      )}


        <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-primary text-secondary border-r border-white flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0 xl:static xl:inset-0
        `}
      >
        <div className="p-8 border-b border-white sm:pr-2">
          <div className="absolute top-5 right-4 z-50 xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mt-4 text-white"
            >
              {isMobileMenuOpen && <FaTimes size={24} />}
            </button>
          </div>

          <h2 className="text-2xl font-bold uppercase text-white">
            {role === "admin" && "Admin"}
            {role === "decorator" && "Decorator"}
            {role === "user" && "My Dashboard"} 
          </h2>
        </div>

        <ul className="menu p-4 flex-1 overflow-y-auto text-white">
          {role === "user" && userMenu}
          {role === "decorator" && decoratorMenu}
          {role === "admin" && adminMenu}
          {commonMenu}
        </ul>

        <div className="p-4 border-t border-white text-center text-sm opacity-70">
          © 2025 StyleDecor
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-screen bg-primary">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
