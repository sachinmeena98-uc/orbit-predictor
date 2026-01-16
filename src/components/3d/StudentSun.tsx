import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function StudentSun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#00bcd4"
          transparent
          opacity={0.25}
          depthWrite={false}
        />
      </Sphere>

      {/* Core */}
      <Sphere ref={sunRef} args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={2}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>

      {/* Point light */}
      <pointLight color="#00e5ff" intensity={2} distance={50} decay={2} />
    </group>
  );
}
