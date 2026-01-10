import { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaUserShield, FaPaintRoller, FaUser } from "react-icons/fa";
import Button from "../../utility/Button";

const Login = () => {
  const { singInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleDemoLogin = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    handleLogin({ email, password });
  };

  const handleLogin = (data) => {
    singInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          background: "#1a1a1a",
          color: "#ffffff",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Incorrect email or password",
          background: "#1a1a1a",
          color: "#ffffff",
        });
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary text-base-200 px-5 py-10">
      <div className="w-full max-w-md bg-base-primary border border-white/10 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4 ">
            <Logo />
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Start for free</p>
          <h2 className="text-4xl font-bold">
            Login to account<span className="text-blue-500">.</span>
          </h2>
          <p className="text-gray-400 mt-2">
            don't have an Account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>

        {/* Demo Login Grid */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          <p className="text-xs text-center text-gray-500 uppercase font-bold tracking-tighter">Quick Demo Access</p>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@gmail.com", "@adminA1")}
              className="flex items-center justify-between w-full px-5 py-3 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-all group"
            >
              <span className="flex items-center gap-2"><FaUserShield /> Admin Panel</span>
              <span className="text-[10px] opacity-50 group-hover:opacity-100 italic">One-click</span>
            </button>
            
            <div className="grid grid-cols-2 gap-2">
                <button
                type="button"
                onClick={() => handleDemoLogin("x57faruk@gmail.com1", "@Faruk57")}
                className="flex items-center justify-center gap-2 py-3 bg-base-100 text-base-200 border border-white/10 rounded-xl font-semibold hover:bg-white hover:text-black transition-all"
                >
                <FaPaintRoller /> Decorator
                </button>
                <button
                type="button"
                onClick={() => handleDemoLogin("guest@gmail.com", "@Guest")}
                className="flex items-center justify-center gap-2 py-3 bg-base-100 border text-base-200 border-white/10 rounded-xl font-semibold hover:bg-white hover:text-black transition-all"
                >
                <FaUser /> Guest
                </button>
            </div>
          </div>
        </div>

        <div className="relative flex py-5 items-center">
            <div className="grow border-t border-white/10"></div>
            <span className="shrink mx-4 text-gray-500 text-sm">OR USE EMAIL</span>
            <div className="grow border-t border-white/10"></div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-base-100 border border-white/10 focus:border-blue-500 outline-none transition-all text-base-200"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-base-100 border border-white/10 focus:border-blue-500 outline-none transition-all text-base-200"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-base-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-400 hover:bg-blue-500 text-base-200 rounded-4xl font-bold text-lg shadow-lg shadow-blue-900/20 transform active:scale-95 transition-all"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;