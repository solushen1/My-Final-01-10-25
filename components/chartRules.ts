import type { Theme } from '../types';
import { Chart } from 'chart.js';

export const getChartConfig = (chartType: 'bar' | 'pie', labels: string[], data: number[], theme: Theme, title: string) => {
    const isDarkMode = theme.name.toLowerCase().includes('night');
    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = theme.palette.foreground;

    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: textColor,
                    font: {
                        family: theme.fontPair.body,
                    },
                },
            },
            title: {
                display: true,
                text: title,
                color: textColor,
                font: {
                    family: theme.fontPair.heading,
                    size: 18,
                },
            },
            tooltip: {
                bodyFont: {
                    family: theme.fontPair.body,
                },
                titleFont: {
                    family: theme.fontPair.heading,
                },
            },
        },
    };

    if (chartType === 'bar') {
        return {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Amount',
                    data,
                    backgroundColor: theme.palette.primary,
                    borderColor: theme.palette.secondary,
                    borderWidth: 1,
                }],
            },
            options: {
                ...baseOptions,
                plugins: { ...baseOptions.plugins, legend: { display: false } },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: gridColor },
                        ticks: { color: textColor },
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: textColor },
                    },
                },
            },
        };
    }

    if (chartType === 'pie') {
        // Generate a color palette from the theme for pie charts
        const pieColors = [
            theme.palette.primary,
            theme.palette.secondary,
            theme.palette.accent,
            // Create lighter versions for more slices
            `${theme.palette.primary}B3`, // 70% opacity
            `${theme.palette.secondary}B3`,
            `${theme.palette.accent}B3`,
        ];

        return {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    label: 'Distribution',
                    data,
                    backgroundColor: pieColors,
                    borderColor: theme.palette.background,
                    borderWidth: 2,
                }],
            },
            options: baseOptions,
        };
    }

    return {}; // Should not happen
};