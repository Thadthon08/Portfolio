import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

interface AudioContextProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/Hedwig.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.2;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
};
