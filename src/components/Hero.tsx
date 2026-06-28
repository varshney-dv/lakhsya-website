"use client";

import Image from "next/image";
import { Sparkles, Star, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-section" style={{
      position: "relative",
      padding: "100px 20px 80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      minHeight: "85vh",
      zIndex: 1,
    }}>
      {/* Decorative Floating Symbols */}
      <div className="floating-icons" style={{ pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          animation: "float 6s infinite ease-in-out",
          color: "var(--accent-primary)",
        }}>
          <Sparkles size={36} />
        </div>
        <div style={{
          position: "absolute",
          top: "25%",
          right: "15%",
          animation: "float-reverse 8s infinite ease-in-out",
          color: "var(--accent-tertiary)",
        }}>
          <Star size={42} fill="currentColor" />
        </div>
        <div style={{
          position: "absolute",
          bottom: "15%",
          left: "20%",
          animation: "float-reverse 7s infinite ease-in-out",
          color: "var(--accent-secondary)",
        }}>
          <Heart size={32} fill="currentColor" />
        </div>
      </div>

      <div className="glass-panel" style={{
        maxWidth: "900px",
        width: "100%",
        padding: "40px 30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "var(--shadow-lg)",
        animation: "bubble-pop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
      }}>
        {/* Photo with beautiful morphing border frame */}
        <div className="photo-container" style={{
          position: "relative",
          width: "220px",
          height: "220px",
          marginBottom: "30px",
        }}>
          <div className="photo-frame" style={{
            position: "absolute",
            top: "-10px",
            left: "-10px",
            right: "-10px",
            bottom: "-10px",
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            background: "linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))",
            animation: "spin-slow 12s infinite linear",
            zIndex: 1,
            opacity: 0.85,
          }} />
          <div style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
            overflow: "hidden",
            border: "8px solid var(--bg-card)",
            zIndex: 2,
            boxShadow: "var(--shadow-md)",
            background: "#fff",
          }}>
            <Image
              src="/photo.jpeg"
              alt="Lakshya Varshney"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>

        {/* Hello Badge */}
        <div style={{
          background: "rgba(255, 107, 107, 0.15)",
          color: "var(--accent-primary)",
          fontWeight: 700,
          padding: "6px 16px",
          borderRadius: "30px",
          fontSize: "14px",
          marginBottom: "15px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-family-title)",
        }}>
          <Sparkles size={16} /> Hello there!
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "2.8rem",
          marginBottom: "15px",
          lineHeight: "1.2",
        }}>
          Welcome to <span className="title-gradient">Lakshya&apos;s World!</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "1.25rem",
          color: "var(--text-secondary)",
          maxWidth: "650px",
          lineHeight: "1.6",
          marginBottom: "35px",
        }}>
          Hi, I am <strong>Lakshya Varshney</strong>! I am <strong>10 years old</strong>, and welcome to my digital sandbox. Scroll down to see my adventure passport, draw on my whiteboard, play a quick game of cricket, or test your memory!
        </p>

        {/* Action Buttons */}
        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
          <a
            href="#about"
            style={{
              padding: "12px 28px",
              background: "var(--accent-primary)",
              color: "white",
              fontWeight: 700,
              fontSize: "1.05rem",
              borderRadius: "30px",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "var(--font-family-title)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            My Passport 🚀
          </a>
          <a
            href="#hobbies"
            style={{
              padding: "12px 28px",
              background: "var(--accent-secondary)",
              color: "white",
              fontWeight: 700,
              fontSize: "1.05rem",
              borderRadius: "30px",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "var(--font-family-title)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            Fun Activities 🎨
          </a>
          <a
            href="#wishboard"
            style={{
              padding: "12px 28px",
              background: "var(--accent-tertiary)",
              color: "#333",
              fontWeight: 700,
              fontSize: "1.05rem",
              borderRadius: "30px",
              boxShadow: "var(--shadow-sm)",
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "var(--font-family-title)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            }}
          >
            Leave a Wish 📝
          </a>
        </div>
      </div>
    </section>
  );
}
