/**
 * Design System V2 (Experiment) Page
 * Renders the experimental "Deep Teal / Warm White" design system.
 */
export default function DesignSystemV2Page() {
    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
            <iframe
                src="/design-system-v2.html"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    display: 'block'
                }}
                title="HALO Design System V2 (Experiment)"
            />
        </div>
    );
}
