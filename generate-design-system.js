import fs from 'fs';

// Embed card images
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
  <title>HALO Design System</title>
  <script src="https://tweakcn.com/live-preview.min.js"></script>
  <style>
    @font-face {
      font-family: 'FK Raster';
      src: url('../../public/fonts/FK_Raster_Roman_Compact_Smooth.ttf') format('truetype');
      font-weight: 400;
      font-display: swap;
    }

    @font-face {
      font-family: 'PP Neue Montreal';
      src: url('../../public/fonts/PP_Neue_Montreal_Regular.ttf') format('truetype');
      font-weight: 400;
      font-display: swap;
    }

    :root {
      /* Typography */
      --font-brand: 'FK Raster', system-ui, sans-serif;
      --font-ui: 'PP Neue Montreal', system-ui, sans-serif;
      --font-mono: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
      
      /* Colors - Agentic */
      --bg-primary: #F4F7EE;
      --bg-card: transparent; /* Subtle structure without white boxes */
      --bg-panel: #F4F7EE;
      --text-primary: #0D1F18;
      --text-secondary: rgba(13, 31, 24, 0.6);
      --text-muted: rgba(13, 31, 24, 0.4);
      --border-primary: #CBD5A0;
      --border-subtle: rgba(0, 0, 0, 0.08); /* Stronger architecture lines */
      --accent: #A3BD6A;
      
      /* Status */
      --status-active-bg: #E1F0DA;
      --status-active-text: #2D5B28;
      --status-active-bg: #E1F0DA;
      --status-active-text: #2D5B28;
      --status-pending-bg: #efeeb6;
      --status-pending-text: #8a6a1c;
      --status-idle-bg: #F0F0F0;
      --status-idle-text: #666666;
      
      /* Spacing */
      --space-1: 4px;
      --space-2: 8px;
      --space-3: 12px;
      --space-4: 16px;
      --space-5: 24px;
      --space-6: 32px;
      --space-7: 48px;
      --space-8: 64px;
      
      /* Radii - Strict User Controls */
      --radius-sm: 6px;
      --radius-md: 10px; /* Buttons, Inputs */
      --radius-lg: 10px; /* Cards, Panels */
      --radius-xl: 10px;
      
      /* Shadows - Refined for density */
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
      --shadow-md: 0 2px 8px -1px rgba(0, 0, 0, 0.08);
      --shadow-lg: 0 8px 24px -6px rgba(0, 0, 0, 0.12);
      --shadow-xl: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
      
      /* Easing */
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
    }

    .dark {
      --bg-primary: #000;
      --bg-card: #0A0A0A;
      --bg-panel: #0F0F0F;
      --text-primary: #FBFDE2;
      --text-secondary: rgba(251, 253, 226, 0.6);
      --text-muted: #FDFDFD;
      --border-primary: rgba(251, 253, 226, 0.15);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --accent: #FBFDE2;
      
      --status-active-bg: rgba(163, 189, 106, 0.2);
      --status-active-text: #D5E8B6;
      --status-active-bg: rgba(163, 189, 106, 0.2);
      --status-active-text: #D5E8B6;
      --status-pending-bg: rgba(228, 208, 10, 0.1);
      --status-pending-text: #e6d375;
      --status-idle-bg: rgba(255, 255, 255, 0.1);
      --status-idle-text: rgba(255, 255, 255, 0.6);
      
      --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 12px 32px -8px rgba(0, 0, 0, 0.5);
      --shadow-xl: 0 24px 48px -12px rgba(0, 0, 0, 0.6);
    }

    /* Dark Mode Overrides for Visibility */
    .dark .shadow-sample {
      background: #1A1A1A; /* Surface lighter than background */
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .dark .radius-sample {
      opacity: 1; /* Ensure visibility */
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-ui);
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      transition: background 0.5s var(--ease-out-expo), color 0.4s;
    }

    .container { max-width: 1000px; margin: 0 auto; padding: var(--space-5); }
    
    header { text-align: center; padding: var(--space-7) var(--space-5) var(--space-5); }
    
    h1 { 
      font-family: var(--font-brand); 
      font-size: 2.5rem; 
      font-weight: 400; 
      text-transform: uppercase; 
      letter-spacing: 0.1em; 
    }
    
    .subtitle { 
      font-size: 0.9rem; 
      color: var(--text-secondary);
      margin-top: var(--space-1); 
    }

    /* Section Headers */
    .section-title {
      font-family: var(--font-ui);
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin: var(--space-7) 0 var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 1px solid var(--border-subtle);
    }

    /* =============================================
       TOGGLE
       ============================================= */
    .toggle-pill {
      position: fixed;
      top: var(--space-4);
      right: var(--space-4);
      z-index: 100;
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: 6px 14px 6px 8px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.3s var(--ease-out-quart);
      box-shadow: var(--shadow-md);
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
      background: #fff;
      border-radius: 50%;
      transition: transform 0.3s var(--ease-out-expo);
      box-shadow: var(--shadow-sm);
    }

    .dark .toggle-dot { transform: translateX(16px); }

    .toggle-text {
      font-size: 0.65rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--text-primary);
    }

    /* =============================================
       TYPOGRAPHY
       ============================================= */
    .type-sample {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      margin-bottom: var(--space-3);
    }

    .type-sample__label {
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-family: var(--font-body); /* Changed from Display to Body/Medium for cleaner UI */
      font-weight: 500;
      color: var(--text-muted);
      margin-bottom: var(--space-2);
    }

    .type-sample__text {
      transition: font-size 0.3s;
    }

    .type-sample--display .type-sample__text {
      font-family: var(--font-brand);
      font-size: 2rem;
      letter-spacing: 0.08em;
    }

    .type-sample--heading .type-sample__text {
      font-family: var(--font-ui);
      font-size: 1.25rem;
      font-weight: 500;
      letter-spacing: -0.01em;
    }

    .type-sample--body .type-sample__text {
      font-family: var(--font-ui);
      font-size: 1rem;
      line-height: 1.5;
    }

    .type-sample--caption .type-sample__text {
      font-family: var(--font-ui);
      font-size: 0.75rem;
      color: var(--text-secondary);
    }
    
    .type-sample--mono .type-sample__text {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    /* =============================================
       COLORS
       ============================================= */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: var(--space-3);
    }

    .color-swatch {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border-subtle);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .color-swatch:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }

    .color-swatch__preview {
      height: 64px;
    }

    .color-swatch__info {
      padding: var(--space-2) var(--space-3);
      background: var(--bg-card);
    }

    .color-swatch__name {
      font-size: 0.7rem;
      font-weight: 500;
    }

    .color-swatch__hex {
      font-size: 0.6rem;
      font-family: monospace;
      color: var(--text-muted);
    }

    /* =============================================
       SPACING
       ============================================= */
    .spacing-row {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--border-subtle);
    }

    .spacing-row:last-child { border-bottom: none; }

    .spacing-label {
      width: 80px;
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    .spacing-value {
      width: 50px;
      font-size: 0.7rem;
      color: var(--text-secondary);
      text-align: right;
    }

    .spacing-bar {
      height: 12px;
      background: var(--accent);
      border-radius: 2px;
      opacity: 0.7;
    }

    /* =============================================
       SHADOWS
       ============================================= */
    .shadow-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: var(--space-4);
    }

    .shadow-sample {
      background: var(--bg-card);
      border-radius: var(--radius-lg);
      padding: var(--space-5);
      text-align: center;
      transition: transform 0.2s;
      border: 1px solid var(--border-subtle); /* Ensure visibility in dark mode */
    }

    .shadow-sample:hover { transform: translateY(-2px); }

    .shadow-sample--sm { box-shadow: var(--shadow-sm); }
    .shadow-sample--md { box-shadow: var(--shadow-md); }
    .shadow-sample--lg { box-shadow: var(--shadow-lg); }
    .shadow-sample--xl { box-shadow: var(--shadow-xl); }

    .shadow-sample__name {
      font-family: monospace;
      font-size: 0.7rem;
      color: var(--text-secondary);
    }

    /* =============================================
       RADII
       ============================================= */
    .radii-grid {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
    }

    .radius-sample {
      width: 80px;
      height: 80px;
      background: #D5DAAD; /* Sage Light - Distinct color */
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0D1F18;
    }

    .radius-sample--sm { border-radius: var(--radius-sm); }
    .radius-sample--md { border-radius: var(--radius-md); }
    .radius-sample--lg { border-radius: var(--radius-lg); }
    .radius-sample--xl { border-radius: var(--radius-xl); }

    .radius-sample__label {
      font-family: monospace;
      font-size: 0.6rem;
      color: #0D1F18;
    }

    /* =============================================
       BORDERS
       ============================================= */
    .border-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .border-sample {
      padding: var(--space-5);
      background: var(--bg-card);
      border-radius: var(--radius-md);
      text-align: center;
    }

    .border-sample--primary { border: 1px solid var(--border-primary); }
    .border-sample--subtle { border: 1px solid var(--border-subtle); }

    .border-sample__label {
      font-family: monospace;
      font-size: 0.7rem;
      color: var(--text-secondary);
    }

    /* =============================================
       BUTTONS
       ============================================= */
    .btn-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .btn-group {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .btn-group__label {
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
      color: var(--text-secondary);
      font-family: var(--font-ui);
    }

    .btn-row {
      display: flex;
      gap: var(--space-3);
      flex-wrap: wrap;
      align-items: center;
    }

    /* Base Button */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 18px;
      border-radius: var(--radius-md);
      font-family: var(--font-ui);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
      border: none;
      text-decoration: none;
    }

    /* CTA - Gradient (Let's Chat!) */
    .btn--cta {
      background: linear-gradient(135deg, rgba(213, 218, 173, 0.8) 0%, rgba(253, 253, 250, 0.8) 100%);
      border: 1px solid #CBD5A0;
      color: #0D1F18;
    }

    .btn--cta:hover {
      background: linear-gradient(135deg, rgba(213, 218, 173, 1) 0%, rgba(253, 253, 250, 1) 100%);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .dark .btn--cta {
      background: linear-gradient(180deg, #FBFDE2 0%, #f5f7dc 100%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #0D1F18;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .dark .btn--cta:hover {
      background: linear-gradient(180deg, #fff 0%, #FBFDE2 100%);
      box-shadow: 0 4px 20px rgba(251, 253, 226, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }

    /* Primary - Solid Fill (uses theme) */
    .btn--primary {
      background: #0D1F18;
      border: 1px solid #0D1F18;
      color: #FBFDE2;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .btn--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    }

    .dark .btn--primary {
      background: #FBFDE2;
      border-color: #FBFDE2;
      color: #0D1F18;
    }

    /* Outline - Transparent with Border */
    .btn--outline {
      background: transparent;
      border: 1px solid var(--border-primary);
      color: var(--text-primary);
    }

    .btn--outline:hover {
      background: var(--bg-card);
      border-color: var(--text-primary);
    }

    /* Subtle - Tinted Background */
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
      background: rgba(251, 253, 226, 0.08);
      color: #FBFDE2;
    }

    .dark .btn--subtle:hover {
      background: rgba(251, 253, 226, 0.15);
      border-color: rgba(251, 253, 226, 0.2);
    }

    /* Ghost - Minimal */
    .btn--ghost {
      background: transparent;
      border: none;
      color: var(--text-secondary);
    }

    .btn--ghost:hover {
      color: var(--text-primary);
      background: rgba(0, 0, 0, 0.04);
    }

    .dark .btn--ghost:hover {
      background: rgba(255, 255, 255, 0.06);
    }

    /* Sizes */
    .btn--sm {
      padding: 8px 16px;
      font-size: 0.8rem;
    }

    .btn--lg {
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Disabled */
    .btn--disabled,
    .btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Loading */
    .btn--loading {
      position: relative;
      color: transparent !important;
    }

    .btn--loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    .btn--cta.btn--loading::after,
    .btn--primary.btn--loading::after {
      border-color: #0D1F18;
      border-right-color: transparent;
    }

    .dark .btn--primary.btn--loading::after {
      border-color: #FBFDE2;
      border-right-color: transparent;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* =============================================
       FEATURE CARD - Showcase Card
       ============================================= */
    .showcase-card {
      position: relative;
      width: 240px;
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: var(--bg-card);
      border: 1px solid var(--border-primary);
      transition: all 0.4s var(--ease-out-quart);
      cursor: pointer;
    }

    .showcase-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-xl);
    }

    .showcase-card__visual {
      position: relative;
      width: 100%;
      aspect-ratio: 1 / 1;
      overflow: hidden;
    }

    .showcase-card__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s var(--ease-out-expo), opacity 0.5s;
    }

    .showcase-card:hover .showcase-card__image {
      transform: scale(1.03);
    }

    .showcase-card__visual::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60%;
      background: linear-gradient(to bottom, transparent 0%, #F4F7EE 100%); /* Explicit fade to sage */
      pointer-events: none;
    }

    .dark .showcase-card__visual::after {
      background: linear-gradient(to bottom, transparent 0%, #0A0A0A 100%); /* Fade to dark bg */
    }

    .showcase-card__content {
      padding: var(--space-4);
      position: relative;
      z-index: 1;
      margin-top: -1.5rem;
    }

    .showcase-card__title {
      font-family: var(--font-body); /* Standard Heading */
      font-size: 1rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      margin-bottom: 2px;
    }

    .showcase-card__subtitle {
      font-size: 0.75rem;
      color: var(--text-secondary);
    }

    /* Image swap on theme */
    .showcase-card__image.light-img { opacity: 1; }
    .showcase-card__image.dark-img { position: absolute; inset: 0; opacity: 0; }
    .dark .showcase-card__image.light-img { opacity: 0; }
    .dark .showcase-card__image.dark-img { opacity: 1; }

    /* =============================================
       SAMPLE CARDS
       ============================================= */
    .samples-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }

    .sample-card {
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: all 0.35s var(--ease-out-quart);
      cursor: pointer;
      opacity: 0.5;
      transform: scale(0.97);
    }

    .sample-card:hover { transform: translateY(-3px) scale(0.97); }

    .sample-card.active { opacity: 1; transform: scale(1); }
    .sample-card.active:hover { transform: translateY(-3px) scale(1); }

    .sample-card--agentic {
      background: transparent;
      border: 1px solid #CBD5A0;
    }

    .sample-card--dark {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sample-card__visual {
      aspect-ratio: 16 / 10;
      overflow: hidden;
    }

    .sample-card__visual img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s var(--ease-out-expo);
    }

    .sample-card:hover .sample-card__visual img { transform: scale(1.02); }

    .sample-card__label {
      padding: var(--space-3) var(--space-4);
      font-family: var(--font-display); /* Kept as decorative label */
      font-size: 0.7rem;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0.01em;
    }

    .sample-card--agentic .sample-card__label {
      color: #0D1F18;
      background: #F4F7EE;
      border-top: 1px solid #CBD5A0;
    }

    .sample-card--dark .sample-card__label {
      color: #FBFDE2;
      background: #000;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* =============================================
       CARDS ROW
       ============================================= */
    .cards-row {
      display: flex;
      gap: var(--space-4);
      flex-wrap: wrap;
      justify-content: center;
    }

    /* =============================================
       FOOTER
       ============================================= */
    footer {
      text-align: center;
      padding: var(--space-6);
      margin-top: var(--space-7);
      border-top: 1px solid var(--border-subtle);
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    footer a { color: var(--text-secondary); }

    /* =============================================
       RESPONSIVE
       ============================================= */
    @media (max-width: 640px) {
      .samples-grid { grid-template-columns: 1fr; }
      .cards-row { flex-direction: column; align-items: center; }
      .color-grid { grid-template-columns: repeat(2, 1fr); }
      .shadow-grid { grid-template-columns: repeat(2, 1fr); }
      .border-grid { grid-template-columns: 1fr; }
      .dashboard-grid { grid-template-columns: 1fr !important; }
    }
    
    /* =============================================
       CODE BLOCK 
       ============================================= */
    .code-block {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      background: var(--bg-card);
      overflow: hidden;
      margin-bottom: 40px;
    }
    
    .code-block__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(255,255,255,0.02);
    }
    
    .code-block__title {
      font-family: var(--font-ui);
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
    }
    
    .code-block__content {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--text-primary);
      padding: var(--space-4);
      overflow-x: auto;
      white-space: pre-wrap;
      margin: 0;
      background: transparent;
    }

    .btn-icon {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 6px;
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .btn-icon:hover {
      background: var(--status-idle-bg);
      color: var(--text-primary);
      border-color: var(--border-subtle);
    }
    
    .btn-icon svg {
      width: 16px;
      height: 16px;
    }
    
    .dark .code-block {
      background: #0A0A0A; /* Matches panel bg */
      border-color: rgba(255,255,255,0.1);
    }
    
    .dark .code-block__content {
       color: #e5e5e5;
    }

    /* =============================================
       DASHBOARD / APP UI 
       ============================================= */
    .dashboard-panel {
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      background: linear-gradient(180deg, var(--bg-card) 0%, rgba(255,255,255,0.5) 100%);
      margin-top: var(--space-4);
      box-shadow: var(--shadow-xl), 0 0 0 1px rgba(255,255,255,0.1); /* Refined depth */
    }
    
    .dark .dashboard-panel {
      background: linear-gradient(180deg, var(--bg-card) 0%, #000 100%);
      box-shadow: var(--shadow-xl), 0 0 0 1px rgba(255,255,255,0.05);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-5) var(--space-6);
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(0,0,0,0.06); /* Stronger separation */
    }
    
    .dark .dashboard-header {
       background: rgba(255,255,255,0.06);
    }

    .dashboard-title {
      font-family: var(--font-ui);
      font-size: 0.95rem; /* Slightly larger */
      font-weight: 600; /* Heavier weight */
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--status-active-text);
      box-shadow: 0 0 0 4px var(--status-active-bg);
    }
    
    .dark .status-dot {
      background-color: #D5E8B6;
      box-shadow: 0 0 0 4px rgba(163, 189, 106, 0.2);
    }

    .metric-row {
      display: flex;
      gap: var(--space-8); /* Increased gap */
      padding: var(--space-6); /* Increased padding */
      border-bottom: 1px solid var(--border-subtle);
      background: var(--bg-card);
    }

    .metric-item {
      display: flex;
      flex-direction: column;
      gap: 6px; /* Slightly more gap */
    }

    .metric-label {
      font-size: 0.7rem;
      color: var(--text-secondary);
      font-weight: 600; /* Bolder */
      font-family: var(--font-ui); /* Strict UI font */
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .metric-value {
      font-family: var(--font-mono);
      font-size: 1.25rem; /* Larger value */
      font-weight: 500;
      color: var(--text-primary);
      font-variant-numeric: tabular-nums;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    .data-table th {
      text-align: left;
      padding: var(--space-3) var(--space-6);
      color: var(--text-muted);
      font-weight: 600;
      font-family: var(--font-ui); /* cleaner UI font */
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--border-subtle);
      background: rgba(0,0,0,0.02);
    }
    
    .dark .data-table th { background: rgba(255,255,255,0.02); }

    .data-table td {
      padding: var(--space-4) var(--space-6);
      color: var(--text-secondary);
      border-bottom: 1px solid var(--border-subtle);
      transition: background 0.15s ease, color 0.15s;
      vertical-align: middle;
    }

    .data-table tr:last-child td { border-bottom: none; }
    
    .data-table tr:hover td {
      background: rgba(0,0,0,0.06); /* Undeniable hover */
      color: var(--text-primary);
    }

    .dark .data-table tr:hover td {
      background: rgba(255,255,255,0.08);
      color: #fff;
    }
    
    .primary-text { 
      color: var(--text-primary); 
      font-weight: 500; 
      font-family: var(--font-mono); /* Monospace IDs */
      letter-spacing: -0.01em;
    }
    
    /* Status Badges - Technical Outline Style */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px; /* Slightly wider for cleaner separation */
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 500;
      line-height: 1;
      background: transparent; /* No fill */
      border: 1px solid var(--border-subtle); /* Base border */
    }
    
    .status-badge--active {
      border-color: rgba(45, 91, 40, 0.4);
      color: var(--status-active-text);
    }
    
    .status-badge--pending {
      border-color: rgba(138, 106, 28, 0.4);
      color: var(--status-pending-text);
    }
    
    .status-badge--idle {
      border-color: rgba(0,0,0,0.1);
      color: var(--status-idle-text);
    }
    
    .dark .status-badge--active { border-color: rgba(213, 232, 182, 0.25); }
    .dark .status-badge--pending { border-color: rgba(230, 211, 117, 0.25); }
    .dark .status-badge--idle { border-color: rgba(255,255,255,0.15); }

    .status-dot-sm {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
    }
    /* =============================================
       MOSAIC / BENTO GRID
       ============================================= */
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
      border-radius: var(--radius-sm); /* Blocky feel */
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.2s ease;
    }
    
    .mosaic-item:hover {
      border-color: var(--accent);
      transform: scale(0.99); /* Subtle "press" */
    }
    
    .span-2 { grid-column: span 2; }
    .span-3 { grid-column: span 3; }
    .row-2 { grid-row: span 2; }
    
    .bg-noise {
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      pointer-events: none;
    }
    
    .mosaic-text {
      font-family: var(--font-brand);
      font-size: 2rem;
      letter-spacing: -0.02em;
      position: relative;
      z-index: 2;
    }
    
    .mosaic-sub {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: var(--space-2);
      text-transform: uppercase;
    }

    /* Dither effect simulation */
    .dither-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: contrast(1.2) grayscale(1);
      mix-blend-mode: multiply;
      opacity: 0.8;
    }
    
    .dark .dither-img {
      filter: contrast(1.2) grayscale(1) invert(0.9);
      mix-blend-mode: screen;
    }
    
    .mosaic-item--dark {
        background: #0D1F18;
        color: #FBFDE2;
    }
    
    @media (max-width: 768px) {
      .mosaic-grid { grid-template-columns: 1fr; grid-auto-rows: auto; }
      .span-2, .span-3 { grid-column: span 1; }
    }
  </style>
</head>
<body>
  <button class="toggle-pill" onclick="toggleTheme()">
    <div class="toggle-track"><div class="toggle-dot"></div></div>
    <span class="toggle-text">Agentic</span>
  </button>

  <header>
    <h1>HALO</h1>
    <p class="subtitle">Design System</p>
  </header>

  <div class="container">

    <!-- TYPOGRAPHY -->
    <h2 class="section-title">Typography</h2>
    
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
      <div class="type-sample__text">HALO is a protocol for AI-native economic infrastructure. It enables agents to own, trade, and transact—with minimal human overhead.</div>
    </div>
    
    <div class="type-sample type-sample--caption">
      <div class="type-sample__label">Caption · PP Neue Montreal · 0.75rem</div>
      <div class="type-sample__text">Automated value exchange between autonomous agents</div>
    </div>
    
    <div class="type-sample type-sample--mono">
      <div class="type-sample__label">Mono · System Monospace · 0.85rem</div>
      <div class="type-sample__text">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
    </div>

    <!-- COLORS -->
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

    <!-- SHADOWS -->
    <h2 class="section-title">Shadows</h2>
    <div class="shadow-grid">
      <div class="shadow-sample shadow-sample--sm"><span class="shadow-sample__name">--shadow-sm</span></div>
      <div class="shadow-sample shadow-sample--md"><span class="shadow-sample__name">--shadow-md</span></div>
      <div class="shadow-sample shadow-sample--lg"><span class="shadow-sample__name">--shadow-lg</span></div>
      <div class="shadow-sample shadow-sample--xl"><span class="shadow-sample__name">--shadow-xl</span></div>
    </div>

    <!-- RADII -->
    <h2 class="section-title">Border Radius</h2>
    <div class="radii-grid">
      <div class="radius-sample radius-sample--sm"><span class="radius-sample__label">6px</span></div>
      <div class="radius-sample radius-sample--md"><span class="radius-sample__label">10px</span></div>
    </div>

    <!-- BORDERS -->
    <h2 class="section-title">Borders</h2>
    <div class="border-grid">
      <div class="border-sample border-sample--primary"><span class="border-sample__label">--border-primary</span></div>
      <div class="border-sample border-sample--subtle"><span class="border-sample__label">--border-subtle</span></div>
    </div>

    <!-- BUTTONS -->
    <h2 class="section-title">Buttons</h2>
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

    <!-- DASHBOARD / AGENTIC UI -->
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

    <!-- MOSAIC LAYOUT -->
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
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: #000000;
  --shadow-2xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-xs: 0 1px 3px 0px rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 2px 8px -1px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px -6px rgba(0, 0, 0, 0.12);
  --shadow-xl: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
  --shadow-2xl: 0 24px 48px -12px rgba(0, 0, 0, 0.25);
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
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
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
}

