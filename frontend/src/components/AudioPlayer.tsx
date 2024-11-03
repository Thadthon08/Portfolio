import React from "react";
import { useAudio } from "../context/AudioContext";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

const AudioPlayer: React.FC = () => {
  const { isPlaying, togglePlay } = useAudio();

  React.useEffect(() => {
    console.log("Mounted AudioPlayer");
    return () => {
      console.log("Unmounted AudioPlayer");
    };
  }, []);

  return (
    <div className="audio-player fixed top-4 right-4 z-50">
      <button
        onClick={togglePlay}
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
          {isPlaying ? <FiVolume2 size={24} /> : <FiVolumeX size={24} />}
        </span>
      </button>
    </div>
  );
};

export default AudioPlayer;
