function StressForm({
    data,
    updateField,
    resetForm,
    predictStress,
    loading,
}) {
    const Slider = ({ label, name, description }) => (
        <div className="input-group">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                }}
            >
                <label style={{ marginBottom: 0 }}>
                    {label}
                </label>

                <strong
                    style={{
                        color: "#76539b",
                        fontSize: "12px",
                    }}
                >
                    {data[name]}/10
                </strong>
            </div>

            <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={data[name]}
                onChange={(e) =>
                    updateField(name, e.target.value)
                }
            />

            <small
                style={{
                    display: "block",
                    marginTop: "7px",
                    color: "#918897",
                    fontSize: "10px",
                }}
            >
                {description}
            </small>
        </div>
    );

    const Input = ({
        label,
        name,
        step = "0.1",
        description,
    }) => (
        <div className="input-group">
            <label>{label}</label>

            <div className="input-wrapper">
                <input
                    type="number"
                    step={step}
                    value={data[name]}
                    onChange={(e) =>
                        updateField(name, e.target.value)
                    }
                />
            </div>

            {description && (
                <small
                    style={{
                        display: "block",
                        marginTop: "6px",
                        color: "#918897",
                        fontSize: "10px",
                    }}
                >
                    {description}
                </small>
            )}
        </div>
    );

    return (
        <>
            {/* PERSONALITY */}

            <section className="card">
                <div className="section-title">
                    <span>🧠</span>

                    <div>
                        <h2>Personality</h2>
                        <p>
                            Move the sliders to reflect how you
                            generally feel.
                        </p>
                    </div>
                </div>

                <div className="grid">
                    <Slider
                        label="Openness"
                        name="Openness"
                        description="Curiosity and openness to new experiences"
                    />

                    <Slider
                        label="Conscientiousness"
                        name="Conscientiousness"
                        description="Organization and responsibility"
                    />

                    <Slider
                        label="Extraversion"
                        name="Extraversion"
                        description="Social energy and outgoing behaviour"
                    />

                    <Slider
                        label="Agreeableness"
                        name="Agreeableness"
                        description="Cooperation and empathy"
                    />

                    <Slider
                        label="Neuroticism"
                        name="Neuroticism"
                        description="Sensitivity to stress and negative emotions"
                    />
                </div>
            </section>

            {/* SLEEP */}

            <section className="card">
                <div className="section-title">
                    <span>🌙</span>

                    <div>
                        <h2>Sleep & Wellbeing</h2>
                        <p>
                            Tell us about your recent sleep and
                            wellbeing.
                        </p>
                    </div>
                </div>

                <div className="grid">
                    <Input
                        label="Sleep Time"
                        name="sleep_time"
                        step="1"
                        description="24-hour format, e.g. 23 for 11 PM"
                    />

                    <Input
                        label="Wake-up Time"
                        name="wake_time"
                        step="1"
                        description="24-hour format, e.g. 7 for 7 AM"
                    />

                    <Input
                        label="Sleep Duration (hours)"
                        name="sleep_duration"
                        description="Approximate hours slept"
                    />

                    <Input
                        label="Sleep Quality Score"
                        name="PSQI_score"
                        step="1"
                        description="PSQI score"
                    />

                    <Input
                        label="Perceived Stress Score"
                        name="PSS_score"
                        step="1"
                        description="Current PSS score"
                    />
                </div>
            </section>

            {/* DIGITAL */}

            <section className="card">
                <div className="section-title">
                    <span>📱</span>

                    <div>
                        <h2>Digital Habits</h2>
                        <p>
                            A simple overview of your daily digital
                            activity.
                        </p>
                    </div>
                </div>

                <div className="grid">
                    <Input
                        label="Call Duration (minutes)"
                        name="call_duration"
                    />

                    <Input
                        label="Number of Calls"
                        name="num_calls"
                        step="1"
                    />

                    <Input
                        label="Number of Messages"
                        name="num_sms"
                        step="1"
                    />

                    <Input
                        label="Screen-on Time (minutes)"
                        name="screen_on_time"
                    />
                </div>
            </section>

            {/* MOVEMENT */}

            <section className="card">
                <div className="section-title">
                    <span>🚶</span>

                    <div>
                        <h2>Movement & Activity</h2>
                        <p>
                            Activity information used by the
                            wellbeing prediction model.
                        </p>
                    </div>
                </div>

                <div className="grid">
                    <Input
                        label="Skin Conductance"
                        name="skin_conductance"
                    />

                    <Input
                        label="Movement Activity"
                        name="accelerometer"
                    />

                    <Input
                        label="Mobility Radius"
                        name="mobility_radius"
                    />

                    <Input
                        label="Mobility Distance"
                        name="mobility_distance"
                    />
                </div>
            </section>

            {/* ACTIONS */}

            <div className="actions">
                <button
                    className="reset"
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                >
                    Reset
                </button>

                <button
                    className="predict"
                    type="button"
                    onClick={predictStress}
                    disabled={loading}
                >
                    {loading
                        ? "Checking..."
                        : "Check My Wellbeing →"}
                </button>
            </div>
        </>
    );
}

export default StressForm;