import { useEffect, useState } from "react";

function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const loadOverview = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:5000/api/predictions/admin/overview",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(
                        responseData.message ||
                        "Unable to load admin overview."
                    );
                }

                setData(responseData);
            } catch (err) {
                setError(
                    err.message ||
                    "Unable to load workplace insights."
                );
            } finally {
                setLoading(false);
            }
        };

        loadOverview();
    }, []);

    const copyOrganizationCode = async () => {
        const code = data?.organization?.code;

        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            setError("Unable to copy organization code.");
        }
    };

    /* ================= LOADING ================= */

    if (loading) {
        return (
            <main className="page-container">
                <div className="page-header">
                    <div className="badge">
                        COMPANY WELLBEING
                    </div>

                    <h1>Workplace Wellbeing</h1>

                    <p>
                        View aggregated wellbeing patterns
                        across the organization.
                    </p>
                </div>

                <section className="card">
                    <div className="empty-state">
                        <span>⏳</span>

                        <h3>
                            Loading workplace insights...
                        </h3>

                        <p>
                            Retrieving aggregated prediction data.
                        </p>
                    </div>
                </section>
            </main>
        );
    }

    /* ================= ERROR ================= */

    if (error) {
        return (
            <main className="page-container">
                <div className="page-header">
                    <div className="badge">
                        COMPANY WELLBEING
                    </div>

                    <h1>Workplace Wellbeing</h1>

                    <p>
                        View aggregated wellbeing patterns
                        across the organization.
                    </p>
                </div>

                <section className="card">
                    <div className="result error">
                        <div className="result-icon">!</div>

                        <div>
                            <strong>
                                Unable to load workplace insights
                            </strong>

                            <p>{error}</p>
                        </div>
                    </div>
                </section>
            </main>
        );
    }

    const organization = data?.organization;
    const overview = data?.overview;

    return (
        <main className="page-container">

            {/* ================= HEADER ================= */}

            <div className="page-header">
                <div className="badge">
                    COMPANY WELLBEING
                </div>

                <h1>Workplace Wellbeing</h1>

                <p>
                    View aggregated wellbeing patterns
                    across the organization.
                </p>

                {organization?.name && (
                    <p
                        style={{
                            marginTop: "8px",
                            fontWeight: "700",
                        }}
                    >
                        🏢 {organization.name}
                    </p>
                )}
            </div>


            {/* ================= ORGANIZATION ================= */}

            {organization?.code && (
                <section className="card">

                    <div className="section-title">
                        <span>🏢</span>

                        <div>
                            <h2>Organization</h2>

                            <p>
                                Share this code with employees
                                who should join your organization.
                            </p>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "16px",
                            padding: "18px",
                            marginTop: "18px",
                            background: "#faf7fc",
                            border: "1px solid #e5d9ee",
                            borderRadius: "14px",
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    display: "block",
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "#80658f",
                                    marginBottom: "6px",
                                    letterSpacing: "1px",
                                }}
                            >
                                ORGANIZATION CODE
                            </span>

                            <strong
                                style={{
                                    fontSize: "26px",
                                    letterSpacing: "4px",
                                    color: "#6f4b91",
                                }}
                            >
                                {organization.code}
                            </strong>
                        </div>

                        <button
                            type="button"
                            className="predict"
                            onClick={copyOrganizationCode}
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {copied
                                ? "✓ Copied"
                                : "📋 Copy Code"}
                        </button>
                    </div>
                </section>
            )}


            {/* ================= DATA AVAILABLE ================= */}

            {data?.available && overview && (
                <>

                    {/* ================= TOP STATS ================= */}

                    <section className="admin-stats">

                        <div className="admin-stat-card">
                            <span className="admin-stat-icon">
                                👥
                            </span>

                            <div>
                                <strong>
                                    {overview.employeeCount}
                                </strong>

                                <span>
                                    Employees Participating
                                </span>
                            </div>
                        </div>


                        <div className="admin-stat-card">
                            <span className="admin-stat-icon">
                                📊
                            </span>

                            <div>
                                <strong>
                                    {overview.predictionCount}
                                </strong>

                                <span>
                                    Total Predictions
                                </span>
                            </div>
                        </div>


                        <div className="admin-stat-card">
                            <span className="admin-stat-icon">
                                ♡
                            </span>

                            <div>
                                <strong>
                                    {
                                        overview.averagePredictedStressScore
                                    }
                                </strong>

                                <span>
                                    Average Predicted Score
                                </span>
                            </div>
                        </div>

                    </section>


                    {/* ================= STRESS OVERVIEW ================= */}

                    <section className="card">

                        <div className="section-title">
                            <span>📈</span>

                            <div>
                                <h2>
                                    Stress Score Overview
                                </h2>

                                <p>
                                    Aggregated prediction scores
                                    from available employee
                                    wellbeing checks.
                                </p>
                            </div>
                        </div>


                        <div className="admin-score-grid">

                            <div>
                                <span>Average</span>

                                <strong>
                                    {
                                        overview.averagePredictedStressScore
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>Lowest</span>

                                <strong>
                                    {
                                        overview.minimumPredictedStressScore
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>Highest</span>

                                <strong>
                                    {
                                        overview.maximumPredictedStressScore
                                    }
                                </strong>
                            </div>

                        </div>

                    </section>


                    {/* ================= WELLBEING PATTERNS ================= */}

                    <section className="card">

                        <div className="section-title">
                            <span>🌿</span>

                            <div>
                                <h2>
                                    Wellbeing Patterns
                                </h2>

                                <p>
                                    Aggregated indicators from
                                    available employee wellbeing
                                    checks.
                                </p>
                            </div>
                        </div>


                        <div className="admin-score-grid">

                            <div>
                                <span>
                                    Average Sleep Duration
                                </span>

                                <strong>
                                    {overview.averageSleepDuration !== null
                                        ? `${overview.averageSleepDuration} hrs`
                                        : "—"}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Average Screen-on Time
                                </span>

                                <strong>
                                    {overview.averageScreenOnTime !== null
                                        ? `${overview.averageScreenOnTime} hrs`
                                        : "—"}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    Average PSS Score
                                </span>

                                <strong>
                                    {overview.averagePssScore !== null
                                        ? overview.averagePssScore
                                        : "—"}
                                </strong>
                            </div>

                        </div>

                    </section>


                    {/* ================= INTERPRETATION ================= */}

                    <section className="card">

                        <div className="section-title">
                            <span>💡</span>

                            <div>
                                <h2>
                                    What These Patterns Mean
                                </h2>

                                <p>
                                    Use aggregated patterns as
                                    wellbeing signals, not individual
                                    employee assessments.
                                </p>
                            </div>
                        </div>


                        <div className="privacy-content">

                            <p>
                                Higher or lower values represent
                                patterns within the available
                                organization-level data.
                            </p>

                            <p>
                                These patterns should not be used
                                to diagnose health conditions or
                                evaluate individual employee
                                performance.
                            </p>

                        </div>

                    </section>

                </>
            )}


            {/* ================= NOT ENOUGH DATA ================= */}

            {!data?.available && (
                <section className="card">

                    <div className="section-title">
                        <span>📊</span>

                        <div>
                            <h2>
                                Wellbeing Overview
                            </h2>

                            <p>
                                Organization-level insights
                                based on available prediction data.
                            </p>
                        </div>
                    </div>


                    <div className="admin-empty-state">

                        <span>🌱</span>

                        <h3>
                            More data is needed
                        </h3>

                        <p>
                            {data?.message}
                        </p>


                        <div
                            style={{
                                marginTop: "20px",
                                padding: "14px 18px",
                                background: "#faf7fc",
                                borderRadius: "12px",
                                border: "1px solid #ebe4ef",
                            }}
                        >

                            <strong>
                                Current participation
                            </strong>

                            <p
                                style={{
                                    marginTop: "6px",
                                }}
                            >
                                {data?.employeeCount || 0} employee
                                {data?.employeeCount === 1
                                    ? ""
                                    : "s"} with prediction data
                                {" • "}
                                {data?.predictionCount || 0} prediction
                                {data?.predictionCount === 1
                                    ? ""
                                    : "s"}
                            </p>

                        </div>

                    </div>

                </section>
            )}


            {/* ================= PRIVACY ================= */}

            <section className="card">

                <div className="section-title">
                    <span>🔒</span>

                    <div>
                        <h2>
                            Privacy & Responsible Use
                        </h2>

                        <p>
                            Wellbeing information is presented
                            at an aggregated level.
                        </p>
                    </div>
                </div>


                <div className="privacy-content">

                    <p>
                        Individual employee prediction results
                        are not displayed in the company overview.
                    </p>

                    <p>
                        The system is intended to identify general
                        wellbeing patterns and support workplace
                        wellbeing initiatives.
                    </p>

                </div>

            </section>


            {/* ================= SUGGESTIONS ================= */}

            <section className="card">

                <div className="section-title">
                    <span>💡</span>

                    <div>
                        <h2>
                            General Wellbeing Suggestions
                        </h2>

                        <p>
                            Recommendations will be based on
                            aggregated workplace patterns.
                        </p>
                    </div>
                </div>


                <div className="admin-empty-state">

                    <span>🌿</span>

                    <h3>
                        Responsible workplace wellbeing
                    </h3>

                    <p>
                        Suggestions will be generated from real
                        aggregated patterns rather than fabricated
                        company statistics.
                    </p>

                </div>

            </section>

        </main>
    );
}

export default AdminDashboard;