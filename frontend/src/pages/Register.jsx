import { useState } from "react";

function Register({ onRegister, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Backend returned an error
      if (!response.ok) {
        setError(data.message || "Registration failed.");
        setLoading(false);
        return;
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Open dashboard
      onRegister();

    } catch (error) {
      console.error("Registration error:", error);

      setError(
        "Unable to connect to the server. Make sure your backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-left">

          <div className="auth-brand">
            Study<span>Planner</span>
          </div>

          <div className="auth-message">

            <p className="auth-small-title">
              START YOUR JOURNEY
            </p>

            <h1>
              Build better
              <br />
              study habits.
            </h1>

            <p>
              Create your study plan, manage your tasks
              and track your academic progress every day.
            </p>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="auth-right">

          <div className="auth-form-container">

            <h2>Create account</h2>

            <p className="auth-subtitle">
              Register to start using Study Planner.
            </p>


            {/* ERROR MESSAGE */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}


            {/* REGISTER FORM */}

            <form onSubmit={handleRegister}>

              {/* NAME */}

              <label htmlFor="name">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />


              {/* EMAIL */}

              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />


              {/* PASSWORD */}

              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />


              {/* CONFIRM PASSWORD */}

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                required
              />


              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>


            {/* LOGIN LINK */}

            <p className="switch-auth">

              Already have an account?

              <button
                type="button"
                onClick={goToLogin}
                className="link-button"
              >
                Login
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;