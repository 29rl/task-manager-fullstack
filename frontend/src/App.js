import React, { useState, useEffect } from "react";
import "./styles.css";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem("access");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://task-manager-api-ux4e.onrender.com/api/auth/me/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.clear();
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.clear();
        setIsAuthenticated(false);
      }

      setLoading(false);
    }

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900 text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white">
      <nav className="bg-blue-950 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      <TaskList />
    </div>
  );
}

export default App;
