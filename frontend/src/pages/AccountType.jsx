function AccountType({
    onEmployee,
    onOrganization,
    onAdmin,
}) {
    return (
        <div className="account-type-page">

            <div className="account-type-content">

                <div className="badge">
                    STRESSSENSE
                </div>

                <h1>
                    How would you like to use StressSense?
                </h1>

                <p>
                    Choose the experience that best fits your needs.
                </p>


                <div
                    className="account-type-grid"
                    style={{
                        gridTemplateColumns:
                            "repeat(3, minmax(0, 1fr))",
                    }}
                >

                    {/* EMPLOYEE */}

                    <button
                        type="button"
                        className="account-type-card"
                        onClick={onEmployee}
                    >

                        <div className="account-type-icon">
                            👤
                        </div>

                        <h2>
                            Personal Wellbeing
                        </h2>

                        <p>
                            Use StressSense for your own
                            wellbeing checks, predictions
                            and personal history.
                        </p>

                        <span>
                            Continue as Employee →
                        </span>

                    </button>


                    {/* ORGANIZATION */}

                    <button
                        type="button"
                        className="account-type-card"
                        onClick={onOrganization}
                    >

                        <div className="account-type-icon">
                            🏢
                        </div>

                        <h2>
                            Organization
                        </h2>

                        <p>
                            Create a workplace wellbeing
                            space and manage aggregated
                            employee insights.
                        </p>

                        <span>
                            Create Organization →
                        </span>

                    </button>


                    {/* ADMIN */}

                    <button
                        type="button"
                        className="account-type-card"
                        onClick={onAdmin}
                    >

                        <div className="account-type-icon">
                            🔐
                        </div>

                        <h2>
                            Admin Login
                        </h2>

                        <p>
                            Sign in to your organization
                            workspace and view aggregated
                            wellbeing insights.
                        </p>

                        <span>
                            Admin Sign In →
                        </span>

                    </button>

                </div>


                <div className="account-type-note">
                    🔒 Employee wellbeing information is handled
                    with privacy and responsible-use principles.
                </div>

            </div>

        </div>
    );
}


export default AccountType;