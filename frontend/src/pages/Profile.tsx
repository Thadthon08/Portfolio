import Firefly from "../components/Firefly";
import ProfileBG from "../assets/background/profile-background.png";
import RenderModels from "../components/RenderModels";
import Hat from "../components/models/Hat";
import { Html } from "@react-three/drei";
import ProfileDetails from "../components/ProfileDetails";

const Profile = () => {
  return (
    <>
      {/* Fixed Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#1a1b26]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `
      radial-gradient(circle at 50% 70%, 
        rgba(26, 27, 38, 0.3) 0%,
        rgba(26, 27, 38, 0.7) 100%
      ),
      url(${ProfileBG})
    `,
            filter: "brightness(0.85)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100vw",
            height: "100vh",
          }}
        />
        <Firefly />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div className="h-screen">
          <RenderModels>
            <Html position={[0, -0.99, -2]} center>
              <div className="flex flex-col items-center justify-center space-y-6 p-8 relative w-screen">
                <div className="text-center space-y-2">
                  <h1
                    className="text-yellow-300 font-bold tracking-wider 
                               text-3xl sm:text-5xl md:text-6xl lg:text-7xl
                               transform transition-all duration-300 hover:scale-105"
                  >
                    Welcome to My Story
                  </h1>
                </div>

                <div className="relative max-w-2xl mx-auto mt-8">
                  <p
                    className="text-white/65 font-light 
                              text-sm sm:text-xl md:text-1xl
                              tracking-wide text-center leading-relaxed
                              transform transition-all duration-300"
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
        <div className="relative">
          <ProfileDetails />
        </div>
      </div>
    </>
  );
};

export default Profile;
