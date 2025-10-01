import type { ReportTemplate, FormSection, FormField, SlideLayout, Theme } from '../types';
import { FieldType } from '../types';

export interface ResolvedSlide {
    id: string;
    title: string;
    layout: SlideLayout['layout'];
    data: any;
    originalLayout: {
        generativeIconPrompt?: string;
        suggestedChart?: {
            chartType: 'pie' | 'bar' | 'line';
            dataPath: string;
        };
    };
}

/**
 * Universal slide plan resolver that generates slides for any template
 * by analyzing its structure and data
 */
export class SlidePlanResolver {
    private template: ReportTemplate;
    private formData: any;
    
    constructor(template: ReportTemplate, formData: any) {
        this.template = template;
        this.formData = formData;
    }

    /**
     * Generate all slides for the template
     */
    resolve(): ResolvedSlide[] {
        const slides: ResolvedSlide[] = [];
        
        // 1. Title slide from header section
        const titleSlide = this.createTitleSlide();
        if (titleSlide) slides.push(titleSlide);
        
        // 2. Process each section
        this.template.sections.forEach((section, sectionIndex) => {
            // Skip header section (already used for title)
            if (section.id === 'header') return;
            
            // Skip signature section (not needed in presentations)
            if (section.id === 'signatures') return;
            
            const sectionSlides = this.createSlidesForSection(section, sectionIndex);
            slides.push(...sectionSlides);
        });
        
        // 3. Create summary slide if we have numeric data
        const summarySlide = this.createSummarySlide();
        if (summarySlide) slides.push(summarySlide);
        
        // 4. Create photo grid slide if we have photos
        const photoSlide = this.createPhotoGridSlide();
        if (photoSlide) slides.push(photoSlide);
        
        return slides;
    }

    private createTitleSlide(): ResolvedSlide | null {
        const headerData = this.formData['header'] || {};
        
        // Find common header fields
        const quarter = headerData['quarter'] || headerData['reportingQuarter'] || '';
        const preparedBy = headerData['preparedBy'] || headerData['reportingLeader'] || '';
        
        return {
            id: `title-${this.template.key}`,
            title: this.template.title,
            layout: 'title',
            data: {
                subtitle: quarter,
                author: preparedBy
            },
            originalLayout: {}
        };
    }

