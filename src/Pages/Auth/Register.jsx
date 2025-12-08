import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const { updataUserProfile, registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure()

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
          axiosSecure.post('/users' ,
          {
            displayName: data.name,
            photoURL: res.data.data.display_url,
            email : data.email
          }).then()
          updataUserProfile({displayName: data.name, photoURL: res.data.data.display_url,});

        });
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Please try again later.",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <p className="text-center text-5xl">
            <Logo></Logo>
          </p>
          <h2 className="font-bold text-center mt-5 mb-10 text-5xl text-primary">
            Sing up to start{" "}
          </h2>
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
            <label className="font-bold">Name</label>
            <input
              type="name"
              placeholder="Type Your Name"
              className="input input-bordered w-full outline-none"
              {...register("name", { required: true })}
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">Name Required</p>
            )}

            <label className="font-bold">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input outline-none w-full"
              placeholder="Photo"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-600">Photo Required</p>
            )}

            <label className="font-bold">Email</label>
            <input
              type="email"
              placeholder="type your email"
              className="input input-bordered w-full outline-none"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">email Required</p>
            )}

            <label className="font-bold">Password</label>
            <input
              type="password"
              placeholder="type your password"
              className="input input-bordered w-full outline-none"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password required</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain at least 1 uppercase letter, <br /> 1
                lowercase letter, 1 special character, <br /> and be at least 6
                characters long.
              </p>
            )}

            <button type="submit" className="w-full">
              <SocialLogin></SocialLogin>
            </button>
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link
              state={location.state}
              to={"/login"}
              className="text-primary font-semibold"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
