import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "app"

  if (view === "landing") {
    return <LandingPage onEnter={() => setView("app")} />;
  }
  return <Dashboard onExit={() => setView("landing")} />;
}
