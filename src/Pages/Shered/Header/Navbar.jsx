import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "../../../Components/Logo";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { MdMenuBook } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log me out",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate('/')
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1800,
              showConfirmButton: false,
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Oops!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };


  const navLinks = (
    <>
      <li> <NavLink to="/" >Home</NavLink></li>
      <li> <NavLink to="/services">Services</NavLink></li>
      <li> <NavLink to="/about" >About</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
    </>
  );

  return (
    <nav className=" bg-[#B0B0B0] text-white ">
      <div className="navbar py-5 xl:w-[1800px] mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <MdMenuBook />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 text-secondary rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          <Logo></Logo>
        </Link>
      </div>


      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end flex gap-2">
        {user && (
          <NavLink
            to="/dashboard"
            className="btn btn-secondary hidden sm:inline-flex"
          >
            Dashboard
          </NavLink>
        )}

        {!user ? (
          <NavLink
            to="/login"
            className="btn btn-secondary hover:bg-white hover:text-primary hover:border-primary"
          >
            Login
          </NavLink>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-xl bg-secondary rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="hover:bg-white hover:text-primary" to="/dashboard/my-profile" >Profile</Link>
              </li>
              <li>
                <button className="hover:bg-white hover:text-primary" onClick={handleLogout}>Logout</button>
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
