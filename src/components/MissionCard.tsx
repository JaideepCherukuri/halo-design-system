
import './MissionCard.css';

export default function MissionCard() {
    return (
        <section className="mission-card-container">
            <div className="mission-card">
                <div className="mission-content">
                    <h2 className="mission-text">
                        Enabling agents and entities become <span className="highlight-text">ECONOMIC ACTORS</span>
                    </h2>
                </div>
                <div className="mission-visual">
                    <img
                        src="/images/missionduotone.png"
                        alt="Agentic Economy Infrastructure"
                        className="mission-static-image"
                    />
                </div>
            </div>
        </section>
    );
}
