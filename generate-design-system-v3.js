import fs from 'fs';

// Embed card images (reusing existing assets)
const imagesToEmbed = {
  'card-dark': 'public/assets/cards/dark.jpg',
  'card-agentic': 'public/assets/cards/agentic.jpg',
  'duotone-dark': 'public/assets/duotone/duotone-dark.png',
  'duotone-agentic': 'public/assets/duotone/duotone-agentic.png',
};

const images = {};
for (const [name, filePath] of Object.entries(imagesToEmbed)) {
  try {
    const data = fs.readFileSync(filePath);
    const ext = filePath.split('.').pop();
    const mimeType = ext === 'jpg' ? 'image/jpeg' : 'image/png';
    images[name] = `data:${mimeType};base64,${data.toString('base64')}`;
    console.log(`✓ ${name}`);
  } catch (e) {
    console.log(`✗ ${name}: ${e.message}`);
    images[name] = '';
  }
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HALO Design System V3 (Technical)</title>
  <script src="https://tweakcn.com/live-preview.min.js"></script>
  
  <style>
    /* 1. HALO CORE FONTS */
    @font-face {
      font-family: 'FK Raster';
      src: url('/fonts/FK_Raster_Roman_Compact_Smooth.ttf') format('truetype');
      font-weight: 400;
      font-display: swap;
    }

    @font-face {
      font-family: 'PP Neue Montreal';
      src: url('/fonts/PP_Neue_Montreal_Regular.ttf') format('truetype');
      font-weight: 400;
      font-display: swap;
    }

    :root {
      /* 2. HALO CORE TOKENS (Strict Alignment) */
      --font-brand: 'FK Raster', system-ui, sans-serif;
      --font-ui: 'PP Neue Montreal', system-ui, sans-serif;
      --font-mono: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
      
      /* Colors - HALO Agentic (Sage/Forest) */
      --bg-primary: #F4F7EE;      /* Was #F7F7F5 */
      --bg-card: #F4F7EE;         /* Flat, no white cards */
      --text-primary: #0D1F18;    /* Was #1A3C2B */
      --text-secondary: rgba(13, 31, 24, 0.6);
      --text-muted: rgba(13, 31, 24, 0.4);
      
      --border-primary: #CBD5A0;
      --border-subtle: rgba(13, 31, 24, 0.1); /* Hairline */
      
      --accent: #A3BD6A;          /* Olive */
      --accent-mint: #9EFFBF;     /* Kept from spec as accent */
      --accent-gold: #F4D35E;     /* Kept from spec as accent */
      
      /* Status Colors (Mapped to new palette) */
      --status-active-bg: rgba(158, 255, 191, 0.2);
      --status-active-text: #1A3C2B;
      --status-pending-bg: rgba(244, 211, 94, 0.2);
      --status-pending-text: #8a6a1c;
      --status-idle-bg: rgba(58, 58, 56, 0.05);
      --status-idle-text: #555;
      
      /* 3. TECHNICAL MINIMALIST OVERRIDES */
      /* Radii: Strict 0px or 2px */
      --radius-sm: 2px;
      --radius-md: 2px;
      --radius-lg: 2px;
      --radius-xl: 2px;
      
      /* Shadows: Removed */
      --shadow-sm: none;
      --shadow-md: none;
      --shadow-lg: none;
      --shadow-xl: none;
      
      /* Spacing */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 24px;
      --space-6: 32px;
      --space-7: 48px;
      --space-8: 64px;
      
      /* Animations */
      --ease-tech: cubic-bezier(0.2, 0, 0, 1);
      --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    }

    .dark {
      /* HALO Dark Mode Tokens */
      --bg-primary: #000000;
      --bg-card: #0A0A0A;
      --text-primary: #FBFDE2;
      --text-secondary: rgba(251, 253, 226, 0.6);
      --text-muted: rgba(251, 253, 226, 0.4);
      
      --border-primary: rgba(251, 253, 226, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08); /* Hairline */
      
      --accent: #FBFDE2;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-ui);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.5;
      overflow-x: hidden;
    }
    
    /* Random "Panels" */
    /* Random "Panels" removed */

    /* TAB CONTENT */
    .tab-content { display: none; animation: fadeIn 0.3s ease; }
    .tab-content.active { display: block; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    /* TOGGLE PILL - V3 Style (Flat) */
    .toggle-pill {
      position: fixed;
      top: 80px; /* Below tech nav */
      right: var(--space-5);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: 6px 14px 6px 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.3s var(--ease-out-quart);
    }

    .toggle-track {
      width: 36px; height: 20px;
      background: var(--accent);
      border-radius: var(--radius-sm);
      position: relative;
      transition: background 0.3s;
    }

    .toggle-dot {
      position: absolute;
      top: 2px; left: 2px;
      width: 16px; height: 16px;
      background: var(--bg-primary);
      border-radius: 2px; /* Square dot for tech mode */
      transition: transform 0.3s var(--ease-out-expo);
    }

    .dark .toggle-dot { transform: translateX(16px); }

    .toggle-text {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--text-primary);
    }

    .container { max-width: 1200px; margin: 0 auto; padding: 0 var(--space-5); border-left: 1px solid var(--border-subtle); border-right: 1px solid var(--border-subtle); min-height: 100vh; background: var(--bg-primary); }

    /* =============================================
       TECHNICAL NAVIGATION
       ============================================= */
    .tech-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) var(--space-5);
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-primary);
    }
    
    .logo-box {
      display: flex; align-items: center; gap: 8px;
    }
    .logo-brand { font-family: var(--font-brand); font-size: 1.25rem; font-weight: 400; color: var(--text-primary); }
    .logo-sub { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); }
    
    .nav-links { display: flex; gap: var(--space-6); }
    
    .nav-item {
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-primary);
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 0.2s;
      cursor: pointer;
      border-bottom: 1px solid transparent;
    }
    .nav-item:hover, .nav-item.active { opacity: 1; text-decoration: none; border-bottom-color: var(--accent); }
    .nav-item span { opacity: 0.5; margin-right: 4px; }
    
    .nav-actions { display: flex; gap: var(--space-3); }


    /* Button - Technical (Premium) */
    .btn-tech {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      font-family: var(--font-ui); /* PP Neue Montreal */
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: transparent;
      border: 1px solid var(--border-primary);
      cursor: pointer;
      color: var(--text-primary);
      transition: all 0.2s;
    }
    
    .btn-tech:hover {
      background: var(--text-primary);
      color: var(--bg-primary);
    }
    
    .btn-tech.solid {
      background: var(--text-primary);
      color: var(--bg-primary);
    }
    
    .btn-tech.solid:hover {
      background: transparent;
      color: var(--text-primary);
    }

    /* RESTORED V2 BUTTON STYLES (Premium Gradient & Depth) */
    
    /* CTA - Gradient */
    .btn--cta {
      background: linear-gradient(135deg, rgba(213, 218, 173, 0.8) 0%, rgba(253, 253, 250, 0.8) 100%);
      border: 1px solid #CBD5A0;
      color: #0D1F18;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    }
    
    .btn--cta:hover {
      background: linear-gradient(135deg, rgba(213, 218, 173, 1) 0%, rgba(253, 253, 250, 1) 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
    }
    
    .dark .btn--cta {
      background: linear-gradient(135deg, #A3BD6A 0%, #D5DAAD 100%); /* Sage Gradient for Dark Mode */
      border: 1px solid #A3BD6A;
      color: #0D1F18;
      box-shadow: 0 2px 10px rgba(163, 189, 106, 0.2) !important;
    }
    
    .dark .btn--cta:hover {
      background: linear-gradient(135deg, #B5CF7A 0%, #E1E6B9 100%);
      box-shadow: 0 4px 15px rgba(163, 189, 106, 0.3) !important;
      transform: translateY(-1px);
    }

    /* Primary - Solid Fill */
    .btn--primary {
      background: #0D1F18;
      border: 1px solid #0D1F18;
      color: #FBFDE2;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
    }
    
    .btn--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12) !important;
    }
    
    .dark .btn--primary {
      background: #FBFDE2;
      border: 1px solid #FBFDE2;
      color: #0D1F18;
    }
    .dark .btn--primary:hover {
      background: #FFFFFF;
      border-color: #FFFFFF;
    }

    /* Outline */
    .btn--outline { 
      background: transparent; 
      border: 1px solid rgba(13, 31, 24, 0.2); /* Stronger border for light mode */
      color: var(--text-primary); 
    }
    .btn--outline:hover {
      background: rgba(13, 31, 24, 0.05);
      border-color: var(--text-primary);
    }
    
    .dark .btn--outline {
      border: 1px solid rgba(251, 253, 226, 0.3); /* Visible Cream border for Dark Mode */
      color: #FBFDE2;
    }
    .dark .btn--outline:hover {
      background: rgba(251, 253, 226, 0.05);
      border-color: #FBFDE2;
    }

    /* Subtle */
    .btn--subtle { 
      background: rgba(163, 189, 106, 0.12);
      border: 1px solid transparent; 
      color: #5a7a3a; 
    }
    .btn--subtle:hover {
      background: rgba(163, 189, 106, 0.2);
      border-color: rgba(163, 189, 106, 0.3);
    }
    .dark .btn--subtle {
      background: rgba(251, 253, 226, 0.1);
      color: #FBFDE2;
    }

    /* Ghost */
    .btn--ghost { 
      background: transparent; 
      color: var(--text-secondary); 
    }
    .btn--ghost:hover { 
      background: rgba(0, 0, 0, 0.04); 
      color: var(--text-primary); 
    }
    
    /* States */
    .btn--loading { opacity: 0.7; cursor: wait; position: relative; color: transparent !important; }
    .btn--loading::after { content: ''; position: absolute; width: 14px; height: 14px; border: 2px solid var(--text-primary); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
    .btn--disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; border-style: dashed; }
    
    @keyframes spin { to { transform: rotate(360deg); } }

    .section-title {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
      margin: var(--space-7) 0 var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--border-subtle);
      scroll-margin-top: 80px; /* Fix sticky nav overlap */
    }

    /* ========================================================================
       STANDARD HALO COMPONENTS (ADAPTED FOR V3)
       ======================================================================== */
    
    /* TYPOGRAPHY */
     .type-sample {
       background: var(--bg-card);
       border: 1px solid var(--border-subtle);
       border-radius: var(--radius-lg);
       padding: var(--space-5);
       margin-bottom: var(--space-3);
     }
     .type-sample__label {
       font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em;
       font-family: var(--font-mono); font-weight: 500; color: var(--text-muted); margin-bottom: var(--space-2);
     }
     .type-sample--display .type-sample__text { font-family: var(--font-brand); font-size: 2rem; letter-spacing: 0.08em; }
     .type-sample--heading .type-sample__text { font-family: var(--font-ui); font-size: 1.25rem; font-weight: 500; letter-spacing: -0.01em; }
     .type-sample--body .type-sample__text { font-family: var(--font-ui); font-size: 1rem; line-height: 1.5; }
     .type-sample--caption .type-sample__text { font-family: var(--font-ui); font-size: 0.75rem; color: var(--text-secondary); }
     .type-sample--mono .type-sample__text { font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary); }

    /* COLORS */
     .color-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: var(--space-3); }
     .color-swatch { border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-subtle); }
     .color-swatch__preview { height: 64px; }
     .color-swatch__info { padding: var(--space-2) var(--space-3); background: var(--bg-card); }
     .color-swatch__name { font-size: 0.7rem; font-weight: 500; }
     .color-swatch__hex { font-size: 0.6rem; font-family: monospace; color: var(--text-muted); }

    /* SPACING */
     .spacing-row { display: flex; align-items: center; gap: var(--space-4); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
     .spacing-row:last-child { border-bottom: none; }
     .spacing-label { width: 80px; font-family: monospace; font-size: 0.75rem; color: var(--text-secondary); }
     .spacing-value { width: 50px; font-size: 0.7rem; color: var(--text-secondary); text-align: right; }
     .spacing-bar { height: 12px; background: var(--accent); border-radius: 2px; opacity: 0.7; }

    /* SHADOWS (Will appear flat in v3) */
     .shadow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: var(--space-4); }
     .shadow-sample { background: var(--bg-card); border-radius: var(--radius-lg); padding: var(--space-5); text-align: center; border: 1px solid var(--border-subtle); }
     .shadow-sample--sm { box-shadow: var(--shadow-sm); }
     .shadow-sample--md { box-shadow: var(--shadow-md); }
     .shadow-sample--lg { box-shadow: var(--shadow-lg); }
     .shadow-sample--xl { box-shadow: var(--shadow-xl); }
     .shadow-sample__name { font-family: monospace; font-size: 0.7rem; color: var(--text-secondary); }

    /* RADII */
     .radii-grid { display: flex; gap: var(--space-4); flex-wrap: wrap; }
     .radius-sample { width: 80px; height: 80px; background: var(--border-primary); display: flex; align-items: center; justify-content: center; color: var(--text-primary); }
     .radius-sample--sm { border-radius: var(--radius-sm); }
     .radius-sample--md { border-radius: var(--radius-md); }
     .radius-sample__label { font-family: monospace; font-size: 0.6rem; color: var(--text-primary); }

    /* BUTTONS STANDARD */
     .btn-section { display: flex; flex-direction: column; gap: var(--space-5); }
     .btn-group { display: flex; flex-direction: column; gap: var(--space-3); }
     .btn-group__label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: var(--text-secondary); font-family: var(--font-ui); }
     .btn-row { display: flex; gap: var(--space-3); flex-wrap: wrap; align-items: center; }
     
     .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 10px 18px; border-radius: var(--radius-md); font-family: var(--font-ui); font-size: 0.9rem; font-weight: 500; cursor: pointer; border: none; text-decoration: none; }
     
     /* Standard base btn class */

    /* CARDS */
    .cards-row { display: flex; gap: var(--space-4); flex-wrap: wrap; justify-content: center; }
    .showcase-card { position: relative; width: 240px; border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-card); border: 1px solid var(--border-primary); cursor: pointer; box-shadow: none !important; }
    .showcase-card__visual { position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; }
    .showcase-card__image { width: 100%; height: 100%; object-fit: cover; }
    
    /* V2 Smooth Blend - Gradient Overlay */
    .showcase-card__visual::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 60%;
      background: linear-gradient(to bottom, transparent 0%, var(--bg-card) 100%);
      pointer-events: none;
    }

    .showcase-card__content { padding: var(--space-4); position: relative; z-index: 1; margin-top: -1.5rem; }
    .showcase-card__title { font-family: var(--font-ui); font-size: 1rem; font-weight: 500; margin-bottom: 2px; }
    .showcase-card__subtitle { font-size: 0.75rem; color: var(--text-secondary); }
    .showcase-card__image.light-img { opacity: 1; }
    .showcase-card__image.dark-img { position: absolute; inset: 0; opacity: 0; }
    .dark .showcase-card__image.light-img { opacity: 0; }
    .dark .showcase-card__image.dark-img { opacity: 1; }

    /* THEME SAMPLES */
    .samples-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
    .sample-card { border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--border-primary); cursor: pointer; opacity: 0.5; }
    .sample-card.active { opacity: 1; border-color: var(--accent-mint); }
    .sample-card__visual img { width: 100%; height: auto; display: block; }
    .sample-card__label { padding: var(--space-3); text-align: center; font-family: var(--font-mono); font-size: 0.7rem; border-top: 1px solid var(--border-subtle); background: var(--bg-card); color: var(--text-primary); }

    /* DASHBOARD */
    .dashboard-panel { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-card); margin-top: var(--space-4); box-shadow: none !important; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-5) var(--space-6); border-bottom: 1px solid var(--border-subtle); background: rgba(0,0,0,0.02); }
    .dashboard-title { font-family: var(--font-ui); font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }
    .metric-row { display: flex; gap: var(--space-8); padding: var(--space-6); border-bottom: 1px solid var(--border-subtle); background: var(--bg-card); }
    .metric-item { display: flex; flex-direction: column; gap: 6px; }
    .metric-label { font-size: 0.7rem; color: var(--text-secondary); font-weight: 600; font-family: var(--font-ui); text-transform: uppercase; }
    .metric-value { font-family: var(--font-mono); font-size: 1.25rem; font-weight: 500; color: var(--text-primary); }
    .data-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
    .data-table th { text-align: left; padding: var(--space-3) var(--space-6); color: var(--text-muted); font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-subtle); }
    .data-table td { padding: var(--space-3) var(--space-6); color: var(--text-secondary); border-bottom: 1px solid var(--border-subtle); font-size: 0.8rem; }
    .data-table tbody tr { transition: background-color 0.2s; }
    .data-table tbody tr:hover { background-color: rgba(163, 189, 106, 0.08); /* Sage Hover */ }
    
    .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 2px 8px; border-radius: 2px; font-size: 0.7rem; border: 1px solid transparent; font-family: var(--font-mono); text-transform: uppercase; }
    .status-badge--active { background: rgba(163, 189, 106, 0.2); color: #0D1F18; border-color: rgba(163, 189, 106, 0.3); }
    .status-badge--pending { background: rgba(203, 213, 160, 0.3); color: #274029; border-color: rgba(203, 213, 160, 0.4); } /* Replaced Orange with Sage/Brand Green */
    .status-badge--idle { background: rgba(0, 0, 0, 0.03); color: var(--text-muted); border-color: var(--border-subtle); }

    /* Dark Mode Overrides for Network Activity Table */
    .dark .data-table tbody tr:hover { background-color: rgba(251, 253, 226, 0.05); }
    .dark .status-badge--active { background: rgba(163, 189, 106, 0.2); color: #FBFDE2; border-color: rgba(163, 189, 106, 0.3); }
    .dark .status-badge--pending { background: rgba(203, 213, 160, 0.2); color: #E1F0DA; border-color: rgba(203, 213, 160, 0.3); } 
    .dark .status-badge--idle { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); border-color: var(--border-subtle); }
    
    /* V2 Network Activity Specifics - Refined for V3 */
    .status-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; box-shadow: 0 0 0 2px rgba(163, 189, 106, 0.15); animation: pulse 2s infinite; }
    .status-dot-sm { width: 4px; height: 4px; background: currentColor; border-radius: 50%; opacity: 0.7; }
    .primary-text { font-family: var(--font-mono); color: var(--text-primary); font-weight: 500; }
    
    @keyframes pulse { 
      0% { box-shadow: 0 0 0 0 rgba(163, 189, 106, 0.4); } 
      70% { box-shadow: 0 0 0 4px rgba(163, 189, 106, 0); } 
      100% { box-shadow: 0 0 0 0 rgba(163, 189, 106, 0); } 
    }

    /* MOSAIC GRID from V2 (Kept as content) */
    .mosaic-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-auto-rows: 200px;
      gap: var(--space-4);
      margin-top: var(--space-5);
    }
    
    .mosaic-item {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease;
    }
    .mosaic-item:hover { border-color: var(--accent); transform: scale(0.99); }
    .span-2 { grid-column: span 2; }
    .row-2 { grid-row: span 2; }
    .bg-noise { position: absolute; inset: 0; opacity: 0.05; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"); }
    .mosaic-text { font-family: var(--font-brand); font-size: 2rem; letter-spacing: -0.02em; position: relative; z-index: 2; }
    .mosaic-sub { font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary); margin-top: var(--space-2); text-transform: uppercase; }
    .dither-img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.2) grayscale(1); mix-blend-mode: multiply; opacity: 0.8; }
    .dark .dither-img { filter: contrast(1.2) grayscale(1) invert(0.9); mix-blend-mode: screen; }
    .mosaic-item--dark { background: #0D1F18; color: #FBFDE2; }

    /* CODE BLOCK - Flat V3 Style */
    .code-block { border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--bg-card); overflow: hidden; margin-bottom: 40px; }
    .code-block__header { display: flex; justify-content: space-between; align-items: center; padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--border-subtle); background: rgba(0,0,0,0.02); }
    .code-block__title { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); }
    .code-block__content { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-primary); padding: var(--space-4); overflow-x: auto; white-space: pre-wrap; margin: 0; background: transparent; }
    .btn-icon { background: transparent; border: 1px solid transparent; color: var(--text-secondary); cursor: pointer; padding: 6px; border-radius: var(--radius-sm); transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; }
    .btn-icon:hover { background: var(--status-idle-bg); color: var(--text-primary); border-color: var(--border-subtle); }

    /* MOBILE OPTIMIZATIONS - FLEXBOX REFACTOR */
    @media (max-width: 768px) {
      .tech-nav {
        flex-wrap: wrap; /* Allow wrapping */
        flex-direction: row; /* Horizontal main axis */
        justify-content: space-between;
        padding: var(--space-4) var(--space-5);
        gap: var(--space-3);
      }
      
      .logo-box {
        order: 1;
        width: auto; /* Hug content */
        margin-bottom: 0;
      }
      
      .nav-actions {
        order: 2;
        width: auto;
        height: auto;
        display: flex;
        align-items: center;
      }
      
      .toggle-pill {
        position: static; /* In normal flow */
        margin: 0;
      }
      
      .nav-links {
        order: 3;
        width: 100%; /* Full width new row */
        margin-top: var(--space-2);
        padding-top: var(--space-3);
        border-top: 1px solid var(--border-subtle);
        
        /* Same scroll behavior */
        justify-content: flex-start;
        overflow-x: auto;
        padding-bottom: 4px;
        gap: var(--space-5);
        -webkit-overflow-scrolling: touch;
      }
      
      .nav-item {
        font-size: 13px;
        padding: 4px 0;
        white-space: nowrap;
      }
      
      /* Restore subtitle if desired, or keep hidden. 
         Let's unhide it if room permits with this layout, 
         but safer to keep hidden for cleaner top row on small phones. */
      .logo-sub { display: none; }
      
      .container { padding: 0 var(--space-4); border: none; }
      
      .container {
        padding: 0 var(--space-4);
        border: none;
      }
      
      /* Adjust sections */
      .section-title { margin-top: var(--space-6); }
      .mosaic-grid { grid-template-columns: 1fr; }
      .mosaic-item { grid-column: span 1 !important; grid-row: span 1 !important; min-height: 200px; }
      .samples-grid { grid-template-columns: 1fr; }
    }

  </style>
