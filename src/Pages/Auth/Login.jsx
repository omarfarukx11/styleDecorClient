import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { singInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
          timer: 1000,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password",
          timer: 1000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary ">
      <div className="card w-full max-w-md border-2 border-white ">
        <div className="card-body">
          <p className="text-center text-5xl">
            <Logo />
          </p>

          <h2 className="font-bold text-center mt-5 mb-10 text-5xl text-secondary">
            Login to start{" "}
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <label className="font-bold">Email</label>
            <input
              type="email"
              placeholder="type your email"
              className="input input-bordered text-secondary w-full outline-none"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-red-600">email Required</p>
            )}

            <label className="font-bold">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="type your password"
                className="input input-bordered text-secondary w-full outline-none pr-12"
                {...register("password", { required: true })}
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
              <p className="text-red-600">Password Required</p>
            )}

            <button className="w-full">
              <SocialLogin />
            </button>

            <button
              type="submit"
              className="btn btn-primary py-2 md:py-0 btn-lg flex-1 rounded-full font-bold text-xl shadow-xl hover:shadow-primary/50 transform hover:scale-105 transition-all w-full"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="text-secondary font-semibold"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
