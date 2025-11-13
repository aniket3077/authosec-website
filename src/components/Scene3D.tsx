/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Suspense } from 'react';

// Animated security shield visualization
function SecurityShield() {
  return (
    <group>
      {/* Main Shield Sphere */}
      <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ff6b35"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Inner Core */}
      <Sphere args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#ffa500"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* Orbiting Ring 1 */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#4ecdc4" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Orbiting Ring 2 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.05, 16, 100]} />
        <meshStandardMaterial color="#45b7d1" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b35" wireframe />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700 shadow-2xl">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b35" />
        <pointLight position={[10, -10, -10]} intensity={0.3} color="#4ecdc4" />
        
        {/* Environment Reflection */}
        <Environment preset="city" />
        
        {/* 3D Security Shield */}
        <Suspense fallback={<Loader />}>
          <SecurityShield />
        </Suspense>
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
