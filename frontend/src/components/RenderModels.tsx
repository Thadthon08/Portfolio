import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState, useRef, useCallback } from "react";
import { WebGLRenderer } from "three";

type RenderModelsProps = {
  children: React.ReactNode;
};

// Component ที่จัดการกับ WebGL context
const ContextHandler = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Attempting to reset.");

      // ทำการ reset renderer
      if (gl instanceof WebGLRenderer) {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const handleContextRestored = () => {
      console.info("WebGL context restored.");

      // รีเซ็ต renderer หลังจาก context ถูกกู้คืน
      if (gl instanceof WebGLRenderer) {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(window.innerWidth, window.innerHeight);
      }
    };

    const canvas = gl.domElement;
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl]);

  return null;
};

function RenderModels({ children }: RenderModelsProps) {
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIdRef = useRef<number>();

  // Resize handler แบบ debounced
  const handleResize = useCallback(() => {
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current);
    }

    frameIdRef.current = requestAnimationFrame(() => {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, [handleResize]);

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
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        preserveDrawingBuffer: true,
        failIfMajorPerformanceCaveat: false,
      }}
      dpr={[1, 2]}
      performance={{
        min: 0.5,
      }}
    >
      <Suspense fallback={null}>
        <ContextHandler />
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
