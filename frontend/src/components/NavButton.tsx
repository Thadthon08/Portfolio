import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  UserCircle,
  FileText,
  Twitter,
  Code,
  Palette,
  Github,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hook/useScreenSize";

const icons = [
  { component: <Home size={32} />, link: "/home", label: "Home" },
  { component: <Sparkles size={32} />, link: "#", label: "Magic" },
  { component: <Code size={32} />, link: "#", label: "Skills" },
  { component: <FileText size={32} />, link: "#", label: "Resume" },
  { component: <Github size={32} />, link: "#", label: "Github" },
  { component: <Palette size={32} />, link: "#", label: "Project" },
  { component: <UserCircle size={32} />, link: "/profile", label: "Profile" },
];

interface NavButtonProps {
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(200);
  const size = useScreenSize();
  const isLarge = size >= 1024;
  const isMedium = size >= 768;
  const navigate = useNavigate(); // นำเข้า useNavigate และใช้งาน

  useEffect(() => {
    const updateRadius = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const newRadius =
          Math.min(width, height) / 2 - (isLarge ? 70 : isMedium ? 60 : 50); // Adjust radius based on screen size
        setRadius(newRadius);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, [isLarge, isMedium]);

  useEffect(() => {
    let animationFrame: number;

    if (!isHovered) {
      const rotate = () => {
        setRotation((prevRotation) => (prevRotation + 0.03) % 360);
        animationFrame = requestAnimationFrame(rotate);
      };
      animationFrame = requestAnimationFrame(rotate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-[1000px] h-full mx-auto"
    >
      {/* Central Wizard */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>

      {/* Rotating Icons Ring */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotate: `${rotation}deg`,
        }}
      >
        {icons.map((icon, index) => {
          const angle = (360 / icons.length) * index;
          const radian = (angle * Math.PI) / 180;

          // Calculate position on the circle
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);

          return (
            <motion.div
              key={index}
              onClick={() => {
                if (icon.link !== "#") {
                  navigate(icon.link); // ใช้ useNavigate เพื่อนำทางไปยังเส้นทางที่กำหนด
                }
              }}
              className="absolute flex items-center justify-center w-14 h-14 rounded-full 
                        bg-black/5 backdrop-blur-sm hover:bg-black/20 
                        shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all
                        border border-white/10 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredIndex(null);
              }}
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 0 12px rgba(255,255,255,0.3)",
              }}
            >
              <span className="text-white/60">{icon.component}</span>
              <span className="sr-only">{icon.label}</span>
            </motion.div>
          );
        })}

        {/* Label when hovering */}
        {hoveredIndex !== null && (
          <motion.div
            className="absolute px-2 py-1 text-sm text-white bg-black/70 rounded-md pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              left: `calc(50% + ${
                radius *
                Math.cos((360 / icons.length) * hoveredIndex * (Math.PI / 180))
              }px)`,
              top: `calc(50% + ${
                radius *
                Math.sin((360 / icons.length) * hoveredIndex * (Math.PI / 180))
              }px)`,
              transform: "translate(-50%, -150%)",
            }}
          >
            {icons[hoveredIndex].label}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NavButton;
