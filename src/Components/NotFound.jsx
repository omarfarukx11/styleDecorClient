import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";

const NotFound = () => {
  const [animationData, setAnimationData] = useState(null);

useEffect(() => {
  fetch("/Error404.json") // use the existing animation
    .then((res) => res.json())
    .then((data) => setAnimationData(data))
    .catch(() => setAnimationData(null));
}, []);

  return (
    <div className="min-h-screen  flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">


        <div className="mb-10">
          {animationData && 
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 380, height: 380, margin: "0 auto" }}
            />
          }
        </div>

        <div className="flex justify-center">
          <Link
            to="/"
            className="btn btn-lg btn-primary rounded-full px-10 font-bold text-lg shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Go Home
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-gray-500 text-sm">
          © {new Date().getFullYear()} StyleDecor. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default NotFound;
