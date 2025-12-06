import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router";

const Forbidden = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/forbidden.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-black to-purple-950 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">

        <div className="mb-10">
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 380, height: 380, margin: "0 auto" }}
            />
          ) : (
            <div className="w-96 h-96 mx-auto bg-red-900/30 border-8 border-dashed border-red-600 rounded-full animate-pulse" />
          )}
        </div>

        <div className="text-9xl font-black text-red-500 mb-6 tracking-wider">
          403
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Access Forbidden
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-lg mx-auto leading-relaxed">
          You don't have permission to view this page. <br />
          If you think this is a mistake, please contact the administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/"
            className="btn btn-lg btn-primary rounded-full px-10 font-bold text-lg shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Go Home
          </Link>

        </div>

        <footer className="mt-16 text-gray-500 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Forbidden;