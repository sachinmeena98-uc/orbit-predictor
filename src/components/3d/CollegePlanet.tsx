import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { PredictedCollege } from '@/store/useStore';
import { PredictionConfidence } from '@/data/colleges';

interface CollegePlanetProps {
  college: PredictedCollege;
  position: [number, number, number];
  onClick: () => void;
  isSelected: boolean;
}

const confidenceColors: Record<PredictionConfidence, string> = {
  safe: '#22c55e',
  moderate: '#f59e0b',
  ambitious: '#ef4444',
  unlikely: '#6b7280',
};

const confidenceEmissive: Record<PredictionConfidence, number> = {
  safe: 0.8,
  moderate: 0.6,
  ambitious: 0.5,
  unlikely: 0.2,
};

export function CollegePlanet({ college, position, onClick, isSelected }: CollegePlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const size = college.type === 'IIT' ? 0.5 : college.type === 'NIT' ? 0.4 : 0.35;
  const color = new THREE.Color(college.planetColor);
  const glowColor = new THREE.Color(confidenceColors[college.confidence]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      
      // Pulse effect when hovered
      if (hovered || isSelected) {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
    
    if (glowRef.current) {
      const opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <Sphere ref={glowRef} args={[size * 1.8, 16, 16]}>
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </Sphere>

      {/* Main planet */}
      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={confidenceEmissive[college.confidence]}
          roughness={0.4}
          metalness={0.6}
        />
      </Sphere>

      {/* Ring for IITs */}
      {college.type === 'IIT' && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[size * 1.4, 0.05, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      {/* Tooltip on hover */}
      {(hovered || isSelected) && (
        <Html
          position={[0, size + 0.8, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div className="cosmic-card px-4 py-2 min-w-[180px] text-center animate-fade-in">
            <p className="font-display font-semibold text-foreground text-sm">
              {college.shortName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {college.matchingBranch}
            </p>
            <div
              className={`inline-block px-2 py-0.5 rounded-full text-xs mt-2 font-medium border ${
                college.confidence === 'safe'
                  ? 'badge-safe'
                  : college.confidence === 'moderate'
                  ? 'badge-moderate'
                  : 'badge-ambitious'
              }`}
            >
              {college.confidence.charAt(0).toUpperCase() + college.confidence.slice(1)}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
