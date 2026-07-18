import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { SceneCanvas } from '@/components/three/SceneCanvas';

function Panel({
  position,
  size,
  color,
  emissive,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  emissive: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.35}
        metalness={0.4}
        roughness={0.4}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function Workspace() {
  const root = useRef<Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (root.current) {
      root.current.rotation.y += delta * 0.12;
      root.current.position.y = Math.sin(t.current * 0.8) * 0.08 - 0.15;
    }
  });

  return (
    <group ref={root} position={[0, -0.15, 0]}>
      <mesh position={[0, -1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 2.4]} />
        <meshStandardMaterial color="#0B1023" metalness={0.5} roughness={0.55} />
      </mesh>

      <Panel position={[0, 0.15, -0.2]} size={[1.9, 1.15, 0.08]} color="#111827" emissive="#4F46E5" />
      <Panel position={[0, 0.15, -0.14]} size={[1.7, 0.95, 0.02]} color="#06B6D4" emissive="#06B6D4" />
      <mesh position={[0, -0.55, -0.15]}>
        <boxGeometry args={[0.18, 0.35, 0.12]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      <Panel position={[-1.35, -0.35, 0.35]} size={[1.1, 0.7, 0.06]} color="#070b18" emissive="#22C55E" />
      <Panel position={[1.3, -0.2, 0.45]} size={[0.95, 0.85, 0.05]} color="#111827" emissive="#4F46E5" />

      {[
        [-1.6, 0.85, 0.2],
        [1.55, 0.95, -0.1],
        [0.2, 1.15, 0.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={i === 2 ? '#22C55E' : '#06B6D4'}
            emissive={i === 2 ? '#22C55E' : '#06B6D4'}
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function WorkspaceScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={1} />
      <pointLight position={[-3, 2, 2]} intensity={0.55} color="#4F46E5" />
      <pointLight position={[2, 1, 3]} intensity={0.4} color="#06B6D4" />
      <Workspace />
    </>
  );
}

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#111827]/80 p-4 backdrop-blur-xl">
        <div className="mb-3 h-24 rounded-xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-14 rounded-lg border border-white/10 bg-white/[0.03]" />
          <div className="h-14 rounded-lg border border-white/10 bg-white/[0.03]" />
        </div>
      </div>
    </div>
  );
}

export interface DigitalWorkspaceProps {
  className?: string;
}

export default function DigitalWorkspace({ className }: DigitalWorkspaceProps) {
  return (
    <SceneCanvas
      className={className}
      label="3D digital workspace"
      fallback={<Fallback />}
    >
      <WorkspaceScene />
    </SceneCanvas>
  );
}
