function WellbeingTips() {
    const tips = [
        {
            icon: "😴",
            title: "Prioritize consistent sleep",
            text: "Try to maintain a regular sleep and wake schedule that supports your daily routine.",
        },
        {
            icon: "🚶",
            title: "Take movement breaks",
            text: "Short movement breaks during long periods of sitting can help you stay active throughout the day.",
        },
        {
            icon: "📱",
            title: "Be mindful of screen time",
            text: "Notice how extended screen use fits into your daily routine and consider regular breaks.",
        },
        {
            icon: "🌿",
            title: "Create recovery time",
            text: "Make space for activities that help you relax and disconnect from work or digital tasks.",
        },
        {
            icon: "💧",
            title: "Maintain healthy routines",
            text: "Regular meals, hydration, movement, and rest can support overall wellbeing.",
        },
        {
            icon: "🧘",
            title: "Pause and reset",
            text: "Simple breathing, relaxation, or mindfulness exercises can provide a short mental break.",
        },
    ];

    return (
        <main className="page-container">

            <div className="page-header">
                <div className="badge">
                    YOUR WELLBEING
                </div>

                <h1>Wellbeing Tips</h1>

                <p>
                    Simple habits and practices that may support
                    your everyday wellbeing.
                </p>
            </div>

            <section className="tips-grid">

                {tips.map((tip) => (
                    <article
                        className="card tip-card"
                        key={tip.title}
                    >
                        <div className="tip-icon">
                            {tip.icon}
                        </div>

                        <h2>
                            {tip.title}
                        </h2>

                        <p>
                            {tip.text}
                        </p>
                    </article>
                ))}

            </section>

            <div className="wellbeing-note">
                <strong>Remember</strong>

                <p>
                    These suggestions are general wellbeing information,
                    not medical advice or a diagnosis.
                </p>
            </div>

        </main>
    );
}

export default WellbeingTips;