import { useEffect, useState } from "react";

import "./App.css";

import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import AccountType from "./pages/AccountType";
import OrganizationSignup from "./pages/OrganizationSignup";

import StressForm from "./components/StressForm";
import Navbar from "./components/Navbar";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyHistory from "./pages/MyHistory";
import WellbeingTips from "./pages/WellbeingTips";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";


const initialData = {

  Openness: 5,
  Conscientiousness: 5,
  Extraversion: 5,
  Agreeableness: 5,
  Neuroticism: 5,

  sleep_time: 23,
  wake_time: 7,
  sleep_duration: 8,
  PSQI_score: 5,
  PSS_score: 5,

  call_duration: 30,
  num_calls: 5,
  num_sms: 10,
  screen_on_time: 180,

  skin_conductance: 5,
  accelerometer: 1,
  mobility_radius: 100,
  mobility_distance: 500,
};


function App() {

  const [activePage, setActivePage] =
    useState("stress");

  const [accountType, setAccountType] =
    useState(null);

  const [data, setData] =
    useState(initialData);

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [userRole, setUserRole] =
    useState(
      localStorage.getItem("userRole")
    );

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: "",
    });

  const [loginError, setLoginError] =
    useState("");

  const [history, setHistory] =
    useState([]);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [historyError, setHistoryError] =
    useState("");


  /* ================= UPDATE FORM ================= */

  const update = (key, value) => {

    setData((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };


  /* ================= RESET FORM ================= */

  const reset = () => {

    setData(initialData);
    setResult(null);
  };


  /* ================= LOGIN ================= */

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoginError("");

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/auth/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(loginData),
          }
        );


      const responseData =
        await response.json();


      if (!response.ok) {

        throw new Error(
          responseData.message ||
          "Login failed"
        );
      }


      /* ================= SAVE AUTH ================= */

      localStorage.setItem(
        "token",
        responseData.token
      );

      localStorage.setItem(
        "userEmail",
        loginData.email
      );

      localStorage.setItem(
        "userRole",
        responseData.user.role
      );


      setToken(
        responseData.token
      );

      setUserRole(
        responseData.user.role
      );


      setLoginData({
        email: "",
        password: "",
      });


      /*
       * Admins go directly to the
       * organization dashboard.
       */

      if (
        responseData.user.role ===
        "ADMIN"
      ) {

        setActivePage("admin");

      } else {

        setActivePage("home");
      }


    } catch (error) {

      setLoginError(
        error.message ||
        "Login failed"
      );
    }
  };


  /* ================= LOGOUT ================= */

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "userEmail"
    );

    localStorage.removeItem(
      "userRole"
    );


    setToken(null);
    setUserRole(null);

    setAccountType(null);

    setResult(null);

    setHistory([]);

    setHistoryError("");

    setActivePage("stress");
  };


  /* ================= LOAD HISTORY ================= */

  const loadHistory = async () => {

    if (!token) return;

    /*
     * Admins do not use employee
     * prediction history.
     */

    if (userRole === "ADMIN") {
      return;
    }


    setHistoryLoading(true);
    setHistoryError("");

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/predictions/history",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


      const responseData =
        await response.json();


      if (!response.ok) {

        if (
          response.status === 401
        ) {

          logout();

          throw new Error(
            "Your session has expired. Please log in again."
          );
        }


        throw new Error(
          responseData.message ||
          "Unable to load prediction history"
        );
      }


      setHistory(
        responseData.predictions ||
        []
      );


    } catch (error) {

      setHistoryError(
        error.message ||
        "Unable to load prediction history"
      );

    } finally {

      setHistoryLoading(false);
    }
  };


  /* ================= INITIAL HISTORY LOAD ================= */

  useEffect(() => {

    if (
      token &&
      userRole !== "ADMIN"
    ) {

      loadHistory();
    }

  }, [token, userRole]);


  /* ================= PREDICT STRESS ================= */

  const predictStress = async () => {

    setLoading(true);
    setResult(null);

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/predictions",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(data),
          }
        );


      const resultData =
        await response.json();


      if (!response.ok) {

        if (
          response.status === 401
        ) {

          logout();

          throw new Error(
            "Your session has expired. Please log in again."
          );
        }


        throw new Error(
          resultData.message ||
          "Prediction failed"
        );
      }


      setResult({
        success: true,
        score:
          resultData.predicted_stress_score,
      });


      loadHistory();


    } catch (error) {

      setResult({
        success: false,

        message:
          error.message ||
          "Prediction failed",
      });

    } finally {

      setLoading(false);
    }
  };


  /* ================= ACCOUNT TYPE ================= */

  if (
    !token &&
    !accountType
  ) {

    return (
      <AccountType
        onEmployee={() =>
          setAccountType(
            "employee"
          )
        }

        onOrganization={() =>
          setAccountType(
            "organization"
          )
        }

        onAdmin={() =>
          setAccountType(
            "admin"
          )
        }
      />
    );
  }


  /* ================= EMPLOYEE LOGIN ================= */

  if (
    !token &&
    accountType === "employee"
  ) {

    return (
      <Login
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
        loginError={loginError}
      />
    );
  }


  /* ================= ADMIN LOGIN ================= */

  if (
    !token &&
    accountType === "admin"
  ) {

    return (
      <AdminLogin
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
        loginError={loginError}
        onBack={() => {
          setAccountType(null);
          setLoginError("");
        }}
      />
    );
  }


  /* ================= ORGANIZATION SIGNUP ================= */

  if (
    !token &&
    accountType === "organization"
  ) {

    return (
      <OrganizationSignup
        onBack={() => {
          setAccountType(null);
        }}

        onAdminLogin={() => {
          setAccountType("admin");
        }}
      />
    );
  }


  /* ================= ADMIN APPLICATION ================= */

  if (
    token &&
    userRole === "ADMIN"
  ) {

    return (
      <div className="app app-shell">

        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          onLogout={logout}
        />

        <div className="app-content">

          {activePage === "admin" && (
            <AdminDashboard
              token={token}
            />
          )}

        </div>

      </div>
    );
  }


  /* ================= EMPLOYEE APPLICATION ================= */

  return (

    <div className="app app-shell">

      {/* ================= SIDEBAR ================= */}

      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={logout}
      />


      <div className="app-content">


        {/* ================= HOME ================= */}

        {activePage === "home" && (

          <EmployeeDashboard
            history={history}
            setActivePage={
              setActivePage
            }
          />
        )}


        {/* ================= STRESS CHECK ================= */}

        {activePage === "stress" && (

          <>

            <header className="hero">

              <div className="hero-content">

                <div className="badge">
                  EMPLOYEE WELLBEING
                </div>

                <h1>
                  Stress & Wellbeing Check
                </h1>

                <p>
                  Understand your current
                  wellbeing signals and identify
                  habits that may be contributing
                  to stress.
                </p>

              </div>

            </header>


            <main className="container">


              {/* PRIVACY */}

              <div className="privacy">

                <span>
                  🔒
                </span>

                <div>

                  <strong>
                    Private wellbeing check
                  </strong>

                  <p>
                    Designed for personal
                    awareness, not medical
                    diagnosis or employee
                    performance evaluation.
                  </p>

                </div>

              </div>


              {/* STRESS FORM */}

              <StressForm
                data={data}
                updateField={update}
                resetForm={reset}
                predictStress={
                  predictStress
                }
                loading={loading}
              />


              {/* PREDICTION RESULT */}

              {result && (

                <div
                  className={
                    result.success
                      ? "result success prediction-result"
                      : "result error prediction-result"
                  }
                >

                  {result.success ? (

                    <>

                      <div className="result-icon">
                        ✓
                      </div>

                      <div className="prediction-result-content">

                        <span className="prediction-result-label">
                          PREDICTION COMPLETE
                        </span>

                        <h2>
                          Your predicted stress score
                        </h2>

                        <strong className="prediction-score">
                          {Number(
                            result.score
                          ).toFixed(2)}
                        </strong>

                        <p>
                          This score is a
                          model-generated
                          wellbeing signal
                          based on the
                          information you
                          provided.
                        </p>

                        <div className="prediction-note">

                          <span>
                            🌱
                          </span>

                          <p>
                            Use your results
                            to reflect on
                            your wellbeing
                            patterns over
                            time. This
                            prediction is
                            not a medical
                            diagnosis.
                          </p>

                        </div>

                      </div>

                    </>

                  ) : (

                    <>

                      <div className="result-icon">
                        !
                      </div>

                      <div>

                        <strong>
                          Prediction failed
                        </strong>

                        <p>
                          {result.message}
                        </p>

                      </div>

                    </>

                  )}

                </div>

              )}


              {/* FOOTER */}

              <footer>

                <strong>
                  Employee Stress Prediction System
                </strong>

                <span>
                  Built for wellbeing awareness •
                  Not a medical diagnosis
                </span>

              </footer>

            </main>

          </>
        )}


        {/* ================= HISTORY ================= */}

        {activePage === "history" && (

          <MyHistory
            history={history}
            historyLoading={
              historyLoading
            }
            historyError={
              historyError
            }
          />
        )}


        {/* ================= WELLBEING TIPS ================= */}

        {activePage === "tips" && (
          <WellbeingTips />
        )}


        {/* ================= PROFILE ================= */}

        {activePage === "profile" && (
          <Profile />
        )}

      </div>

    </div>
  );
}


export default App;