    private createSlidesForSection(section: FormSection, sectionIndex: number): ResolvedSlide[] {
        const slides: ResolvedSlide[] = [];
        const sectionData = this.formData[section.id] || {};
        
        // Group fields by type
        const tables = section.fields.filter(f => f.type === FieldType.TABLE);
        const bullets = section.fields.filter(f => f.type === FieldType.BULLET);
        const photos = section.fields.filter(f => f.type === FieldType.PHOTOS);
        const textFields = section.fields.filter(f => 
            [FieldType.TEXT, FieldType.TEXTAREA, FieldType.NUMBER, FieldType.DATE].includes(f.type as FieldType)
        );
        
        // Create table slides
        tables.forEach((field, fieldIndex) => {
            const tableData = sectionData[field.id];
            if (!tableData || !Array.isArray(tableData) || tableData.length === 0) return;
            
            const headers = field.columns || [];
            const rows = tableData.map((row: any) => 
                headers.map((header: string) => {
                    const colKey = Object.keys(row).find(k => 
                        (field.columns || []).indexOf(header) === Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos').indexOf(k)
                    );
                    return row[colKey] ?? '';
                })
            );
            
            // Create table slide
            slides.push({
                id: `${section.id}-table-${fieldIndex}`,
                title: field.label || section.title,
                layout: 'twoColumn',
                data: {
                    table: { headers, rows }
                },
                originalLayout: {
                    generativeIconPrompt: this.getIconPromptForSection(section)
                }
            });
            
            // Check if table is chartable (has numeric data)
            const chartSlide = this.createChartFromTable(field, tableData, section, fieldIndex);
            if (chartSlide) slides.push(chartSlide);
            
            // Check for photos in table rows
            const tablePhotos = tableData.flatMap((row: any) => row.photos || []).filter(Boolean);
            if (tablePhotos.length > 0) {
                slides.push({
                    id: `${section.id}-table-photos-${fieldIndex}`,
                    title: `${field.label || section.title} - Photos`,
                    layout: 'photoGrid',
                    data: {
                        images: tablePhotos.slice(0, 4)
                    },
                    originalLayout: {}
                });
            }
        });
        
        // Create slides from bullet fields
        bullets.forEach((field, fieldIndex) => {
            const bulletData = sectionData[field.id];
            if (!bulletData || !Array.isArray(bulletData) || bulletData.filter(Boolean).length === 0) return;
            
            slides.push({
                id: `${section.id}-bullet-${fieldIndex}`,
                title: field.label || section.title,
                layout: 'imageLeftTextRight',
                data: {
                    list: bulletData.filter(Boolean),
                    image: null
                },
                originalLayout: {
                    generativeIconPrompt: this.getIconPromptForSection(section)
                }
            });
        });
        
        // Create slides from photo fields
        photos.forEach((field, fieldIndex) => {
            const photoData = sectionData[field.id];
            if (!photoData || !Array.isArray(photoData) || photoData.length === 0) return;
            
            slides.push({
                id: `${section.id}-photos-${fieldIndex}`,
                title: field.label || section.title,
                layout: 'photoGrid',
                data: {
                    images: photoData.slice(0, 4)
                },
                originalLayout: {}
            });
        });
        
        // Create text summary slide if we have text fields
        if (textFields.length > 0) {
            const textList = textFields
                .map(f => {
                    const value = sectionData[f.id];
                    if (!value) return null;
                    return `${f.label}: ${value}`;
                })
                .filter(Boolean);
            
            if (textList.length > 0) {
                slides.push({
                    id: `${section.id}-text-summary`,
                    title: section.title,
                    layout: 'imageLeftTextRight',
                    data: {
                        list: textList,
                        image: null
                    },
                    originalLayout: {
                        generativeIconPrompt: this.getIconPromptForSection(section)
                    }
                });
            }
        }
        
        return slides;
    }

