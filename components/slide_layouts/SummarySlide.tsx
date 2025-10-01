import React from 'react';
import type { Theme } from '../../types';

interface SummarySlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
}

const SummarySlide: React.FC<SummarySlideProps> = ({ slide, theme }) => {
    const { kpis } = slide.data;

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
            <div className={`flex-grow grid grid-cols-${kpis?.length || 1} gap-8 items-center`}>
                {kpis && kpis.map((kpi: { value: string; label: string }, index: number) => (
                    <div key={index} className="text-center">
                        <p className="text-6xl font-bold" style={{ color: theme.palette.secondary }}>
                            {kpi.value}
                        </p>
                        <p className="text-lg mt-2" style={{ color: theme.palette.foreground }}>
                            {kpi.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummarySlide;