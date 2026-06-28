"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check local storage or preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTimeout(() => {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }, 0);
    } else {
      setTimeout(() => {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      }, 0);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-btn"
      aria-label="Toggle Theme"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 100,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-md)",
        background: "var(--glass-bg)",
        backdropFilter: "var(--glass-blur)",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "var(--glass-border)",
        color: theme === "light" ? "var(--accent-tertiary)" : "var(--accent-primary)",
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        outline: "none",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {theme === "light" ? (
        <Sun size={24} fill="currentColor" />
      ) : (
        <Moon size={24} fill="currentColor" />
      )}
    </button>
  );
}
