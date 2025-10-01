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
     * Normalize numeric values by removing currency symbols and commas
     * Handles accounting parentheses as negatives: "(500)" becomes -500
     */
    private normalizeNumber(value: any): number {
        if (value == null) return NaN;
        
        const str = String(value).trim();
        
        // Check if wrapped in parentheses (accounting notation for negative)
        const isNegative = /^\(.*\)$/.test(str);
        
        // Remove currency symbols, commas, spaces, and parentheses
        const cleaned = str.replace(/[$,\s]/g, '').replace(/[()]/g, '');
        
        const num = parseFloat(cleaned);
        
        // Apply negative sign if parentheses were present
        return isNegative ? -Math.abs(num) : num;
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
            
            // Build stable column key mapping: Try exact match, then case-insensitive, then fallback to index
            const getColumnValue = (row: any, header: string, headerIndex: number): string => {
                // Try exact match
                if (row.hasOwnProperty(header)) return String(row[header] ?? '');
                
                // Try case-insensitive match
                const lowerHeader = header.toLowerCase();
                const matchingKey = Object.keys(row).find(k => k.toLowerCase() === lowerHeader);
                if (matchingKey) return String(row[matchingKey] ?? '');
                
                // Fallback: use index position (excluding special keys)
                const dataKeys = Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos');
                if (headerIndex < dataKeys.length) {
                    return String(row[dataKeys[headerIndex]] ?? '');
                }
                
                return '';
            };
            
            const rows = tableData.map((row: any) => 
                headers.map((header: string, idx: number) => getColumnValue(row, header, idx))
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
            
            // Check for photos in table rows - paginate if more than 4
            const tablePhotos = tableData.flatMap((row: any) => row.photos || []).filter(Boolean);
            if (tablePhotos.length > 0) {
                // Create multiple slides for photos (4 per slide)
                for (let i = 0; i < tablePhotos.length; i += 4) {
                    const pagePhotos = tablePhotos.slice(i, i + 4);
                    const pageNum = Math.floor(i / 4) + 1;
                    const totalPages = Math.ceil(tablePhotos.length / 4);
                    
                    slides.push({
                        id: `${section.id}-table-photos-${fieldIndex}-page${pageNum}`,
                        title: `${field.label || section.title} - Photos${totalPages > 1 ? ` (${pageNum}/${totalPages})` : ''}`,
                        layout: 'photoGrid',
                        data: {
                            images: pagePhotos
                        },
                        originalLayout: {}
                    });
                }
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
        
        // Create slides from photo fields - paginate if more than 4
        photos.forEach((field, fieldIndex) => {
            const photoData = sectionData[field.id];
            if (!photoData || !Array.isArray(photoData) || photoData.length === 0) return;
            
            // Create multiple slides for photos (4 per slide)
            for (let i = 0; i < photoData.length; i += 4) {
                const pagePhotos = photoData.slice(i, i + 4);
                const pageNum = Math.floor(i / 4) + 1;
                const totalPages = Math.ceil(photoData.length / 4);
                
                slides.push({
                    id: `${section.id}-photos-${fieldIndex}-page${pageNum}`,
                    title: `${field.label || section.title}${totalPages > 1 ? ` (${pageNum}/${totalPages})` : ''}`,
                    layout: 'photoGrid',
                    data: {
                        images: pagePhotos
                    },
                    originalLayout: {}
                });
            }
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
        
        // Helper to get column value by header (stable)
        const getColumnValue = (row: any, header: string, headerIndex: number): any => {
            if (row.hasOwnProperty(header)) return row[header];
            const lowerHeader = header.toLowerCase();
            const matchingKey = Object.keys(row).find(k => k.toLowerCase() === lowerHeader);
            if (matchingKey) return row[matchingKey];
            const dataKeys = Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos');
            return headerIndex < dataKeys.length ? row[dataKeys[headerIndex]] : null;
        };
        
        // Find first numeric column for charting
        let labelColIndex = 0;
        let valueColIndex = -1;
        
        for (let i = 1; i < headers.length; i++) {
            const hasNumeric = tableData.some(row => {
                const val = getColumnValue(row, headers[i], i);
                return val != null && !isNaN(this.normalizeNumber(val));
            });
            
            if (hasNumeric) {
                valueColIndex = i;
                break;
            }
        }
        
        if (valueColIndex === -1) return null;
        
        // Extract chart data using stable column access with normalized numbers
        const chartData = tableData.map(row => ({
            label: String(getColumnValue(row, headers[labelColIndex], labelColIndex) ?? ''),
            value: this.normalizeNumber(getColumnValue(row, headers[valueColIndex], valueColIndex))
        })).filter(item => {
            // Filter out summary rows, empty labels, and NaN values
            const label = item.label.toLowerCase();
            return item.label && 
                   !isNaN(item.value) &&
                   label !== 'total' && 
                   label !== 'net surplus / (deficit)' &&
                   label !== 'grand total';
        });
        
        if (chartData.length === 0 || chartData.every(item => item.value === 0)) return null;
        
        const labels = chartData.map(item => item.label);
        const values = chartData.map(item => item.value);
        
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
                if (field.type === FieldType.TABLE && field.columns) {
                    const tableData = sectionData[field.id];
                    if (!Array.isArray(tableData) || !field.columns) return;
                    
                    const headers = field.columns;
                    
                    // Helper to get column value by header (stable)
                    const getColumnValue = (row: any, header: string, headerIndex: number): any => {
                        if (row.hasOwnProperty(header)) return row[header];
                        const lowerHeader = header.toLowerCase();
                        const matchingKey = Object.keys(row).find(k => k.toLowerCase() === lowerHeader);
                        if (matchingKey) return row[matchingKey];
                        const dataKeys = Object.keys(row).filter(k => k !== 'tooltips' && k !== 'photos');
                        return headerIndex < dataKeys.length ? row[dataKeys[headerIndex]] : null;
                    };
                    
                    // Look for total rows using stable column access
                    const totalRow = tableData.find(row => {
                        const labelValue = String(getColumnValue(row, headers[0], 0) ?? '').toLowerCase();
                        return labelValue.includes('total') || labelValue.includes('surplus') || labelValue.includes('deficit');
                    });
                    
                    if (totalRow) {
                        // Find first numeric column
                        for (let i = 1; i < headers.length; i++) {
                            const value = getColumnValue(totalRow, headers[i], i);
                            const numValue = this.normalizeNumber(value);
                            
                            if (!isNaN(numValue)) {
                                kpis.push({
                                    value: numValue,
                                    label: field.label || headers[i]
                                });
                                break; // Only take first numeric value per table
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
        // This method is no longer needed as photos are paginated per section
        // Keeping it as null to avoid creating duplicate summary photo slides
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
