"use client";

import React, { useState, useEffect } from "react";
import { Send, Trash2, Pin } from "lucide-react";

interface Wish {
  id: string;
  name: string;
  message: string;
  color: string;
  rotation: number;
  date: string;
}

const PASTEL_COLORS = [
  "#fff9db", // pastel yellow
  "#e7f5ff", // pastel blue
  "#ebfbee", // pastel green
  "#fff0f6", // pastel pink
  "#f3f0ff", // pastel purple
];

const PRELOADED_WISHES: Wish[] = [
  {
    id: "pre-1",
    name: "Mumma & Papa ❤️",
    message: "To our champion, keep drawing your dreams, reading wonderful stories, and hit every ball in life for a six! We are so proud of you!",
    color: "#fff0f6",
    rotation: -3,
    date: "June 2026",
  },
  {
    id: "pre-2",
    name: "Rahul Bhaiya 🏏",
    message: "Hey buddy! Let's play cricket next weekend! Keep cycling fast and stay awesome. Happy 10th birthday year!",
    color: "#e7f5ff",
    rotation: 4,
    date: "June 2026",
  },
];

export default function WishBoard() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lakshya_wishes");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => setWishes(parsed), 0);
      } catch {
        setTimeout(() => setWishes(PRELOADED_WISHES), 0);
      }
    } else {
      setTimeout(() => {
        setWishes(PRELOADED_WISHES);
        localStorage.setItem("lakshya_wishes", JSON.stringify(PRELOADED_WISHES));
      }, 0);
    }
  }, []);

  // Save to localStorage
  const saveWishes = (updatedWishes: Wish[]) => {
    setWishes(updatedWishes);
    localStorage.setItem("lakshya_wishes", JSON.stringify(updatedWishes));
  };

  const handlePostWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: name.trim(),
      message: message.trim(),
      color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      rotation: Math.floor(Math.random() * 8) - 4, // random between -4 and 4 degrees
      date: new Date().toLocaleDateString(undefined, { month: "short", year: "numeric" }),
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);
    setName("");
    setMessage("");
  };

  const handleDeleteWish = (id: string) => {
    // Only allow deleting custom wishes (or all, let's allow all for user testing)
    const updated = wishes.filter((w) => w.id !== id);
    saveWishes(updated);
  };

  return (
    <section id="wishboard" style={{
      padding: "80px 20px 100px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      position: "relative",
    }}>
      <h2 style={{
        fontSize: "2.4rem",
        marginBottom: "15px",
        textAlign: "center",
      }}>
        📝 Lakshya&apos;s <span className="title-gradient">Wish Board</span>
      </h2>
      <p style={{
        color: "var(--text-secondary)",
        fontSize: "16px",
        textAlign: "center",
        marginBottom: "40px",
        maxWidth: "500px",
      }}>
        Leave a sweet note, birthday wish, or a fun message for Lakshya on his board!
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "40px",
        maxWidth: "1000px",
        width: "100%",
      }}>
        {/* Wish Form */}
        <div className="glass-panel" style={{
          padding: "30px",
          height: "fit-content",
          boxShadow: "var(--shadow-lg)",
        }}>
          <h3 style={{ marginBottom: "20px", color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
            Pin a Sticky Note 📌
          </h3>
          <form onSubmit={handlePostWish} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <label htmlFor="name-input" style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Your Name</label>
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grandma, Classmate, Friend..."
                maxLength={40}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "2px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <div>
              <label htmlFor="message-input" style={{ display: "block", fontSize: "14px", fontWeight: 700, marginBottom: "6px" }}>Your Message</label>
              <textarea
                id="message-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something nice for Lakshya..."
                maxLength={200}
                rows={4}
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "2px solid var(--border-color)",
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  outline: "none",
                  resize: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                background: "var(--accent-primary)",
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                fontFamily: "var(--font-family-title)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Send size={16} /> Pin Note!
            </button>
          </form>
        </div>

        {/* Board View */}
        <div style={{
          background: "#d7ccc8", // wooden corkboard color representation
          border: "12px solid #8d6e63", // dark wooden frame
          borderRadius: "20px",
          padding: "30px 20px",
          minHeight: "400px",
          boxShadow: "inset 0 4px 10px rgba(0,0,0,0.3), var(--shadow-lg)",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignContent: "flex-start",
          justifyContent: "center",
          overflowY: "auto",
          maxHeight: "550px",
        }}>
          {wishes.length === 0 ? (
            <div style={{
              color: "#5d4037",
              fontStyle: "italic",
              textAlign: "center",
              width: "100%",
              marginTop: "100px",
              fontWeight: 700,
            }}>
              📌 Board is empty. Be the first to pin a wish!
            </div>
          ) : (
            wishes.map((wish) => (
              <div
                key={wish.id}
                style={{
                  width: "180px",
                  minHeight: "180px",
                  background: wish.color,
                  padding: "15px",
                  borderRadius: "2px",
                  boxShadow: "2px 5px 8px rgba(0,0,0,0.2)",
                  transform: `rotate(${wish.rotation}deg)`,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  color: "#333", // Sticky notes are bright pastels, so dark text is readable
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.08) rotate(0deg)";
                  e.currentTarget.style.boxShadow = "5px 8px 12px rgba(0,0,0,0.3)";
                  e.currentTarget.style.zIndex = "10";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = `rotate(${wish.rotation}deg)`;
                  e.currentTarget.style.boxShadow = "2px 5px 8px rgba(0,0,0,0.2)";
                  e.currentTarget.style.zIndex = "1";
                }}
              >
                {/* Red Pin on top */}
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#e53935",
                  zIndex: 2,
                }}>
                  <Pin size={24} fill="#e53935" />
                </div>

                {/* Wish Content */}
                <div style={{ fontSize: "13px", lineHeight: "1.4", margin: "10px 0 5px", wordBreak: "break-word" }}>
                  {wish.message}
                </div>

                {/* Author Details & Actions */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  borderTop: "1px dashed rgba(0,0,0,0.1)",
                  paddingTop: "6px",
                  marginTop: "6px",
                }}>
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: 700 }}>{wish.name}</div>
                    <div style={{ fontSize: "9px", opacity: 0.6 }}>{wish.date}</div>
                  </div>
                  
                  {/* Delete Button (Except default wishes for security demo, let's check) */}
                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    aria-label="Delete Wish"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#757575",
                      cursor: "pointer",
                      padding: "2px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#d32f2f")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#757575")}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
