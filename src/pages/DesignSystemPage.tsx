/**
 * Design System Page
 * Renders the generated static V3 design system HTML in a full-screen iframe
 * to preserve its isolated styles and "Technical Minimalist" aesthetic.
 */
export default function DesignSystemPage() {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
            <iframe
                src="/design-system.html"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title="HALO Design System V3"
            />
        </div>
    );
}
