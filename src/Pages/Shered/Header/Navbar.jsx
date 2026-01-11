import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../Components/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import Button from "../../../utility/Button";

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
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
      <li>
        <NavLink to="/service-area">Serive Area</NavLink>
      </li>
    {
      user && <li><NavLink to="/rate-us">Rate Us</NavLink></li>
    }

      <li>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="pt-3"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-base-200 hover:bg-none" />}
        </button>
      </li>
    </>
  );

  return (
    <nav className="bg-primary text-base-200 border-b border-gray-400 ">
      <div className="flex justify-between items-center max-w-[1860px] py-5 px-4 lg:px-8 xl:px-16 mx-auto ">
        {/* Left */}
        <div className="navbar-start flex items-center gap-2">
          {/* Mobile Dropdown */}
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost">
              <FaBars className="xl:text-2xl" />
            </button>
            <ul
              tabIndex={0}
              style={{ }}
              className=" menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-primary rounded-box w-52 font-second"
            >
              {navLinks}
            </ul>
          </div>


          <Link to="/" className="text-2xl font-bold">
            <Logo />
          </Link>
        </div>

        {/* Center - Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right */}
        <div className="navbar-end flex items-center gap-2">
          {user && (
            <NavLink
              to="/dashboard/profile"
            >
              <Button>Dashboard</Button>
            </NavLink>
          )}
          {!user ? (
            <NavLink
              to="/login"
            >
              <Button>Login</Button>
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar relative"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul className="menu menu-sm dropdown-content h-[100px] pt-6 space-y-2 rounded-lg bg-primary text-base-200 z-50 mt-3 w-52 p-2 shadow">
                <li>
                  <Link
                    className="hover:bg-info hover:text-primary "
                    to="/dashboard/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="hover:bg-info  hover:text-primary w-full text-left"
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
