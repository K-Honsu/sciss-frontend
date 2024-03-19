import React, { useState } from "react";
import {createRoot} from "react-dom/client"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { usebackendStore } from "./store/store.js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ReactDOM from "react-dom";
import Home from "./pages/home/index.jsx";
import Login from "./pages/auth/login/index.jsx";
import Signup from "./pages/auth/signup/index.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import Analytics from "./components/modals/analytics/index.jsx";
import AI from "./pages/ai/index.jsx";

function Main() {
  const accessToken = usebackendStore((state) => state.accessToken);
  const tempAccessToken = usebackendStore((state) => state.tempAccessToken);

  return (
    <div className="app flex flex-col h-screen overflow-y-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={accessToken ? <Dashboard /> : <Login />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ai" element={<AI />} />
        
      </Routes>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Main />
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  </React.StrictMode>
);
