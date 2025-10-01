# Adventist Church Quarterly Report Generator

## Overview
This is a React + TypeScript + Vite application for generating quarterly reports for Adventist churches. It uses Google's Gemini AI API to generate contextual images and edit photos for presentation slides.

## Project Architecture
- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **AI Integration**: Google Gemini AI (@google/genai)
- **Visualization**: Chart.js for data visualization
- **Port**: Frontend runs on port 5000

## Setup Instructions

### Gemini API Key
This application requires a Gemini API key to function. To set it up:
1. Get your Gemini API key from Google AI Studio
2. Add it as a Replit secret with the key name: `GEMINI_API_KEY`
3. The app will automatically use it through the Vite configuration

### Development
- Run `npm run dev` to start the development server
- The app will be available on port 5000
- HMR (Hot Module Replacement) is configured for the Replit environment

### Deployment
- Build command: `npm run build`
- Preview command: `npm run preview`
- Deployment type: Autoscale (static site)
- Make sure to set the `GEMINI_API_KEY` secret in production as well

## Recent Changes (October 01, 2025)

### Comprehensive Slide Generation System
- **Created SlidePlanResolver**: Universal slide generator for all 28 department templates
- **Deterministic Data Extraction**: Stable header-based column mapping for tables and charts
  - Exact match → case-insensitive match → index fallback
  - No reliance on Object.keys() order
- **Photo Pagination**: All photos paginated in groups of 4 with page indicators
- **Numeric Normalization**: Handles formatted financial data
  - Strips currency symbols ($), commas, and spaces
  - Converts accounting parentheses to negatives: "(500)" → -500
- **Comprehensive Capture**: All template fields captured in presentations (not summaries)
- **AI Integration**: Gemini-powered icon generation and photo enhancement
- **TypeScript**: All LSP diagnostics resolved

### Architecture
- **Field-Type-to-Layout Mapping**: Automatic slide layout selection based on field types
  - TEXT/TEXTAREA/NUMBER/DATE → imageLeftTextRight (details)
  - TABLE → twoColumn (data table)
  - PHOTOS → photoGrid (4 photos per slide, paginated)
  - Auto-generated charts for numeric table data
  - Auto-generated summary slides with KPIs

### Current Status
✅ Frontend server running successfully on port 5000
✅ All dependencies installed
✅ Deployment configuration complete
✅ GEMINI_API_KEY configured for AI features
✅ Comprehensive slide generation for all 28 templates
✅ Deterministic data extraction with proper numeric handling
