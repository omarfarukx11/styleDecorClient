import React from "react";
import { NavLink } from "react-router";
import Logo from "../../../Components/Logo";
// import useAuth from "../Hooks/useAuth"; // if you are using auth

const Navbar = () => {

  const user = null; // or { name: "Faruk" }

  const activeLink =
    "text-primary font-semibold border-b-2 border-primary pb-1";
  const normalLink = "text-base";

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar py-5 ">
      {/* START */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="btn btn-ghost text-2xl font-bold">
          <Logo></Logo>
        </NavLink>
      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* END PROFILE / LOGIN */}
      <div className="navbar-end flex gap-2">
        {/* Dashboard (if logged in) */}
        {user && (
          <NavLink
            to="/dashboard"
            className="btn btn-neutral hidden sm:inline-flex"
          >
            Dashboard
          </NavLink>
        )}

        {/* Login OR Profile Dropdown */}
        {!user ? (
          <NavLink to="/login" className="btn btn-primary hover:bg-white hover:text-primary hover:border-primary">
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
              <li>
                <button>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
