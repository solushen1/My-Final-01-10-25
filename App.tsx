

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { reportTemplates as defaultTemplates } from './components/reportTemplates';
import type { ReportTemplate, FormField, FormSection, ReportTemplates, Theme, SavedReport } from './types';
import { FieldType } from './types';
import { DownloadIcon, BackIcon, EditIcon, DocumentTextIcon, ChevronDownIcon, TrashIcon, PlusIcon, CloneIcon, SaveIcon, SettingsIcon, PencilIcon, CameraIcon, InfoIcon, PresentationIcon, FilePdfIcon, LoadIcon } from './components/icons';
import { themes as defaultThemes } from './components/themes';
import { PreviewModal } from './components/PreviewModal';

const getTooltipPosition = (index: number, total: number): 'right' | 'top-right' | 'bottom-right' => {
    if (total <= 2) return 'right';
    if (index === 0) return 'bottom-right';
    if (index === total - 1) return 'top-right';
    return 'right';
}

const Tooltip: React.FC<{
    content: string;
    id: string;
    activeTooltip: string | null;
    setActiveTooltip: (id: string | null) => void;
    position: 'right' | 'top-right' | 'bottom-right';
}> = ({ content, id, activeTooltip, setActiveTooltip, position }) => {
    if (!content) return null;

    const isOpen = activeTooltip === id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveTooltip(isOpen ? null : id);
    };

    let positionClasses = '';
    switch (position) {
        case 'bottom-right':
            positionClasses = 'absolute left-full top-full ml-2 mt-1 origin-top-left';
            break;
        case 'top-right':
            positionClasses = 'absolute left-full bottom-full ml-2 mb-1 origin-bottom-left';
            break;
        case 'right':
        default:
            positionClasses = 'absolute left-full top-1/2 -translate-y-1/2 ml-2 origin-left';
            break;
    }

    const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
    // For tooltips with more than 4 words, reduce max-width from 20rem (max-w-xs) to 14rem (max-w-56) to make them narrower.
    const widthClass = wordCount > 4 ? 'max-w-56' : 'max-w-xs';

    return (
        <div className="relative flex items-center" onClick={e => e.stopPropagation()}>
            <button
                type="button"
                onClick={handleClick}
                className="text-gray-400 hover:text-[var(--brand-teal)] transition"
                aria-label="Show information"
            >
                <InfoIcon />
            </button>
            <div
                className={`
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'} 
                    ${positionClasses} 
                    transition-all duration-150
                    w-max ${widthClass} bg-gray-800 text-white text-xs rounded py-1 px-2 z-50 shadow-lg whitespace-pre-wrap`}
                role="tooltip"
            >
                {content}
            </div>
        </div>
    );
};

const PhotoGridPreview: React.FC<{ photos: string[], title: string }> = ({ photos, title }) => {
    if (!photos || photos.length === 0) return null;

    const renderPhoto = (src: string, alt: string, className: string) => (
        <img src={src} alt={alt} className={className} />
    );

    const photoHeader = <h4 className="text-sm font-semibold text-gray-800 mt-4 mb-2 text-center">{title} Photos</h4>;

    return (
        <div className="mb-2 space-y-2">
            {photos.length === 1 && (
                <div>
                    {photoHeader}
                    <div className="flex justify-center">
                        {renderPhoto(photos[0], `${title}-0`, "max-h-[500px] max-w-full object-contain")}
                    </div>
                </div>
            )}
            {photos.length === 2 && (
                <div>
                    {photoHeader}
                    <div className="grid grid-cols-2 gap-2 items-start">
                        {renderPhoto(photos[0], `${title}-0`, "w-full")}
                        {renderPhoto(photos[1], `${title}-1`, "w-full")}
                    </div>
                </div>
            )}
            {photos.length === 3 && (
                <>
                    <div>
                        {photoHeader}
                        <div className="grid grid-cols-2 gap-2 items-start">
                            {renderPhoto(photos[0], `${title}-0`, "w-full")}
                            {renderPhoto(photos[1], `${title}-1`, "w-full")}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center">
                            {renderPhoto(photos[2], `${title}-2`, "max-h-[500px] max-w-full object-contain")}
                        </div>
                    </div>
                </>
            )}
            {photos.length === 4 && (
                <>
                    <div>
                        {photoHeader}
                        <div className="grid grid-cols-2 gap-2 items-start">
                            {renderPhoto(photos[0], `${title}-0`, "w-full")}
                            {renderPhoto(photos[1], `${title}-1`, "w-full")}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {renderPhoto(photos[2], `${title}-2`, "w-full")}
                        {renderPhoto(photos[3], `${title}-3`, "w-full")}
                    </div>
                </>
            )}
        </div>
    );
};


