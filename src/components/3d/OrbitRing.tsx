import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface OrbitRingProps {
  radius: number;
  color: string;
  opacity?: number;
}

export function OrbitRing({ radius, color, opacity = 0.3 }: OrbitRingProps) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    
    return pts;
  }, [radius]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
      transparent
      opacity={opacity}
    />
  );
}
