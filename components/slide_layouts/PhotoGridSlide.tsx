import React from 'react';
import type { Theme } from '../../types';

interface PhotoGridSlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
    photoEnhancementPreset: string;
}

const PhotoGridSlide: React.FC<PhotoGridSlideProps> = ({ slide, theme, photoEnhancementPreset }) => {
    const { images } = slide.data;

    return (
        <div className="w-full h-full flex flex-col p-8"
            style={{ 
                fontFamily: `'${theme.fontPair.body}', sans-serif`,
                backgroundColor: theme.palette.background,
                color: theme.palette.foreground
            }}>
            <h3 className="text-3xl font-bold text-center mb-6" style={{ fontFamily: `'${theme.fontPair.heading}', serif`, color: theme.palette.primary }}>
                {slide.title}
            </h3>
            <div className="flex-grow grid grid-cols-2 grid-rows-2 gap-4">
                {images && images.slice(0, 4).map((src: string, index: number) => (
                    <div key={index} className="w-full h-full bg-gray-200 rounded-lg overflow-hidden">
                        <img src={src} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" style={{ filter: photoEnhancementPreset }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGridSlide;