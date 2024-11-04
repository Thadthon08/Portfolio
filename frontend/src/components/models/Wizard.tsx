import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Wizard = React.memo(function Wizard(
  props: JSX.IntrinsicElements["group"]
) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/wizard-transformed.glb");

  // Clone scene to avoid mutations
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.material) {
          node.material = node.material.clone();
          // ปิดการใช้งานเงา
          node.castShadow = false;
          node.receiveShadow = false;
        }
      }
    });
    return clone;
  }, [scene]);

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive
        object={clonedScene}
        position={[0.15, -1.2, 0]}
        scale={[0.039, 0.039, 0.039]}
        rotation={[0.3, 0, 0]}
      />
    </group>
  );
});

export default Wizard;

// Pre-load model
useGLTF.preload("/models/wizard-transformed.glb");