const App: React.FC = () => {
    const [page, setPage] = useState<'home' | 'builder' | 'manageTemplates' | 'editTemplate'>('home');
    const [templates, setTemplates] = useState<ReportTemplates>({});
    const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | null>(null);

    const [selectedTemplateKey, setSelectedTemplateKey] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

    const [previewModalMode, setPreviewModalMode] = useState<'pdf' | 'ppt' | null>(null);
    const [themes] = useState(defaultThemes);
    const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
    const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);

    // Memoized sorted templates
    const sortedTemplates = useMemo(() => {
        // FIX: Explicitly type sort parameters to prevent them from being inferred as 'unknown'.
        return Object.values(templates).sort((a: ReportTemplate, b: ReportTemplate) => a.name.localeCompare(b.name));
    }, [templates]);

    // Load templates and saved reports from localStorage or use defaults
    useEffect(() => {
        try {
            const storedTemplates = localStorage.getItem('report_templates');
            if (storedTemplates) {
                setTemplates(JSON.parse(storedTemplates));
            } else {
                setTemplates(defaultTemplates);
                localStorage.setItem('report_templates', JSON.stringify(defaultTemplates));
            }
            const storedReports = localStorage.getItem('saved_reports');
            if (storedReports) {
                setSavedReports(JSON.parse(storedReports));
            }
        } catch (error) {
            console.error("Could not load saved data:", error);
            setTemplates(defaultTemplates);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.closest('input, textarea, select')) {
                return;
            }
            setActiveTooltip(null);
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const saveTemplates = (updatedTemplates: ReportTemplates) => {
        setTemplates(updatedTemplates);
        localStorage.setItem('report_templates', JSON.stringify(updatedTemplates));
    };

    const activeTemplate: ReportTemplate | undefined = selectedTemplateKey ? templates[selectedTemplateKey] : undefined;

    const handleSelectTemplate = (key: string) => {
        if (!key) return;

        const selectedTemplate = templates[key];
        if (selectedTemplate) {
            // Initialize form data for a new report
            const initialData: any = {};
            selectedTemplate.sections.forEach(section => {
                initialData[section.id] = {};
                section.fields.forEach(field => {
                    if (field.type === 'table' && field.rows) {
                        initialData[section.id][field.id] = field.rows.map(row => {
                            const newRow = { ...row };
                            if (field.hasPhotoUploads) {
                                newRow.photos = [];
                            }
                            return newRow;
                        });
                    } else if (field.type === 'signature') {
                        initialData[section.id][field.id] = { name: '', date: '' };
                    } else if (field.type === FieldType.PHOTOS) {
                        initialData[section.id][field.id] = [];
                    } else {
                        initialData[section.id][field.id] = field.defaultValue || '';
                    }
                });
            });
            setFormData(initialData);
            setActiveSection(selectedTemplate.sections[0]?.id || null);
        }
        
        setSelectedTemplateKey(key);
        setPage('builder');
    };


    const handleBackToHome = () => {
        setPage('home');
        setSelectedTemplateKey(null);
        setFormData({});
        setEditingTemplate(null);
    };

    const handleGoToManageTemplates = () => {
        setPage('manageTemplates');
    };

    const handleEditTemplate = (key: string) => {
        const templateToEdit = templates[key];
        if (templateToEdit) {
            setEditingTemplate(JSON.parse(JSON.stringify(templateToEdit))); // Deep copy for editing
            setPage('editTemplate');
        }
    };

    const handleDeleteTemplate = (key: string) => {
        if(window.confirm(`Are you sure you want to delete the "${templates[key].name}" template? This cannot be undone.`)){
            const newTemplates = {...templates};
            delete newTemplates[key];
            saveTemplates(newTemplates);
        }
    }

    const handleSaveTemplate = (updatedTemplate: ReportTemplate) => {
        const newTemplates = { ...templates, [updatedTemplate.key]: updatedTemplate };
        saveTemplates(newTemplates);
        setPage('manageTemplates');
        setEditingTemplate(null);
    };
    
    // --- Saved Report Handlers ---
    const saveCurrentReport = () => {
        if (!selectedTemplateKey || !templates[selectedTemplateKey]) return;

        const now = new Date();
        const newReport: SavedReport = {
            id: `report-${now.getTime()}`,
            templateKey: selectedTemplateKey,
            formData: formData,
            savedAt: now.toISOString(),
            reportName: `${templates[selectedTemplateKey].name} - ${now.toLocaleString()}`
        };

        const updatedReports = [newReport, ...savedReports];
        setSavedReports(updatedReports);
        localStorage.setItem('saved_reports', JSON.stringify(updatedReports));
        
        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);
    };

    const loadReport = (reportId: string) => {
        const reportToLoad = savedReports.find(r => r.id === reportId);
        if (reportToLoad) {
            setSelectedTemplateKey(reportToLoad.templateKey);
            setFormData(reportToLoad.formData);
            setPage('builder');
            setActiveSection(templates[reportToLoad.templateKey]?.sections[0]?.id || null);
        }
    };

    const deleteReport = (reportId: string) => {
        const reportToDelete = savedReports.find(r => r.id === reportId);
        if (reportToDelete && window.confirm(`Are you sure you want to delete "${reportToDelete.reportName.split(' - ')[0]}"?`)) {
            const updatedReports = savedReports.filter(r => r.id !== reportId);
            setSavedReports(updatedReports);
            localStorage.setItem('saved_reports', JSON.stringify(updatedReports));
        }
    };

    // --- Input Handlers ---
    const handleInputChange = (sectionId: string, fieldId: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [fieldId]: value,
            },
        }));
    };
    
    const handleSignatureChange = (sectionId: string, fieldId: string, part: 'name' | 'date', newValue: string) => {
        setFormData(prev => {
            const currentSignature = prev[sectionId]?.[fieldId] || {};
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [fieldId]: {
                        ...currentSignature,
                        [part]: newValue
                    }
                }
            };
        });
    };

    const handleTableInputChange = (sectionId: string, fieldId: string, rowIndex: number, colKey: string, value: string) => {
        setFormData((prev: any) => {
            const newTableData = [...prev[sectionId][fieldId]];
            newTableData[rowIndex] = { ...newTableData[rowIndex], [colKey]: value };
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [fieldId]: newTableData,
                },
            };
        });
    };
    
     const handleTablePhotoChange = (sectionId: string, fieldId: string, rowIndex: number, newPhotos: string[]) => {
        setFormData((prev: any) => {
            const newTableData = [...prev[sectionId][fieldId]];
            newTableData[rowIndex] = { ...newTableData[rowIndex], photos: newPhotos };
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [fieldId]: newTableData,
                },
            };
        });
    };

    const handleBulletChange = (sectionId: string, fieldId: string, index: number, value: string) => {
         setFormData((prev: any) => {
            const newBullets = [...(prev[sectionId][fieldId] || [''])];
            newBullets[index] = value;
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    [fieldId]: newBullets
                }
            };
        });
    };

    const addBullet = (sectionId: string, fieldId: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [fieldId]: [...(prev[sectionId][fieldId] || ['']), '']
            }
        }));
    };

    const removeBullet = (sectionId: string, fieldId: string, index: number) => {
        setFormData((prev: any) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                [fieldId]: (prev[sectionId][fieldId] || []).filter((_: any, i: number) => i !== index)
            }
        }));
    };

    // --- RENDER FUNCTIONS ---
    const renderField = (section: FormSection, field: FormField, index: number, totalFields: number) => {
        const sectionId = section.id;
        const value = formData[sectionId]?.[field.id];
        const position = getTooltipPosition(index, totalFields);
        const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
    
        const isDepartmentDetails = section.title.toLowerCase().includes('department details');
    
        // Exception for "Department Details" - keep original layout
        if (isDepartmentDetails) {
            switch (field.type) {
                case 'bullet':
                    const bullets = formData[sectionId]?.[field.id] || [''];
                    return (
                        <div className="mb-4" key={field.id}>
                             <div className="flex items-center gap-2 mb-2">
                                <label className="block text-gray-700 text-sm font-bold">{field.label}</label>
                                 {field.tooltip && <Tooltip id={`${sectionId}-${field.id}`} content={field.tooltip} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} position={position} />}
                            </div>
                            {bullets.map((bullet: string, index: number) => (
                                <div key={index} className="flex items-center mb-2">
                                    <span className="mr-2 text-gray-500">•</span>
                                    <input
                                        type="text"
                                        value={bullet}
                                        onChange={(e) => handleBulletChange(sectionId, field.id, index, e.target.value)}
                                        onClick={stopPropagation}
                                        className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition"
                                        placeholder={`Point ${index + 1}`}
                                    />
                                    <button onClick={() => removeBullet(sectionId, field.id, index)} className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full transition">
                                        <TrashIcon />
                                    </button>
                                </div>
                            ))}
                             <button onClick={() => addBullet(sectionId, field.id)} className="mt-2 text-sm text-[var(--brand-gold)] hover:underline font-semibold">+ Add Point</button>
                        </div>
                    );
                default:
                    return null;
            }
        }
    
        // New layout for all other fields
        const fieldTooltip = field.tooltip ? <Tooltip id={`${sectionId}-${field.id}`} content={field.tooltip} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} position={position} /> : null;

        switch (field.type) {
            case 'text':
            case 'number':
            case 'date':
                return (
                    <div className="mb-4" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-center gap-2">
                            {fieldTooltip}
                            <input
                                type={field.type}
                                value={value || ''}
                                onChange={(e) => handleInputChange(sectionId, field.id, e.target.value)}
                                onClick={stopPropagation}
                                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition"
                                placeholder={field.placeholder || ''}
                            />
                        </div>
                    </div>
                );
            case 'textarea':
                 return (
                    <div className="mb-4" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-start gap-2">
                            {fieldTooltip}
                            <textarea
                                value={value || ''}
                                onChange={(e) => handleInputChange(sectionId, field.id, e.target.value)}
                                onClick={stopPropagation}
                                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] min-h-[100px] transition"
                                placeholder={field.placeholder || ''}
                            />
                        </div>
                    </div>
                );
            case FieldType.PHOTOS:
                return (
                    <div className="mb-6" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-start gap-2">
                             {fieldTooltip}
                             <div className="w-full">
                                <PhotoUploader
                                    value={value || []}
                                    onChange={(newPhotos) => handleInputChange(sectionId, field.id, newPhotos)}
                                />
                             </div>
                        </div>
                    </div>
                );
            case 'bullet':
                const bullets = formData[sectionId]?.[field.id] || [''];
                return (
                    <div className="mb-4" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-start gap-2">
                             {fieldTooltip}
                             <div className="w-full">
                                {bullets.map((bullet: string, index: number) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <span className="mr-2 text-gray-500">•</span>
                                        <input
                                            type="text"
                                            value={bullet}
                                            onChange={(e) => handleBulletChange(sectionId, field.id, index, e.target.value)}
                                            onClick={stopPropagation}
                                            className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition"
                                            placeholder={`Point ${index + 1}`}
                                        />
                                        <button onClick={() => removeBullet(sectionId, field.id, index)} className="ml-2 text-red-500 hover:text-red-700 p-1 rounded-full transition">
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                                 <button onClick={() => addBullet(sectionId, field.id)} className="mt-2 text-sm text-[var(--brand-gold)] hover:underline font-semibold">+ Add Point</button>
                             </div>
                        </div>
                    </div>
                );
            case 'table':
                const tableData = value || [];
                // For simple 2-column key-value tables, render as a list for better layout.
                if (field.columns?.length === 2 && !field.editableFirstColumn) {
                    const firstRow = field.rows?.[0];
            
                    if (firstRow) {
                        const keys = Object.keys(firstRow).filter(k => k !== 'tooltips');
                        if (keys.length === 2) {
                            const keyProperty = keys[0];
                            const valueProperty = keys[1];
            
                            return (
                                <div className="mb-4" key={field.id}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                                    <div className="flex items-start gap-2">
                                        {fieldTooltip}
                                        <div className="w-full space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                                            {tableData.map((row: any, rowIndex: number) => {
                                                const rowTooltip = row.tooltips?.[valueProperty] ? <Tooltip id={`${sectionId}-${field.id}-${rowIndex}`} content={row.tooltips[valueProperty]} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} position='right' /> : null;
                                                return (
                                                    <div key={rowIndex}>
                                                        <label className="block text-gray-700 text-sm font-medium mb-1">{row[keyProperty]}</label>
                                                        <div className="flex items-center gap-2">
                                                            {rowTooltip}
                                                            <input
                                                                type={typeof row[valueProperty] === 'number' ? 'number' : 'text'}
                                                                value={row[valueProperty]}
                                                                onChange={(e) => handleTableInputChange(sectionId, field.id, rowIndex, valueProperty, e.target.value)}
                                                                onClick={stopPropagation}
                                                                className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    }
                }
            
                // Default rendering for complex tables: render each row as a "card".
                const columns = field.columns || [];
    
                return (
                    <div className="mb-6" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-start gap-2">
                            {fieldTooltip}
                            <div className="w-full space-y-6">
                                {tableData.map((row: any, rowIndex: number) => {
                                    const rowKeys = Object.keys(row).filter(k => k !== 'photos' && k !== 'tooltips');
                                    const firstColKey = rowKeys[0];
                                    const firstColIsTitle = !field.editableFirstColumn && firstColKey;
                
                                    return (
                                        <div key={rowIndex} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                                            {firstColIsTitle && (
                                                <div className="mb-4 pb-2 border-b">
                                                    <p className="font-bold text-md text-[var(--brand-teal)]">{row[firstColKey]}</p>
                                                </div>
                                            )}
                                            <div className="space-y-3">
                                                {columns.map((col: string, colIndex: number) => {
                                                    if (firstColIsTitle && colIndex === 0) {
                                                        return null;
                                                    }
                
                                                    const colKey = rowKeys[colIndex];
                                                    if (!colKey) return null;
                                                    
                                                    const rowColTooltip = row.tooltips?.[colKey] ? <Tooltip id={`${sectionId}-${field.id}-${rowIndex}-${colKey}`} content={row.tooltips[colKey]} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} position='right' /> : null;

                                                    return (
                                                        <div key={colKey}>
                                                            <label className="block text-gray-700 text-sm font-medium mb-1">{col}</label>
                                                            <div className="flex items-center gap-2">
                                                                {rowColTooltip}
                                                                <input
                                                                    type={typeof row[colKey] === 'number' ? 'number' : 'text'}
                                                                    value={row[colKey]}
                                                                    onChange={(e) => handleTableInputChange(sectionId, field.id, rowIndex, colKey, e.target.value)}
                                                                    onClick={stopPropagation}
                                                                    className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] transition"
                                                                />
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                             {field.hasPhotoUploads && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <label className="block text-gray-700 text-sm font-medium mb-2">Activity Photos</label>
                                                    <PhotoUploader
                                                        value={row.photos || []}
                                                        onChange={(newPhotos) => handleTablePhotoChange(sectionId, field.id, rowIndex, newPhotos)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            case 'signature':
                return (
                    <div className="mb-4" key={field.id}>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
                        <div className="flex items-start gap-2">
                             {fieldTooltip}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-500 text-xs font-bold mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={value?.name || ''}
                                        onChange={(e) => handleSignatureChange(sectionId, field.id, 'name', e.target.value)}
                                        onClick={stopPropagation}
                                        className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-500 text-xs font-bold mb-1">Date</label>
                                    <input
                                        type="date"
                                        value={value?.date || ''}
                                        onChange={(e) => handleSignatureChange(sectionId, field.id, 'date', e.target.value)}
                                        onClick={stopPropagation}
                                        className="appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const renderPreviewField = (sectionId: string, field: FormField) => {
        const value = formData[sectionId]?.[field.id];
        
        switch (field.type) {
            case 'text':
            case 'number':
            case 'date':
            case 'textarea':
                 if (!value) return null;
                return (
                    <div className="mb-4" key={field.id}>
                        <p><span className="font-semibold text-gray-800">{field.label}:</span> <span className="text-gray-600 break-words whitespace-pre-wrap">{value}</span></p>
                    </div>
                );
            case FieldType.PHOTOS:
                if (!value || value.length === 0) return null;
                return (
                    <div className="mb-4" key={field.id}>
                        <p className="font-semibold text-gray-800 mb-2">{field.label}:</p>
                        <div className="flex flex-wrap gap-2">
                            {(value as string[]).map((src, index) => (
                                <img key={index} src={src} alt={`upload-${index}`} className="w-24 h-24 object-cover rounded-md border" />
                            ))}
                        </div>
                    </div>
                );
            case 'bullet':
                 const bullets = value || [];
                 if (bullets.every((b: string) => !b)) return null;
                 return (
                     <div className="mb-4" key={field.id}>
                         <p className="font-semibold text-gray-800">{field.label}:</p>
                         <ul className="list-disc list-inside ml-4 text-gray-600">
                             {bullets.map((bullet: string, index: number) => bullet && <li key={index}>{bullet}</li>)}
                         </ul>
                     </div>
                 );
            case 'table': {
                if (!value || !Array.isArray(value) || value.length === 0) return null;
                const columns = field.columns || [];
            
                const tableElement = (
                    <div className="mb-4" key={field.id}>
                        <p className="font-semibold text-gray-800 mb-1">{field.label}</p>
                        <table className="w-full text-xs border-collapse border border-slate-400">
                            <thead className="bg-slate-100">
                                <tr className="text-slate-800">
                                    {columns.map(col => <th key={col} className="border border-slate-300 p-2 text-left font-bold">{col}</th>)}
                                </tr>
                            </thead>
                            <tbody className="text-slate-700">
                                {value.map((row: any, rowIndex: number) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col, colIndex) => (
                                            <td key={col} className="border border-slate-300 p-2">
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
                        photoGrids = (
                            <div key={`${field.id}-photos`}> 
                                {photosToRender.map((row: any, rowIndex: number) => {
                                    const firstColKey = Object.keys(row).filter(k => k !== 'photos' && k !== 'tooltips')[0];
                                    const title = row[firstColKey] || `Activity Photos`;
                                    return <PhotoGridPreview key={`photos-${field.id}-${rowIndex}`} photos={row.photos} title={title} />
                                })}
                            </div>
                        );
                    }
                }
                
                return (
                    <React.Fragment key={`${field.id}-wrapper`}>
                        {tableElement}
                        {photoGrids}
                    </React.Fragment>
                );
            }
            case 'signature':
                if (!value?.name && !value?.date) return null;
                return (
                    <div className="pt-8 pb-2" key={field.id}>
                        <p className="font-semibold text-gray-800 mb-1">{field.label}</p>
                        <div className="grid grid-cols-2 gap-8 mt-4 text-sm">
                             <div className="col-span-1">
                                <p className="font-medium text-center pb-1 h-5">{value?.name || ''}</p>
                                <div className="border-b border-black w-full"></div>
                                <p className="text-xs text-center pt-1">Name</p>
                            </div>
                            <div className="col-span-1">
                                <p className="font-medium text-center pb-1 h-5">{value?.date || ''}</p>
                                <div className="border-b border-black w-full"></div>
                                <p className="text-xs text-center pt-1">Date</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const mainContent = () => {
        switch(page) {
            case 'home':
                return (
                    <div className="space-y-12">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            <div className="md:w-1/2 text-center md:text-left">
                                <img src="./attached_assets/Board 3.419Z_1759314367072.png" alt="Professional workspace meeting room" className="rounded-lg shadow-lg mb-6 w-full"/>
                                <h2 className="text-3xl font-bold text-[var(--brand-teal)]">Reporting with ease...</h2>
                                <p className="text-gray-600 my-4">
                                    Welcome to your quarterly report tool. Just select your template, fill in your data, generate your pdf, and you are done.
                                </p>
                            </div>
                            <div className="md:w-1/2 w-full">
                                <div className="bg-white rounded-xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-500">
                                    <div className="text-center">
                                        <EditIcon />
                                        <h2 className="text-2xl font-bold mb-2 text-[var(--brand-teal)]">Create a New Report</h2>
                                        <p className="text-gray-600 mb-8">Select a department to begin.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="templateSelect" className="block text-sm font-medium mb-2 text-gray-700 text-center">Department Report Template:</label>
                                        <CustomSelect
                                            placeholder="-- Please choose a template --"
                                            options={sortedTemplates.map(t => ({ value: t.key, label: t.name }))}
                                            onChange={handleSelectTemplate}
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <button onClick={handleGoToManageTemplates} className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-[var(--brand-teal)] font-bold py-2 px-4 rounded-lg shadow-md transition duration-300">
                                        <SettingsIcon/> Manage Templates
                                    </button>
                                </div>
                            </div>
                        </div>
                        <SavedReportsSection reports={savedReports} onLoad={loadReport} onDelete={deleteReport} />
                    </div>
                );
            case 'builder':
                if (!activeTemplate) return <div>Template not found. <button onClick={handleBackToHome}>Go back</button></div>;
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="sticky top-24 z-10 bg-white flex justify-between items-center border-b-2 border-[var(--brand-gold)] p-6">
                               <h2 className="text-2xl font-bold text-[var(--brand-teal)]">{activeTemplate.title}</h2>
                               <button onClick={() => handleEditTemplate(activeTemplate.key)} className="p-2 text-gray-500 hover:text-[var(--brand-gold)] transition rounded-full hover:bg-gray-100">
                                   <PencilIcon />
                               </button>
                            </div>
                            <div className="p-6">
                               {activeTemplate.sections.map(section => (
                                    <div key={section.id} className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-500">
                                        <button
                                            onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                                            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--brand-gold)] transition"
                                            aria-expanded={activeSection === section.id}
                                            aria-controls={`section-content-${section.id}`}
                                        >
                                            <h3 className="text-lg font-semibold text-[var(--brand-teal)] text-left">{section.title}</h3>
                                            <ChevronDownIcon open={activeSection === section.id} />
                                        </button>
                                        {activeSection === section.id && (
                                            <div id={`section-content-${section.id}`} className="p-4 bg-white border-t border-gray-200">
                                                {section.fields.map((field, index) => renderField(section, field, index, section.fields.length))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg shadow-lg h-full lg:sticky top-24">
                           <h3 className="text-2xl font-bold text-[var(--brand-teal)] border-b-2 border-[var(--brand-gold)] pb-2 mb-6">Live Preview</h3>
                           <div className="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
                               <div className="prose prose-sm max-w-none">
                                   <h2 className="text-xl font-bold text-center">{activeTemplate.title}</h2>
                                    {activeTemplate.sections.map(section => (
                                        <div key={`preview-${section.id}`} className="mt-4">
                                            <h4 className="text-lg font-bold border-b pb-1 mb-2">{section.title}</h4>
                                            {section.fields.map(field => renderPreviewField(section.id, field))}
                                        </div>
                                    ))}
                               </div>
                           </div>
                        </div>
                    </div>
                );
            case 'manageTemplates':
                return <TemplateManager templates={sortedTemplates} onEdit={handleEditTemplate} onDelete={handleDeleteTemplate} onBack={handleBackToHome} />;
            case 'editTemplate':
                if (!editingTemplate) return <div>Loading editor...</div>;
                return <TemplateEditor template={editingTemplate} onSave={handleSaveTemplate} onCancel={() => setPage('manageTemplates')} />;
            default:
                return null;
        }
    }

    return (
        <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${page === 'home' ? 'bg-amber-50' : 'bg-gray-100'}`}>
            <header className="bg-[var(--brand-teal)] text-white py-4 shadow-lg sticky top-0 z-20">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <DocumentTextIcon/>
                        <h1 className="text-xl md:text-2xl font-bold text-[var(--brand-gold)] tracking-wider">
                            {(page === 'home' || page === 'builder') ? 'Your Quarterly Report' : 'Your Report Generator'}
                        </h1>
                    </div>
                     {page === 'builder' && (
                        <div className="flex items-center space-x-2">
                             <button onClick={handleBackToHome} className="flex items-center bg-transparent hover:bg-white/10 border border-white/50 text-white font-bold py-2 px-3 rounded-lg transition duration-300">
                                <BackIcon />
                                <span className="hidden sm:inline ml-2">Home</span>
                            </button>
                            <div className="relative">
                                <button onClick={saveCurrentReport} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg transition duration-300">
                                    <SaveIcon /> <span className="hidden sm:inline ml-2">Save</span>
                                </button>
                                {showSaveSuccess && (
                                    <div className="absolute top-full mt-2 right-0 bg-green-500 text-white text-xs rounded py-1 px-2 animate-pulse z-30">
                                        Saved!
                                    </div>
                                )}
                            </div>
                             <button onClick={() => setPreviewModalMode('pdf')} className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-lg transition duration-300">
                                <FilePdfIcon /> <span className="hidden sm:inline ml-2">Generate PDF</span>
                            </button>
                             <button onClick={() => setPreviewModalMode('ppt')} className="flex items-center bg-[var(--brand-gold)] hover:bg-opacity-90 text-white font-bold py-2 px-3 rounded-lg transition duration-300">
                                <PresentationIcon /> <span className="hidden sm:inline ml-2">Generate PPT</span>
                            </button>
                        </div>
                    )}
                    {(page === 'manageTemplates' || page === 'editTemplate') && (
                         <button onClick={page === 'editTemplate' ? () => setPage('manageTemplates') : handleBackToHome} className="flex items-center bg-transparent hover:bg-white/10 border border-white/50 text-white font-bold py-2 px-3 rounded-lg transition duration-300">
                            <BackIcon />
                            <span className="hidden sm:inline ml-2">{page === 'editTemplate' ? 'Back to Manager' : 'Home'}</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                {mainContent()}
            </main>

            {activeTemplate && previewModalMode && <PreviewModal 
                isOpen={!!previewModalMode}
                mode={previewModalMode}
                onClose={() => setPreviewModalMode(null)}
                activeTemplate={activeTemplate}
                formData={formData}
                themes={themes}
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
            />}

            <footer className="bg-[var(--brand-teal)] text-gray-300 py-4 mt-8">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>Colossians 3:23  And whatsoever ye do, do it heartily, as to the Lord, and not unto men.</p>
                </div>
            </footer>
        </div>
    );
};

const SavedReportsSection: React.FC<{reports: SavedReport[], onLoad: (id: string) => void, onDelete: (id: string) => void}> = ({ reports, onLoad, onDelete }) => {
    const sortedReports = reports.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime());

    return (
        <div className="bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-[var(--brand-teal)] text-center border-b pb-4">Saved Reports</h2>
            {sortedReports.length === 0 ? (
                <p className="text-gray-500 text-center py-8">You have no saved reports. Create a new one to get started!</p>
            ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {sortedReports.map(report => (
                        <div key={report.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:shadow-md transition-shadow bg-gray-50/50">
                            <div>
                                <p className="font-semibold text-lg text-gray-800">{report.reportName.split(' - ')[0]}</p>
                                <p className="text-sm text-gray-500">Saved: {new Date(report.savedAt).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-3 mt-3 sm:mt-0 flex-shrink-0">
                                <button onClick={() => onLoad(report.id)} className="flex items-center gap-2 text-green-600 hover:text-green-800 font-semibold py-2 px-4 rounded-md hover:bg-green-50 transition">
                                    <LoadIcon/> Load
                                </button>
                                <button onClick={() => onDelete(report.id)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition">
                                    <TrashIcon/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const CustomSelect: React.FC<{
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
    placeholder: string;
}> = ({ options, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const selectedOption = options.find(opt => opt.value === selectedValue);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Calculate max height when dropdown opens to prevent viewport overflow
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            // Leave a generous 80px margin at the bottom to avoid overlapping any mobile browser UI.
            const calculatedMaxHeight = spaceBelow - 80;
            setMaxHeight(calculatedMaxHeight);
        }
    }, [isOpen]);

    const handleSelectOption = (optionValue: string) => {
        setSelectedValue(optionValue);
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                ref={buttonRef}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="relative w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--brand-gold)] focus:border-transparent transition text-center"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={selectedOption ? "text-gray-800" : "text-gray-500"}>
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDownIcon open={isOpen} />
                </span>
            </button>
            {isOpen && (
                <div className="absolute z-30 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul
                        className="overflow-y-auto"
                        style={{ maxHeight: maxHeight !== undefined ? `${Math.max(maxHeight, 0)}px` : '15rem' /* Fallback */ }}
                        role="listbox"
                    >
                        {options.map(option => (
                            <li
                                key={option.value}
                                onClick={() => handleSelectOption(option.value)}
                                className="px-4 py-3 text-sm hover:bg-amber-100 cursor-pointer text-gray-800 transition-colors text-center"
                                role="option"
                                aria-selected={selectedValue === option.value}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


const TemplateManager: React.FC<{templates: ReportTemplate[], onEdit: (key: string) => void, onDelete: (key: string) => void, onBack: () => void}> = ({ templates, onEdit, onDelete, onBack }) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-[var(--brand-teal)] border-b-2 border-[var(--brand-gold)] pb-3 mb-6">Manage Templates</h2>
            <div className="space-y-4">
                {templates.map(template => (
                    <div key={template.key} className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <span className="font-semibold text-lg text-gray-800">{template.name}</span>
                        <div className="flex items-center space-x-3">
                            <button onClick={() => onEdit(template.key)} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold py-1 px-3 rounded-md hover:bg-blue-50 transition">
                                <PencilIcon/> Edit
                            </button>
                            <button onClick={() => onDelete(template.key)} className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition">
                                <TrashIcon/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

const TemplateEditor: React.FC<{template: ReportTemplate, onSave: (template: ReportTemplate) => void, onCancel: () => void}> = ({ template, onSave, onCancel }) => {
    const [editedTemplate, setEditedTemplate] = useState<ReportTemplate>(template);
    const [activeSection, setActiveSection] = useState<string | null>(editedTemplate.sections[0]?.id || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTargetSection, setModalTargetSection] = useState<number | null>(null);

    const handleFieldChange = (sectionIndex: number, fieldIndex: number, prop: 'label', value: string) => {
        const newTemplate = {...editedTemplate};
        newTemplate.sections[sectionIndex].fields[fieldIndex][prop] = value;
        setEditedTemplate(newTemplate);
    };

    const removeField = (sectionIndex: number, fieldIndex: number) => {
        const newTemplate = {...editedTemplate};
        newTemplate.sections[sectionIndex].fields.splice(fieldIndex, 1);
        setEditedTemplate(newTemplate);
    }
    
    const addField = (sectionIndex: number, field: FormField) => {
        const newTemplate = {...editedTemplate};
        newTemplate.sections[sectionIndex].fields.push(field);
        setEditedTemplate(newTemplate);
    }

    const handleSectionChange = (sectionIndex: number, prop: 'title', value: string) => {
        const newTemplate = {...editedTemplate};
        newTemplate.sections[sectionIndex][prop] = value;
        setEditedTemplate(newTemplate);
    };

    const removeSection = (sectionIndex: number) => {
        if (window.confirm("Are you sure you want to remove this section and all its fields?")) {
            // FIX: Updated the state immutably by using 'filter' to create a new array, ensuring React detects the change and re-renders the component correctly.
            const newSections = editedTemplate.sections.filter((_, i) => i !== sectionIndex);
            setEditedTemplate({ ...editedTemplate, sections: newSections });
        }
    }

    const cloneSection = (sectionIndex: number) => {
        const newTemplate = {...editedTemplate};
        const sectionToClone = JSON.parse(JSON.stringify(newTemplate.sections[sectionIndex]));
        sectionToClone.id = `section-${Date.now()}`;
        sectionToClone.title = `${sectionToClone.title} (Copy)`;
        sectionToClone.fields.forEach((f: FormField) => f.id = `field-${Date.now()}-${Math.random()}`);
        newTemplate.sections.splice(sectionIndex + 1, 0, sectionToClone);
        setEditedTemplate(newTemplate);
    }

    const addSection = () => {
        const newSection: FormSection = {
            id: `section-${Date.now()}`,
            title: "New Section",
            fields: []
        };
        setEditedTemplate({...editedTemplate, sections: [...editedTemplate.sections, newSection]});
    }

    const handleOpenModal = (sectionIndex: number) => {
        setModalTargetSection(sectionIndex);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {isModalOpen && modalTargetSection !== null && <AddFieldModal 
                onClose={() => setIsModalOpen(false)} 
                onAddField={(field) => {
                    addField(modalTargetSection, field);
                    setIsModalOpen(false);
                }} 
            />}
            <div className="sticky top-24 z-10 bg-white/95 backdrop-blur-sm flex justify-between items-center border-b-2 border-[var(--brand-gold)] p-6 pb-4 shadow-sm rounded-t-lg">
                <h2 className="text-2xl font-bold text-[var(--brand-teal)]">Edit Template</h2>
                <div className="flex gap-2">
                    <button onClick={onCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                    <button onClick={() => onSave(editedTemplate)} className="flex items-center gap-2 bg-[var(--brand-gold)] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition">
                        <SaveIcon/> Save Template
                    </button>
                </div>
            </div>
            <div className="p-6">
                {/* Template Header Fields */}
                <div className="grid grid-cols-1 gap-4 mb-8 p-4 border rounded-lg bg-gray-50">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Template Name (for dropdown)</label>
                        <input type="text" value={editedTemplate.name} onChange={e => setEditedTemplate({...editedTemplate, name: e.target.value})} className="w-full p-2 border rounded"/>
                    </div>
                     <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Template Title (report header)</label>
                        {/* FIX: Corrected the onChange handler to properly update the template's title. */}
                        <input type="text" value={editedTemplate.title} onChange={e => setEditedTemplate({...editedTemplate, title: e.target.value})} className="w-full p-2 border rounded"/>
                    </div>
                </div>

                {/* Sections */}
                {editedTemplate.sections.map((section, sIndex) => (
                     <div key={section.id} className="border border-gray-200 rounded-lg mb-4 overflow-hidden transition-all duration-500">
                        <div className="w-full flex justify-between items-center p-4 bg-gray-50">
                            <input value={section.title} onChange={e => handleSectionChange(sIndex, 'title', e.target.value)} className="text-lg font-semibold text-[var(--brand-teal)] bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none w-full mr-4"/>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                 <button onClick={() => cloneSection(sIndex)} className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-50 transition"><CloneIcon/></button>
                                 <button onClick={() => removeSection(sIndex)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-50 transition"><TrashIcon/></button>
                                 <button onClick={() => setActiveSection(activeSection === section.id ? null : section.id)} className="p-1"><ChevronDownIcon open={activeSection === section.id} /></button>
                            </div>
                        </div>
                         {activeSection === section.id && (
                             <div className="p-4 bg-white border-t border-gray-200 space-y-4">
                                {section.fields.map((field, fIndex) => (
                                    <div key={field.id} className="flex items-start gap-2 p-3 border rounded-md bg-gray-50/50">
                                        <div className="flex-grow">
                                            <label className="block text-gray-500 text-xs font-bold mb-1">Field Label</label>
                                            <input value={field.label} onChange={e => handleFieldChange(sIndex, fIndex, 'label', e.target.value)} className="w-full p-2 border rounded"/>
                                            <span className="text-xs text-gray-400 font-mono mt-1 block">Type: {field.type}</span>
                                        </div>
                                        <button onClick={() => removeField(sIndex, fIndex)} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition mt-4">
                                            <TrashIcon/>
                                        </button>
                                    </div>
                                ))}
                                 <button onClick={() => handleOpenModal(sIndex)} className="flex items-center gap-2 mt-4 text-sm text-[var(--brand-gold)] hover:underline font-semibold">
                                    <PlusIcon/> Add Field to Section
                                </button>
                             </div>
                         )}
                    </div>
                ))}
                 <button onClick={addSection} className="w-full flex justify-center items-center gap-2 mt-6 py-3 border-2 border-dashed rounded-lg text-gray-500 hover:bg-gray-100 hover:border-solid hover:text-[var(--brand-teal)] transition">
                    <PlusIcon/> Add New Section
                </button>
            </div>
        </div>
    );
};

const AddFieldModal: React.FC<{onClose: () => void, onAddField: (field: FormField) => void}> = ({onClose, onAddField}) => {
    const [label, setLabel] = useState('');
    const [type, setType] = useState<FieldType>(FieldType.TEXT);

    const handleSubmit = () => {
        if(!label.trim()) {
            alert('Label is required.');
            return;
        }
        const newField: FormField = {
            id: `field-${Date.now()}`,
            label,
            type,
        };
        // Add default structures for complex types
        if (type === FieldType.TABLE) {
            newField.columns = ['Item', 'Details'];
            newField.rows = [{item: 'Sample Item', details: ''}];
            newField.editableFirstColumn = true;
        }
        if (type === FieldType.BULLET) {
            newField.defaultValue = [''];
        }
        onAddField(newField);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-4">Add New Field</h3>
                <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">Field Label</label>
                        <input type="text" value={label} onChange={e => setLabel(e.target.value)} className="w-full p-2 border rounded" placeholder="e.g., Member Name"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium mb-1">Field Type</label>
                        <select value={type} onChange={e => setType(e.target.value as FieldType)} className="w-full p-2 border rounded bg-white">
                            {Object.values(FieldType).map(fieldType => <option key={fieldType} value={fieldType}>{fieldType}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition">Cancel</button>
                    <button onClick={handleSubmit} className="bg-[var(--brand-teal)] hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg transition">Add Field</button>
                </div>
            </div>
        </div>
    )
}

// FIX: Completed the PhotoUploader component to handle file changes, display previews, and allow photo removal. This resolves the error where the component was not returning a valid ReactNode.
const PhotoUploader: React.FC<{ value: string[]; onChange: (newValue: string[]) => void }> = ({ value = [], onChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const MAX_PHOTOS = 4;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = e.target.files;
        const spaceAvailable = MAX_PHOTOS - value.length;
        let filesToAdd = Array.from(files);

        if (filesToAdd.length > spaceAvailable) {
            alert(`You can only add ${spaceAvailable} more photo(s). Adding the first ${spaceAvailable}.`);
            filesToAdd = filesToAdd.slice(0, spaceAvailable);
        }

        // FIX: Explicitly type the 'file' parameter to resolve an issue where it was inferred as 'unknown', causing an error when passed to readAsDataURL.
        const newPhotoPromises = filesToAdd.map((file: File) => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        resolve(reader.result);
                    } else {
                        reject(new Error('Failed to read file as data URL'));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const newPhotoUrls = await Promise.all(newPhotoPromises);
            onChange([...value, ...newPhotoUrls]);
        } catch (error) {
            console.error("Error reading files:", error);
            alert("There was an error uploading your photos. Please try again.");
        }

        if (e.target) {
            e.target.value = '';
        }
    };

    const handleRemovePhoto = (index: number) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div onClick={e => e.stopPropagation()}>
            <div className="grid grid-cols-4 gap-2 mb-2">
                {value.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                        <img src={src} alt={`upload-${index}`} className="w-full h-full object-cover rounded-md border" />
                        <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all"
                            aria-label="Remove photo"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
                {value.length < MAX_PHOTOS && (
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-md text-gray-400 hover:text-[var(--brand-teal)] hover:border-[var(--brand-teal)] transition"
                    >
                        <CameraIcon />
                        <span className="text-xs mt-1">Add Photo</span>
                    </button>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            {value.length > 0 && <p className="text-xs text-gray-500 text-center mt-1">({value.length}/{MAX_PHOTOS})</p>}
        </div>
    );
};

// FIX: Added a default export for the App component to resolve the import error in index.tsx.
export default App;