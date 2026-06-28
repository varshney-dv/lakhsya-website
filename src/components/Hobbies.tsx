"use client";

import { useState, useRef, useEffect } from "react";
import { Bike, BookOpen, RotateCcw, Play, Check } from "lucide-react";

export default function Hobbies() {
  const [activeTab, setActiveTab] = useState<"drawing" | "cricket" | "cycling" | "reading">("drawing");

  // Drawing Canvas State & Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#ff6b6b");
  const [brushSize, setBrushSize] = useState(5);
  const [canvasCleared, setCanvasCleared] = useState(false);

  // Cricket Game State
  const [cricketScore, setCricketScore] = useState(0);
  const [cricketHighScore, setCricketHighScore] = useState(0);
  const [ballState, setBallState] = useState<"idle" | "bowling" | "hit" | "missed">("idle");
  const [batSwing, setBatSwing] = useState(false);
  const [gameMessage, setGameMessage] = useState("Tap 'Bowl' to start!");
  const ballTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cycling Game State
  const [cyclingSpeed, setCyclingSpeed] = useState(0);
  const [cyclingDistance, setCyclingDistance] = useState(0);
  const [pedalAngle, setPedalAngle] = useState(0);
  const cyclingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reading Book Stack
  const [selectedBook, setSelectedBook] = useState<number | null>(null);

  // 1. Drawing Canvas Logic
  useEffect(() => {
    if (activeTab === "drawing" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }
    }
  }, [activeTab, color, brushSize, canvasCleared]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasCleared(!canvasCleared);
  };

  // 2. Cricket Game Logic
  const startBowl = () => {
    if (ballState === "bowling") return;
    setBallState("bowling");
    setGameMessage("Get ready... HIT when it is green!");

    if (ballTimerRef.current) clearTimeout(ballTimerRef.current);

    // Ball takes 1.2s to reach hit zone (roughly at 800ms to 1100ms)
    ballTimerRef.current = setTimeout(() => {
      setBallState("missed");
      setGameMessage("Oops! Too slow. Try again!");
      setCricketScore(0);
    }, 1500);
  };

  const swingCricketBat = () => {
    if (batSwing) return;
    setBatSwing(true);
    setTimeout(() => setBatSwing(false), 300);

    if (ballState === "bowling") {
      if (ballTimerRef.current) clearTimeout(ballTimerRef.current);

      // Simple timing: if hit between 700ms and 1100ms since bowl
      const hitChance = Math.random();
      let runs = 0;
      let msg = "";

      if (hitChance > 0.8) {
        runs = 6;
        msg = "🚀 SIX! Out of the park!";
      } else if (hitChance > 0.5) {
        runs = 4;
        msg = "🏏 FOUR! Brilliant boundary!";
      } else if (hitChance > 0.2) {
        runs = 2;
        msg = "🏃 Double! Nice running!";
      } else {
        runs = 1;
        msg = "👍 Single run. Good connection!";
      }

      setBallState("hit");
      const newScore = cricketScore + runs;
      setCricketScore(newScore);
      setGameMessage(msg);
      if (newScore > cricketHighScore) {
        setCricketHighScore(newScore);
      }
    } else if (ballState === "idle" || ballState === "hit" || ballState === "missed") {
      setGameMessage("Wait for the ball to be bowled!");
    }
  };

  // 3. Cycling logic
  useEffect(() => {
    if (activeTab === "cycling") {
      cyclingTimerRef.current = setInterval(() => {
        setCyclingSpeed((prev) => {
          if (prev > 0) {
            const nextSpeed = Math.max(0, prev - 1.5);
            setCyclingDistance((d) => d + parseFloat((nextSpeed * 0.05).toFixed(2)));
            return nextSpeed;
          }
          return 0;
        });
      }, 200);
    }
    return () => {
      if (cyclingTimerRef.current) clearInterval(cyclingTimerRef.current);
    };
  }, [activeTab]);

  const pedalCycle = () => {
    setCyclingSpeed((prev) => {
      const nextSpeed = Math.min(60, prev + 8);
      setPedalAngle((angle) => (angle + 45) % 360);
      return nextSpeed;
    });
  };

  const bookList = [
    { title: "The Adventures of Tom Sawyer", author: "Mark Twain", icon: "🤠", quote: "My favorite character is Tom Sawyer because he always tricks his friends into doing his chores! The whitewashing fence scene is super funny. Rating: 5/5 stars!", color: "var(--color-toy-red)" },
    { title: "Harry Potter & The Philosopher's Stone", author: "J.K. Rowling", icon: "⚡", quote: "I wish I could cast Wingardium Leviosa on my heavy school bag. Quidditch is the best sport ever (well, after cricket!). Rating: 5/5 stars!", color: "var(--color-toy-blue)" },
    { title: "Percy Jackson & The Lightning Thief", author: "Rick Riordan", icon: "🔱", quote: "Poseidon is definitely the coolest dad in any book. I love how Percy fights monsters with his pen-sword Riptide! Rating: 5/5 stars!", color: "var(--color-toy-purple)" },
    { title: "The Jungle Book", author: "Rudyard Kipling", icon: "🐻", quote: "Baloo is the ultimate fun bear! Mowgli's adventure escaping from Shere Khan is super exciting. I love reading about the jungle rules. Rating: 4.8/5 stars!", color: "var(--color-toy-green)" },
  ];

  return (
    <section id="hobbies" style={{
      padding: "80px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      position: "relative",
    }}>
      <h2 style={{
        fontSize: "2.4rem",
        marginBottom: "35px",
        textAlign: "center",
      }}>
        🎯 My <span className="title-gradient">Favorite Hobbies</span>
      </h2>

      {/* Tabs list */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "30px",
        maxWidth: "600px",
        width: "100%",
      }}>
        {(
          [
            { id: "drawing", label: "Drawing 🎨", color: "var(--color-toy-red)" },
            { id: "cricket", label: "Cricket 🏏", color: "var(--color-toy-blue)" },
            { id: "cycling", label: "Cycling 🚲", color: "var(--color-toy-orange)" },
            { id: "reading", label: "Reading 📚", color: "var(--color-toy-green)" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 20px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-family-title)",
              fontSize: "16px",
              fontWeight: 700,
              background: activeTab === tab.id ? tab.color : "var(--glass-bg)",
              color: activeTab === tab.id ? "white" : "var(--text-primary)",
              boxShadow: activeTab === tab.id ? "var(--shadow-md)" : "var(--shadow-sm)",
              borderWidth: "2px",
              borderStyle: "solid",
              borderColor: activeTab === tab.id ? "transparent" : "var(--border-color)",
              transform: activeTab === tab.id ? "scale(1.05)" : "scale(1)",
              transition: "all 0.2s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents Panel */}
      <div className="glass-panel" style={{
        maxWidth: "800px",
        width: "100%",
        minHeight: "450px",
        padding: "30px",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>

        {/* 1. DRAWING CANVAS TAB */}
        {activeTab === "drawing" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "var(--color-toy-red)", marginBottom: "5px" }}>Lakshya&apos;s Whiteboard</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>I love sketching cartoon characters! Try drawing something cool below!</p>
            </div>

            {/* Canvas Container */}
            <div style={{
              width: "100%",
              maxWidth: "500px",
              background: "white",
              borderRadius: "15px",
              border: "3px solid var(--border-color)",
              boxShadow: "inset 0 2px 5px rgba(0,0,0,0.1)",
              overflow: "hidden",
              touchAction: "none"
            }}>
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                style={{
                  display: "block",
                  width: "100%",
                  cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' style='fill:black'><circle cx='8' cy='8' r='4'/></svg>") 8 8, auto`
                }}
              />
            </div>

            {/* Canvas Controls */}
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}>
              {/* Color selectors */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { name: "Coral Red", val: "#ff6b6b" },
                  { name: "Sky Blue", val: "#3a86c8" },
                  { name: "Green", val: "#4ecdc4" },
                  { name: "Yellow", val: "#ffbe0b" },
                  { name: "Purple", val: "#8338ec" },
                  { name: "Eraser (White)", val: "#ffffff" },
                ].map((col) => (
                  <button
                    key={col.val}
                    onClick={() => setColor(col.val)}
                    title={col.name}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: col.val,
                      border: color === col.val ? "3px solid #1e293b" : "2px solid #ccc",
                      boxShadow: "var(--shadow-sm)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: col.val === "#ffffff" ? "#333" : "white"
                    }}
                  >
                    {color === col.val && <Check size={14} />}
                  </button>
                ))}
              </div>

              {/* Brush size */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700 }}>Size:</span>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  style={{ cursor: "pointer", accentColor: "var(--accent-primary)" }}
                />
              </div>

              {/* Clear button */}
              <button
                onClick={clearCanvas}
                style={{
                  padding: "8px 16px",
                  borderRadius: "15px",
                  border: "none",
                  background: "#eee",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <RotateCcw size={14} /> Clear
              </button>
            </div>
          </div>
        )}

        {/* 2. CRICKET GAME TAB */}
        {activeTab === "cricket" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "center", textAlign: "center" }}>
            <div>
              <h3 style={{ color: "var(--color-toy-blue)", marginBottom: "5px" }}>Cricket Power Hitter</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Cricket is my absolute favorite sport! Hit the ball at the right time!</p>
            </div>

            {/* Pitch / Arena display */}
            <div style={{
              width: "100%",
              maxWidth: "500px",
              height: "220px",
              background: "linear-gradient(to bottom, #7dd3fc, #38bdf8 60%, #4ade80 60%)",
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              border: "4px solid var(--border-color)",
              boxShadow: "inset 0 4px 10px rgba(0,0,0,0.15)"
            }}>
              {/* Pitch Stumps */}
              <div style={{
                position: "absolute",
                bottom: "40px",
                left: "60px",
                display: "flex",
                gap: "5px"
              }}>
                <div style={{ width: "4px", height: "45px", background: "#f59e0b" }} />
                <div style={{ width: "4px", height: "45px", background: "#f59e0b" }} />
                <div style={{ width: "4px", height: "45px", background: "#f59e0b" }} />
              </div>

              {/* Bowling Ball */}
              {ballState === "bowling" && (
                <div style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  background: "#dc2626",
                  borderRadius: "50%",
                  border: "2px solid white",
                  bottom: "80px",
                  right: "40px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
                  animation: "bowlBall 1.5s linear forwards",
                }} />
              )}

              {/* Bat Swing display */}
              <div style={{
                position: "absolute",
                bottom: "35px",
                left: "90px",
                width: "10px",
                height: "60px",
                background: "#d97706",
                borderRadius: "3px",
                transformOrigin: "bottom center",
                transform: batSwing ? "rotate(-85deg)" : "rotate(10deg)",
                transition: batSwing ? "transform 0.1s ease-out" : "transform 0.2s ease-in",
                boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
              }} />

              {/* Timing Zone Bar Indicator */}
              <div style={{
                position: "absolute",
                bottom: "10px",
                left: "10%",
                width: "80%",
                height: "8px",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "4px",
                overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute",
                  left: "50%",
                  width: "25%",
                  height: "100%",
                  background: "#22c55e",
                  borderRadius: "4px"
                }} />
              </div>
            </div>

            {/* Game Stats */}
            <div style={{ display: "flex", gap: "30px", justifyContent: "center" }}>
              <div>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 700 }}>SCORE</span>
                <h4 style={{ fontSize: "28px", color: "var(--color-toy-blue)" }}>{cricketScore}</h4>
              </div>
              <div>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 700 }}>HIGH SCORE</span>
                <h4 style={{ fontSize: "28px", color: "var(--accent-primary)" }}>{cricketHighScore}</h4>
              </div>
            </div>

            {/* Game Message */}
            <div style={{
              fontWeight: 700,
              fontSize: "16px",
              color: ballState === "hit" ? "var(--color-toy-green)" : ballState === "missed" ? "var(--color-toy-red)" : "var(--text-primary)",
              height: "24px",
            }}>
              {gameMessage}
            </div>

            {/* Game Actions */}
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={startBowl}
                disabled={ballState === "bowling"}
                style={{
                  padding: "12px 24px",
                  background: "var(--color-toy-green)",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: ballState === "bowling" ? 0.6 : 1,
                }}
              >
                <Play size={16} fill="white" /> Bowl!
              </button>

              <button
                onClick={swingCricketBat}
                style={{
                  padding: "12px 24px",
                  background: "var(--accent-primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                🏏 SWING BAT!
              </button>
            </div>

            {/* Style keyframe directly as tag to avoid CSS bundle complication */}
            <style>{`
              @keyframes bowlBall {
                0% {
                  right: 40px;
                  bottom: 80px;
                  transform: scale(0.6);
                }
                60% {
                  right: 120px;
                  bottom: 40px;
                  transform: scale(1.1);
                }
                65% {
                  right: 130px;
                  bottom: 42px;
                }
                100% {
                  right: 450px;
                  bottom: 45px;
                  transform: scale(0.5);
                }
              }
            `}</style>
          </div>
        )}

        {/* 3. CYCLING TAB */}
        {activeTab === "cycling" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "center", textAlign: "center" }}>
            <div>
              <h3 style={{ color: "var(--color-toy-orange)", marginBottom: "5px" }}>Cycling Speed Champion</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Click/Tap PEDAL fast to accelerate the bicycle and travel across India!</p>
            </div>

            {/* Cycling Track */}
            <div style={{
              width: "100%",
              maxWidth: "500px",
              height: "180px",
              background: "linear-gradient(to bottom, #bae6fd, #e0f2fe 60%, #cbd5e1 60%)",
              borderRadius: "20px",
              border: "4px solid var(--border-color)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "inset 0 4px 10px rgba(0,0,0,0.1)"
            }}>
              {/* Moving hills in background */}
              <div style={{
                position: "absolute",
                bottom: "70px",
                width: "200%",
                height: "60px",
                background: "#86efac",
                borderRadius: "50% 50% 0 0",
                transform: `translateX(-${(cyclingDistance * 10) % 100}px)`,
                opacity: 0.5,
              }} />

              {/* Moving road stripes */}
              <div style={{
                position: "absolute",
                bottom: "25px",
                width: "200%",
                height: "6px",
                background: "dashed white",
                borderBottom: "6px dashed white",
                transform: `translateX(-${(cyclingDistance * 50) % 100}px)`,
              }} />

              {/* Bicycle */}
              <div style={{
                position: "absolute",
                bottom: "35px",
                left: "150px",
                width: "100px",
                height: "70px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                animation: cyclingSpeed > 0 ? "pulse-gentle 0.5s infinite" : "none",
              }}>
                {/* Back Wheel */}
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid #334155",
                  position: "relative",
                  animation: `spin-slow ${cyclingSpeed > 0 ? 10 / cyclingSpeed : 0}s infinite linear`,
                  background: "radial-gradient(circle, transparent 40%, #94a3b8 40%)"
                }}>
                  <div style={{ position: "absolute", top: "50%", left: "0", width: "100%", height: "2px", background: "#475569" }} />
                  <div style={{ position: "absolute", left: "50%", top: "0", width: "2px", height: "100%", background: "#475569" }} />
                </div>

                {/* Pedal/Gear */}
                <div style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#475569",
                  position: "absolute",
                  bottom: "12px",
                  left: "44px",
                  transform: `rotate(${pedalAngle}deg)`,
                  transition: "transform 0.1s linear"
                }}>
                  <div style={{ position: "absolute", top: "-10px", left: "5px", width: "2px", height: "12px", background: "#94a3b8" }} />
                </div>

                {/* Frame */}
                <svg width="60" height="40" style={{ position: "absolute", bottom: "14px", left: "20px" }}>
                  <path d="M 0 20 L 25 20 L 45 0 L 15 0 Z" fill="none" stroke="var(--color-toy-orange)" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M 25 20 L 20 0" fill="none" stroke="var(--color-toy-orange)" strokeWidth="4" />
                </svg>

                {/* Front Wheel */}
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid #334155",
                  position: "relative",
                  animation: `spin-slow ${cyclingSpeed > 0 ? 10 / cyclingSpeed : 0}s infinite linear`,
                  background: "radial-gradient(circle, transparent 40%, #94a3b8 40%)"
                }}>
                  <div style={{ position: "absolute", top: "50%", left: "0", width: "100%", height: "2px", background: "#475569" }} />
                  <div style={{ position: "absolute", left: "50%", top: "0", width: "2px", height: "100%", background: "#475569" }} />
                </div>
              </div>
            </div>

            {/* Dash statistics */}
            <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
              <div>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 700 }}>SPEED</span>
                <h4 style={{ fontSize: "28px", color: "var(--color-toy-orange)" }}>{cyclingSpeed.toFixed(0)} <span style={{ fontSize: "14px" }}>km/h</span></h4>
              </div>
              <div>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 700 }}>DISTANCE TRAVELLED</span>
                <h4 style={{ fontSize: "28px", color: "var(--color-toy-blue)" }}>{cyclingDistance.toFixed(1)} <span style={{ fontSize: "14px" }}>meters</span></h4>
              </div>
            </div>

            {/* Accelerate Pedal Button */}
            <button
              onClick={pedalCycle}
              style={{
                padding: "15px 35px",
                background: "var(--color-toy-orange)",
                color: "white",
                border: "none",
                borderRadius: "30px",
                fontWeight: 700,
                fontSize: "18px",
                cursor: "pointer",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transform: cyclingSpeed > 30 ? "scale(1.08)" : "scale(1)",
                transition: "all 0.1s ease",
              }}
            >
              <Bike size={20} /> PEDAL! 🚲
            </button>
          </div>
        )}

        {/* 4. READING TAB */}
        {activeTab === "reading" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ color: "var(--color-toy-green)", marginBottom: "5px" }}>The Magic Library</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>I love reading adventures! Click on any book on my shelf to read my review!</p>
            </div>

            {/* Books Shelf View */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "15px",
              width: "100%",
              maxWidth: "600px",
              padding: "20px",
              background: "rgba(139, 90, 43, 0.15)",
              borderRadius: "15px",
              borderBottom: "10px solid #8b5a2b", // wooden shelf effect
              boxShadow: "var(--shadow-md)"
            }}>
              {bookList.map((book, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBook(idx)}
                  style={{
                    height: "180px",
                    background: book.color,
                    borderRadius: "8px 15px 15px 8px",
                    boxShadow: "3px 3px 8px rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "15px 10px",
                    color: "white",
                    fontWeight: 700,
                    position: "relative",
                    transform: selectedBook === idx ? "translateY(-15px) rotate(-3deg)" : "translateY(0)",
                    transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    borderLeft: "6px solid rgba(0,0,0,0.2)"
                  }}
                >
                  <span style={{ fontSize: "28px" }}>{book.icon}</span>
                  <div style={{ fontSize: "13px", lineHeight: "1.2", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {book.title}
                  </div>
                  <span style={{ fontSize: "10px", opacity: 0.8 }}>{book.author}</span>
                </div>
              ))}
            </div>

            {/* Opened Book review description */}
            <div style={{
              width: "100%",
              maxWidth: "600px",
              minHeight: "100px",
              background: "var(--bg-secondary)",
              borderLeft: `5px solid ${selectedBook !== null ? bookList[selectedBook].color : "var(--border-color)"}`,
              padding: "20px",
              borderRadius: "0 15px 15px 0",
              boxShadow: "var(--shadow-sm)"
            }}>
              {selectedBook !== null ? (
                <div>
                  <h4 style={{ color: bookList[selectedBook].color, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <BookOpen size={18} /> Review of &quot;{bookList[selectedBook].title}&quot;
                  </h4>
                  <p style={{ fontStyle: "italic", fontSize: "15px", lineHeight: "1.6", color: "var(--text-primary)" }}>
                    &ldquo;{bookList[selectedBook].quote}&rdquo;
                  </p>
                </div>
              ) : (
                <div style={{ textAlign: "center", color: "var(--text-secondary)", fontStyle: "italic" }}>
                  📚 Choose a book from the shelf to open it!
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
