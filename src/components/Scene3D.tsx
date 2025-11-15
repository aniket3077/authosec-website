/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, MeshDistortMaterial, Sphere, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// GLB Model Loader Component
function GLBModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  
  return (
    <primitive 
      object={scene} 
      scale={5.0}
      position={[0, 0.5, 0]}
    />
  );
}

// Animated security shield visualization (fallback)
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
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ff6b35" wireframe />
      </mesh>
      <ambientLight intensity={0.5} />
    </group>
  );
}

interface Scene3DProps {
  modelPath?: string;
  useCustomModel?: boolean;
}

export default function Scene3D({ modelPath = '/models/payment-terminal.glb', useCustomModel = true }: Scene3DProps) {
  return (
    <div className="w-full h-[450px] md:h-[500px] rounded-2xl relative -mt-24 md:-mt-32 overflow-hidden bg-transparent">
      <Canvas shadows gl={{ alpha: true }} style={{ background: 'transparent' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff6b35" />
        <pointLight position={[10, -10, -10]} intensity={0.5} color="#4ecdc4" />
        
        {/* Environment Reflection */}
        <Environment preset="city" />
        
        {/* 3D Model or Security Shield */}
        <Suspense fallback={<Loader />}>
          {useCustomModel ? (
            <GLBModel modelPath={modelPath} />
          ) : (
            <SecurityShield />
          )}
        </Suspense>
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={1.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

// Preload function for GLB models
export function preloadGLBModel(path: string) {
  useGLTF.preload(path);
}
