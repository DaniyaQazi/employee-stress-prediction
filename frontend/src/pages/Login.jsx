import { useState } from "react";

function Login({
    loginData,
    setLoginData,
    handleLogin,
    loginError,
}) {

    const [isRegistering, setIsRegistering] = useState(false);

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        organizationCode: "",
    });

    const [registerMessage, setRegisterMessage] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);


    /* ================= REGISTER ================= */

    const handleRegister = async (e) => {
        e.preventDefault();

        setRegisterError("");
        setRegisterMessage("");

        if (!registerData.name.trim()) {
            setRegisterError("Please enter your full name.");
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setRegisterError("Passwords do not match.");
            return;
        }

        if (registerData.password.length < 6) {
            setRegisterError(
                "Password must be at least 6 characters."
            );
            return;
        }

        setRegisterLoading(true);

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: registerData.name.trim(),
                        email: registerData.email.trim(),
                        password: registerData.password,

                        organizationCode:
                            registerData.organizationCode
                                .trim()
                                .toUpperCase() || undefined,
                    }),
                }
            );


            const data = await response.json();


            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed"
                );
            }


            setRegisterMessage(
                data.message ||
                "Account created successfully. You can now sign in."
            );


            setRegisterData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                organizationCode: "",
            });


            setTimeout(() => {
                setIsRegistering(false);
                setRegisterMessage("");
            }, 1800);


        } catch (error) {

            setRegisterError(
                error.message || "Registration failed"
            );

        } finally {

            setRegisterLoading(false);
        }
    };


    return (
        <div className="app">

            <header className="hero">

                <div className="hero-content">

                    <div className="badge">
                        EMPLOYEE WELLBEING
                    </div>

                    <h1>
                        {isRegistering
                            ? "Create your account"
                            : "Welcome back"}
                    </h1>

                    <p>
                        {isRegistering
                            ? "Create an employee account to access your personal wellbeing check."
                            : "Sign in to continue to your personal stress and wellbeing check."}
                    </p>

                </div>

            </header>


            <main className="container">

                <section className="card login-card">

                    <div className="section-title">

                        <span>
                            {isRegistering ? "✨" : "🔐"}
                        </span>

                        <div>

                            <h2>
                                {isRegistering
                                    ? "Create Employee Account"
                                    : "Employee Login"}
                            </h2>

                            <p>
                                {isRegistering
                                    ? "Register with your name, email and password."
                                    : "Sign in using your employee account."}
                            </p>

                        </div>

                    </div>


                    {!isRegistering ? (

                        /* ================= LOGIN ================= */

                        <form onSubmit={handleLogin}>

                            <div className="input-group">

                                <label>Email</label>

                                <div className="input-wrapper">

                                    <input
                                        type="email"
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({
                                                ...loginData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="you@example.com"
                                        required
                                    />

                                </div>

                            </div>


                            <div
                                className="input-group"
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <label>Password</label>

                                <div className="input-wrapper">

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

                                </div>

                            </div>


                            {loginError && (

                                <div
                                    className="result error"
                                    style={{
                                        marginTop: "20px",
                                    }}
                                >

                                    <div className="result-icon">
                                        !
                                    </div>

                                    <div>

                                        <strong>
                                            Login failed
                                        </strong>

                                        <p>
                                            {loginError}
                                        </p>

                                    </div>

                                </div>

                            )}


                            <div className="actions">

                                <button
                                    className="predict"
                                    type="submit"
                                >
                                    Sign In
                                </button>

                            </div>

                        </form>

                    ) : (

                        /* ================= REGISTER ================= */

                        <form onSubmit={handleRegister}>

                            {/* NAME */}

                            <div className="input-group">

                                <label>
                                    Full Name
                                </label>

                                <div className="input-wrapper">

                                    <input
                                        type="text"
                                        value={registerData.name}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your full name"
                                        required
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <label>
                                    Email
                                </label>

                                <div className="input-wrapper">

                                    <input
                                        type="email"
                                        value={registerData.email}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="you@example.com"
                                        required
                                    />

                                </div>

                            </div>


                            {/* PASSWORD */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <label>
                                    Password
                                </label>

                                <div className="input-wrapper">

                                    <input
                                        type="password"
                                        value={registerData.password}
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="Create a password"
                                        required
                                    />

                                </div>

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <label>
                                    Confirm Password
                                </label>

                                <div className="input-wrapper">

                                    <input
                                        type="password"
                                        value={
                                            registerData.confirmPassword
                                        }
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                confirmPassword:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Confirm your password"
                                        required
                                    />

                                </div>

                            </div>


                            {/* ORGANIZATION CODE */}

                            <div
                                className="input-group"
                                style={{
                                    marginTop: "20px",
                                }}
                            >

                                <label>
                                    Organization Code
                                    <span
                                        style={{
                                            fontWeight: "400",
                                            color: "#888",
                                            marginLeft: "6px",
                                        }}
                                    >
                                        (Optional)
                                    </span>
                                </label>

                                <div className="input-wrapper">

                                    <input
                                        type="text"
                                        value={
                                            registerData.organizationCode
                                        }
                                        onChange={(e) =>
                                            setRegisterData({
                                                ...registerData,
                                                organizationCode:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="Enter company code if you have one"
                                        maxLength={8}
                                    />

                                </div>

                                <small
                                    style={{
                                        display: "block",
                                        marginTop: "7px",
                                        color: "#888",
                                        fontSize: "12px",
                                    }}
                                >
                                    Leave this blank for a personal
                                    wellbeing account.
                                </small>

                            </div>


                            {/* ERROR */}

                            {registerError && (

                                <div
                                    className="result error"
                                    style={{
                                        marginTop: "20px",
                                    }}
                                >

                                    <div className="result-icon">
                                        !
                                    </div>

                                    <div>

                                        <strong>
                                            Registration failed
                                        </strong>

                                        <p>
                                            {registerError}
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* SUCCESS */}

                            {registerMessage && (

                                <div
                                    className="result success"
                                    style={{
                                        marginTop: "20px",
                                    }}
                                >

                                    <div className="result-icon">
                                        ✓
                                    </div>

                                    <div>

                                        <strong>
                                            Success
                                        </strong>

                                        <p>
                                            {registerMessage}
                                        </p>

                                    </div>

                                </div>

                            )}


                            {/* SUBMIT */}

                            <div className="actions">

                                <button
                                    className="predict"
                                    type="submit"
                                    disabled={registerLoading}
                                >
                                    {registerLoading
                                        ? "Creating Account..."
                                        : "Create Account"}
                                </button>

                            </div>

                        </form>

                    )}


                    {/* LOGIN / REGISTER SWITCH */}

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                        }}
                    >

                        <button
                            type="button"
                            onClick={() => {
                                setIsRegistering(
                                    !isRegistering
                                );

                                setRegisterError("");
                                setRegisterMessage("");
                            }}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#76539b",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >

                            {isRegistering
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Create one"}

                        </button>

                    </div>

                </section>


                <div className="privacy">

                    <span>🔒</span>

                    <div>

                        <strong>
                            Private wellbeing check
                        </strong>

                        <p>
                            Designed for personal awareness, not
                            medical diagnosis or employee performance
                            evaluation.
                        </p>

                    </div>

                </div>


                <footer>

                    <strong>
                        Employee Stress Prediction System
                    </strong>

                    <span>
                        Built for wellbeing awareness • Not a medical
                        diagnosis
                    </span>

                </footer>

            </main>

        </div>
    );
}


export default Login;