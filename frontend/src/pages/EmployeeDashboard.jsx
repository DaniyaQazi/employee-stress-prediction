
function EmployeeDashboard({ history = [], setActivePage }) {
    const latestPrediction = history.length > 0 ? history[0] : null;

    const latestScore = latestPrediction
        ? Number(latestPrediction.predictedStressScore).toFixed(1)
        : null;

    return (
        <main className="dashboard-page">
            <section className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        YOUR WELLBEING SPACE
                    </span>
                    <h1>Hi there 👋</h1>
                    <p>
                        How are you feeling today? Take a moment for yourself.
                    </p>
                </div>
            </section>

            <section className="dashboard-hero-card">
                <div className="dashboard-hero-content">
                    <span className="dashboard-card-label">
                        A MOMENT FOR YOU
                    </span>

                    <h2>Let's check in with yourself</h2>

                    <p>
                        Answer a few simple questions about your sleep,
                        daily habits and activity to get an estimated
                        wellbeing score.
                    </p>

                    <button
                        type="button"
                        className="predict dashboard-button"
                        onClick={() => setActivePage("stress")}
                    >
                        Start check-in →
                    </button>
                </div>

                <div className="dashboard-decoration" aria-hidden="true">
                    🌿
                </div>
            </section>

            <section className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon" aria-hidden="true">♡</div>
                    <div className="stat-content">
                        <strong>{latestScore ?? "—"}</strong>
                        <span>Latest wellbeing score</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" aria-hidden="true">◷</div>
                    <div className="stat-content">
                        <strong>{history.length}</strong>
                        <span>Check-ins completed</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-note">
                <span className="dashboard-note-icon" aria-hidden="true">
                    🔒
                </span>
                <div>
                    <strong>Your wellbeing, without judgment</strong>
                    <p>
                        Your score is an estimate for personal awareness,
                        not a medical diagnosis or a measure of your work
                        performance.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default EmployeeDashboard;
