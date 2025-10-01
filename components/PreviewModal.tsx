import React, { useRef, useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import type { ReportTemplate, Theme, SlideLayout, SlideOverrides, PhotoEnhancementPreset, SlideLayoutType, FormField } from '../types';
import { FieldType } from '../types';
import { CloseIcon, ChevronDownIcon, FilePdfIcon, SparklesIcon, GeminiIcon } from './icons';
import { editImage, generateContextualImage } from './geminiApi';
import { getResolvedSlides } from './slidePlanResolver';

// Import Slide Layout Components
import TitleSlide from './slide_layouts/TitleSlide';
import TwoColumnSlide from './slide_layouts/TwoColumnSlide';
import ImageLeftTextRightSlide from './slide_layouts/ImageLeftTextRightSlide';
import SummarySlide from './slide_layouts/SummarySlide';
import PhotoGridSlide from './slide_layouts/PhotoGridSlide';
import ChartSlide from './slide_layouts/ChartSlide';

// Import local libraries
import PptxGenJS from 'pptxgenjs';

declare const jspdf: any;
declare const html2canvas: any;

interface PreviewModalProps {
    isOpen: boolean;
    mode: 'pdf' | 'ppt' | null;
    onClose: () => void;
    activeTemplate: ReportTemplate;
    formData: any;
    themes: Theme[];
    selectedTheme: Theme;
    setSelectedTheme: (theme: Theme) => void;
}

const slideComponentMap: { [key: string]: React.FC<any> } = {
    title: TitleSlide,
    twoColumn: TwoColumnSlide,
    imageLeftTextRight: ImageLeftTextRightSlide,
    summary: SummarySlide,
    photoGrid: PhotoGridSlide,
    chartFull: ChartSlide,
};

type PhotoOption = 'original' | 'enhance' | 'removeBg';


// Helper components for PDF rendering, moved from App.tsx
const PhotoGridPreviewForPdf: React.FC<{ photos: string[], title: string, theme: Theme }> = ({ photos, title, theme }) => {
    if (!photos || photos.length === 0) return null;

    // A4 page height is 297mm. Half is ~148.5mm.
    // The PDF content is rendered in an 800px wide container, which scales to ~180mm wide in the PDF.
    // To ensure portrait images don't exceed half the PDF page height, we calculate a pixel equivalent.
    // Max height in pixels ≈ (148.5mm / 180mm) * 800px ≈ 660px.
    // We use a slightly smaller value for safety margin.
    const maxImageHeight = '560px';

    const imageStyle: React.CSSProperties = {
        maxHeight: maxImageHeight,
        maxWidth: '100%',
        objectFit: 'contain',
        width: 'auto', // Allow width to scale down proportionally.
        display: 'block', // Fixes some potential layout issues.
        margin: '0 auto' // Center the image within its container.
    };

    const renderPhoto = (src: string, alt: string) => (
        <img src={src} alt={alt} style={imageStyle} />
    );

    const photoHeader = <h4 className="text-sm font-semibold mt-4 mb-2 text-center" style={{ color: theme.palette.primary }}>{title} Photos</h4>;

    // The grid items will stretch, but the image inside won't, it will be centered.
    const gridItemClass = "flex items-center justify-center";

    return (
        <div className="mb-2 space-y-2">
            {photos.length === 1 && (
                <div className="pdf-content-block">
                    {photoHeader}
                    <div className={gridItemClass}>{renderPhoto(photos[0], `${title}-0`)}</div>
                </div>
            )}
            {photos.length === 2 && (
                <div className="pdf-content-block">
                    {photoHeader}
                    <div className="grid grid-cols-2 gap-2 items-start">
                        <div className={gridItemClass}>{renderPhoto(photos[0], `${title}-0`)}</div>
                        <div className={gridItemClass}>{renderPhoto(photos[1], `${title}-1`)}</div>
                    </div>
                </div>
            )}
            {photos.length === 3 && (
                <>
                    <div className="pdf-content-block">
                        {photoHeader}
                        <div className="grid grid-cols-2 gap-2 items-start">
                            <div className={gridItemClass}>{renderPhoto(photos[0], `${title}-0`)}</div>
                            <div className={gridItemClass}>{renderPhoto(photos[1], `${title}-1`)}</div>
                        </div>
                    </div>
                    <div className="pdf-content-block">
                        <div className={gridItemClass}>{renderPhoto(photos[2], `${title}-2`)}</div>
                    </div>
                </>
            )}
            {photos.length === 4 && (
                <>
                    <div className="pdf-content-block">
                        {photoHeader}
                        <div className="grid grid-cols-2 gap-2 items-start">
                             <div className={gridItemClass}>{renderPhoto(photos[0], `${title}-0`)}</div>
                             <div className={gridItemClass}>{renderPhoto(photos[1], `${title}-1`)}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pdf-content-block">
                         <div className={gridItemClass}>{renderPhoto(photos[2], `${title}-2`)}</div>
                         <div className={gridItemClass}>{renderPhoto(photos[3], `${title}-3`)}</div>
                    </div>
                </>
            )}
        </div>
    );
};


export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, mode, onClose, activeTemplate, formData, themes, selectedTheme, setSelectedTheme }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('Generating Presentation...');
    const [useAiFeatures, setUseAiFeatures] = useState(false);

    // New state for the redesigned modal
    const [themeCategory, setThemeCategory] = useState<'Traditional' | 'Modern'>('Traditional');
    const [aiVisualStyle, setAiVisualStyle] = useState('minimalist');
    const [photoOption, setPhotoOption] = useState<PhotoOption>('original');

    const [libsReady, setLibsReady] = useState(false);

    const handleAiToggle = (enabled: boolean) => {
        setUseAiFeatures(enabled);
        if (!enabled) {
            setPhotoOption('original');
            setAiVisualStyle('minimalist');
        }
    };



    // Check if local libraries are available
    useEffect(() => {
        if (!isOpen) {
            setLibsReady(false); // Reset when modal closes
            return;
        }

        const checkLibraries = () => {
            const pptxExists = typeof PptxGenJS !== 'undefined';
            const reactDomExists = typeof ReactDOM !== 'undefined';

            console.log('Library check:', {
                PptxGenJS: pptxExists,
                ReactDOM: reactDomExists
            });

            return pptxExists && reactDomExists;
        };

        // Since we're importing libraries directly, they should be available immediately
        if (checkLibraries()) {
            setLibsReady(true);
            console.log('All libraries loaded successfully');
        } else {
            console.error('Required libraries not available');
            // Try again after a short delay in case of import timing issues
            setTimeout(() => {
                if (checkLibraries()) {
                    setLibsReady(true);
                    console.log('All libraries loaded successfully (after retry)');
                } else {
                    console.error('Libraries still not available after retry');
                    alert('Required libraries are not available. Please refresh the page and try again.');
                }
            }, 1000);
        }
    }, [isOpen]);

    const filteredThemes = useMemo(() => {
        return themes.filter(t => t.category === themeCategory);
    }, [themes, themeCategory]);

    // Ensure selectedTheme is always in the filtered list
    useEffect(() => {
        if (!filteredThemes.find(t => t.name === selectedTheme.name)) {
            setSelectedTheme(filteredThemes[0] || themes[0]);
        }
    }, [filteredThemes, selectedTheme, setSelectedTheme, themes]);



    const slides = useMemo(() => {
        if (!libsReady) return [];

        // Use the new universal slide resolver
        const resolvedSlides = getResolvedSlides(activeTemplate, formData);

        return resolvedSlides;
    }, [activeTemplate, formData, libsReady]);

    const processImage = async (base64Image: string): Promise<string> => {
        // Always return original image if AI features are disabled or no image provided
        if (!useAiFeatures || photoOption === 'original' || !base64Image) {
            return Promise.resolve(base64Image);
        }

        try {
            let prompt = '';
            if (photoOption === 'enhance') {
                prompt = 'Auto-enhance this photo to be more vibrant, clear, and well-lit, improving overall quality.';
            } else if (photoOption === 'removeBg') {
                prompt = 'Remove the background from this photo, leaving only the main subject with a transparent background.';
            }

            if (prompt) {
                const result = await editImage(base64Image, prompt);
                return result;
            }
            return base64Image;
        } catch (error) {
            console.error('Error processing image:', error);
            // Always return original image on any error (including API quota exceeded)
            return base64Image;
        }
    };

    // Helper function to ensure colors are valid strings for PptxGenJS
    const sanitizeColor = (color: any, fallback: string = 'FFFFFF'): string => {
        try {
            if (typeof color !== 'string' || !color || color.trim() === '') {
                return fallback;
            }

            // Clean the color string
            const cleanColor = color.trim();

            // Handle hex colors
            if (cleanColor.startsWith('#')) {
                const hexPart = cleanColor.substring(1);
                // Ensure it's exactly 6 characters and valid hex
                if (/^[0-9A-Fa-f]{6}$/.test(hexPart)) {
                    return hexPart.toUpperCase();
                } else if (/^[0-9A-Fa-f]{3}$/.test(hexPart)) {
                    // Convert 3-char hex to 6-char
                    return (hexPart[0] + hexPart[0] + hexPart[1] + hexPart[1] + hexPart[2] + hexPart[2]).toUpperCase();
                }
                return fallback;
            }

            // Handle rgb/rgba colors - convert to hex
            if (cleanColor.startsWith('rgb')) {
                const rgbValues = cleanColor.match(/\d+/g);
                if (rgbValues && rgbValues.length >= 3) {
                    const r = Math.min(255, Math.max(0, parseInt(rgbValues[0])));
                    const g = Math.min(255, Math.max(0, parseInt(rgbValues[1])));
                    const b = Math.min(255, Math.max(0, parseInt(rgbValues[2])));
                    return ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0').toUpperCase();
                }
                return fallback;
            }

            // If it's already a hex string without #
            if (/^[0-9A-Fa-f]{6}$/.test(cleanColor)) {
                return cleanColor.toUpperCase();
            }

            // Handle common color names
            const colorNames: { [key: string]: string } = {
                'black': '000000',
                'white': 'FFFFFF',
                'red': 'FF0000',
                'green': '008000',
                'blue': '0000FF',
                'yellow': 'FFFF00',
                'orange': 'FFA500',
                'purple': '800080',
                'gray': '808080',
                'grey': '808080'
            };

            const lowerColor = cleanColor.toLowerCase();
            if (colorNames[lowerColor]) {
                return colorNames[lowerColor];
            }

            // For any other format, use fallback
            return fallback;
        } catch (error) {
            console.error('Error sanitizing color:', color, error);
            return fallback;
        }
    };

    const generatePptx = async () => {
        setIsLoading(true);
        setLoadingMessage('Preparing Presentation...');

        const generatedIcons: { [slideId: string]: string } = {};

        // Only generate AI assets if AI features are enabled and we have a good connection
        if (useAiFeatures) {
            setLoadingMessage('Generating AI Assets...');
            try {
                const iconGenerationPromises = slides
                    .filter(slide => slide.originalLayout.generativeIconPrompt)
                    .map(async slide => {
                        try {
                            const themeStyle = selectedTheme.category === 'Modern' ? 'modern, clean, geometric' : 'traditional, classic, elegant';
                            const prompt = `${slide.originalLayout.generativeIconPrompt}, in a ${aiVisualStyle} and ${themeStyle} style. Use colors inspired by ${selectedTheme.palette.primary} and ${selectedTheme.palette.accent}. Professional presentation icon with transparent background. High quality, simple, clear design suitable for PowerPoint.`;
                            const icon = await generateContextualImage(prompt);
                            generatedIcons[slide.id] = icon;
                        } catch (error) {
                            console.error(`Error generating icon for slide ${slide.id}:`, error);
                            // Don't fail the entire presentation for icon generation issues
                        }
                    });

                // Use Promise.allSettled to handle partial failures gracefully
                await Promise.allSettled(iconGenerationPromises);
            } catch (error) {
                console.error('Error during AI asset generation:', error);
                // Continue with presentation generation even if AI assets fail completely
            }
        }

        setLoadingMessage('Assembling Presentation...');
        const chartContainer = document.createElement('div');
        chartContainer.style.position = 'absolute';
        chartContainer.style.left = '-9999px';
        chartContainer.style.width = '1000px';
        chartContainer.style.height = '600px';
        document.body.appendChild(chartContainer);

        try {
            // Final check for libraries before generation
            if (typeof PptxGenJS === 'undefined') {
                throw new Error('PptxGenJS library not available. Please refresh the page and try again.');
            }

            const pptx = new PptxGenJS();

            // Apply theme colors properly - ensure all colors are valid strings for PptxGenJS
            const themeColors = { 
                background: sanitizeColor(selectedTheme.palette.background, 'FFFFFF'), 
                text: sanitizeColor(selectedTheme.palette.foreground, '000000'), 
                primary: sanitizeColor(selectedTheme.palette.primary, '000080'), 
                secondary: sanitizeColor(selectedTheme.palette.secondary, '808080'),
                accent: sanitizeColor(selectedTheme.palette.accent, 'FF6600')
            };

            console.log('Theme colors sanitized:', themeColors);

            pptx.defineLayout({ name: 'A4_LANDSCAPE', width: 11.69, height: 8.27 });
            pptx.layout = 'A4_LANDSCAPE';

            // Set theme metadata
            pptx.author = 'Adventist Report Generator';
            pptx.company = 'Seventh-day Adventist Church';
            pptx.subject = `${activeTemplate.title} - ${selectedTheme.name} Theme`;
            pptx.title = activeTemplate.title;

            for (let i = 0; i < slides.length; i++) {
                const slideData = slides[i];
                setLoadingMessage(`Creating slide ${i + 1} of ${slides.length}...`);

                try {
                    const slide = pptx.addSlide(); 

                    // Apply background - use simple color only to avoid issues
                    slide.background = { color: themeColors.background };

                    // Add generated icon if available and AI features enabled
                    if (useAiFeatures && generatedIcons[slideData.id]) {
                        try {
                            slide.addImage({ 
                                data: generatedIcons[slideData.id], 
                                x: selectedTheme.category === 'Modern' ? 10.5 : 10.8, 
                                y: selectedTheme.category === 'Modern' ? 0.1 : 0.2, 
                                w: selectedTheme.category === 'Modern' ? 0.8 : 0.6, 
                                h: selectedTheme.category === 'Modern' ? 0.8 : 0.6,
                                transparency: selectedTheme.category === 'Modern' ? 15 : 10,
                                rounding: selectedTheme.category === 'Modern'
                            });
                        } catch (error) {
                            console.error(`Error adding icon to slide ${slideData.id}:`, error);
                        }
                    }

                    switch (slideData.layout) {
                        case 'title':
                            // Apply theme-specific title styling with enhanced visual design
                            const titleY = selectedTheme.category === 'Modern' ? 2.8 : 2.5;
                            const titleFontSize = selectedTheme.category === 'Modern' ? 52 : 44;

                            // Add background decoration for Modern themes
                            if (selectedTheme.category === 'Modern') {
                                slide.addShape('rect', {
                                    x: 1,
                                    y: titleY - 0.3,
                                    w: 9.69,
                                    h: 0.1,
                                    fill: { color: themeColors.accent },
                                    line: { width: 0 }
                                });
                            }

                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: titleY, 
                                w: '90%', 
                                h: 2, 
                                fontSize: titleFontSize, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading, 
                                align: 'center',
                                shadow: selectedTheme.category === 'Modern' ? { 
                                    type: 'outer', 
                                    blur: 3, 
                                    offset: 2, 
                                    angle: 45, 
                                    color: '000000', 
                                    opacity: 0.2 
                                } : undefined
                            });

                            if (slideData.data.subtitle) {
                                slide.addText(slideData.data.subtitle, { 
                                    x: 0.5, 
                                    y: selectedTheme.category === 'Modern' ? 5.0 : 4.5, 
                                    w: '90%', 
                                    h: 0.8, 
                                    fontSize: selectedTheme.category === 'Modern' ? 22 : 18, 
                                    color: themeColors.accent, 
                                    fontFace: selectedTheme.fontPair.body, 
                                    align: 'center',
                                    italic: selectedTheme.category === 'Traditional',
                                    bold: selectedTheme.category === 'Modern'
                                });
                            }

                            if (slideData.data.author) {
                                slide.addText(`Prepared by: ${slideData.data.author}`, { 
                                    x: 0.5, 
                                    y: selectedTheme.category === 'Modern' ? 6.8 : 6.5, 
                                    w: '90%', 
                                    h: 0.5, 
                                    fontSize: selectedTheme.category === 'Modern' ? 18 : 16, 
                                    color: themeColors.text, 
                                    fontFace: selectedTheme.fontPair.body, 
                                    align: 'center',
                                    bold: selectedTheme.category === 'Modern'
                                });
                            }
                            break;

                        case 'twoColumn':
                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: 0.25, 
                                w: '90%', 
                                h: 0.6, 
                                fontSize: 32, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading 
                            });
                            if (slideData.data.table && slideData.data.table.rows && slideData.data.table.rows.length > 0) {
                                const tableOptions = {
                                    x: 0.5, 
                                    y: 1.2, 
                                    w: 10.69,
                                    border: { pt: 1, color: themeColors.secondary },
                                    color: themeColors.text,
                                    fontFace: selectedTheme.fontPair.body,
                                    fontSize: 12,
                                    autoPage: true,
                                    rowH: 0.4
                                };

                                // Style header row differently - ensure proper data structure
                                const tableData = [
                                    slideData.data.table.headers.map((header: string) => ({
                                        text: String(header || ''),
                                        options: { 
                                            bold: true, 
                                            color: themeColors.primary,
                                            fontFace: selectedTheme.fontPair.heading
                                        }
                                    })),
                                    ...slideData.data.table.rows.map((row: string[]) => 
                                        row.map((cell: string) => ({
                                            text: String(cell || ''),
                                            options: {
                                                color: themeColors.text,
                                                fontFace: selectedTheme.fontPair.body
                                            }
                                        }))
                                    )
                                ];

                                slide.addTable(tableData, tableOptions);
                            }
                            break;

                        case 'imageLeftTextRight':
                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: 0.25, 
                                w: '90%', 
                                h: 0.6, 
                                fontSize: 32, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading 
                            });
                            if (slideData.data.image) {
                                try {
                                    const processedImage = await processImage(slideData.data.image);
                                    slide.addImage({ 
                                        data: processedImage, 
                                        x: 0.5, 
                                        y: 1.2, 
                                        w: 5.5, 
                                        h: 5.8,
                                        rounding: selectedTheme.category === 'Modern'
                                    });
                                } catch (error) {
                                    console.error('Error processing/adding image:', error);
                                }
                            }
                            if (slideData.data.list && slideData.data.list.length > 0) {
                                // Ensure list data is properly formatted
                                const listText = Array.isArray(slideData.data.list) 
                                    ? slideData.data.list.filter(item => item && String(item).trim()).join('\n')
                                    : String(slideData.data.list);

                                if (listText.trim()) {
                                    slide.addText(listText, { 
                                        x: 6.2, 
                                        y: 1.2, 
                                        w: 5, 
                                        h: 5.8, 
                                        color: themeColors.text, 
                                        fontFace: selectedTheme.fontPair.body, 
                                        bullet: true, 
                                        fontSize: 14,
                                        lineSpacing: selectedTheme.category === 'Modern' ? 20 : 16
                                    });
                                }
                            }
                            break;

                        case 'summary':
                            // Enhanced summary slide with theme-aware styling
                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: 0.25, 
                                w: '90%', 
                                h: 0.8, 
                                fontSize: selectedTheme.category === 'Modern' ? 40 : 36, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading, 
                                align: 'center',
                                shadow: selectedTheme.category === 'Modern' ? { 
                                    type: 'outer', 
                                    blur: 2, 
                                    offset: 1, 
                                    angle: 45, 
                                    color: '000000', 
                                    opacity: 0.15 
                                } : undefined
                            });

                            slideData.data.kpis?.forEach((kpi: any, index: number) => {
                                const kpiCount = slideData.data.kpis.length;
                                const boxWidth = (11.69 - 1 - (0.5 * (kpiCount - 1))) / kpiCount;
                                const xPos = 0.5 + index * (boxWidth + 0.5);

                                // Add enhanced KPI background styling
                                if (selectedTheme.category === 'Modern') {
                                    // Modern: gradient background with subtle shadow
                                    slide.addShape('rect', {
                                        x: xPos - 0.1,
                                        y: 2.8,
                                        w: boxWidth + 0.2,
                                        h: 2.5,
                                        fill: { color: themeColors.accent },
                                        line: { color: themeColors.secondary, width: 2 },
                                        shadow: { 
                                            type: 'outer', 
                                            blur: 4, 
                                            offset: 2, 
                                            angle: 45, 
                                            color: '000000', 
                                            opacity: 0.2 
                                        }
                                    });
                                } else {
                                    // Traditional: simple border
                                    slide.addShape('rect', {
                                        x: xPos - 0.05,
                                        y: 2.9,
                                        w: boxWidth + 0.1,
                                        h: 2.3,
                                        fill: { color: 'FFFFFF' },
                                        line: { color: themeColors.primary, width: 2 }
                                    });
                                }

                                slide.addText(String(kpi.value), { 
                                    x: xPos, 
                                    y: selectedTheme.category === 'Modern' ? 3.1 : 3.2, 
                                    w: boxWidth, 
                                    h: 1.5, 
                                    fontSize: selectedTheme.category === 'Modern' ? 56 : 48, 
                                    bold: true, 
                                    color: selectedTheme.category === 'Modern' ? themeColors.primary : themeColors.secondary, 
                                    align: 'center', 
                                    valign: 'middle',
                                    fontFace: selectedTheme.fontPair.heading,
                                    shadow: selectedTheme.category === 'Modern' ? { 
                                        type: 'outer', 
                                        blur: 1, 
                                        offset: 1, 
                                        angle: 45, 
                                        color: '000000', 
                                        opacity: 0.1 
                                    } : undefined
                                });

                                slide.addText(kpi.label, { 
                                    x: xPos, 
                                    y: selectedTheme.category === 'Modern' ? 4.7 : 4.8, 
                                    w: boxWidth, 
                                    h: 0.6, 
                                    fontSize: selectedTheme.category === 'Modern' ? 18 : 16, 
                                    color: themeColors.text, 
                                    align: 'center', 
                                    valign: 'top',
                                    fontFace: selectedTheme.fontPair.body,
                                    bold: selectedTheme.category === 'Modern',
                                    italic: selectedTheme.category === 'Traditional'
                                });
                            });
                            break;

                        case 'photoGrid':
                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: 0.25, 
                                w: '90%', 
                                h: 0.6, 
                                fontSize: 32, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading 
                            });
                            if (slideData.data.images) {
                                const gridPositions = [
                                    { x: 0.5, y: 1.2, w: 5.5, h: 3 }, 
                                    { x: 6.19, y: 1.2, w: 5, h: 3 }, 
                                    { x: 0.5, y: 4.5, w: 5.5, h: 3 }, 
                                    { x: 6.19, y: 4.5, w: 5, h: 3 }
                                ];
                                for(let imgIndex = 0; imgIndex < Math.min(slideData.data.images.length, 4); imgIndex++) {
                                    try {
                                        const processedImage = await processImage(slideData.data.images[imgIndex]);
                                        slide.addImage({ 
                                            data: processedImage, 
                                            ...gridPositions[imgIndex],
                                            rounding: selectedTheme.category === 'Modern'
                                        });
                                    } catch (error) {
                                        console.error(`Error processing image ${imgIndex}:`, error);
                                    }
                                }
                            }
                            break;

                        case 'chartFull':
                            slide.addText(slideData.title, { 
                                x: 0.5, 
                                y: 0.25, 
                                w: '90%', 
                                h: 0.6, 
                                fontSize: 32, 
                                bold: true, 
                                color: themeColors.primary, 
                                fontFace: selectedTheme.fontPair.heading 
                            });

                            try {
                                const chartDiv = document.createElement('div');
                                chartDiv.style.width = '1000px';
                                chartDiv.style.height = '600px';
                                chartDiv.style.backgroundColor = selectedTheme.palette.background;
                                chartContainer.appendChild(chartDiv);

                                const chartRoot = ReactDOM.createRoot(chartDiv);
                                await new Promise<void>(resolve => {
                                    chartRoot.render(<ChartSlide slide={slideData} theme={selectedTheme} />);
                                    setTimeout(resolve, 1000); // Give more time for chart rendering
                                });

                                const canvas = chartDiv.querySelector('canvas');
                                if (canvas) {
                                    const chartImage = canvas.toDataURL('image/png');
                                    slide.addImage({ 
                                        data: chartImage, 
                                        x: 1, 
                                        y: 1.2, 
                                        w: 9.69, 
                                        h: 5.8,

                                    });
                                }
                                chartRoot.unmount();
                                chartContainer.removeChild(chartDiv);
                            } catch (error) {
                                console.error('Error creating chart:', error);
                            }
                            break;
                    }

                    // Add slide number in theme colors
                    slide.addText(`${i + 1}`, {
                        x: 11,
                        y: 7.5,
                        w: 0.5,
                        h: 0.3,
                        fontSize: 12,
                        color: themeColors.secondary,
                        align: 'center',
                        fontFace: selectedTheme.fontPair.body
                    });

                } catch (error) {
                    console.error(`Error creating slide ${i + 1}:`, error);

                    // Try to create a fallback slide with minimal content
                    try {
                        const fallbackSlide = pptx.addSlide();
                        fallbackSlide.background = { color: themeColors.background };

                        // Safe title extraction
                        const slideTitle = (slideData && slideData.title) ? String(slideData.title) : `Slide ${i + 1}`;

                        fallbackSlide.addText(slideTitle, { 
                            x: 0.5, 
                            y: 3.5, 
                            w: 10.69, 
                            h: 1, 
                            fontSize: 24, 
                            bold: true, 
                            color: themeColors.primary, 
                            fontFace: selectedTheme.fontPair.heading,
                            align: 'center'
                        });
                        fallbackSlide.addText('Content could not be rendered', { 
                            x: 0.5, 
                            y: 4.5, 
                            w: 10.69, 
                            h: 0.5, 
                            fontSize: 16, 
                            color: themeColors.text, 
                            fontFace: selectedTheme.fontPair.body,
                            align: 'center'
                        });
                    } catch (fallbackError) {
                        console.error(`Failed to create fallback slide ${i + 1}:`, fallbackError);
                        // Continue to next slide even if fallback fails
                    }
                }
            }

            setLoadingMessage('Finalizing presentation...');
            pptx.writeFile({ fileName: `${activeTemplate.title.replace(/\s+/g, '-')}-${selectedTheme.name.replace(/\s+/g, '-')}-presentation.pptx` });
        } catch (error) { 
            console.error("Error generating PPTX:", error);
            alert("There was an error generating the PowerPoint presentation. Please try again.");
        } finally { 
            setIsLoading(false); 
            if (document.body.contains(chartContainer)) {
                document.body.removeChild(chartContainer);
            }
        }
    };

    const generatePdf = async () => {
        setLoadingMessage('Generating PDF...');
        setIsLoading(true);
        const originalContent = document.getElementById('pdf-preview-content');
        if (!originalContent) {
            alert('Preview content not found!');
            setIsLoading(false);
            return;
        }

        // Create an off-screen container for rendering
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.top = '0';
        container.style.width = '800px'; // A fixed width similar to A4 for consistent rendering
        document.body.appendChild(container);

        // Clone the content and append it to the off-screen container
        const clonedContent = originalContent.cloneNode(true) as HTMLElement;
        clonedContent.id = 'pdf-clone-content'; // Avoid duplicate IDs
        container.appendChild(clonedContent);

        try {
            const pdf = new jspdf.jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 15;
            const contentWidth = pdfWidth - (margin * 2);

            let yPosition = margin;

            const contentBlocks = Array.from(clonedContent.querySelectorAll('.pdf-content-block')) as HTMLElement[];

            for (let i = 0; i < contentBlocks.length; i++) {
                const block = contentBlocks[i];

                // Ensure images within the block are loaded before capture
                const images = Array.from(block.getElementsByTagName('img'));
                const imageLoadPromises = images.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve; // Resolve even on error to not block PDF generation
                    });
                });
                await Promise.all(imageLoadPromises);

                const canvas = await html2canvas(block, {
                    scale: 1.5, // Reduced scale for better text rendering
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: selectedTheme.palette.background,
                    width: Math.min(block.scrollWidth, 750), // Reduced width to fit better
                    height: block.scrollHeight,
                    windowWidth: 750, // Set consistent window width
                    windowHeight: 1200,
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = contentWidth;
                const imgHeight = (canvas.height * contentWidth) / canvas.width;

                // Check for page break
                if (yPosition > margin && yPosition + imgHeight > pdfHeight - margin) {
                    pdf.addPage();
                    yPosition = margin;
                }

                pdf.addImage(imgData, 'PNG', margin, yPosition, contentWidth, imgHeight);
                yPosition += imgHeight + 2; // Add a small gap between blocks
            }

            pdf.save(`${activeTemplate.key}-report.pdf`);

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Sorry, there was an error generating the PDF.");
        } finally {
            setIsLoading(false);
            // Clean up the off-screen container
            document.body.removeChild(container);
        }
    };

    const renderPreviewField = (sectionId: string, field: FormField) => {
        const value = formData[sectionId]?.[field.id];
        const labelStyle = { color: selectedTheme.palette.primary, fontWeight: 600 };
        const valueStyle = { color: selectedTheme.palette.foreground };
        const tableBorderStyle = { borderColor: selectedTheme.palette.accent };
        const tableHeaderStyle = { 
            backgroundColor: selectedTheme.palette.accent, 
            color: selectedTheme.palette.primary,
            borderColor: selectedTheme.palette.accent
        };

        switch (field.type) {
            case 'text': case 'number': case 'date': case 'textarea':
                 if (!value) return null;
                return (
                    <div className="mb-4 pdf-content-block" key={field.id}>
                        <p>
                            <span style={labelStyle}>{field.label}: </span> 
                            <span style={valueStyle} className="whitespace-pre-wrap">{value}</span>
                        </p>
                    </div>
                );
            case FieldType.PHOTOS:
                if (!value || value.length === 0) return null;
                return (
                    <div className="mb-4 pdf-content-block" key={field.id}>
                        <p className="mb-2" style={labelStyle}>{field.label}:</p>
                        <div className="flex flex-wrap gap-2">
                            {(value as string[]).map((src, index) => (
                                <img key={index} src={src} alt={`upload-${index}`} className="w-24 h-24 object-cover rounded-md border" style={tableBorderStyle} />
                            ))}
                        </div>
                    </div>
                );
            case 'bullet':
                 const bullets = value || [];
                 if (bullets.every((b: string) => !b)) return null;
                 return (
                    <div className="mb-4 pdf-content-block" key={field.id}>
                        <p style={labelStyle}>{field.label}:</p>
                        <ul className="list-disc list-inside ml-4" style={valueStyle}>
                            {bullets.map((bullet: string, index: number) => bullet && <li key={index}>{bullet}</li>)}
                        </ul>
                    </div>
                );
            case 'table': {
                if (!value || !Array.isArray(value) || value.length === 0) return null;
                const columns = field.columns || [];
                const tableElement = (
                    <div className="mb-4 pdf-content-block" key={field.id}>
                        <p className="mb-1" style={labelStyle}>{field.label}</p>
                        <table className="w-full text-xs border-collapse border" style={tableBorderStyle}>
                            <thead>
                                <tr>
                                    {columns.map(col => <th key={col} className="border p-2 text-left font-bold" style={tableHeaderStyle}>{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {value.map((row: any, rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col, colIndex) => (
                                            <td key={col} className="border p-2" style={tableBorderStyle}>
                                                {row[Object.keys(row).filter(k => k !== 'photos' && k !== 'tooltips')[colIndex]]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

                let photoGrids = null;
                if (field.hasPhotoUploads) {
                    const photosToRender = value.filter((row: any) => row.photos && row.photos.length > 0);
                    if (photosToRender.length > 0) {
                        photoGrids = <div key={`${field.id}-photos`}>{photosToRender.map((row: any, rowIndex: number) => { const firstColKey = Object.keys(row).filter(k => k !== 'photos' && k !== 'tooltips')[0]; const title = row[firstColKey] || `Activity Photos`; return <PhotoGridPreviewForPdf key={`photos-${field.id}-${rowIndex}`} photos={row.photos} title={title} theme={selectedTheme} /> })}</div>;
                    }
                }
                return <React.Fragment key={`${field.id}-wrapper`}>{tableElement}{photoGrids}</React.Fragment>;
            }
            case 'signature':
                return (
                    <div className="pt-8 pb-2 pdf-content-block" key={field.id}>
                        <p className="mb-1" style={labelStyle}>{field.label}</p>
                        <div className="grid grid-cols-2 gap-8 mt-4 text-sm">
                            <div className="col-span-1">
                                <p className="font-medium text-center pb-1 h-5" style={valueStyle}>{value?.name || ''}</p>
                                <div className="border-b w-full" style={{borderColor: selectedTheme.palette.foreground}}></div>
                                <p className="text-xs text-center pt-1" style={{color: selectedTheme.palette.secondary}}>Name</p>
                            </div>
                            <div className="col-span-1">
                                <p className="font-medium text-center pb-1 h-5" style={valueStyle}>{value?.date || ''}</p>
                                <div className="border-b w-full" style={{borderColor: selectedTheme.palette.foreground}}></div>
                                <p className="text-xs text-center pt-1" style={{color: selectedTheme.palette.secondary}}>Date</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!isOpen) return null;

    if (mode === 'pdf') {
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
                {isLoading && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
                        <div className="w-16 h-16 border-4 border-t-transparent border-red-600 rounded-full animate-spin"></div>
                        <p className="text-gray-700 text-lg mt-4">{loadingMessage}</p>
                    </div>
                )}
                <div className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                    <div className="flex-shrink-0 border-b border-gray-300 p-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Generate PDF Document</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition"><CloseIcon /></button>
                    </div>
                    <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                        <div className="w-full md:w-1/3 bg-white p-6 border-r border-gray-200 overflow-y-auto">
                            <label className="text-sm font-bold text-gray-600 mb-2 block">Theme Style</label>
                            <CustomSelect value={selectedTheme.name} onChange={(val) => setSelectedTheme(themes.find(t => t.name === val) || themes[0])}>
                                {themes.map(theme => (<option key={theme.name} value={theme.name}>{theme.name}</option>))}
                            </CustomSelect>
                        </div>
                        <div className="flex-grow bg-gray-50 overflow-y-auto">
                             <div id="pdf-preview-content" className="prose max-w-none p-8" style={{ 
                                 fontFamily: `'${selectedTheme.fontPair.body}', sans-serif`, 
                                 color: selectedTheme.palette.foreground, 
                                 background: selectedTheme.palette.background 
                             }}>
                               <div className="pdf-content-block">
                                    <h2 className="text-2xl font-bold text-center" style={{
                                        color: selectedTheme.palette.primary, 
                                        fontFamily: `'${selectedTheme.fontPair.heading}', serif`,
                                        textShadow: selectedTheme.category === 'Modern' ? '2px 2px 4px rgba(0,0,0,0.1)' : 'none'
                                    }}>{activeTemplate.title}</h2>
                               </div>
                                {activeTemplate.sections.map(section => (
                                    <div key={`preview-pdf-${section.id}`} className="mt-6">
                                        <div className="pdf-content-block">
                                            <h4 className="text-lg font-bold border-b pb-1 mb-3" style={{borderColor: selectedTheme.palette.accent, color: selectedTheme.palette.primary, fontFamily: `'${selectedTheme.fontPair.heading}', serif` }}>{section.title}</h4>
                                        </div>
                                        {section.fields.map(field => renderPreviewField(section.id, field))}
                                    </div>
                                ))}
                           </div>
                        </div>
                    </div>
                     <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-t border-gray-300 p-4 flex justify-end items-center gap-3">
                        <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                        <button onClick={generatePdf} disabled={isLoading} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 flex items-center gap-2">
                           <FilePdfIcon/> {isLoading ? 'Generating...' : 'Export .pdf'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // PPT Mode
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 sm:p-8" onClick={onClose}>
            {isLoading && (
                <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
                    <div className="w-16 h-16 border-4 border-t-transparent border-[var(--brand-gold)] rounded-full animate-spin"></div>
                    <p className="text-gray-700 text-lg mt-4">{loadingMessage}</p>
                </div>
            )}
            <div className="bg-gray-100 rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex-shrink-0 border-b border-gray-300 p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">Generate PowerPoint Presentation</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-gray-200 transition"><CloseIcon /></button>
                </div>

                <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                    {/* Left Panel: Customization */}
                    <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 border-r border-gray-200 overflow-y-auto space-y-6">

                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <GeminiIcon />
                                <label htmlFor="ai-toggle" className="text-sm font-bold text-blue-800">Enable AI Features</label>
                            </div>
                            <label htmlFor="ai-toggle" className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="ai-toggle" className="sr-only peer" checked={useAiFeatures} onChange={e => handleAiToggle(e.target.checked)} />
                                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>


                        <div>
                            <label className="text-sm font-bold text-gray-600 mb-2 block">Theme Style</label>
                            <div className="flex bg-gray-200 rounded-lg p-1">
                                <button onClick={() => setThemeCategory('Traditional')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${themeCategory === 'Traditional' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}>Traditional</button>
                                <button onClick={() => setThemeCategory('Modern')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors flex items-center justify-center gap-2 ${themeCategory === 'Modern' ? 'bg-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}><SparklesIcon /> Modern</button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-bold text-gray-600 mb-2 block">{themeCategory} Color Palette</label>
                            <CustomSelect value={selectedTheme.name} onChange={(val) => setSelectedTheme(themes.find(t => t.name === val) || themes[0])}>
                                {filteredThemes.map(theme => (
                                    <option key={theme.name} value={theme.name}>{theme.name}</option>
                                ))}
                            </CustomSelect>
                        </div>

                        <div className={!useAiFeatures ? 'opacity-50' : ''}>
                            <label className={`text-sm font-bold text-gray-600 mb-2 block flex items-center gap-2 ${!useAiFeatures ? 'cursor-not-allowed' : ''}`}>AI Visual Style <GeminiIcon /></label>
                            <CustomSelect value={aiVisualStyle} onChange={setAiVisualStyle} disabled={!useAiFeatures}>
                                <option value="minimalist">Minimalist</option>
                                <option value="corporate">Corporate</option>
                                <option value="artistic">Artistic</option>
                                <option value="storybook">Storybook</option>
                                <option value="data-driven">Data-Driven</option>
                                <option value="inspirational">Inspirational</option>
                                <option value="elegant">Elegant</option>
                                <option value="youthful">Youthful & Energetic</option>
                                <option value="formal">Formal & Official</option>
                                <option value="narrative">Narrative & Sequential</option>
                                <option value="impactful">Bold & Impactful</option>
                                <option value="reflective">Calm & Reflective</option>
                                <option value="community">Community-Focused</option>
                            </CustomSelect>
                        </div>

                        <div className={!useAiFeatures ? 'opacity-50' : ''}>
                            <label className={`text-sm font-bold text-gray-600 mb-3 block flex items-center gap-2 ${!useAiFeatures ? 'cursor-not-allowed' : ''}`}>Photo Options <GeminiIcon /></label>
                            <div className="space-y-3">
                               <RadioOption id="photo-original" name="photoOption" value="original" checked={photoOption === 'original'} onChange={setPhotoOption} label="Original Photos" disabled={!useAiFeatures && photoOption !== 'original'} />
                               <RadioOption id="photo-enhance" name="photoOption" value="enhance" checked={photoOption === 'enhance'} onChange={setPhotoOption} label="Auto-Enhance (Gemini)" disabled={!useAiFeatures} />
                               <RadioOption id="photo-remove-bg" name="photoOption" value="removeBg" checked={photoOption === 'removeBg'} onChange={setPhotoOption} label="Remove Background (Gemini)" disabled={!useAiFeatures} />
                            </div>
                        </div>

                    </div>

                    {/* Right Panel: Preview */}
                    <div className="flex-grow bg-gray-100 flex items-center justify-center p-6">
                        <ThemePreview theme={selectedTheme} title={activeTemplate.title} />
                    </div>
                </div>

                <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm border-t border-gray-300 p-4 flex justify-end items-center">
                    <div className="flex gap-3">
                        <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                        <button onClick={generatePptx} disabled={isLoading || !libsReady} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? loadingMessage : !libsReady ? 'Loading Libraries...' : 'Export .pptx'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ThemePreview: React.FC<{ theme: Theme, title: string }> = ({ theme, title }) => {
    return (
        <div className="w-full max-w-lg">
            <h3 className="text-center text-sm font-bold text-gray-600 mb-2">Theme Preview</h3>
            <div
                className="aspect-[16/9] w-full rounded-lg shadow-lg flex flex-col justify-center items-center p-8 text-center"
                style={{
                    background: theme.gradient[0] || theme.palette.primary,
                    color: theme.palette.background,
                }}
            >
                <h4 className="text-2xl font-bold" style={{ fontFamily: `'${theme.fontPair.heading}', serif` }}>
                    {title}
                </h4>
                <p className="text-sm mt-4 opacity-80" style={{ fontFamily: `'${theme.fontPair.body}', sans-serif` }}>
                    Theme: {theme.name}
                </p>
                <div className="flex gap-3 mt-8">
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.palette.primary }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.palette.secondary }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.palette.accent }}></div>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: theme.palette.foreground }}></div>
                </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">This is a simplified preview of your selected color theme. The final presentation will include all your data and content.</p>
        </div>
    );
};

const CustomSelect: React.FC<{ children: React.ReactNode, value: string, onChange: (val: string) => void, disabled?: boolean }> = ({ children, value, onChange, disabled }) => (
    <div className="relative">
        <select value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`w-full appearance-none border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 transition ${disabled ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'bg-white text-gray-700'}`}>
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon open={false} />
        </div>
    </div>
);

const RadioOption: React.FC<{ id: string, name: string, value: string, checked: boolean, onChange: (val: any) => void, label: string, disabled?: boolean }> = ({ id, name, value, checked, onChange, label, disabled }) => (
    <label htmlFor={id} className={`flex items-center p-3 border rounded-lg transition ${disabled ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'cursor-pointer'} ${checked ? 'bg-orange-50 border-orange-500' : 'bg-white hover:border-gray-400'}`}>
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={e => onChange(e.target.value)} disabled={disabled} className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500 disabled:opacity-50" />
        <span className={`ml-3 text-sm font-medium ${checked ? 'text-orange-900' : (disabled ? 'text-gray-400' : 'text-gray-700')}`}>{label}</span>
    </label>
);