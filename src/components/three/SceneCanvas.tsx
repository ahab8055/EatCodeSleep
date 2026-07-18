import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useWebGLGate } from '@/components/three/useWebGLGate';

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  /** Accessible label for the canvas region */
  label: string;
  fallback?: ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}

function getMaxDpr(): number {
  if (typeof window === 'undefined') return 1.25;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.matchMedia('(max-width: 768px)').matches;
  if (coarse || narrow) return 1;
  return Math.min(window.devicePixelRatio || 1, 1.35);
}

/**
 * Thin R3F canvas wrapper — pauses when offscreen / tab hidden, caps DPR.
 */
export function SceneCanvas({
  children,
  className,
  label,
  fallback,
  cameraPosition = [0, 0, 6],
  fov = 42,
}: SceneCanvasProps) {
  const { enabled, ready } = useWebGLGate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('never');
  const [dpr] = useState(getMaxDpr);
  const [antialias] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    if (!enabled || !rootRef.current) return;

    const root = rootRef.current;
    let intersecting = false;

    const sync = () => {
      setFrameloop(intersecting && !document.hidden ? 'always' : 'never');
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry?.isIntersecting ?? false;
        sync();
      },
      { rootMargin: '120px', threshold: 0.01 },
    );

    io.observe(root);
    document.addEventListener('visibilitychange', sync);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [enabled]);

  if (!ready) {
    return (
      <div className={className} aria-hidden="true">
        {fallback}
      </div>
    );
  }

  if (!enabled) {
    return (
      <div className={className} role="img" aria-label={label}>
        {fallback}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={className} role="img" aria-label={label}>
      <Canvas
        dpr={dpr}
        frameloop={frameloop}
        gl={{
          antialias,
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        camera={{ position: cameraPosition, fov }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
