/**
 * EatCodeSleep motion design system.
 *
 * Usage:
 *   import { revealLines, fadeUp, initHoverSystem } from '@/animations';
 *
 * Data attributes:
 *   data-magnetic, data-tilt, data-glow, data-border-motion
 *   data-zoom (+ data-zoom-media), data-icon-motion (+ data-icon)
 *   data-parallax, data-parallax-layer
 *   data-motion-header, data-motion-item, data-transition
 */
export {
  MOTION,
  clearMotion,
  createMotionTimeline,
  gsap,
  isReducedMotion,
  registerMotion,
  toArray,
  ScrollTrigger,
} from '@/animations/gsap';

export {
  blurReveal,
  fadeUp,
  revealSection,
  scaleReveal,
  slideFromLeft,
  slideFromRight,
  staggerChildren,
} from '@/animations/scroll';

export {
  animateGradientText,
  revealBlurText,
  revealChars,
  revealLines,
  revealText,
  revealWords,
  splitText,
} from '@/animations/textReveal';

export {
  initBorderMotion,
  initCardTilt,
  initGlowFollow,
  initHoverSystem,
  initIconMotion,
  initImageZoom,
  initMagnetic,
} from '@/animations/magnetic';

export {
  initParallax,
  parallaxElement,
  parallaxLayers,
} from '@/animations/parallax';

export {
  crossfade,
  enterStagger,
  fadeIn,
  fadeOut,
  playEnterTransitions,
} from '@/animations/transitions';

export { initMotionSystem } from '@/animations/init';
export { initCustomCursor } from '@/animations/cursor';
export { initPageTransitions } from '@/animations/pageTransition';
