import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Loader = ({ animationPath = "/SandyLoading.json", width = 50, height = 50 }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, [animationPath]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width, height }}
        />
      ) : (
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full border-8 border-purple-500/50 animate-spin-slow shadow-lg" />
          <div className="absolute inset-0 rounded-full border-4 border-t-white animate-spin shadow-sm" />
        </div>
      )}
    </div>
  );
};

export default Loader;