    private createChartFromTable(field: FormField, tableData: any[], section: FormSection, fieldIndex: number): ResolvedSlide | null {
        if (!field.columns || field.columns.length < 2) return null;
        
        const headers = field.columns;
        const labelCol = headers[0];
        const valueCol = headers[1];
        
        // Check if second column has numeric data
        const hasNumericData = tableData.some(row => {
            const value = row[Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos')[1]];
            return !isNaN(parseFloat(value));
        });
        
        if (!hasNumericData) return null;
        
        // Extract chart data
        const labels = tableData.map(row => 
            row[Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos')[0]] || ''
        ).filter(label => label !== 'Total' && label !== 'Net Surplus / (Deficit)' && label);
        
        const values = tableData.map(row => {
            const val = row[Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos')[1]];
            return parseFloat(val) || 0;
        }).slice(0, labels.length);
        
        if (labels.length === 0 || values.every(v => v === 0)) return null;
        
        // Determine chart type
        const chartType = values.length > 5 ? 'bar' : 'pie';
        
        return {
            id: `${section.id}-chart-${fieldIndex}`,
            title: `${field.label || section.title} - Chart`,
            layout: 'chartFull',
            data: {
                chart: {
                    chartType,
                    data: { labels, values }
                }
            },
            originalLayout: {
                generativeIconPrompt: `A ${chartType} chart icon representing data visualization`,
                suggestedChart: {
                    chartType,
                    dataPath: `$.${section.id}.${field.id}`
                }
            }
        };
    }

    private createSummarySlide(): ResolvedSlide | null {
        const kpis: Array<{value: any, label: string}> = [];
        
        // Look for numeric summary data in all sections
        this.template.sections.forEach(section => {
            if (section.id === 'header' || section.id === 'signatures') return;
            
            const sectionData = this.formData[section.id] || {};
            
            section.fields.forEach(field => {
                if (field.type === FieldType.TABLE) {
                    const tableData = sectionData[field.id];
                    if (!Array.isArray(tableData)) return;
                    
                    // Look for total rows or summary rows
                    const totalRow = tableData.find(row => {
                        const firstValue = Object.values(row)[0];
                        return String(firstValue).toLowerCase().includes('total');
                    });
                    
                    if (totalRow) {
                        const keys = Object.keys(totalRow).filter(k => k !== 'tooltips' && k !== 'photos');
                        if (keys.length >= 2) {
                            const value = totalRow[keys[1]];
                            if (value && !isNaN(parseFloat(value))) {
                                kpis.push({
                                    value: parseFloat(value),
                                    label: field.label || keys[1]
                                });
                            }
                        }
                    }
                }
            });
        });
        
        // Only create summary if we have 2-4 KPIs
        if (kpis.length >= 2 && kpis.length <= 4) {
            return {
                id: `summary-${this.template.key}`,
                title: 'Executive Summary',
                layout: 'summary',
                data: { kpis: kpis.slice(0, 4) },
                originalLayout: {
                    generativeIconPrompt: 'A minimalist icon representing key performance metrics and summary statistics'
                }
            };
        }
        
        return null;
    }

    private createPhotoGridSlide(): ResolvedSlide | null {
        const allPhotos: string[] = [];
        
        // Collect all photos from all sections
        this.template.sections.forEach(section => {
            const sectionData = this.formData[section.id] || {};
            
            section.fields.forEach(field => {
                if (field.type === FieldType.PHOTOS) {
                    const photos = sectionData[field.id];
                    if (Array.isArray(photos)) {
                        allPhotos.push(...photos);
                    }
                }
                
                if (field.type === FieldType.TABLE && field.hasPhotoUploads) {
                    const tableData = sectionData[field.id];
                    if (Array.isArray(tableData)) {
                        tableData.forEach(row => {
                            if (row.photos && Array.isArray(row.photos)) {
                                allPhotos.push(...row.photos);
                            }
                        });
                    }
                }
            });
        });
        
        // Only create if we have photos
        if (allPhotos.length > 0) {
            return {
                id: `photos-${this.template.key}`,
                title: 'Quarter in Pictures',
                layout: 'photoGrid',
                data: {
                    images: allPhotos.slice(0, 4)
                },
                originalLayout: {}
            };
        }
        
        return null;
    }

    private getIconPromptForSection(section: FormSection): string {
        const sectionTitle = section.title.toLowerCase();
        
        // Map common section types to icon prompts
        if (sectionTitle.includes('financial') || sectionTitle.includes('treasury') || sectionTitle.includes('receipt') || sectionTitle.includes('disbursement')) {
            return 'A clean, modern icon representing financial data and monetary transactions';
        }
        if (sectionTitle.includes('membership') || sectionTitle.includes('attendance')) {
            return 'A simple icon representing people and community engagement';
        }
        if (sectionTitle.includes('program') || sectionTitle.includes('activities') || sectionTitle.includes('ministries')) {
            return 'An icon representing programs, activities, and ministry work';
        }
        if (sectionTitle.includes('youth') || sectionTitle.includes('children')) {
            return 'A friendly icon representing youth and children programs';
        }
        if (sectionTitle.includes('outreach') || sectionTitle.includes('mission')) {
            return 'An icon representing community outreach and mission work';
        }
        
        return 'A professional icon representing church ministry and administration';
    }
}

/**
 * Get resolved slides for a template
 */
export function getResolvedSlides(template: ReportTemplate, formData: any): ResolvedSlide[] {
    const resolver = new SlidePlanResolver(template, formData);
    return resolver.resolve();
}
