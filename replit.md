# Featured Works Portfolio Website

## Project Overview
A modern, interactive portfolio website showcasing creative works with categories for directing, short films, feature films, and VFX. Built with React frontend and Express backend.

## Architecture
- **Frontend**: React 18 with TypeScript, Wouter for routing, TailwindCSS + shadcn/ui components
- **Backend**: Express.js with TypeScript, in-memory storage
- **Database**: PostgreSQL schema defined with Drizzle ORM (currently using in-memory storage)
- **Build System**: Vite for frontend, esbuild for backend
- **Styling**: TailwindCSS with custom design system

## Key Features
- Portfolio gallery with categorized work samples
- Interactive 3D gallery components
- YouTube/Vimeo video integration
- Contact form functionality
- Responsive design with dark theme
- Image lightbox and video lightbox
- Client logos showcase

## Project Structure
```
├── client/src/          # Frontend React application
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route-based page components
│   ├── lib/            # Utilities and data
│   └── hooks/          # Custom React hooks
├── server/             # Backend Express application
│   ├── index.ts        # Main server entry point
│   ├── routes.ts       # API route definitions
│   ├── storage.ts      # Data storage interface
│   └── vite.ts         # Vite development setup
└── shared/             # Shared TypeScript schemas
```

## Development Workflow
- Start development: `npm run dev` (runs Express + Vite)
- Build for production: `npm run build`
- Type checking: `npm run check`
- Database migrations: `npm run db:push`

## Technology Stack
- **Frontend**: React, TypeScript, Wouter, TailwindCSS, shadcn/ui, Framer Motion
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **Data**: PostgreSQL (schema), in-memory storage (current)
- **Auth**: Basic user schema (not actively used)
- **APIs**: Image proxy for Google Drive, mailto contact functionality

## Recent Changes
- **STAGGERED VIDEO LOADING** (2025-10-21): Smart loading to avoid Vimeo rate limits while maintaining performance
  - Desktop: First 4 videos load immediately, next 4 load when scrolling past video #3
  - Avoids rate limiting by splitting 8 videos into two batches of 4
  - Provides instant playback for visible content while preloading upcoming videos
  - Mobile behavior unchanged - still uses viewport-based loading to save bandwidth
  - Applied to all special cases: att-social, thermacare, adidas, mariposas
  - Pagination system (8 items per page) on Featured Works and Short Films pages
  - Smooth scrolling with optimal Vimeo API usage
- **NEW PORTFOLIO ITEM**: Added MarketWatch "Peacock CTV & DOOH Campaign" as the newest Featured Works item (positioned at the very top)
- **REORDERED FEATURED WORKS**: Updated preview panel order - J&J moved below Advil, Royal Canin moved above Fortnite, PG&E moved above BET
- **MAJOR OPTIMIZATION COMPLETE**: Performed comprehensive code cleanup and optimization
  - Removed unused UI components (reduced from 48 to 12 essential components only)
  - Eliminated all console.log statements for production readiness
  - Cleaned up unused dependencies and imports
  - Optimized font loading (reduced font weights to essential ones)
  - Removed redundant CSS and consolidated styles
  - Deleted unused YouTube utilities and mock data components
  - Streamlined component structure for better performance
  - Created optimized root-level index.html for Replit web hosting
  - Reduced codebase size significantly while maintaining all functionality
- **Production Ready**: Project now optimized for free static hosting deployment
- Fixed Featured Works layout by changing from h-screen to aspect-[16/9], eliminating enormous gaps between preview windows
- Corrected Slack filtering to only appear under MOGRAPH filter by removing "editing" tag
- Fixed navigation bar formatting with proper spacing, prevented text wrapping, and improved responsive behavior
- Removed blue bars/borders from video panels by eliminating rounded corners and background artifacts
- Added optimized drop shadows to "Explore Now" buttons for visibility against white video backgrounds
- Implemented bright cyan blue accent color for all links (matching "Explore Portfolio" button)
- Enhanced portfolio presentation with clean edge-to-edge video layout
- Proper audio experience: Homepage videos muted, sound only in VideoLightbox panels
- Created dedicated category pages (Directing, Short Films, Feature Films, VFX) with unique layouts
- All text color visibility issues fixed with proper contrast in portfolio modals
- Contact form replaced with mailto link to adrian@acpost.pro for zero backend dependency

## User Preferences
(None specified yet)

## Code Optimization Summary
- **UI Components**: Reduced from 48 to 12 essential components (button, card, dialog, input, label, react-player, separator, skeleton, toast, toaster, tooltip, toggle)
- **Dependencies**: Removed unused imports and eliminated redundant code
- **Console Logging**: Completely removed all console.log statements for production
- **CSS**: Consolidated styles, removed duplicates, optimized font loading
- **File Structure**: Cleaned up temporary files and unused assets
- **Performance**: Significant reduction in bundle size while maintaining full functionality

- **Updated branding**: Changed "Selected Works" to "Featured Works" across entire application including navigation, page titles, portfolio categories, and hero section

---
*Last updated: 2025-10-27 - Removed Google Analytics event tracking code, restored to standard GA page view tracking*