</head>
<body>
  
  <!-- Technical Nav with integrated Toggle -->
  <nav class="tech-nav">
    <div class="logo-box">
      <!-- Branding Text -->
      <span class="logo-brand">HALO</span>
      <span class="logo-sub">Design System</span>
    </div>
    <div class="nav-links">
      <a onclick="showTab('tokens')" class="nav-item active" id="nav-tokens"><span>01.</span>Tokens</a>
      <a onclick="showTab('components')" class="nav-item" id="nav-components"><span>02.</span>Components</a>
      <a onclick="showTab('ui-blocks')" class="nav-item" id="nav-ui-blocks"><span>03.</span>UI Blocks</a>
    </div>
    <div class="nav-actions">
      <!-- Moved Toggle Here -->
      <button class="toggle-pill" onclick="toggleTheme()" style="position:static; top:auto; right:auto; margin:0;">
        <div class="toggle-track"><div class="toggle-dot"></div></div>
        <span class="toggle-text">Agentic</span>
      </button>
    </div>
  </nav>

  <div class="container">
    
    <!-- TAB: TOKENS -->
    <div id="tab-tokens" class="tab-content active">
    
    <!-- TYPOGRAPHY -->
    <h2 class="section-title" id="tokens">Typography</h2>
    
    <div class="type-sample type-sample--display">
      <div class="type-sample__label">Display · FK Raster · 2rem</div>
      <div class="type-sample__text">AGENTIC COMMERCE</div>
    </div>
    
    <div class="type-sample type-sample--heading">
      <div class="type-sample__label">Heading · PP Neue Montreal · 1.25rem</div>
      <div class="type-sample__text">Builders Should Build</div>
    </div>
    
    <div class="type-sample type-sample--body">
      <div class="type-sample__label">Body · PP Neue Montreal · 1rem</div>
      <div class="type-sample__text">HALO is a protocol for AI-native economic infrastructure. It enables agents to own, trade, and transact.</div>
    </div>
    
    <div class="type-sample type-sample--mono">
      <div class="type-sample__label">Mono · System Monospace · 0.85rem</div>
      <div class="type-sample__text">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
    </div>

    <!-- COLORS (Start of Components) -->
    <h2 class="section-title">Colors</h2>
    <div class="color-grid">
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#F4F7EE"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Sage Cream</div>
          <div class="color-swatch__hex">#F4F7EE</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#A3BD6A"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Olive</div>
          <div class="color-swatch__hex">#A3BD6A</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#D5DAAD"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Sage Light</div>
          <div class="color-swatch__hex">#D5DAAD</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#CBD5A0"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Border Sage</div>
          <div class="color-swatch__hex">#CBD5A0</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#274029"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Brand Green</div>
          <div class="color-swatch__hex">#274029</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#0D1F18"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Forest</div>
          <div class="color-swatch__hex">#0D1F18</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#000"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Black</div>
          <div class="color-swatch__hex">#000000</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#FBFDE2"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Cream</div>
          <div class="color-swatch__hex">#FBFDE2</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:#FDFDFD; border: 1px solid #eee"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Card White</div>
          <div class="color-swatch__hex">#FDFDFD</div>
        </div>
      </div>
    </div>

    <!-- SPACING -->
    <h2 class="section-title">Spacing</h2>
    <div class="spacing-row"><span class="spacing-label">--space-1</span><div class="spacing-bar" style="width:4px"></div><span class="spacing-value">4px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-2</span><div class="spacing-bar" style="width:8px"></div><span class="spacing-value">8px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-3</span><div class="spacing-bar" style="width:12px"></div><span class="spacing-value">12px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-4</span><div class="spacing-bar" style="width:16px"></div><span class="spacing-value">16px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-5</span><div class="spacing-bar" style="width:24px"></div><span class="spacing-value">24px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-6</span><div class="spacing-bar" style="width:32px"></div><span class="spacing-value">32px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-7</span><div class="spacing-bar" style="width:48px"></div><span class="spacing-value">48px</span></div>
    <div class="spacing-row"><span class="spacing-label">--space-8</span><div class="spacing-bar" style="width:64px"></div><span class="spacing-value">64px</span></div>

    <!-- BORDERS -->
    <h2 class="section-title">Borders</h2>
    <div class="color-grid">
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:var(--bg-card); border: 1px solid var(--border-primary); margin: 12px; height: 40px; border-radius: var(--radius-md);"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Border Primary</div>
          <div class="color-swatch__hex">var(--border-primary)</div>
        </div>
      </div>
      <div class="color-swatch">
        <div class="color-swatch__preview" style="background:var(--bg-card); border: 1px solid var(--border-subtle); margin: 12px; height: 40px; border-radius: var(--radius-md);"></div>
        <div class="color-swatch__info">
          <div class="color-swatch__name">Border Subtle</div>
          <div class="color-swatch__hex">var(--border-subtle)</div>
        </div>
      </div>
    </div>

    <!-- THEME TOKENS -->
    <h2 class="section-title">Theme Tokens</h2>
    <div class="code-block">
      <div class="code-block__header">
        <span class="code-block__title">CSS Variables (Tailwind v4)</span>
        <button id="copyTokensBtn" class="btn-icon" onclick="copyTokens()" aria-label="Copy Tokens" title="Copy Tokens">
          <!-- Copy Icon (Clipboard) -->
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
      <pre class="code-block__content" id="themeTokensCode">:root {
  --background: #F4F7EE;
  --foreground: #0D1F18;
  --card: #F4F7EE;
  --card-foreground: #0D1F18;
  --popover: #FFFFFF;
  --popover-foreground: #0D1F18;
  --primary: #0D1F18;
  --primary-foreground: #FBFDE2;
  --secondary: #E1F0DA;
  --secondary-foreground: #2D5B28;
  --muted: #E1F0DA;
  --muted-foreground: #666666;
  --accent: #A3BD6A;
  --accent-foreground: #0D1F18;
  --destructive: #0D1F18;
  --destructive-foreground: #FFFFFF;
  --border: #CBD5A0;
  --input: #CBD5A0;
  --ring: #A3BD6A;
  --chart-1: #2D5B28;
  --chart-2: #A3BD6A;
  --chart-3: #CBD5A0;
  --chart-4: #E1F0DA;
  --chart-5: #0D1F18;
  --sidebar: #F4F7EE;
  --sidebar-foreground: #0D1F18;
  --sidebar-primary: #0D1F18;
  --sidebar-primary-foreground: #FBFDE2;
  --sidebar-accent: #E1F0DA;
  --sidebar-accent-foreground: #0D1F18;
  --sidebar-border: #CBD5A0;
  --sidebar-ring: #A3BD6A;
  --font-sans: 'PP Neue Montreal', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'FK Raster', ui-serif, serif;
  --font-mono: ui-monospace, monospace;
  --radius: 0.125rem; /* 2px - Technical/Sharp */
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 0px;
  --shadow-spread: 0px;
  --shadow-opacity: 1;
  --shadow-color: #CBD5A0;
  --shadow-2xs: 0 1px 0 0 var(--border);
  --shadow-xs: 0 1px 0 0 var(--border);
  --shadow-sm: 0 1px 0 0 var(--border);
  --shadow: 0 1px 0 0 var(--border);
  --shadow-md: 0 2px 0 0 var(--border);
  --shadow-lg: 0 4px 0 0 var(--border);
  --shadow-xl: 0 8px 0 0 var(--border);
  --shadow-2xl: 0 12px 0 0 var(--border);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: #000000;
  --foreground: #FBFDE2;
  --card: #0A0A0A;
  --card-foreground: #FBFDE2;
  --popover: #0F0F0F;
  --popover-foreground: #FBFDE2;
  --primary: #FBFDE2;
  --primary-foreground: #0D1F18;
  --secondary: #0A0A0A;
  --secondary-foreground: #FBFDE2;
  --muted: #0A0A0A;
  --muted-foreground: rgba(251, 253, 226, 0.6);
  --accent: #FBFDE2;
  --accent-foreground: #0D1F18;
  --destructive: #FBFDE2; /* Cream for high contrast in dark mode, strictly palette */
  --destructive-foreground: #0D1F18;
  --border: rgba(251, 253, 226, 0.15);
  --input: rgba(251, 253, 226, 0.15);
  --ring: #FBFDE2;
  --chart-1: #A3BD6A;
  --chart-2: #FBFDE2;
  --chart-3: #CBD5A0;
  --chart-4: #E1F0DA;
  --chart-5: #0D1F18;
  --sidebar: #0F0F0F;
  --sidebar-foreground: #FBFDE2;
  --sidebar-primary: #FBFDE2;
  --sidebar-primary-foreground: #0D1F18;
  --sidebar-accent: #0A0A0A;
  --sidebar-accent-foreground: #FBFDE2;
  --sidebar-border: rgba(251, 253, 226, 0.15);
  --sidebar-ring: #FBFDE2;
  --font-sans: 'PP Neue Montreal', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'FK Raster', ui-serif, serif;
  --font-mono: ui-monospace, monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: #000000;
  --shadow-2xs: 0 1px 3px 0px rgba(0, 0, 0, 0.3);
  --shadow-xs: 0 1px 3px 0px rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 32px -8px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
  --shadow-2xl: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
}</pre>
    </div>
    </div> <!-- END TAB: TOKENS -->

    <!-- TAB: COMPONENTS -->
    <div id="tab-components" class="tab-content">

    <!-- BUTTONS -->
    <h2 class="section-title" id="components">Buttons</h2>
    <div class="btn-section">
      
      <div class="btn-group">
        <span class="btn-group__label">Variants</span>
        <div class="btn-row">
          <button class="btn btn--cta">Gradient CTA</button>
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--outline">Outline</button>
          <button class="btn btn--subtle">Subtle</button>
          <button class="btn btn--ghost">Ghost</button>
        </div>
      </div>
      
      <div class="btn-group">
        <span class="btn-group__label">States</span>
        <div class="btn-row">
          <button class="btn btn--cta">Default</button>
          <button class="btn btn--cta btn--loading">Loading</button>
          <button class="btn btn--cta btn--disabled">Disabled</button>
        </div>
      </div>
      
    </div>

    <!-- CARDS -->
    <h2 class="section-title">Cards</h2>
    <div class="cards-row">
      <div class="showcase-card">
        <div class="showcase-card__visual">
           <img src="${images['card-agentic']}" alt="" class="showcase-card__image light-img">
           <img src="${images['card-dark']}" alt="" class="showcase-card__image dark-img">
        </div>
        <div class="showcase-card__content">
           <h3 class="showcase-card__title">Agentic Commerce</h3>
           <p class="showcase-card__subtitle">Automated value exchange</p>
        </div>
      </div>
    </div>

    <!-- THEME SAMPLES -->
    <h2 class="section-title">Theme Samples</h2>
    <div class="samples-grid">
      <div class="sample-card sample-card--agentic active" id="sample-agentic">
        <div class="sample-card__visual">
          <img src="${images['duotone-agentic']}" alt="">
        </div>
        <div class="sample-card__label">Agentic Mode</div>
      </div>
      <div class="sample-card sample-card--dark" id="sample-dark">
        <div class="sample-card__visual">
          <img src="${images['duotone-dark']}" alt="">
        </div>
        <div class="sample-card__label">Dark Mode</div>
      </div>
    </div>
    </div> <!-- END TAB: COMPONENTS -->

    <!-- TAB: UI BLOCKS -->
    <div id="tab-ui-blocks" class="tab-content">
    
    <!-- DASHBOARD -->
    <h2 class="section-title">Dashboard / Agentic UI</h2>
    <div class="dashboard-panel">
      <div class="dashboard-header">
        <span class="dashboard-title">Network Activity</span>
        <div class="status-dot"></div>
      </div>
      
      <div class="metric-row">
        <div class="metric-item">
          <span class="metric-label">Total Volume</span>
          <span class="metric-value">$68,492.00</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">Active Nodes</span>
          <span class="metric-value">42</span>
        </div>
        <div class="metric-item">
          <span class="metric-label">Network Load</span>
          <span class="metric-value">12%</span>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>NODE ID</th>
            <th>STATUS</th>
            <th>UPTIME</th>
            <th>LATENCY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="primary-text">AG-8842</td>
            <td><span class="status-badge status-badge--pending"><div class="status-dot-sm"></div>Negotiating</span></td>
            <td>12h 4m</td>
            <td>24ms</td>
          </tr>
          <tr>
            <td class="primary-text">AG-3921</td>
            <td><span class="status-badge status-badge--idle"><div class="status-dot-sm"></div>Idle</span></td>
            <td>4h 32m</td>
            <td>18ms</td>
          </tr>
          <tr>
            <td class="primary-text">AG-1002</td>
            <td><span class="status-badge status-badge--active"><div class="status-dot-sm"></div>Validating</span></td>
            <td>42m</td>
            <td>45ms</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MOSAIC BLOCKY LAYOUT -->
    <h2 class="section-title">Mosaic / Blocky Layout</h2>
    <div class="mosaic-grid">
      <div class="mosaic-item span-2 row-2 mosaic-item--dark">
        <div class="bg-noise"></div>
        <div class="mosaic-text">The Protocol</div>
        <div class="mosaic-sub">Agentic Infrastructure</div>
      </div>
      <div class="mosaic-item">
        <div class="bg-noise"></div>
        <img src="${images['duotone-agentic']}" class="dither-img" alt="Texture">
      </div>
      <div class="mosaic-item">
        <div class="mosaic-sub">v2.0.4</div>
      </div>
      <div class="mosaic-item span-2">
         <div class="mosaic-text" style="font-size:1.5rem">Permissionless</div>
      </div>
    </div>



    </div> <!-- END TAB: UI BLOCKS -->

    <footer>
      <div class="section-header" style="text-align: center; border: none;">HALO INC. // EST 2024 // V3.04 (TECH REF)</div>
    </footer>

  </div>
  
  <script>
    function showTab(tabId) {
       // Hide all tabs
       document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
       
       // Show selected tab
       document.getElementById('tab-' + tabId).classList.add('active');
       
       // Update nav state
       document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
       document.getElementById('nav-' + tabId).classList.add('active');
       
       // Scroll to top
       window.scrollTo(0, 0);
    }

    function toggleTheme() {
       document.body.classList.toggle('dark');
       
       const toggleText = document.querySelector('.toggle-text');
       if (toggleText) {
         toggleText.textContent = document.body.classList.contains('dark') ? 'Midnight' : 'Agentic';
       }

       // Update sample active states
       const agenticCard = document.getElementById('sample-agentic');
       const darkCard = document.getElementById('sample-dark');
       
       if (agenticCard && darkCard) {
         agenticCard.classList.toggle('active', !document.body.classList.contains('dark'));
         darkCard.classList.toggle('active', document.body.classList.contains('dark'));
       }
    }

    function copyTokens() {
       const code = document.getElementById('themeTokensCode').innerText;
       navigator.clipboard.writeText(code).then(() => {
         const btn = document.getElementById('copyTokensBtn');
         const originalContent = btn.innerHTML;
         
         btn.innerHTML = \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D5B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>\`;
         btn.style.borderColor = '#2D5B28';
         btn.style.backgroundColor = '#E1F0DA';
         
         setTimeout(() => {
           btn.innerHTML = originalContent;
           btn.style.borderColor = '';
           btn.style.backgroundColor = '';
         }, 2000);
       });
    }
  </script>
</body>
</html>`;

fs.writeFileSync('docs/design-system/HALO-design-system-v3.html', html);
console.log('✓ Generated docs/design-system/HALO-design-system-v3.html (Full System Replaced)');
