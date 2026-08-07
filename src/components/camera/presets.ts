import React from 'react';

export type CameraPreset = {
	id: string;
	name: string;
	getStyle: (progress: number) => React.CSSProperties; // progress is 0 to 1 over timeline (600 frames)
};

export const cameraPresets: Record<string, CameraPreset> = {
	Static: {
		id: 'Static',
		name: 'Static Readability Camera',
		getStyle: () => ({ transform: 'none' })
	},
	SlowPushIn: {
		id: 'SlowPushIn',
		name: 'Micro Push-In (0.1%/sec)',
		getStyle: (progress) => {
			// Smooth ease-out cubic push over 10s
			const eased = 1 - Math.pow(1 - progress, 3);
			return {
				transform: `translateZ(${eased * 120}px)`,
			};
		}
	},
	MicroOrbit: {
		id: 'MicroOrbit',
		name: 'Subtle 1.5° Micro Orbit',
		getStyle: (progress) => {
			const rotateY = Math.sin(progress * Math.PI) * 1.5;
			const translateZ = progress * 60;
			return {
				transform: `perspective(1600px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
			};
		}
	},
	PerspectiveOrbit: {
		id: 'PerspectiveOrbit',
		name: 'Restrained Perspective Orbit',
		getStyle: (progress) => {
			const rotateY = (progress - 0.5) * 3;
			const rotateX = Math.sin(progress * Math.PI) * 1.2;
			return {
				transform: `perspective(1800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
			};
		}
	},
	TopDown: {
		id: 'TopDown',
		name: 'Orthographic Data Tilt',
		getStyle: (progress) => {
			const rotateX = 8 + progress * 2;
			return {
				transform: `perspective(2000px) rotateX(${rotateX}deg)`,
			};
		}
	},
	SidePan: {
		id: 'SidePan',
		name: 'Micro Horizontal Pan',
		getStyle: (progress) => {
			const translateX = (progress - 0.5) * -40;
			return {
				transform: `translateX(${translateX}px)`,
			};
		}
	},
	GraphicZoom: {
		id: 'GraphicZoom',
		name: 'Eased Scale Focus',
		getStyle: (progress) => {
			const scale = 1 + progress * 0.04;
			return {
				transform: `scale(${scale})`,
			};
		}
	},
	Parallax: {
		id: 'Parallax',
		name: 'Depth Layer Parallax',
		getStyle: (progress) => {
			const rotateY = Math.sin(progress * Math.PI) * 1.0;
			return {
				transform: `perspective(1500px) rotateY(${rotateY}deg)`,
			};
		}
	}
};
