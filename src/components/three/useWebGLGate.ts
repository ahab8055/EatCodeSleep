import { useEffect, useState } from 'react';

function prefersSaveData(): boolean {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

function isLowEndDevice(): boolean {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  if (typeof memory === 'number' && memory <= 2) return true;
  if (cores <= 2) return true;
  return false;
}

/**
 * Shared performance gate for WebGL islands.
 * Skips mounting on reduced-motion, missing WebGL, Save-Data, or very low-end devices.
 */
export function useWebGLGate(): { enabled: boolean; ready: boolean } {
  const [ready, setReady] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;

    try {
      const canvas = document.createElement('canvas');
      webgl = Boolean(
        canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'),
      );
    } catch {
      webgl = false;
    }

    setEnabled(!reduced && webgl && !prefersSaveData() && !isLowEndDevice());
    setReady(true);
  }, []);

  return { enabled, ready };
}
