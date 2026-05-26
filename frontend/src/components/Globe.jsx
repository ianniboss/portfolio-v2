import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "../hooks/useReducedMotion";

// Convert (lat, lon) to 3D point on unit sphere
const latLonToVec3 = (lat, lon, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

const GREAT_CIRCLE = (a, b, segments = 80) => {
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const v = new THREE.Vector3().copy(a).lerp(b, t).normalize().multiplyScalar(1.005);
    points.push(v);
  }
  return points;
};

const DotGlobe = () => {
  const groupRef = useRef(null);
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reduced) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  // ~600 dots roughly distributed by Fibonacci
  const dots = React.useMemo(() => {
    const N = 480;
    const arr = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      arr.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
    }
    return arr;
  }, []);

  // Malaysia (Kuala Lumpur) ~ 3.14, 101.69. France (Toulouse) ~ 43.6, 1.44
  const malaysia = latLonToVec3(3.14, 101.69, 1);
  const france = latLonToVec3(43.6, 1.44, 1);
  const arcPoints = GREAT_CIRCLE(malaysia, france);

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial color="#0D0D0D" />
      </Sphere>
      {dots.map((p, i) => (
        <mesh key={i} position={p} scale={0.012}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#9A9490" />
        </mesh>
      ))}
      {/* Pin: Malaysia */}
      <mesh position={[malaysia.x * 1.04, malaysia.y * 1.04, malaysia.z * 1.04]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#C8903A" />
      </mesh>
      {/* Pin: France */}
      <mesh position={[france.x * 1.04, france.y * 1.04, france.z * 1.04]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#2A8B7A" />
      </mesh>
      {/* Arc */}
      <Line points={arcPoints} color="#C8903A" lineWidth={1.4} transparent opacity={0.9} />
    </group>
  );
};

const Globe = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0.3, 2.6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      role="img"
      aria-label="A dot-matrix globe drawing the arc between Malaysia and France"
    >
      <ambientLight intensity={0.9} />
      <Suspense fallback={null}>
        <DotGlobe />
      </Suspense>
    </Canvas>
  );
};

export default Globe;
