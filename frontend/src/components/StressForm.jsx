
import { useState } from "react";

function StressForm({
    data,
    updateField,
    resetForm,
    predictStress,
    loading,
}) {
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: "A little about you",
            subtitle: "Choose the options that feel closest to you.",
            icon: "✳",
        },
        {
            title: "Sleep & wellbeing",
            subtitle: "Tell us about your recent sleep and how you feel.",
            icon: "☾",
        },
        {
            title: "Your digital routine",
            subtitle: "A quick look at your daily phone activity.",
            icon: "▧",
        },
        {
            title: "Movement & activity",
            subtitle: "Your activity and movement details.",
            icon: "❋",
        },
    ];

    const fields = [
        [
            ["Openness", "Openness", "How comfortable are you with new ideas?"],
            ["Conscientiousness", "Conscientiousness", "How organized do you usually feel?"],
            ["Extraversion", "Extraversion", "How energetic do you feel around people?"],
            ["Agreeableness", "Agreeableness", "How easily do you cooperate with others?"],
            ["Neuroticism", "Neuroticism", "How sensitive are you to difficult emotions?"],
        ],
        [
            ["Bedtime (hour)", "sleep_time", "24-hour format: 23 means 11 PM.", 1],
            ["Wake-up time (hour)", "wake_time", "24-hour format: 7 means 7 AM.", 1],
            ["Hours of sleep", "sleep_duration", "Your approximate total sleep.", 0.1],
            ["Sleep quality score", "PSQI_score", "Enter your assessment score.", 1],
            ["Current stress score", "PSS_score", "Use your known score; don't guess.", 1],
        ],
        [
            ["Minutes spent on calls", "call_duration", "Total call duration for the day.", 0.1],
            ["Number of calls", "num_calls", "Total calls during the day.", 1],
            ["Number of messages", "num_sms", "Total messages during the day.", 1],
            ["Screen time (minutes)", "screen_on_time", "Total daily screen-on time.", 0.1],
        ],
        [
            ["Skin conductance", "skin_conductance", "Sensor reading, if available.", 0.1],
            ["Movement activity", "accelerometer", "Movement sensor reading, if available.", 0.1],
            ["Movement range", "mobility_radius", "Estimated movement range, if available.", 0.1],
            ["Movement distance", "mobility_distance", "Estimated distance travelled, if available.", 0.1],
        ],
    ];

    const personalityOptions = [
        { value: 1, label: "Not much" },
        { value: 3, label: "A little" },
        { value: 5, label: "Sometimes" },
        { value: 7, label: "Quite a bit" },
        { value: 10, label: "Very much" },
    ];

    function changeStep(direction) {
        setStep((current) =>
            Math.max(0, Math.min(steps.length - 1, current + direction))
        );
    }

    function handleReset() {
        resetForm();
        setStep(0);
    }

    return (
        <main className="checkin-page">
            <header className="checkin-header">
                <span className="dashboard-eyebrow">A MOMENT FOR YOURSELF</span>
                <h1>How have you been feeling?</h1>
                <p>Take a gentle pause. This check-in is about awareness, not judgment.</p>
            </header>

            <section className="checkin-progress card">
                <div className="checkin-progress-top">
                    <span>Step {step + 1} of {steps.length}</span>
                    <strong>{Math.round(((step + 1) / steps.length) * 100)}%</strong>
                </div>

                <div
                    className="checkin-progress-track"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(((step + 1) / steps.length) * 100)}
                >
                    <div style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>

                <div className="checkin-step-heading">
                    <span className="checkin-step-icon">{steps[step].icon}</span>
                    <div>
                        <h2>{steps[step].title}</h2>
                        <p>{steps[step].subtitle}</p>
                    </div>
                </div>

                <div className="checkin-fields">
                    {fields[step].map(([label, name, description, inputStep]) => (
                        <div className="input-group" key={name}>
                            {step === 0 ? (
                                <>
                                    <div className="checkin-field-label">
                                        <label>{label}</label>
                                        <strong>{data[name]}/10</strong>
                                    </div>

                                    <p className="checkin-question-help">{description}</p>

                                    <div className="personality-options">
                                        {personalityOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                className={
                                                    Number(data[name]) === option.value
                                                        ? "personality-option selected"
                                                        : "personality-option"
                                                }
                                                aria-pressed={Number(data[name]) === option.value}
                                                onClick={() =>
                                                    updateField(name, String(option.value))
                                                }
                                            >
                                                <span>{option.value}</span>
                                                <small>{option.label}</small>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <label htmlFor={name}>{label}</label>
                                    <input
                                        id={name}
                                        type="number"
                                        min="0"
                                        step={inputStep}
                                        value={data[name]}
                                        onChange={(e) => updateField(name, e.target.value)}
                                    />
                                    <small>{description}</small>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <div className="checkin-actions">
                <button
                    type="button"
                    className="reset"
                    onClick={handleReset}
                    disabled={loading}
                >
                    Start over
                </button>

                {step > 0 && (
                    <button
                        type="button"
                        className="reset"
                        onClick={() => changeStep(-1)}
                        disabled={loading}
                    >
                        ← Back
                    </button>
                )}

                {step < steps.length - 1 ? (
                    <button
                        type="button"
                        className="predict"
                        onClick={() => changeStep(1)}
                        disabled={loading}
                    >
                        Continue →
                    </button>
                ) : (
                    <button
                        type="button"
                        className="predict"
                        onClick={predictStress}
                        disabled={loading}
                    >
                        {loading ? "Checking..." : "See my results →"}
                    </button>
                )}
            </div>

            <p className="checkin-disclaimer">
                Your result is an estimate for personal awareness, not a medical diagnosis.
            </p>
        </main>
    );
}

export default StressForm;
