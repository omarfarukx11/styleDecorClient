import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router"; // Link er poriborte navigate use kora safe eikhaner jonno
import Button from "../utility/Button";

const NotFound = () => {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Error404.json") 
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => setAnimationData(null));
  }, []);

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        
        <div className="mb-10">
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: 380, height: 380, margin: "0 auto" }}
            />
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
          >
            <Button>Go Home</Button>
          </button>
        </div>

        <footer className="mt-16 text-base-200 text-sm">
          © {new Date().getFullYear()} StyleDecor. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default NotFound;