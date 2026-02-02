import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'))
const BrandingPage = lazy(() => import('./pages/BrandingPage'))

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
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/branding" element={<BrandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
