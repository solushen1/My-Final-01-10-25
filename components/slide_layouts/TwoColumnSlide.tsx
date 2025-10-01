import React from 'react';
import type { Theme } from '../../types';

interface TwoColumnSlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
}

const TwoColumnSlide: React.FC<TwoColumnSlideProps> = ({ slide, theme }) => {
    const { table } = slide.data;

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
            <div className="flex-grow">
                {table && (
                    <table className="w-full text-sm border-collapse" style={{ borderColor: theme.palette.accent }}>
                        <thead>
                            <tr>
                                {table.headers.map((header: string, index: number) => (
                                    <th key={index} className="border p-2 text-left font-bold" style={{ backgroundColor: theme.palette.accent, color: theme.palette.primary, borderColor: theme.palette.accent }}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {table.rows.map((row: string[], rowIndex: number) => (
                                <tr key={rowIndex} className={rowIndex % 2 === 0 ? '' : 'bg-opacity-50'} style={{ backgroundColor: rowIndex % 2 === 0 ? 'transparent' : `${theme.palette.accent}40`}}>
                                    {row.map((cell: string, cellIndex: number) => (
                                        <td key={cellIndex} className="border p-2" style={{ borderColor: theme.palette.accent }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default TwoColumnSlide;