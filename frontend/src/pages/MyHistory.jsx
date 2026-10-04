function MyHistory({
    history = [],
    historyLoading = false,
    historyError = "",
}) {
    return (
        <main className="page-container">

            <div className="page-header">
                <div className="badge">
                    YOUR WELLBEING
                </div>

                <h1>My Prediction History</h1>

                <p>
                    Review your previous stress prediction results
                    over time.
                </p>
            </div>

            <section className="card history-card">

                <div className="section-title">
                    <span>📜</span>

                    <div>
                        <h2>Prediction History</h2>

                        <p>
                            Your previous wellbeing check results.
                        </p>
                    </div>
                </div>

                {historyLoading ? (
                    <div className="empty-state">
                        <span>⏳</span>
                        <h3>Loading your history...</h3>
                        <p>
                            Please wait while we retrieve your previous
                            predictions.
                        </p>
                    </div>
                ) : historyError ? (
                    <div className="result error">

                        <div className="result-icon">
                            !
                        </div>

                        <div>
                            <strong>
                                Unable to load history
                            </strong>

                            <p>
                                {historyError}
                            </p>
                        </div>

                    </div>
                ) : history.length === 0 ? (
                    <div className="empty-state">

                        <span>📊</span>

                        <h3>No predictions yet</h3>

                        <p>
                            Complete your first wellbeing check
                            to see your prediction history here.
                        </p>

                    </div>
                ) : (
                    <div className="history-list">

                        {history.map((prediction) => {

                            const score = Number(
                                prediction.predictedStressScore
                            );

                            const formattedScore = Number.isFinite(score)
                                ? score.toFixed(2)
                                : "—";

                            const formattedDate = prediction.createdAt
                                ? new Date(
                                    prediction.createdAt
                                ).toLocaleString()
                                : "Date unavailable";

                            return (
                                <div
                                    className="history-item"
                                    key={prediction.id}
                                >

                                    <div>
                                        <span>
                                            Predicted stress score
                                        </span>

                                        <strong>
                                            {formattedScore}
                                        </strong>
                                    </div>

                                    <div className="history-date">
                                        {formattedDate}
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </section>

        </main>
    );
}

export default MyHistory;