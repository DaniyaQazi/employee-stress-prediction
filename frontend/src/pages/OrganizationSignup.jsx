import { useState } from "react";

function OrganizationSignup({
    onBack,
    onAdminLogin,
}) {
    const [formData, setFormData] = useState({
        organizationName: "",
        adminName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [createdOrganization, setCreatedOrganization] =
        useState(null);

    const updateField = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    /* ================= CREATE ORGANIZATION ================= */

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (
            formData.password !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register-organization",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        organizationName:
                            formData.organizationName,

                        name:
                            formData.adminName,

                        email:
                            formData.email,

                        password:
                            formData.password,
                    }),
                }
            );

            const responseData =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message ||
                    "Organization registration failed."
                );
            }


            /* ================= SAVE ORGANIZATION ================= */

            setCreatedOrganization(
                responseData.organization
            );

        } catch (error) {
            setError(
                error.message ||
                "Unable to create organization."
            );
        } finally {
            setLoading(false);
        }
    };


    /* ================= SUCCESS SCREEN ================= */

    if (createdOrganization) {
        const copyCode = async () => {
            try {
                await navigator.clipboard.writeText(
                    createdOrganization.code
                );

                alert("Organization code copied!");
            } catch (error) {
                console.error(
                    "Copy failed:",
                    error
                );
            }
        };

        return (
            <div className="account-type-page">

                <div className="account-type-content organization-form">

                    <div className="badge">
                        STRESSSENSE
                    </div>

                    <div
                        className="auth-form"
                        style={{
                            textAlign: "center",
                        }}
                    >

                        <div
                            style={{
                                fontSize: "48px",
                                marginBottom: "10px",
                            }}
                        >
                            🎉
                        </div>

                        <h1
                            style={{
                                textAlign: "center",
                                marginBottom: "10px",
                            }}
                        >
                            Organization Created
                        </h1>

                        <p
                            style={{
                                textAlign: "center",
                                marginBottom: "25px",
                            }}
                        >
                            Your organization is ready.
                        </p>


                        <div
                            style={{
                                padding: "20px",
                                borderRadius: "16px",
                                background:
                                    "#f7f1fb",
                                border:
                                    "1px solid #e2d4ec",
                                marginBottom: "20px",
                            }}
                        >

                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#777080",
                                    marginBottom: "8px",
                                }}
                            >
                                ORGANIZATION
                            </div>

                            <strong
                                style={{
                                    display: "block",
                                    fontSize: "20px",
                                    color: "#30283b",
                                    marginBottom: "20px",
                                }}
                            >
                                {
                                    createdOrganization.name
                                }
                            </strong>


                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#777080",
                                    marginBottom: "8px",
                                }}
                            >
                                ORGANIZATION CODE
                            </div>

                            <div
                                style={{
                                    fontSize: "28px",
                                    fontWeight: "800",
                                    letterSpacing: "4px",
                                    color: "#76539b",
                                    marginBottom: "15px",
                                }}
                            >
                                {
                                    createdOrganization.code
                                }
                            </div>


                            <button
                                type="button"
                                className="predict"
                                onClick={copyCode}
                            >
                                📋 Copy Organization Code
                            </button>

                        </div>


                        <p
                            style={{
                                fontSize: "13px",
                                lineHeight: "1.6",
                                color: "#777080",
                                marginBottom: "20px",
                            }}
                        >
                            Share this code with employees
                            who should join your organization.
                        </p>


                        <button
                            type="button"
                            className="predict"
                            onClick={onAdminLogin}                        >
                            Continue to Login →
                        </button>

                    </div>

                </div>

            </div>
        );
    }


    /* ================= REGISTRATION FORM ================= */

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
                    Create your organization
                </h1>

                <p>
                    Set up your organization workspace
                    and admin account.
                </p>


                <form
                    onSubmit={handleSubmit}
                    className="auth-form"
                >

                    <label>
                        Organization Name
                    </label>

                    <input
                        type="text"
                        value={
                            formData.organizationName
                        }
                        onChange={(e) =>
                            updateField(
                                "organizationName",
                                e.target.value
                            )
                        }
                        placeholder="e.g. Acme Technologies"
                        required
                    />


                    <label>
                        Admin Name
                    </label>

                    <input
                        type="text"
                        value={
                            formData.adminName
                        }
                        onChange={(e) =>
                            updateField(
                                "adminName",
                                e.target.value
                            )
                        }
                        placeholder="Your full name"
                        required
                    />


                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        value={
                            formData.email
                        }
                        onChange={(e) =>
                            updateField(
                                "email",
                                e.target.value
                            )
                        }
                        placeholder="admin@company.com"
                        required
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        value={
                            formData.password
                        }
                        onChange={(e) =>
                            updateField(
                                "password",
                                e.target.value
                            )
                        }
                        placeholder="Minimum 6 characters"
                        required
                    />


                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={
                            formData.confirmPassword
                        }
                        onChange={(e) =>
                            updateField(
                                "confirmPassword",
                                e.target.value
                            )
                        }
                        placeholder="Confirm your password"
                        required
                    />


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="predict"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Organization →"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default OrganizationSignup;