import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../Components/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import Button from "../../../utility/Button";

const DasNav = ({role}) => {
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
    text: "You will be logged out.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Log me out",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // 1. Start moving to Home first
        navigate("/", { replace: true }); 
        
        // 2. Then trigger the logout
        await logOut();
        
        Swal.fire({
          title: "Logged Out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Logout Error:", error);
      }
    }
  });
};


  return (
    <nav className="bg-primary text-black max-w-[1980px] mx-auto border-b border-gray-200">
      <div className="flex justify-end items-center py-5 px-4 lg:px-8  ">
        
        <div className="navbar-end flex items-center gap-5">
        <div>
             <button
          onClick={() => setDarkMode(!darkMode)}
          className="pt-3 text-xl"
          aria-label="Toggle Theme"
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-base-200 hover:bg-none" />}
        </button>
        </div>
          {user && (
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
                    className="hover:bg-base-100"
                    to="/dashboard/my-profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="hover:bg-base-100 w-full text-left"
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

export default DasNav;
