import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const HomeBTN: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="audio-player fixed top-4 left-4 z-50">
      <button
        onClick={() => navigate("/")}
        className="w-14 h-14 flex items-center justify-center 
                 rounded-full 
                 bg-black/5 backdrop-blur-sm
                 border border-white/10
                 shadow-[0_0_8px_rgba(255,255,255,0.15)]
                 hover:bg-black/20 
                 hover:scale-110
                 transition-all duration-300
                 group"
      >
        <span className="text-white/70 group-hover:text-white/90 transition-colors">
          {<FiHome size={24} />}
        </span>
      </button>
    </div>
  );
};

export default HomeBTN;
