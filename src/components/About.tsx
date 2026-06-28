"use client";

import { MapPin, School, Compass, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <section id="about" style={{
      padding: "80px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      zIndex: 1,
      position: "relative",
    }}>
      <h2 style={{
        fontSize: "2.4rem",
        marginBottom: "40px",
        textAlign: "center",
      }}>
        🎒 My <span className="title-gradient">Adventure Passport</span>
      </h2>

      <div className="glass-panel" style={{
        maxWidth: "850px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        boxShadow: "var(--shadow-lg)",
        overflow: "hidden",
        border: "3px dashed var(--accent-secondary)",
      }}>
        {/* Left Side: Passport Details */}
        <div style={{
          padding: "35px",
          background: "var(--bg-card)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid var(--border-color)",
            paddingBottom: "15px",
          }}>
            <div>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 700 }}>Passport of</span>
              <h3 style={{ fontSize: "22px", color: "var(--accent-primary)" }}>LAKSHYA VARSHNEY</h3>
            </div>
            <div style={{
              background: "var(--accent-secondary)",
              color: "white",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: "var(--font-family-title)"
            }}>
              NO. LV-04-10
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255, 107, 107, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-primary)" }}>
                <Compass size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 700 }}>AGE & STATUS</div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>10 Years Old • Grade 4 Explorer</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(78, 205, 196, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-secondary)" }}>
                <School size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 700 }}>ACADEMY / SCHOOL</div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>St. Fidelies Sr Sec School</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255, 190, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-tertiary)" }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 700 }}>HOME BASE / CITY</div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>Aligarh, Uttar Pradesh, India</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(131, 56, 236, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-toy-purple)" }}>
                <Heart size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 700 }}>THE SUPPORT CREW (PARENTS)</div>
                <div style={{ fontSize: "16px", fontWeight: 600 }}>
                  Shalindri Varshney <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>(Mother)</span><br />
                  Tinku Varshney <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>(Father)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Stamps Board */}
        <div style={{
          padding: "35px",
          background: "var(--bg-secondary)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          position: "relative",
        }}>
          <div style={{
            fontSize: "12px",
            color: "var(--text-secondary)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            borderBottom: "1px dashed var(--text-secondary)",
            paddingBottom: "5px",
            width: "100%",
            textAlign: "center",
            marginBottom: "10px"
          }}>
            Official Exploration Stamps
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
          }}>
            {/* Stamp 1 */}
            <div style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              border: "3px double var(--accent-primary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-8deg)",
              color: "var(--accent-primary)",
              padding: "10px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "11px",
              boxShadow: "0 0 5px rgba(255, 107, 107, 0.1)",
              background: "rgba(255, 107, 107, 0.05)",
            }}>
              <Award size={20} style={{ marginBottom: "4px" }} />
              ST. FIDELIES<br />CLASS 4
            </div>

            {/* Stamp 2 */}
            <div style={{
              width: "110px",
              height: "110px",
              borderRadius: "15px",
              border: "3px dashed var(--accent-secondary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(12deg)",
              color: "var(--accent-secondary)",
              padding: "10px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "11px",
              background: "rgba(78, 205, 196, 0.05)",
            }}>
              <MapPin size={20} style={{ marginBottom: "4px" }} />
              ALIGARH<br />NATIVE
            </div>

            {/* Stamp 3 */}
            <div style={{
              width: "110px",
              height: "110px",
              borderRadius: "50% 20% 50% 20%",
              border: "3px solid var(--accent-tertiary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: "rotate(-15deg)",
              color: "var(--accent-tertiary)",
              padding: "10px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "11px",
              background: "rgba(255, 190, 11, 0.05)",
            }}>
              🏆<br />SUPER<br />KID
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
