/**
 * GENERATIVE MATHEMATICS ENGINE (4K 60FPS)
 * Solves Problem 2: Dynamic Visual Geometry Swapping (No more identical sine waves!)
 */

export type GeometryType = 'trig_wave' | 'circuit_trace' | 'matrix_grid' | 'step_curve';

/**
 * 1. TRIGONOMETRIC SINE WAVE HIGHWAY (For AI Compute, Cloud Data Flow)
 */
export const generateTrigWave = (
  frame: number, 
  width: number = 3840,
  centerY: number = 1080,
  amplitude: number = 160, 
  frequency: number = 0.003
): string => {
  const points: string[] = [];
  const totalSteps = 160;

  for (let i = 0; i <= totalSteps; i++) {
    const x = (i / totalSteps) * width;
    const wave1 = Math.sin(x * frequency + frame * 0.04);
    const wave2 = Math.cos(x * (frequency * 1.5) - frame * 0.02) * 0.5;
    const y = centerY + (wave1 + wave2) * amplitude;

    points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }

  return points.join(' ');
};

/**
 * 2. 90-DEGREE ORTHOGONAL CIRCUIT BOARD TRACES (For Semiconductor, Microchip Fabs)
 */
export const generateCircuitTrace = (
  frame: number,
  width: number = 3840,
  centerY: number = 1080
): string => {
  const pulseShift = Math.sin(frame * 0.02) * 40;
  return `M 200 ${centerY + 200} L 1200 ${centerY + 200} L 1600 ${centerY - 200 + pulseShift} L 2800 ${centerY - 200 + pulseShift} L 3600 ${centerY + 100}`;
};

/**
 * 3. VERTICAL/HORIZONTAL BINARY MATRIX GRID (For Cybersecurity, Zero Trust Networks)
 */
export const generateMatrixGrid = (
  frame: number,
  width: number = 3840,
  centerY: number = 1080
): string => {
  const pulse = Math.cos(frame * 0.03) * 20;
  return `M 300 ${centerY - 300} L 300 ${centerY + 300} M 300 ${centerY} L 3500 ${centerY + pulse} M 1920 ${centerY - 400} L 1920 ${centerY + 400} M 3200 ${centerY - 300} L 3200 ${centerY + 300}`;
};

/**
 * 4. QUANTIZED MACROECONOMIC STEP CURVES (For Financial Markets, Yield Strategy)
 */
export const generateStepCurve = (
  frame: number,
  width: number = 3840,
  centerY: number = 1080
): string => {
  const stepHeight = 120;
  const drift = Math.sin(frame * 0.015) * 15;

  return `M 200 ${centerY + 300} ` +
         `L 800 ${centerY + 300} ` +
         `L 800 ${centerY + stepHeight + drift} ` +
         `L 1600 ${centerY + stepHeight + drift} ` +
         `L 1600 ${centerY - stepHeight + drift} ` +
         `L 2400 ${centerY - stepHeight + drift} ` +
         `L 2400 ${centerY - (stepHeight * 2.5) + drift} ` +
         `L 3600 ${centerY - (stepHeight * 2.5) + drift}`;
};

/**
 * MASTER GEOMETRY RESOLVER: Dynamically maps geometryType to exact vector generator
 */
export const generateProceduralPath = (
  geometryType: GeometryType = 'trig_wave',
  frame: number,
  width: number = 3840,
  centerY: number = 1080
): string => {
  switch (geometryType) {
    case 'circuit_trace':
      return generateCircuitTrace(frame, width, centerY);
    case 'matrix_grid':
      return generateMatrixGrid(frame, width, centerY);
    case 'step_curve':
      return generateStepCurve(frame, width, centerY);
    case 'trig_wave':
    default:
      return generateTrigWave(frame, width, centerY, 160, 0.003);
  }
};
