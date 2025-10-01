import React from 'react';
import type { Theme } from '../../types';

interface TitleSlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
}

const TitleSlide: React.FC<TitleSlideProps> = ({ slide, theme }) => {
    const { subtitle, author } = slide.data;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center"
             style={{ background: theme.gradient[0] || theme.palette.primary }}>
            <h2 className="text-5xl font-bold" style={{ fontFamily: `'${theme.fontPair.heading}', serif`, color: theme.palette.background }}>
                {slide.title}
            </h2>
            {subtitle && (
                <p className="text-2xl mt-4 opacity-90" style={{ fontFamily: `'${theme.fontPair.body}', sans-serif`, color: theme.palette.accent }}>
                    {subtitle}
                </p>
            )}
            {author && (
                <p className="text-xl mt-12 opacity-90" style={{ fontFamily: `'${theme.fontPair.body}', sans-serif`, color: theme.palette.background }}>
                    Prepared by: {author}
                </p>
            )}
        </div>
    );
};

export default TitleSlide;