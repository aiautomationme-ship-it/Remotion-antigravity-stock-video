import { Easing, interpolate, spring } from 'remotion';

/**
 * MASTER INTERPOLATION & MOTION RHYTHM HELPERS
 * Enforces precise Remotion interpolate() ranges & spring physics across all scenes.
 */
export const MOTION_RHYTHM = {
  // Ultra-aggressive curve: Shoots out instantly, then locks hard into place
  hyperSnap: Easing.bezier(0.16, 1, 0.3, 1),
  
  // Power Ease-Out: Smoothly dampens movement over a long period
  cinematicHold: Easing.bezier(0.25, 1, 0.5, 1),
  
  // Subtle structural drift curve
  microPop: Easing.bezier(0.34, 1.56, 0.64, 1)
};

/**
 * PREMIUM SNAPPY SPRING ENTRANCE HELPER
 * Generates ultra-smooth spring acceleration physics:
 * - damping: 12 (elastic weight)
 * - mass: 0.5 (snappy object mass)
 * - stiffness: 90 (fast speed snap)
 */
export const getSnappySpring = (
  frame: number,
  fps: number = 60,
  delay: number = 0
) => {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 90,
    },
  });
};

/**
 * ELASTIC BOUNCE SPRING HELPER (FOR CHARTS & HUD ELEMENTS)
 */
export const getElasticSpring = (
  frame: number,
  fps: number = 60,
  delay: number = 0
) => {
  return spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: {
      damping: 8,
      mass: 0.7,
      stiffness: 110,
    },
  });
};

/**
 * STANDARD PERFECT TIMING INTERPOLATOR
 * Maps frame timing automatically to smooth 0 -> 1 -> 1 -> 0 fade/scale envelopes.
 */
export const getFadeEnvelope = (
  frame: number,
  totalFrames: number = 600,
  fadeInFrames: number = 30,
  fadeOutFrames: number = 30
) => {
  return interpolate(
    frame,
    [0, fadeInFrames, totalFrames - fadeOutFrames, totalFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
};

/**
 * 3-Act Camera Narrative Interpolators (4K 60FPS Standard)
 * Input: current frame (0 to 600 frames = 10 seconds)
 * Outputs: Precise multi-stage transformations (scale, panX, panY)
 */
export const get3ActCamera = (frame: number) => {
  const cameraEase = Easing.bezier(0.25, 1, 0.35, 1);

  // 1. Camera Zoom (Scale Property)
  const scale = interpolate(frame, [0, 180, 420, 600], [1.8, 1.4, 1.02, 1.0], {
    easing: cameraEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. Camera Pan X (Horizontal Shift in 4K resolution)
  const panX = interpolate(frame, [0, 180, 420, 600], [400, 200, -40, 0], {
    easing: cameraEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Camera Pan Y (Vertical Shift in 4K resolution)
  const panY = interpolate(frame, [0, 180, 420, 600], [-200, -80, 10, 0], {
    easing: cameraEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return { scale, panX, panY };
};
