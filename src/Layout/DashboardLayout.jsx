// DashboardLayout.jsx
import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUser,
  FaClipboardList,
  FaMoneyBillWave,
  FaTasks,
  FaCalendarCheck,
  FaTools,
  FaUserTie,
  FaChartBar,
} from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import useRole from "../Hooks/useRole";
import Loader from "../Components/Loader";


const DashboardLayout = () => {
    const {role , roleLoading} = useRole()

  if (roleLoading) {
    return (
     <Loader></Loader>
    );
  }

  // Common for all
  const commonMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-profile">
          <FaUser className="text-xl" />
          <span>My Profile</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="mb-2">
          <FaHome className="text-xl" />
          <span>Back to Home</span>
        </NavLink>
      </li>
      <div className="divider my-2"></div>
    </>
  );

  // User Menu
  const userMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-bookings">
          <FaClipboardList className="text-xl" />
          <span>My Bookings</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/payment-history">
          <FaMoneyBillWave className="text-xl" />
          <span>Payment History</span>
        </NavLink>
      </li>
    </>
  );

  // Decorator Menu
  const decoratorMenu = (
    <>
      <li>
        <NavLink to="/dashboard/my-projects">
          <FaTasks className="text-xl" />
          <span>My Assigned Projects</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/today-schedule">
          <FaCalendarCheck className="text-xl" />
          <span>Today's Schedule</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-earnings">
          <FaMoneyBillWave className="text-xl" />
          <span>Earnings Summary</span>
        </NavLink>
      </li>
    </>
  );

  // Admin Menu
  const adminMenu = (
    <>
      <li className="menu-title">
        <span className="text-xs uppercase opacity-70">Management</span>
      </li>

      <li>
        <NavLink to="/dashboard/manage-decorators">
          <FaUserTie className="text-xl" />
          <span>Manage Decorators</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-services">
          <MdOutlineDesignServices className="text-xl" />
          <span>Services & Packages</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/all-bookings">
          <FaClipboardList className="text-xl" />
          <span>All Bookings</span>
        </NavLink>
      </li>

      <div className="divider my-4"></div>

      <li className="menu-title">
        <span className="text-xs uppercase opacity-70">Reports</span>
      </li>

      <li>
        <NavLink to="/dashboard/revenue">
          <FaMoneyBillWave className="text-xl" />
          <span>Revenue Monitoring</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/analytics">
          <FaChartBar className="text-xl" />
          <span>Analytics & Charts</span>
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex min-h-screen bg-base-100">

      <div className="w-72 bg-[#B0B0B0] text-white border-r border-base-300 flex flex-col">
        {/* Logo / Title */}
        <div className="p-8 border-b border-base-300">
          <h2 className="text-2xl font-bold text-center">
            {role === "admin" && "Admin"}
            {role === "decorator" && "Decorator"}
            {role === "user" && "My"} Dashboard
          </h2>
        </div>

        {/* Menu */}
        <ul className="menu p-4 flex-1 overflow-y-auto">
          {role === "user" && userMenu}
          {role === "decorator" && decoratorMenu}
          {role === "admin" && adminMenu}
          {commonMenu}
        </ul>

        {/* Optional Footer */}
        <div className="p-4 border-t border-base-300 text-center text-sm opacity-70">
          © 2025 StyleDecor
        </div>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar (optional – you can remove if not needed) */}
        <div className="bg-secondary text-white px-8 py-8 shadow-md">
          <h1 className="text-xl font-semibold">
            Welcome, <span className="capitalize">{role}</span>!
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-8 bg-base-100 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;