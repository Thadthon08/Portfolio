import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Hat = React.memo(function Hat(props) {
  const { nodes, materials } = useGLTF("/models/hat-transformed.glb");
  const hatRef = useRef<THREE.Group>(null);
  const [hatScale, setHatScale] = useState<[number, number, number]>([1, 1, 1]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setHatScale([0.85, 0.85, 0.85]);
      } else if (width < 1024) {
        setHatScale([1, 1, 1]);
      } else {
        setHatScale([1.4, 1.4, 1.4]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useFrame(() => {
    if (hatRef.current) {
      hatRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group
      {...props}
      ref={hatRef}
      scale={hatScale}
      rotation={[0.4, 0, 0]}
      position={[0, 0, -1.5]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Object_2 as THREE.Mesh).geometry}
        material={materials.initialShadingGroup}
        position={[0, -3.867, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
});

export default Hat;

useGLTF.preload("/models/hat-transformed.glb");
