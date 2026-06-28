import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakshya Varshney | My Adventurous World 🎒",
  description: "Welcome to my digital passport! Learn about my hobbies (drawing, cricket, cycling, reading), play mini games, and leave a wish!",
  keywords: ["Lakshya Varshney", "Kid Portfolio", "St. Fidelies School", "Aligarh", "Class 4", "Cricket", "Drawing"],
  authors: [{ name: "Lakshya Varshney" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Floating Bubble Background elements */}
        <div className="bubbles-container">
          <div className="bubble" style={{ left: "10%", width: "80px", height: "80px", animationDelay: "0s", animationDuration: "18s" }} />
          <div className="bubble" style={{ left: "25%", width: "40px", height: "40px", animationDelay: "2s", animationDuration: "25s" }} />
          <div className="bubble" style={{ left: "40%", width: "100px", height: "100px", animationDelay: "0s", animationDuration: "30s" }} />
          <div className="bubble" style={{ left: "55%", width: "60px", height: "60px", animationDelay: "5s", animationDuration: "22s" }} />
          <div className="bubble" style={{ left: "70%", width: "90px", height: "90px", animationDelay: "1s", animationDuration: "20s" }} />
          <div className="bubble" style={{ left: "85%", width: "50px", height: "50px", animationDelay: "8s", animationDuration: "28s" }} />
        </div>

        {/* Floating Star Background elements (Only visible in Dark Mode) */}
        <div className="stars-container">
          <div className="star" style={{ top: "15%", left: "12%", animationDelay: "0.2s" }} />
          <div className="star" style={{ top: "25%", left: "45%", animationDelay: "0.5s" }} />
          <div className="star" style={{ top: "10%", left: "78%", animationDelay: "0.8s" }} />
          <div className="star" style={{ top: "45%", left: "23%", animationDelay: "1.1s" }} />
          <div className="star" style={{ top: "60%", left: "88%", animationDelay: "0.4s" }} />
          <div className="star" style={{ top: "75%", left: "34%", animationDelay: "1.5s" }} />
          <div className="star" style={{ top: "85%", left: "68%", animationDelay: "0.9s" }} />
        </div>

        {children}
      </body>
    </html>
  );
}
