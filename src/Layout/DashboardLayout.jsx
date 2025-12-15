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

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  if (roleLoading) return <Loader />;

  const commonMenu = (
    <>
      <div className="divider my-2"></div>
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
    </>
  );

  const adminMenu = (
    <>
      <li className="menu-title">
        <span className="text-xs uppercase opacity-70">Management</span>
      </li>

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

      <div className="divider my-4"></div>

      <li className="menu-title">
        <span className="text-xs uppercase opacity-70">Reports</span>
      </li>

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
    <div className="flex min-h-screen bg-base-100">
      {/* Mobile Hamburger Button in header */}
      <div className="absolute top-5 left-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-[#B0B0B0] text-white p-3 rounded-lg shadow-lg"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-primary text-white border-r border-base-300 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="p-8 border-b border-base-300 sm:pr-2">
          <h2 className="text-2xl font-bold text-center">
            {role === "admin" && "Admin"}
            {role === "decorator" && "Decorator"}
            {role === "user" && "My"} Dashboard
          </h2>
        </div>

        <ul className="menu p-4 flex-1 overflow-y-auto">
          {role === "user" && userMenu}
          {role === "decorator" && decoratorMenu}
          {role === "admin" && adminMenu}
          {commonMenu}
        </ul>

        <div className="p-4 border-t border-base-300 text-center text-sm opacity-70">
          © 2025 StyleDecor
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="bg-primary text-white p-8 shadow-md lg:pl-8 pl-20">
          <h1 className="text-xl font-semibold">
            Welcome, <span className="capitalize">{role}</span>!
          </h1>
        </div>

        <div className="flex-1 lg:p-8 bg-base-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
