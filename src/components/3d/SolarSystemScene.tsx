import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { StudentSun } from './StudentSun';
import { CollegePlanet } from './CollegePlanet';
import { OrbitRing } from './OrbitRing';
import { StarField } from './StarField';
import { useStore, PredictedCollege } from '@/store/useStore';

function Scene() {
  const { predictedColleges, selectedCollege, setSelectedCollege } = useStore();

  // Group colleges by orbit radius and position them
  const positionedColleges = useMemo(() => {
    const orbitGroups: Record<number, PredictedCollege[]> = {};
    
    predictedColleges.forEach((college) => {
      const orbit = college.orbitRadius;
      if (!orbitGroups[orbit]) {
        orbitGroups[orbit] = [];
      }
      orbitGroups[orbit].push(college);
    });

    const positioned: { college: PredictedCollege; position: [number, number, number] }[] = [];
    
    Object.entries(orbitGroups).forEach(([orbitStr, colleges]) => {
      const orbit = parseFloat(orbitStr);
      colleges.forEach((college, index) => {
        const angle = (index / colleges.length) * Math.PI * 2;
        const x = Math.cos(angle) * orbit;
        const z = Math.sin(angle) * orbit;
        const y = (Math.random() - 0.5) * 0.5; // Slight vertical variation
        positioned.push({ college, position: [x, y, z] });
      });
    });

    return positioned;
  }, [predictedColleges]);

  // Get unique orbit radii
  const orbitRadii = useMemo(() => {
    const radii = new Set(predictedColleges.map((c) => c.orbitRadius));
    return Array.from(radii).sort((a, b) => a - b);
  }, [predictedColleges]);

  const orbitColors: Record<string, string> = {
    IIT: '#ff5722',
    NIT: '#00bcd4',
    IIIT: '#9c27b0',
    GFTI: '#ffc107',
  };

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      <StarField />
      <StudentSun />
      
      {/* Orbit rings */}
      {orbitRadii.map((radius, index) => {
        const collegesOnOrbit = predictedColleges.filter((c) => c.orbitRadius === radius);
        const type = collegesOnOrbit[0]?.type || 'GFTI';
        return (
          <OrbitRing
            key={radius}
            radius={radius}
            color={orbitColors[type] || '#666666'}
            opacity={0.2 + index * 0.05}
          />
        );
      })}
      
      {/* College planets */}
      {positionedColleges.map(({ college, position }) => (
        <CollegePlanet
          key={`${college.id}-${college.matchingBranch}`}
          college={college}
          position={position}
          onClick={() => setSelectedCollege(college)}
          isSelected={selectedCollege?.id === college.id && selectedCollege?.matchingBranch === college.matchingBranch}
        />
      ))}

      <PerspectiveCamera makeDefault position={[0, 10, 20]} fov={60} />
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={50}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export function SolarSystemScene() {
  return (
    <div className="absolute inset-0 three-canvas">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
