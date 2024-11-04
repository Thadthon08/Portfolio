import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import * as THREE from "three";

// Define types for GLTF model
type GLTFResult = GLTF & {
  nodes: {
    Wizard_Staff3_Wizard_Staff3_0: THREE.Mesh;
    Wizard_Staff3_Wizard_Staff3_0_1: THREE.Mesh;
    Wizard_Staff3_Wizard_Staff3_0_2: THREE.Mesh;
    Wizard_Staff3_Wizard_Staff3_0_3: THREE.Mesh;
    Wizard_Staff2_Wizard_Staff2_0: THREE.Mesh;
  };
  materials: {
    Wizard_Staff3: THREE.Material;
    Wizard_Staff2: THREE.Material;
  };
};

// Define props interface
interface StaffProps extends React.PropsWithChildren {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const Staff: React.FC<StaffProps> = React.memo((props) => {
  const { nodes, materials } = useGLTF(
    "/models/staff-transformed.glb"
  ) as GLTFResult;

  // Define ref with correct type
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.007;
    }
  });

  return (
    <group
      {...props}
      dispose={null}
      scale={[2.5, 2.5, 2.5]}
      position={[-4, -2.5, 0]}
      ref={modelRef}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wizard_Staff3_Wizard_Staff3_0.geometry}
        material={materials.Wizard_Staff3}
        position={[-0.041, 0.983, 0.768]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wizard_Staff3_Wizard_Staff3_0_1.geometry}
        material={materials.Wizard_Staff3}
        position={[-0.041, 0.983, 0.768]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wizard_Staff3_Wizard_Staff3_0_2.geometry}
        material={materials.Wizard_Staff3}
        position={[-0.041, 0.983, 0.768]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wizard_Staff3_Wizard_Staff3_0_3.geometry}
        material={materials.Wizard_Staff3}
        position={[-0.041, 0.983, 0.768]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.04}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Wizard_Staff2_Wizard_Staff2_0.geometry}
        material={materials.Wizard_Staff2}
        position={[-0.041, 0.983, 0.768]}
        rotation={[0, Math.PI / 2, 0]}
        scale={0.04}
      />
    </group>
  );
});

// Set display name for debugging
Staff.displayName = "Staff";

export default Staff;

// Preload the model
useGLTF.preload("/models/staff-transformed.glb");
