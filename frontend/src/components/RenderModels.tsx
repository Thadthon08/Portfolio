import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef } from "react";

type RenderModelsProps = {
  children: React.ReactNode;
};

function RenderModels({ children }: RenderModelsProps) {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Handle resize to keep the canvas full screen
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Handle WebGL context lost and restored
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Attempting to reset.");
    };

    const handleContextRestored = () => {
      console.info("WebGL context restored.");
    };

    // Add event listeners for context lost and restored
    if (canvasRef.current) {
      canvasRef.current.addEventListener("webglcontextlost", handleContextLost);
      canvasRef.current.addEventListener(
        "webglcontextrestored",
        handleContextRestored
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener(
          "webglcontextlost",
          handleContextLost
        );
        canvasRef.current.removeEventListener(
          "webglcontextrestored",
          handleContextRestored
        );
      }
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      style={{
        height: canvasSize.height,
        width: canvasSize.width,
        zIndex: "1",
      }}
      camera={{
        position: [0, 0, 5],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      shadows
    >
      <Suspense fallback={null}>
        {children}
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Environment preset="dawn" background={false} />
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={50}
          near={0.1}
          far={1000}
        />
      </Suspense>
    </Canvas>
  );
}

export default RenderModels;
