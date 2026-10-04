import { useState } from "react";

function AdminLogin({
    loginData,
    setLoginData,
    handleLogin,
    loginError,
    onBack,
}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);

        try {
            await handleLogin(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="account-type-page">

            <div className="account-type-content organization-form">

                <button
                    type="button"
                    className="back-button"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <div className="badge">
                    STRESSSENSE
                </div>

                <h1>
                    Organization Admin
                </h1>

                <p>
                    Sign in to manage your organization
                    wellbeing workspace.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <label>
                        Admin Email
                    </label>

                    <input
                        type="email"
                        value={loginData.email}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                email: e.target.value,
                            })
                        }
                        placeholder="admin@company.com"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            })
                        }
                        placeholder="Enter your password"
                        required
                    />


                    {loginError && (
                        <div className="auth-error">
                            {loginError}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="predict"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing In..."
                            : "Admin Sign In →"}
                    </button>

                </form>

                <div
                    style={{
                        marginTop: "20px",
                        padding: "14px 18px",
                        background: "rgba(255,255,255,0.72)",
                        border: "1px solid #ebe4ef",
                        borderRadius: "14px",
                        color: "#777080",
                        fontSize: "13px",
                        lineHeight: "1.5",
                    }}
                >
                    🔒 Admin access provides aggregated
                    organization-level wellbeing insights.
                </div>

            </div>

        </div>
    );
}

export default AdminLogin;