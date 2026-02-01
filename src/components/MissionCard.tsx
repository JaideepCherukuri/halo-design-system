
import './MissionCard.css';

export default function MissionCard() {
    return (
        <section className="mission-card-container">
            <div className="mission-card">
                <div className="mission-content">
                    <h2 className="mission-text">
                        We are building the financial infrastructure the <span className="highlight-text">agent economy</span> needs to scale.
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
