import { useEffect, useState } from "react";
import Firefly from "../components/Firefly";
import ProfileBG from "../assets/background/profile-background.png";
import RenderModels from "../components/RenderModels";
import Hat from "../components/models/Hat";
import { Html } from "@react-three/drei";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
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
            backgroundImage: `url(${ProfileBG})`,
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
        <div className="h-screen w-full">
          <RenderModels>
            <Html position={[0, -0.99, -2]} center>
              <div
                className="
                flex flex-col items-center justify-center
                space-y-4 sm:space-y-6
                p-4 sm:p-6 lg:p-8
                relative w-screen
                
              "
              >
                <div className="text-center space-y-2">
                  <h1
                    className="
                      text-yellow-300 font-bold tracking-wider 
                      text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
                      transform transition-all duration-300 hover:scale-105
                      drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] 
                    "
                  >
                    Welcome to My Story
                  </h1>
                </div>

                <div
                  className="
                  relative
                  max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl
                  mx-auto mt-4 sm:mt-6
                "
                >
                  <p
                    className="
                      text-white/65 font-light 
                      text-sm sm:text-lg md:text-xl lg:text-2xl
                      tracking-wide text-center leading-relaxed
                      transform transition-all duration-300
                      drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]
                    "
                  >
                    Discover the journey behind my work and my passion
                  </p>
                </div>
              </div>
            </Html>
            <Hat />
          </RenderModels>
        </div>

        {/* Details Section */}
        <div
          className="
          relative
          w-full
          bg-gradient-to-b from-transparent to-[#1a1b26]/90
          pt-16 sm:pt-24
        "
        >
          <ProfileDetails />
        </div>
      </main>
    </>
  );
};

export default Profile;
