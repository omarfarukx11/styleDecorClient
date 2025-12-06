import React, { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../Components/Logo";
import { Link } from "react-router";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md ">
        <div className="card-body">
          <p className="text-center text-5xl"><Logo></Logo></p>
          <h2 className="font-bold text-center mt-5 mb-10 text-5xl text-primary">Login to start </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="w-full"><SocialLogin></SocialLogin></button>
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          <p className="text-center mt-4">
            Don’t have an account?{" "}
          </p>
          <p className="text-center font-bold  text-primary"><Link to={'/register'} className="text-primary font-semibold">
              Register
            </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
