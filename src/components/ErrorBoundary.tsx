import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to monitoring service in production
        if (import.meta.env.PROD) {
            // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
            console.error('Error Boundary caught an error:', error, errorInfo);
        } else {
            console.error('Error Boundary caught an error:', error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                        backgroundColor: '#000',
                        color: '#FBFDE2',
                        fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
                        textAlign: 'center',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                            marginBottom: '1rem',
                            fontFamily: "'FK Raster', system-ui, sans-serif",
                        }}
                    >
                        Something went wrong
                    </h1>
                    <p
                        style={{
                            fontSize: '1.125rem',
                            marginBottom: '2rem',
                            maxWidth: '600px',
                            lineHeight: 1.6,
                        }}
                    >
                        We're sorry for the inconvenience. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '0.75rem 2rem',
                            fontSize: '1rem',
                            backgroundColor: '#EAFF94',
                            color: '#000',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
                            fontWeight: 500,
                            transition: 'opacity 0.2s',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.opacity = '0.8')}
                        onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                    >
                        Refresh Page
                    </button>
                    {!import.meta.env.PROD && this.state.error && (
                        <details
                            style={{
                                marginTop: '2rem',
                                padding: '1rem',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '4px',
                                maxWidth: '800px',
                                textAlign: 'left',
                            }}
                        >
                            <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                                Error Details (Dev Only)
                            </summary>
                            <pre
                                style={{
                                    fontSize: '0.875rem',
                                    overflow: 'auto',
                                    color: '#ff6b6b',
                                }}
                            >
                                {this.state.error.message}
                                {'\n\n'}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
