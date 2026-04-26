import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Very slow, smooth rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.3, 0.1, 128, 32]} />
        <MeshDistortMaterial
          color="#888888"
          speed={1.5}
          distort={0.2}
          radius={1}
          metalness={1}
          roughness={0.1}
          transparent
          opacity={0.5}
          emissive="#111111"
        />
      </mesh>
    </Float>
  );
}

function Grid() {
  return (
    <gridHelper 
      args={[10, 10, '#ffffff', '#ffffff']} 
      position={[0, -0.6, 0]} 
      rotation={[0, 0, 0]}
      // @ts-ignore
      onBeforeCompile={(shader: any) => {
        shader.fragmentShader = shader.fragmentShader.replace(
          `gl_FragColor = vec4( color, opacity * p );`,
          `gl_FragColor = vec4( color, opacity * p * 0.05 );`
        );
      }}
    />
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ffffff" />
        <FloatingShape />
      </Canvas>
    </div>
  );
}
