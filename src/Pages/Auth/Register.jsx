import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { updataUserProfile, registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        formData.append("image", profileImage);

        axios.post(image_API_URL, formData).then((res) => {
          axiosSecure.post("/users", {
            displayName: data.name,
            photoURL: res.data.data.display_url,
            email: data.email,
          });

          updataUserProfile({
            displayName: data.name,
            photoURL: res.data.data.display_url,
          });
        });

        Swal.fire({
          title: "Register Success!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: error.message || "Please try again later.",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-base-200 px-5 py-10">
      <div className="w-full max-w-md bg-primary text-base-200 border border-white/10 rounded-3xl p-8 shadow-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 ">
            <Logo />
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Join us today</p>
          <h2 className="text-4xl font-bold ">
            Create account<span className="text-blue-500">.</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500 hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-white/10 focus:border-blue-500 outline-none transition-all "
              {...register("name", { required: true })}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">Name is required</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-white/10 focus:border-blue-500 outline-none transition-all "
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Profile Picture</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered w-full bg-base-100 border-white/10 text-gray-400 rounded-xl"
            />
            {errors.photo && <p className="text-red-500 text-xs mt-1">Photo is required</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-white/10 focus:border-blue-500 outline-none transition-all "
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs mt-1">Password is required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-400 text-[10px] mt-1 leading-tight">
                Must contain 1 uppercase, 1 lowercase, 1 special char, & 6+ chars.
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-400 hover:bg-blue-500 text-base-200 rounded-4xl font-bold text-lg shadow-lg shadow-blue-900/20 transform active:scale-95 transition-all"
          >
            Create Account
          </button>
        </form>

        <div className="relative flex py-6 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-xs uppercase">Or Sign up with</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;