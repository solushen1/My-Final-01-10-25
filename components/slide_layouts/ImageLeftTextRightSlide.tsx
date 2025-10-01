import React from 'react';
import type { Theme } from '../../types';

interface ImageLeftTextRightSlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
    photoEnhancementPreset: string;
}

const ImageLeftTextRightSlide: React.FC<ImageLeftTextRightSlideProps> = ({ slide, theme, photoEnhancementPreset }) => {
    const { image, list, text } = slide.data;

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
            <div className="flex-grow grid grid-cols-2 gap-8 items-center">
                <div className="w-full h-full flex items-center justify-center">
                    {image && <img src={image} alt="Slide visual" className="max-w-full max-h-full object-contain rounded-lg" style={{ filter: photoEnhancementPreset }}/>}
                </div>
                <div className="prose" style={{ color: theme.palette.foreground }}>
                    {text && <p>{text}</p>}
                    {list && (
                        <ul className="list-disc pl-5">
                            {list.map((item: string, index: number) => (
                                <li key={index} className="mb-2">{item}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageLeftTextRightSlide;