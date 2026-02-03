/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals for performance monitoring
 * Automatically sends metrics in production
 */

type Metric = {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
};

/**
 * Send metrics to analytics endpoint
 * Replace with your analytics provider (Google Analytics, Vercel Analytics, etc.)
 */
function sendToAnalytics(metric: Metric) {
  // Only send in production
  if (!import.meta.env.PROD) {
    console.log('[Web Vitals]', metric);
    return;
  }

  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Example: Send to custom endpoint
  const body = JSON.stringify(metric);
  const url = '/api/analytics'; // Replace with your endpoint

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true }).catch((err) => {
      if (import.meta.env.DEV) {
        console.error('Failed to send web vitals:', err);
      }
    });
  }
}

/**
 * Initialize Web Vitals tracking
 * Call this in your main.tsx after app initialization
 */
export async function initWebVitals() {
  if (typeof performance === 'undefined') return;
  
  try {
    // Dynamic import to avoid bundling in dev - install with: npm install web-vitals
    // @ts-ignore - web-vitals is optional dependency
    const webVitals = await import('web-vitals');
    const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = webVitals;

    // Core Web Vitals
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    onFID(sendToAnalytics); // First Input Delay
    onLCP(sendToAnalytics); // Largest Contentful Paint
    onINP(sendToAnalytics); // Interaction to Next Paint (new)

    // Other important metrics
    onFCP(sendToAnalytics); // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('Web Vitals library not installed. Run: npm install web-vitals');
    }
  }
}

/**
 * Report custom performance metrics
 */
export function reportMetric(name: string, value: number, metadata?: Record<string, any>) {
  if (import.meta.env.PROD) {
    sendToAnalytics({
      name,
      value,
      delta: value,
      id: `${name}-${Date.now()}`,
      rating: 'good',
      ...metadata,
    });
  } else {
    console.log(`[Custom Metric] ${name}:`, value, metadata);
  }
}
