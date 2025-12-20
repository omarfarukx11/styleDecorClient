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
          draggable: true,
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
    <div className="flex items-center justify-center min-h-screen bg-primary px-5">
      <div className="card w-full max-w-md border-2 border-white">
        <div className="card-body">
          <div className="font-bold text-center md:text-5xl text-2xl text-secondary">
            <Logo />
          </div>

          <h2 className="font-bold text-center mt-5 mb-10 md:text-5xl text-2xl text-secondary">
            Sign up to start
          </h2>

          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            {/* Name */}
            <label className="font-bold">Name</label>
            <input
              type="text"
              placeholder="Type Your Name"
              className="input input-bordered text-secondary w-full outline-none"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-600">Name Required</p>
            )}

            {/* Email */}
            <label className="font-bold">Email</label>
            <input
              type="email"
              placeholder="type your email"
              className="input input-bordered text-secondary w-full outline-none"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-600">Email Required</p>
            )}

              {/* Photo */}
            <label className="font-bold">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input file-input-bordered text-gray-500 w-full outline-none"
            />
            {errors.photo && (
              <p className="text-red-600">Photo Required</p>
            )}

            {/* Password */}
            <label className="font-bold">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="type your password"
                className="input input-bordered text-secondary w-full outline-none pr-12"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-xl z-10 pointer-events-auto"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least 1 uppercase letter, <br />
                1 lowercase letter, 1 special character, <br />
                and be at least 6 characters long.
              </p>
            )}

            {/* Social Login */}
            <button className="w-full">
              <SocialLogin />
            </button>

            {/* Register Button */}
            <button
              type="submit"
              className="btn btn-primary py-2 md:py-0 btn-lg rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all w-full"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              state={location.state}
              to={"/login"}
              className="text-secondary font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
