import HomeBG from "../assets/background/home-background.png";
import Firefly from "../components/Firefly";
import Wizard from "../components/models/Wizard";
import NavButton from "../components/NavButton";
import RenderModels from "../components/RenderModels";

function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1a1b26]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 70%, 
              rgba(26, 27, 38, 0.3) 0%,
              rgba(26, 27, 38, 0.5) 100%
            ),
            url(${HomeBG})
          `,
          filter: "brightness(0.8)",
        }}
      />
      <Firefly />
      <div className="relative w-full h-screen flex items-center justify-center">
        <NavButton>
          <RenderModels>
            <Wizard />
          </RenderModels>
        </NavButton>
      </div>
    </div>
  );
}

export default Home;
