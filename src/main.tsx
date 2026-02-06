import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const BrandingPage = lazy(() => import('./pages/BrandingPage'))
const DesignSystemPage = lazy(() => import('./pages/DesignSystemPage'))
const DesignSystemV2Page = lazy(() => import('./pages/DesignSystemV2Page'))

// Simple loading fallback
const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    color: '#fff',
    fontFamily: 'monospace'
  }}>
    Loading...
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/branding" element={<BrandingPage />} />
            <Route path="/designsys" element={<DesignSystemPage />} />
            <Route path="/designsysv2" element={<DesignSystemV2Page />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Analytics />
    </ErrorBoundary>
  </StrictMode>,
)
