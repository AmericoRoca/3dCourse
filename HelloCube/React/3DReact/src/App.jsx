import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const RotatingCube = () => {
  const meshRef = useRef(null); // ✅ Eliminamos "null!"

  useFrame(() => {
    if (!meshRef.current) return; // ✅ Validamos antes de usarlo
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <meshLambertMaterial color="#468585" emissive="#468585" />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <OrbitControls enableZoom enablePan enableRotate />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} color="#9cdba6" />
        <color attach="background" args={['#f0f0f0']} />
        <RotatingCube />
      </Canvas>
    </>
  );
}

export default App;
