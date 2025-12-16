import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../Components/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { MdMenuBook } from "react-icons/md";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          navigate("/");
          Swal.fire({
            title: "Logged Out!",
            icon: "success",
            timer: 1800,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const navLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <nav className="bg-[#b7b7b7b7] text-neutral-content border-b border-gray-300 shadow-xl">
      <div className="navbar py-5 xl:w-[1800px] mx-auto">
        {/* Left */}
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <MdMenuBook />
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 text-secondary rounded-box w-52">
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost text-2xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex gap-2 items-center">
          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn btn-ghost btn-circle text-xl"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {user && (
            <NavLink to="/dashboard" className="btn btn-primary btn-lg  rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all">
              Dashboard
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="btn btn-secondary hover:bg-white hover:text-primary"
            >
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  />
                </div>
              </div>

              <ul className="menu menu-sm dropdown-content rounded-xl bg-primary text-secondary z-10 mt-3 w-52 p-2 shadow">
                <li>
                  <Link
                    className="hover:bg-secondary hover:text-primary"
                    to="/dashboard/my-profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="hover:bg-secondary hover:text-primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
