import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, OrbitControls, Stars, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

const FloatingShape = ({ position, color, scale = 1, wireframe = false, speed = 1 }) => {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18 * speed;
    ref.current.rotation.y += delta * 0.12 * speed;
  });
  return (
    <Float speed={1.3 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          roughness={0.4}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={wireframe ? 0.6 : 0.1}
        />
      </Icosahedron>
    </Float>
  );
};

const MouseRig = ({ children }) => {
  const ref = useRef(null);
  useFrame((state) => {
    if (!ref.current) return;
    const { mouse } = state;
    ref.current.rotation.y += (mouse.x * 0.35 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-mouse.y * 0.2 - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
};

const HeroScene = () => {
  const reduced = useReducedMotion();
  const speed = reduced ? 0 : 1;

  const shapes = useMemo(
    () => [
      { position: [-2.8, 0.8, -1], color: "#C8903A", scale: 1.4, wireframe: true },
      { position: [2.2, -0.6, -0.5], color: "#2A8B7A", scale: 1.05, wireframe: false },
      { position: [0.5, 1.6, -2.2], color: "#8C6BB6", scale: 0.7, wireframe: true },
      { position: [-1.4, -1.6, -1.2], color: "#F0EDE6", scale: 0.45, wireframe: false },
      { position: [3.0, 1.4, -3], color: "#C8903A", scale: 0.55, wireframe: true },
    ],
    []
  );

  return (
    <Canvas
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.6]}
      style={{ width: "100%", height: "100%" }}
      role="img"
      aria-label="Floating low-poly geometric shapes reacting to mouse movement"
    >
      <color attach="background" args={["#0D0D0D"]} />
      <fog attach="fog" args={["#0D0D0D", 8, 18]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#F0EDE6" />
      <pointLight position={[-4, -2, -2]} intensity={1.4} color="#C8903A" />
      <pointLight position={[4, 3, 1]} intensity={0.9} color="#2A8B7A" />

      <Suspense fallback={null}>
        <MouseRig>
          {shapes.map((s, i) => (
            <FloatingShape key={i} speed={speed} {...s} />
          ))}
        </MouseRig>
        <Stars radius={40} depth={30} count={1200} factor={3} fade speed={0.4} />
      </Suspense>
      <AdaptiveDpr pixelated />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default HeroScene;
