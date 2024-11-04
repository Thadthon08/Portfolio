import { useEffect, useState } from "react";
import Firefly from "../components/Firefly";
import ProjectBG from "../assets/background/projects-background.png";
import RenderModels from "../components/RenderModels";
import Staff from "../components/models/Staff";
import ProjectList from "../components/ProjectList";

const Project = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Fixed Background with Overlay */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#1a1b26] overflow-hidden">
        {/* Background Image Container */}
        <div
          className="
            absolute inset-0
            bg-cover bg-no-repeat
            before:content-['']
            before:absolute
            before:inset-0
            before:bg-gradient-to-b
            before:from-[#1a1b26]/30
            before:to-[#1a1b26]/70
            before:pointer-events-none
          "
          style={{
            backgroundImage: `url(${ProjectBG})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: isMobile ? "scroll" : "fixed",
            transform: "scale(1.1)",
            height: "100vh",
            width: "100vw",
          }}
        >
          {/* Radial Gradient Overlay */}
          <div
            className="
              absolute inset-0
              opacity-80
              pointer-events-none
            "
            style={{
              background:
                "radial-gradient(circle at 50% 70%, rgba(26,27,38,0.3) 0%, rgba(26,27,38,0.7) 100%)",
            }}
          />
        </div>

        {/* Mobile Blur Overlay */}
        <div
          className="
            absolute inset-0
            backdrop-blur-[1px]
            sm:backdrop-blur-none
            pointer-events-none
          "
        />

        <Firefly />
      </div>

      {/* Main Content */}
      <main className="relative min-h-screen w-full overflow-hidden">
        {/* Hero Section */}
        <div className="h-screen w-full fixed">
          <RenderModels>
            <Staff />
          </RenderModels>
        </div>

        <div
          className="
          relative
          w-full
          pt-16 sm:pt-24
        "
        >
          <ProjectList />
        </div>
      </main>
    </>
  );
};

export default Project;