.dark {
  --background: #262624;
  --foreground: #c3c0b6;
  --card: #262624;
  --card-foreground: #faf9f5;
  --popover: #30302e;
  --popover-foreground: #e5e5e2;
  --primary: #d97757;
  --primary-foreground: #ffffff;
  --secondary: #faf9f5;
  --secondary-foreground: #30302e;
  --muted: #1b1b19;
  --muted-foreground: #b7b5a9;
  --accent: #1a1915;
  --accent-foreground: #f5f4ee;
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  --border: #3e3e38;
  --input: #52514a;
  --ring: #d97757;
  --chart-1: #b05730;
  --chart-2: #9c87f5;
  --chart-3: #1a1915;
  --chart-4: #2f2b48;
  --chart-5: #b4552d;
  --sidebar: #1f1e1d;
  --sidebar-foreground: #c3c0b6;
  --sidebar-primary: #343434;
  --sidebar-primary-foreground: #fbfbfb;
  --sidebar-accent: #0f0f0e;
  --sidebar-accent-foreground: #c3c0b6;
  --sidebar-border: #ebebeb;
  --sidebar-ring: #b5b5b5;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: #000000;
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}</pre>
    </div>

  </div>

  <footer>HALO Design System · <a href="https://gethalo.dev">gethalo.dev</a></footer>

  <script>
    function toggleTheme() {
      document.body.classList.toggle('dark');
      document.querySelector('.toggle-text').textContent = 
        document.body.classList.contains('dark') ? 'Midnight' : 'Agentic';
      
      // Update sample active states
      document.getElementById('sample-agentic').classList.toggle('active', !document.body.classList.contains('dark'));
      document.getElementById('sample-dark').classList.toggle('active', document.body.classList.contains('dark'));
    }

    function copyTokens() {
      const code = document.getElementById('themeTokensCode').innerText;
      navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyTokensBtn');
        const originalContent = btn.innerHTML;
        
        // Success State: Checkmark
        btn.innerHTML = \`
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D5B28" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        \`;
        
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

fs.writeFileSync('docs/design-system/HALO-design-system.html', html);
console.log('✓ Generated docs/design-system/HALO-design-system.html');
