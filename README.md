# CtrlShift IT Services Web Application

This repository contains the public-facing website and client portal for **CtrlShift IT Services**, a managed IT and cybersecurity provider based in the Greater Toronto Area (GTA).

## Architecture

The application is built for maximum speed, local SEO visibility, and low operating costs using a hybrid static/edge architecture.

- **Frontend:** Angular (Standalone Components)
- **Styling:** Bootstrap 5 (Customized via SCSS) + GSAP for animations
- **Hosting & API:** Cloudflare Workers (`worker/index.js`)
- **Rendering:** Static Site Generation (SSG). The Angular build prerenders all programmatic location and service pages into static HTML (`dist/ctrlshift-frontend/browser`).

### Interactive Lead Generation Tools
The application includes several high-conversion tools designed to provide immediate value to GTA businesses:
- **Downtime & ROI Calculator:** Visualizes the cost of IT failure for business owners.
- **Industry Compliance Quizzes:** Tailored security checks for Legal, Medical, and Accounting sectors.
- **Instant Domain Scanner:** Performs live DNS/Email health checks using Cloudflare's DNS-over-HTTPS API.
- **Office Move Hub:** Comprehensive interactive checklist for IT infrastructure relocation.

### Edge API (Cloudflare Workers)
While the frontend is 100% static, dynamic functionality is handled at the edge by the Cloudflare Worker defined in `worker/index.js`. This includes:
- `/api/chat`: An AI assistant powered by Cloudflare's Workers AI (`@cf/meta/llama-3.3-70b-instruct-fp8-fast`) that answers user questions about IT services and pricing.
- `/api/google-reviews`: Fetches and caches live Google Reviews using the Places API v1.

## Local Development

### Prerequisites
- Node.js (v22+)
- npm

### Setup
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd cloudcareit
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables for local edge testing:
   ```bash
   cp .env.local.example .env.local
   # Add your Google Places API key to test the reviews endpoint
   ```

### Running the App
To run the standard Angular development server (Hot Module Replacement, fast reloads):
```bash
npm run dev
```
*Note: The Angular dev server (`localhost:4200`) does not run the Cloudflare Worker API. The Chat and Reviews components will fall back to default/error states unless you proxy them to a local wrangler instance.*

### Building & Prerendering
To generate the production static build and run the automated CSS purger:
```bash
npm run build
```
The output will be generated in `dist/ctrlshift-frontend/browser`.

## Deployment

Deployment is automated via GitHub Actions (`.github/workflows/deploy.yml`) on merges to the `main` branch.

To deploy manually via Wrangler:
```bash
npm run build
npx wrangler deploy
```

## SEO & Content
The site heavily utilizes programmatic SEO to generate localized service pages (e.g., `/managed-it-services-vaughan`). These pages are defined in data dictionaries within `src/app/pages/location/` and are fully prerendered at build time.

A sitemap can be automatically generated using:
```bash
npm run sitemap
```
