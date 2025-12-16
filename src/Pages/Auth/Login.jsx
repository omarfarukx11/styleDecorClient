import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
  const { singInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
      singInUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Please try again later.",
        });
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md ">
        <div className="card-body">
          <p className="text-center text-5xl">
            <Logo></Logo>
          </p>
          <h2 className="font-bold text-center mt-5 mb-10 text-5xl text-secondary">
            Login to start{" "}
          </h2>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
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
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password Required</p>
            )}

            <button className="w-full">
              <SocialLogin></SocialLogin>
            </button>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="text-primary font-semibold"
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
