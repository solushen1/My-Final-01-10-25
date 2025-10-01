

import type { Theme } from '../types';

export const themes: Theme[] = [
    {
      "name": "Hopeful Horizon",
      "palette": {
        "primary": "#265C62",
        "secondary": "#D8B249",
        "accent": "#F0EAD6",
        "background": "#FCFCFC",
        "foreground": "#0A2D30"
      },
      "gradient": ["linear-gradient(135deg, #265C62, #1A4044)"],
      "fontPair": { "heading": "Merriweather", "body": "Roboto" },
      "recommendedPhotoTreatment": "softOverlay",
      "category": "Modern"
    },
    {
      "name": "Golden Hour",
      "palette": {
        "primary": "#5D4037",
        "secondary": "#C9A445",
        "accent": "#FFDAB9",
        "background": "#FFF8E1",
        "foreground": "#3E2723"
      },
      "gradient": ["linear-gradient(to right, #5D4037, #C9A445)"],
      "fontPair": { "heading": "Playfair Display", "body": "Lato" },
      "recommendedPhotoTreatment": "warmOverlay",
      "category": "Traditional"
    },
    {
      "name": "Reverent Night",
      "palette": {
        "primary": "#A98F5B",
        "secondary": "#B0C4DE",
        "accent": "#E0E0E0",
        "background": "#041221",
        "foreground": "#EAEAEA"
      },
      "gradient": ["linear-gradient(180deg, #041221, #0D2C4D)"],
      "fontPair": { "heading": "Cormorant Garamond", "body": "Montserrat" },
      "recommendedPhotoTreatment": "mutedContrast",
      "category": "Traditional"
    },
    {
      "name": "New Growth",
      "palette": {
        "primary": "#2F4F4F",
        "secondary": "#FF7F50",
        "accent": "#F5F5DC",
        "background": "#F0FFF0",
        "foreground": "#2F4F4F"
      },
      "gradient": ["linear-gradient(to bottom right, #2F4F4F, #5F9EA0)"],
      "fontPair": { "heading": "Lora", "body": "Open Sans" },
      "recommendedPhotoTreatment": "naturalVibrancy",
      "category": "Modern"
    },
    {
      "name": "Simple Grace",
      "palette": {
        "primary": "#37474F",
        "secondary": "#607D8B",
        "accent": "#CFD8DC",
        "background": "#FFFFFF",
        "foreground": "#37474F"
      },
      "gradient": ["linear-gradient(45deg, #607D8B, #90A4AE)"],
      "fontPair": { "heading": "Poppins", "body": "Roboto" },
      "recommendedPhotoTreatment": "grayscale",
      "category": "Modern"
    },
    {
        "name": "Scribe's Parchment",
        "palette": {
          "primary": "#5D4037",
          "secondary": "#A1887F",
          "accent": "#D7CCC8",
          "background": "#FDF6EC",
          "foreground": "#402E28"
        },
        "gradient": ["linear-gradient(to top, #5D4037, #795548)"],
        "fontPair": { "heading": "Lora", "body": "Lato" },
        "recommendedPhotoTreatment": "sepia",
        "category": "Traditional"
    },
    {
        "name": "Cathedral Glass",
        "palette": {
          "primary": "#8A0303",
          "secondary": "#D4AF37",
          "accent": "#B0C4DE",
          "background": "#F5F5F5",
          "foreground": "#2C0000"
        },
        "gradient": ["linear-gradient(45deg, #483D8B, #8A0303)"],
        "fontPair": { "heading": "Cormorant Garamond", "body": "Open Sans" },
        "recommendedPhotoTreatment": "vivid",
        "category": "Traditional"
    },
    {
        "name": "Heirloom Linen",
        "palette": {
          "primary": "#4A4A4A",
          "secondary": "#BDBDBD",
          "accent": "#EAEAEA",
          "background": "#FFFFFF",
          "foreground": "#333333"
        },
        "gradient": ["linear-gradient(to bottom, #4A4A4A, #616161)"],
        "fontPair": { "heading": "Playfair Display", "body": "Roboto" },
        "recommendedPhotoTreatment": "softContrast",
        "category": "Traditional"
    },
    {
        "name": "Sanctuary Stone",
        "palette": {
          "primary": "#2F4F4F",
          "secondary": "#778899",
          "accent": "#B0C4DE",
          "background": "#FFFFFF",
          "foreground": "#2B2D42"
        },
        "gradient": ["linear-gradient(to top, #2F4F4F, #465362)"],
        "fontPair": { "heading": "Playfair Display", "body": "Roboto" },
        "recommendedPhotoTreatment": "monochrome",
        "category": "Traditional"
    },
    {
        "name": "Harvest Gold",
        "palette": {
          "primary": "#8B4513",
          "secondary": "#DAA520",
          "accent": "#FDEFB2",
          "background": "#FFFBF0",
          "foreground": "#4C2F08"
        },
        "gradient": ["linear-gradient(to right, #8B4513, #B85B14)"],
        "fontPair": { "heading": "Lora", "body": "Open Sans" },
        "recommendedPhotoTreatment": "warmOverlay",
        "category": "Traditional"
    },
    {
        "name": "Advent Wreath",
        "palette": {
          "primary": "#4B0082",
          "secondary": "#006400",
          "accent": "#FFD700",
          "background": "#F8F8FF",
          "foreground": "#3B003B"
        },
        "gradient": ["linear-gradient(45deg, #4B0082, #2E0854)"],
        "fontPair": { "heading": "Cormorant Garamond", "body": "Lato" },
        "recommendedPhotoTreatment": "rich",
        "category": "Traditional"
    },
    {
        "name": "Oceanic Deep",
        "palette": {
          "primary": "#006994",
          "secondary": "#89CFF0",
          "accent": "#E0FFFF",
          "background": "#F0F8FF",
          "foreground": "#00334E"
        },
        "gradient": ["linear-gradient(135deg, #00405c, #006994)"],
        "fontPair": { "heading": "Montserrat", "body": "Open Sans" },
        "recommendedPhotoTreatment": "coolOverlay",
        "category": "Modern"
    },
    {
        "name": "Sunrise Glow",
        "palette": {
          "primary": "#D2691E",
          "secondary": "#FF7F50",
          "accent": "#FFDAB9",
          "background": "#FFF5EE",
          "foreground": "#8B4513"
        },
        "gradient": ["linear-gradient(to right, #FF6347, #D2691E)"],
        "fontPair": { "heading": "Poppins", "body": "Lato" },
        "recommendedPhotoTreatment": "warmGlow",
        "category": "Modern"
    },
    {
        "name": "Digital Frontier",
        "palette": {
          "primary": "#00FFFF",
          "secondary": "#FF00FF",
          "accent": "#39FF14",
          "background": "#121212",
          "foreground": "#EAEAEA"
        },
        "gradient": ["linear-gradient(135deg, #1A1A1A, #000000)"],
        "fontPair": { "heading": "Montserrat", "body": "Roboto" },
        "recommendedPhotoTreatment": "neon",
        "category": "Modern"
    },
    {
        "name": "Community Canvas",
        "palette": {
          "primary": "#0056b3",
          "secondary": "#007BFF",
          "accent": "#e7f1ff",
          "background": "#FFFFFF",
          "foreground": "#343A40"
        },
        "gradient": ["linear-gradient(to bottom right, #007BFF, #0056b3)"],
        "fontPair": { "heading": "Poppins", "body": "Roboto" },
        "recommendedPhotoTreatment": "vibrant",
        "category": "Modern"
    },
    {
        "name": "Clear Day",
        "palette": {
          "primary": "#0077c2",
          "secondary": "#4FC3F7",
          "accent": "#E1F5FE",
          "background": "#F0FFFF",
          "foreground": "#004466"
        },
        "gradient": ["linear-gradient(180deg, #00BFFF, #0077c2)"],
        "fontPair": { "heading": "Montserrat", "body": "Lato" },
        "recommendedPhotoTreatment": "natural",
        "category": "Modern"
    },
    {
        "name": "Vibrant Praise",
        "palette": {
          "primary": "#C13584",
          "secondary": "#F77737",
          "accent": "#fdeff9",
          "background": "#FFF9F5",
          "foreground": "#2E151B"
        },
        "gradient": ["linear-gradient(45deg, #E1306C, #C13584)"],
        "fontPair": { "heading": "Poppins", "body": "Open Sans" },
        "recommendedPhotoTreatment": "energetic",
        "category": "Modern"
    },
    {
        "name": "Clean Slate",
        "palette": {
          "primary": "#1E90FF",
          "secondary": "#333333",
          "accent": "#F0F0F0",
          "background": "#FFFFFF",
          "foreground": "#1A1A1A"
        },
        "gradient": ["linear-gradient(to top, #333333, #555555)"],
        "fontPair": { "heading": "Poppins", "body": "Montserrat" },
        "recommendedPhotoTreatment": "highContrast",
        "category": "Modern"
    },
    {
        "name": "Pathfinder Pine",
        "palette": {
          "primary": "#228B22",
          "secondary": "#DAA520",
          "accent": "#F5DEB3",
          "background": "#FCFBF8",
          "foreground": "#3B3C36"
        },
        "gradient": ["linear-gradient(to bottom, #228B22, #556B2F)"],
        "fontPair": { "heading": "Montserrat", "body": "Open Sans" },
        "recommendedPhotoTreatment": "naturalVibrancy",
        "category": "Modern"
    }
  ];