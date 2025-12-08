import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { socialSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation()
  const axiosSecure = useAxiosSecure()
  const handleGoogleSignIn = () => {

    socialSignIn()
      .then((result) => {
          const userProfile = {
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          };

          axiosSecure.post('/users' , userProfile) 
          .then(() => {
          Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        });
        navigate(location?.state || '/')
        })

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
    <div
      onClick={handleGoogleSignIn}
      className="btn bg-base-200 hover:bg-base-300 text-black w-full border border-gray-300 flex items-center justify-center gap-3 text-lg font-medium transition-all cursor-pointer"
    >
      <FcGoogle className="text-2xl" />
      Login with Google
    </div>
  );
};

export default SocialLogin;
