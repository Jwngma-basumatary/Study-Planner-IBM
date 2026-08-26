import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ItemList from "./components/ItemList";

import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";


function Dashboard({ onLogout }) {

  return (
    <div className="app">

      <Navbar onLogout={onLogout} />

      <main className="main-content">

        <Hero />

        <ItemList />

      </main>

    </div>
  );
}


function App() {

  const [page, setPage] = useState(() => {

    const token =
      localStorage.getItem("token");

    return token
      ? "dashboard"
      : "login";
  });


  const handleLogin = () => {
    setPage("dashboard");
  };


  const handleRegister = () => {
    setPage("dashboard");
  };


  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setPage("login");
  };


  if (page === "login") {

    return (
      <Login
        onLogin={handleLogin}
        goToRegister={() =>
          setPage("register")
        }
      />
    );
  }


  if (page === "register") {

    return (
      <Register
        onRegister={handleRegister}
        goToLogin={() =>
          setPage("login")
        }
      />
    );
  }


  return (
    <Dashboard
      onLogout={handleLogout}
    />
  );
}


export default App;