import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { Color, Vector3 } from 'three';
import { SceneCanvas } from '@/components/three/SceneCanvas';

const NODE_COUNT = 14;

function AINetworkMesh() {
  const group = useRef<Group>(null);

  const { positions, links } = useMemo(() => {
    const pts: Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      const r = 1.7;
      pts.push(
        new Vector3(
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.cos(phi) * 0.85,
          r * Math.sin(theta) * Math.sin(phi),
        ),
      );
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i += 1) {
      edges.push([i, (i + 1) % NODE_COUNT]);
      edges.push([i, (i + 3) % NODE_COUNT]);
    }

    return { positions: pts, links: edges };
  }, []);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(links.length * 6);
    links.forEach(([a, b], i) => {
      const o = i * 6;
      arr[o] = positions[a].x;
      arr[o + 1] = positions[a].y;
      arr[o + 2] = positions[a].z;
      arr[o + 3] = positions[b].x;
      arr[o + 4] = positions[b].y;
      arr[o + 5] = positions[b].z;
    });
    return arr;
  }, [links, positions]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      group.current.rotation.x = Math.sin(performance.now() * 0.00025) * 0.12;
    }
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4F46E5" transparent opacity={0.45} />
      </lineSegments>

      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[i % 4 === 0 ? 0.1 : 0.06, 12, 12]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#4F46E5' : '#22C55E'}
            emissive={new Color(i % 3 === 0 ? '#06B6D4' : '#4F46E5')}
            emissiveIntensity={0.55}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>
      ))}

      <mesh>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#4F46E5"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}

function AINetworkScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} />
      <pointLight position={[-2, 1, 3]} intensity={0.6} color="#06B6D4" />
      <AINetworkMesh />
    </>
  );
}

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative size-36 sm:size-44">
        <div className="absolute inset-0 rounded-full border border-indigo-400/30" />
        <div className="absolute inset-4 rounded-full border border-cyan-400/25" />
        <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/80 shadow-[0_0_20px_rgb(79_70_229_/0.6)]" />
      </div>
    </div>
  );
}

export interface AINetworkProps {
  className?: string;
}

export default function AINetwork({ className }: AINetworkProps) {
  return (
    <SceneCanvas
      className={className}
      label="Rotating 3D AI network"
      fallback={<Fallback />}
    >
      <AINetworkScene />
    </SceneCanvas>
  );
}
