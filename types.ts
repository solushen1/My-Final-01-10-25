export enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  DATE = 'date',
  TABLE = 'table',
  BULLET = 'bullet',
  SIGNATURE = 'signature',
  PHOTOS = 'photos',
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  columns?: string[];
  rows?: any[];
  defaultValue?: any;
  editableFirstColumn?: boolean;
  hasPhotoUploads?: boolean;
  tooltip?: string;
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface ReportTemplate {
  key: string;
  name:string;
  title: string;
  sections: FormSection[];
}

export type ReportTemplates = {
  [key: string]: ReportTemplate;
};

export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
}

export interface FontPair {
  heading: string;
  body: string;
}

export interface Theme {
  name: string;
  palette: ThemePalette;
  gradient: string[];
  fontPair: FontPair;
  recommendedPhotoTreatment: string;
  category: 'Traditional' | 'Modern';
}

export interface PhotoEnhancementPreset {
    name: string;
    filter: string;
}

// Slide Plan Types
export type SlideLayoutType = "title" | "sectionHeader" | "twoColumn" | "imageLeftTextRight" | "summary" | "photoGrid" | "chartFull";
export type SlideContentType = "text" | "number" | "list" | "image" | "table" | "chart";

export interface SlideContent {
  type: SlideContentType;
  path: string; // JSONPath to the data
  styleHint?: string;
  label?: string; // For summary KPIs
  maxChars?: number;
}

export interface SlideLayout {
  slideId: string;
  title: string; // Can use tokens like {{departmentName}}
  layout: SlideLayoutType;
  content: SlideContent[];
  suggestedImageTreatment?: string;
  generativeIconPrompt?: string;
  suggestedChart?: {
      chartType: 'bar' | 'pie' | 'line';
      dataPath: string;
  }
}

export interface SlidePlan {
  [departmentKey: string]: SlideLayout[];
}

export interface SlideOverrides {
    [slideId: string]: {
        layout?: SlideLayoutType;
        content?: {
            [path: string]: any;
        }
        title?: string;
    }
}

export interface SavedReport {
  id: string;
  templateKey: string;
  formData: any;
  savedAt: string;
  reportName: string;
}
