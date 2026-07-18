import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { SceneCanvas } from '@/components/three/SceneCanvas';

function CodeGlyphs({ count = 16 }: { count?: number }) {
  const glyphs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.85 + (i % 3) * 0.18;
      return {
        id: i,
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.3) * 0.55,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: (['#4F46E5', '#06B6D4', '#22C55E', '#94A3B8'] as const)[i % 4],
      };
    });
  }, [count]);

  return (
    <group>
      {glyphs.map((g) => (
        <mesh key={g.id} position={g.position}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshBasicMaterial color={g.color} transparent opacity={0.75} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCube() {
  const group = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) {
      group.current.rotation.y += delta * 0.35;
      group.current.rotation.x = Math.sin(t.current * 0.4) * 0.18;
      group.current.position.y = Math.sin(t.current * 0.9) * 0.18;
    }
    if (core.current) {
      core.current.rotation.y -= delta * 0.55;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshStandardMaterial
          color="#111827"
          emissive="#4F46E5"
          emissiveIntensity={0.28}
          metalness={0.55}
          roughness={0.35}
          transparent
          opacity={0.92}
        />
      </mesh>

      <mesh scale={1.08}>
        <boxGeometry args={[1.55, 1.55, 1.55]} />
        <meshBasicMaterial color="#06B6D4" wireframe transparent opacity={0.45} />
      </mesh>

      <mesh>
        <boxGeometry args={[0.55, 0.55, 0.55]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.7}
          metalness={0.2}
          roughness={0.25}
        />
      </mesh>

      <CodeGlyphs />
    </group>
  );
}

function CodeCubeScene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} />
      <pointLight position={[-3, -2, 2]} intensity={0.7} color="#4F46E5" />
      <pointLight position={[2, 1, -2]} intensity={0.45} color="#06B6D4" />
      <FloatingCube />
    </>
  );
}

function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative size-40 rounded-2xl border border-white/10 bg-[#111827]/80 shadow-[0_0_40px_rgb(79_70_229_/0.25)] backdrop-blur-xl sm:size-48">
        <div className="absolute inset-3 rounded-xl border border-cyan-400/30" />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-xs text-cyan-300/80">
          {'{ code }'}
        </div>
      </div>
    </div>
  );
}

export interface CodeCubeProps {
  className?: string;
}

export default function CodeCube({ className }: CodeCubeProps) {
  return (
    <SceneCanvas
      className={className}
      label="Floating 3D code cube"
      fallback={<Fallback />}
    >
      <CodeCubeScene />
    </SceneCanvas>
  );
}
