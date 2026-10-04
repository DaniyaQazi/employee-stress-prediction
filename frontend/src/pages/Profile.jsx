function Profile() {
    const email =
        localStorage.getItem("userEmail") || "Employee account";

    // Create a simple display name from the email
    const displayName =
        email !== "Employee account"
            ? email
                .split("@")[0]
                .replace(/[._-]/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : "Employee";

    return (
        <main className="page-container">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div className="badge">
                    YOUR ACCOUNT
                </div>

                <h1>Profile</h1>

                <p>
                    Manage your account information and privacy preferences.
                </p>

            </div>


            {/* ACCOUNT INFORMATION */}

            <section className="card profile-card">

                <div className="section-title">

                    <span>👤</span>

                    <div>
                        <h2>Account Information</h2>

                        <p>
                            Your employee account details.
                        </p>
                    </div>

                </div>


                <div className="profile-info">

                    <div className="profile-row">
                        <span>Name</span>

                        <strong>
                            {displayName}
                        </strong>
                    </div>


                    <div className="profile-row">
                        <span>Email</span>

                        <strong>
                            {email}
                        </strong>
                    </div>


                    <div className="profile-row">
                        <span>Account type</span>

                        <strong>
                            Employee
                        </strong>
                    </div>

                </div>

            </section>


            {/* PRIVACY */}

            <section className="card">

                <div className="section-title">

                    <span>🔒</span>

                    <div>
                        <h2>Privacy & Data</h2>

                        <p>
                            Your wellbeing information is intended for
                            personal awareness.
                        </p>
                    </div>

                </div>


                <div className="privacy-content">

                    <p>
                        Your prediction history is associated with your
                        account so you can review your previous wellbeing
                        checks.
                    </p>

                    <p>
                        This system is not intended for medical diagnosis,
                        employee performance evaluation, or individual
                        surveillance.
                    </p>

                </div>

            </section>


            {/* ACCOUNT STATUS */}

            <section className="card profile-status-card">

                <div className="section-title">

                    <span>🛡️</span>

                    <div>
                        <h2>Account Status</h2>

                        <p>
                            Your current employee portal access.
                        </p>
                    </div>

                </div>


                <div className="profile-status">

                    <span className="status-dot"></span>

                    <div>
                        <strong>Active account</strong>

                        <p>
                            You can access your wellbeing checks,
                            prediction history and personal resources.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );
}

export default Profile;