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
- Migrated project to Replit environment
- Updated Vite config to use port 5000 (required for Replit)
- Configured HMR for Replit's proxy setup
- Fixed viewport meta tag in index.html
- Removed conflicting importmap (using Vite's bundler instead)
- Configured deployment settings for autoscale
- Documented project structure and setup requirements
