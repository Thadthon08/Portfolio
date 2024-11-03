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
    // Ensure all materials are properly cloned and set up
    clone.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (node.material) {
          // Clone material if it exists
          node.material = node.material.clone();
          // Enable shadows
          node.castShadow = true;
          node.receiveShadow = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating movement
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
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
