import React, { useEffect, useRef } from 'react';
import type { Chart as ChartJSType } from 'chart.js';
import type { Theme, SlideLayout } from '../../types';
import { getChartConfig } from '../chartRules';

declare const Chart: any;

interface ChartSlideProps {
    slide: any; // A slide object with processed data
    theme: Theme;
}

const ChartSlide: React.FC<ChartSlideProps> = ({ slide, theme }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<ChartJSType | null>(null);

    useEffect(() => {
        if (!chartRef.current || !slide.data) return;

        const { chartType, data } = slide.data;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        if (ctx && data.labels && data.values) {
            // Default to 'bar' if an unsupported type is passed.
            const safeChartType = (chartType === 'bar' || chartType === 'pie') ? chartType : 'bar';
            
            const config = getChartConfig(safeChartType, data.labels, data.values, theme, slide.title);
            if (config.type && config.data && config.options) {
                chartInstanceRef.current = new Chart(ctx, config);
            }
        }
    
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [slide, theme]);

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
            <div className="flex-grow relative">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default ChartSlide;