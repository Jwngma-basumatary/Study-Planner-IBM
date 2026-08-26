import { useState } from "react";

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("studyPlannerUser"));

    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }

    if (
      savedUser.email !== email ||
      savedUser.password !== password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");

    onLogin();
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <div className="auth-left">

          <div className="auth-brand">
            Study<span>Planner</span>
          </div>

          <div className="auth-message">
            <p className="auth-small-title">
              YOUR PERSONAL STUDY SPACE
            </p>

            <h1>
              Plan your studies.
              <br />
              Achieve your goals.
            </h1>

            <p>
              Organize your courses, assignments, schedule
              and academic progress in one simple place.
            </p>
          </div>

        </div>


        <div className="auth-right">

          <div className="auth-form-container">

            <h2>Welcome back</h2>

            <p className="auth-subtitle">
              Login to continue to your Study Planner.
            </p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />


              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />


              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>

            </form>


            <p className="switch-auth">
              Don't have an account?

              <button
                onClick={goToRegister}
                className="link-button"
              >
                Register
              </button>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;