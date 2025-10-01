import type { PhotoEnhancementPreset } from '../types';

export const photoEnhancementPresets: PhotoEnhancementPreset[] = [
    { name: 'None', filter: 'none' },
    { name: 'Vibrant', filter: 'contrast(1.2) saturate(1.3)' },
    { name: 'Muted', filter: 'saturate(0.7) contrast(0.9)' },
    { name: 'Monochrome', filter: 'grayscale(100%)' },
    { name: 'Warm', filter: 'sepia(30%) contrast(1.1)' },
    { name: 'Cool', filter: 'contrast(1.1) brightness(1.05) hue-rotate(-15deg)' },
];