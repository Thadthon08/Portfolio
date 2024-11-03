import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

type RenderModelsProps = {
  children: React.ReactNode;
};

function RenderModels({ children }: RenderModelsProps) {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Canvas
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
        <ambientLight intensity={0.5} />
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
