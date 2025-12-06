import React from "react";
import { FcGoogle } from "react-icons/fc";

import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { socialSignIn , setUser} = useAuth()
  const navigate = useNavigate()
//   const location = useLocation()
//   const axiosSecure = useAxiosSecure()

  const handleGoogleSingIn = () => {
    socialSignIn()
      .then((result) => {
        setUser(result.user)
        navigate('/')
        .catch(error => console.log(error))
        
    //     const userProfile = {
    //         email: result.user.email,
    //         displayName: result.user.displayName,
    //         photoURL: result.user.PhotoURL,
    //       };

    //       axiosSecure.post('/users' , userProfile) 
    //       .then(res => {
    //         console.log(res.data)
    //         navigate(location?.state || '/')
    //       })


    //     //  Swal.fire({
    //     //   position: "top-center",
    //     //   icon: "success",
    //     //   title: "login Success",
    //     //   showConfirmButton: false,
    //     //   timer: 1500,
    //     // });

    //   })
    //   .catch((error) => console.log(error));
  })
}
  return (
    <div
      onClick={handleGoogleSingIn}
      className="btn bg-base-200 text-black border-[#e5e5e5]"
    >
      <FcGoogle />
      Login with Google
    </div>
  );
};

export default SocialLogin;
