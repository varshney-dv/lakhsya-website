import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Hobbies from "@/components/Hobbies";
import Games from "@/components/Games";
import WishBoard from "@/components/WishBoard";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* Floating Theme Switcher */}
      <ThemeToggle />

      {/* Main content elements */}
      <main style={{ flex: 1 }}>
        <Hero />
        <About />
        <Hobbies />
        <Games />
        <WishBoard />
      </main>

      {/* Footer */}
      <footer style={{
        padding: "30px 20px",
        textAlign: "center",
        borderTop: "2px solid var(--border-color)",
        background: "var(--bg-card)",
        fontSize: "14px",
        color: "var(--text-secondary)",
        zIndex: 1,
        fontFamily: "var(--font-family-title)",
        fontWeight: 500,
      }}>
        <p>
          Made with ❤️ for <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Lakshya Varshney</span>.
        </p>
        <p style={{ fontSize: "11px", marginTop: "5px", opacity: 0.7 }}>
          © {new Date().getFullYear()} • St. Fidelies School Aligarh Explorer
        </p>
      </footer>
    </div>
  );
}
