function EmployeeDashboard({ history = [], setActivePage }) {
    const latestPrediction = history.length > 0
        ? history[0]
        : null;

    const latestScore = latestPrediction
        ? Number(latestPrediction.predictedStressScore).toFixed(2)
        : "--";

    return (
        <main className="dashboard-page">

            {/* Header */}
            <section className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">
                        EMPLOYEE DASHBOARD
                    </span>

                    <h1>Welcome back 👋</h1>

                    <p>
                        Take a moment to check in with your wellbeing today.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="dashboard-stats">

                <div className="stat-card">
                    <div className="stat-icon">♡</div>

                    <div className="stat-content">
                        <strong>{latestScore}</strong>
                        <span>Latest Stress Score</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">◷</div>

                    <div className="stat-content">
                        <strong>{history.length}</strong>
                        <span>Total Predictions</span>
                    </div>
                </div>

            </section>

            {/* Main wellbeing action */}
            <section className="dashboard-hero-card">

                <div className="dashboard-hero-content">
                    <span className="dashboard-card-label">
                        YOUR WELLBEING
                    </span>

                    <h2>Check your stress</h2>

                    <p>
                        Enter your current wellbeing and activity information
                        to receive a personalised predicted stress score.
                    </p>

                    <button
                        className="predict dashboard-button"
                        onClick={() => setActivePage("stress")}
                    >
                        Start Prediction →
                    </button>
                </div>

                <div className="dashboard-decoration" aria-hidden="true">
                    🌿
                </div>

            </section>

            {/* Privacy note */}
            <section className="dashboard-note">
                <span className="dashboard-note-icon">🔒</span>

                <div>
                    <strong>Your data stays personal</strong>

                    <p>
                        This system is designed for wellbeing awareness and
                        is not a medical diagnosis or employee performance
                        evaluation.
                    </p>
                </div>
            </section>

        </main>
    );
}

export default EmployeeDashboard;