import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminPanel from "./AdminPanel";

const ADMIN_API = "/api/admin/login";

const AdminApp = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [error, setError] = useState("");

  const handleLogin = (username, password) => {
    fetch(ADMIN_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("adminToken", data.token);
          setError("");
        } else {
          setError(data.error || "Login failed");
        }
      })
      .catch(() => setError("Login failed"));
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
  };

  return token ? (
    <AdminPanel token={token} onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} error={error} />
  );
};

export default AdminApp;
