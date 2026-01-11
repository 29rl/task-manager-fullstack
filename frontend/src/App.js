// Task Manager - Main Application Component
// Full-stack task management with JWT authentication and real-time updates
// Built with React 18, Django REST API, and modern UI patterns

import React, { useState, useEffect } from "react";
import "./styles.css";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";

/**
 * App - Main application component
 * Handles authentication state and renders appropriate view
 * - LoginForm: Shows when user is not authenticated
 * - TaskList: Shows when user is authenticated
 *
 * Features:
 * - JWT token-based authentication
 * - Persistent login (checks localStorage on load)
 * - Logout with state reset
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has valid token on app load
    const token = localStorage.getItem("access");
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    // Clear all stored tokens and user data, reset authentication state
    localStorage.clear();
    setIsAuthenticated(false);
  };

  // Show loading state while checking for existing session
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="text-center">
          <div className="inline-block animate-spin mb-4">
            <i className="fas fa-spinner text-4xl text-blue-300"></i>
          </div>
          <p className="text-xl text-blue-100 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login form if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col">
        <div className="flex-1">
          <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
        </div>

        <footer className="py-6 text-center text-blue-400 text-sm border-t border-blue-700/40">
          Task Manager © 2026 • Built by{" "}
          <span className="text-blue-300 font-semibold">29RL</span>
        </footer>
      </div>
    );
  }

  // Main application layout - navbar + task list
  // Navbar: Sticky header with app title and logout button
  // TaskList: Main content area with all task management features
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Header/Navigation */}
      <nav className="bg-blue-950 bg-opacity-80 backdrop-blur-md border-b border-blue-700 sticky top-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="fas fa-tasks text-2xl text-blue-300"></i>
            <h1 className="text-2xl font-bold text-blue-100">Task Manager</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold flex items-center gap-2 shadow-md hover:shadow-lg"
            title="Sign out of your account"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <TaskList />
      <footer className="mt-12 py-8 text-center text-blue-400 text-sm border-t border-blue-700/50">
        Task Manager © 2026 • Built by{" "}
        <span className="text-blue-300 font-semibold">29RL</span>
      </footer>
    </div>
  );
}

export default App;
