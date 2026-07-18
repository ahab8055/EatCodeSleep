import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  CanvasTexture,
  Quaternion,
  Vector3,
  type Group,
  type Mesh,
  type Texture,
} from 'three';
import { SceneCanvas } from '@/components/three/SceneCanvas';
import {
  TECH_META,
  createTechIconTexture,
  type TechId,
} from '@/components/three/techIcons';

const NODES: TechId[] = [
  'react',
  'astro',
  'typescript',
  'ai',
  'node',
  'nestjs',
  'aws',
  'docker',
  'postgresql',
  'expo',
  'langchain',
];

/** Hand-tuned constellation positions (loose neural cluster). */
const POSITIONS: Record<TechId, [number, number, number]> = {
  react: [0.15, 1.35, 0.2],
  typescript: [-1.2, 0.85, 0.55],
  astro: [1.15, 0.9, 0.45],
  ai: [0.05, 0.35, -0.15],
  langchain: [1.05, 0.15, -0.85],
  node: [-1.1, 0.05, -0.55],
  nestjs: [-0.55, -0.55, 0.85],
  docker: [0.7, -0.75, 0.7],
  aws: [1.25, -0.35, 0.05],
  postgresql: [-1.15, -0.85, 0.15],
  expo: [0.1, -1.25, -0.35],
};

/** Sparse edges for a constellation feel */
const LINKS: [TechId, TechId][] = [
  ['react', 'typescript'],
  ['react', 'astro'],
  ['react', 'ai'],
  ['typescript', 'node'],
  ['astro', 'ai'],
  ['ai', 'langchain'],
  ['ai', 'node'],
  ['node', 'nestjs'],
  ['node', 'docker'],
  ['nestjs', 'postgresql'],
  ['docker', 'aws'],
  ['aws', 'langchain'],
  ['docker', 'expo'],
  ['postgresql', 'expo'],
  ['astro', 'expo'],
];

function useIconTextures(): Record<TechId, Texture> {
  return useMemo(() => {
    const map = {} as Record<TechId, Texture>;
    NODES.forEach((id) => {
      const canvas = createTechIconTexture(TECH_META[id]);
      const texture = new CanvasTexture(canvas);
      texture.anisotropy = 2;
      texture.needsUpdate = true;
      map[id] = texture;
    });
    return map;
  }, []);
}

function IconNode({
  id,
  position,
  texture,
  phase,
}: {
  id: TechId;
  position: [number, number, number];
  texture: Texture;
  phase: number;
}) {
  const group = useRef<Group>(null);
  const { camera } = useThree();
  const base = useMemo(() => new Vector3(...position), [position]);
  const parentWorldQuat = useMemo(() => new Quaternion(), []);
  const screenFacingLocal = useMemo(() => new Quaternion(), []);

  useFrame(({ clock }) => {
    const node = group.current;
    if (!node) return;

    const t = clock.elapsedTime;
    node.position.set(
      base.x,
      base.y + Math.sin(t * 1.1 + phase) * 0.06,
      base.z,
    );

    // Always face the screen (camera), even when the constellation root rotates.
    if (node.parent) {
      node.parent.getWorldQuaternion(parentWorldQuat);
      screenFacingLocal.copy(parentWorldQuat).invert().multiply(camera.quaternion);
      node.quaternion.copy(screenFacingLocal);
    } else {
      node.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <group ref={group} position={position} userData={{ techId: id }}>
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#F8FAFC" />
      </mesh>
      {/* Icon on the front face so the sphere never clips the glyph */}
      <mesh position={[0, 0, 0.31]} renderOrder={2}>
        <planeGeometry args={[0.26, 0.26]} />
        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          depthTest={false}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ConstellationLinks() {
  const positions = useMemo(() => {
    const arr = new Float32Array(LINKS.length * 6);
    LINKS.forEach(([a, b], i) => {
      const pa = POSITIONS[a];
      const pb = POSITIONS[b];
      const o = i * 6;
      arr[o] = pa[0];
      arr[o + 1] = pa[1];
      arr[o + 2] = pa[2];
      arr[o + 3] = pb[0];
      arr[o + 4] = pb[1];
      arr[o + 5] = pb[2];
    });
    return arr;
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#4F46E5" transparent opacity={0.35} />
    </lineSegments>
  );
}

function CorePulse() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const s = 1 + Math.sin(clock.elapsedTime * 1.6) * 0.08;
    mesh.current.scale.setScalar(s);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.18, 16, 16]} />
      <meshBasicMaterial color="#4F46E5" />
    </mesh>
  );
}

function ConstellationScene() {
  const root = useRef<Group>(null);
  const textures = useIconTextures();

  useFrame((_, delta) => {
    if (!root.current) return;
    root.current.rotation.y += delta * 0.1;
    root.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={0.55} />

      <group ref={root}>
        <CorePulse />
        <ConstellationLinks />
        {NODES.map((id, index) => (
          <IconNode
            key={id}
            id={id}
            position={POSITIONS[id]}
            texture={textures[id]}
            phase={index * 0.55}
          />
        ))}
      </group>
    </>
  );
}

function Fallback() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-xl items-center justify-center">
      <div className="absolute size-3 rounded-full bg-indigo-500/80 shadow-[0_0_24px_rgb(79_70_229_/0.7)]" />
      <ul className="absolute inset-0" aria-label="Technologies">
        {NODES.map((id, i) => {
          const angle = (i / NODES.length) * Math.PI * 2;
          const r = 38;
          const left = 50 + Math.cos(angle) * r;
          const top = 50 + Math.sin(angle) * r;
          return (
            <li
              key={id}
              className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white shadow-[0_8px_24px_rgb(0_0_0_/0.35)]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              title={TECH_META[id].label}
            >
              <span
                className="size-4 rounded-sm"
                style={{ backgroundColor: TECH_META[id].color }}
                aria-hidden="true"
              />
              <span className="sr-only">{TECH_META[id].label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export interface NeuralConstellation3DProps {
  className?: string;
}

export default function NeuralConstellation3D({ className }: NeuralConstellation3DProps) {
  return (
    <SceneCanvas
      className={className}
      label="Technology neural constellation with React, Node, AI, AWS and related stack icons"
      fallback={<Fallback />}
      cameraPosition={[0, 0.4, 5.2]}
      fov={40}
    >
      <ConstellationScene />
    </SceneCanvas>
  );
}
