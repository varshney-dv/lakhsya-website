"use client";

import { useState } from "react";
import { HelpCircle, RefreshCw, Trophy } from "lucide-react";

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_SYMBOLS = ["🏏", "🎨", "🚲", "📚", "⭐", "🎒"];

const createInitialCards = () => {
  const doubleSymbols = [...CARD_SYMBOLS, ...CARD_SYMBOLS];
  return doubleSymbols
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
};

export default function Games() {
  const [cards, setCards] = useState<Card[]>(() => createInitialCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  // Initialize the game
  const initializeGame = () => {
    setCards(createInitialCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setHasWon(false);
  };

  const handleCardClick = (clickedId: number) => {
    // If already flipped, matched, or 2 cards are currently flipped, do nothing
    if (
      flippedCards.length >= 2 ||
      cards[clickedId].isFlipped ||
      cards[clickedId].isMatched
    ) {
      return;
    }

    // Flip the clicked card
    const updatedCards = cards.map((card) =>
      card.id === clickedId ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, clickedId];
    setFlippedCards(newFlipped);

    // If it's the second card flipped, check for match
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstId, secondId] = newFlipped;

      if (cards[firstId].symbol === cards[secondId].symbol) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setFlippedCards([]);
          setMatches((m) => {
            const nextMatches = m + 1;
            if (nextMatches === CARD_SYMBOLS.length) {
              setHasWon(true);
            }
            return nextMatches;
          });
        }, 600);
      } else {
        // No match, flip back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <section id="playground" style={{
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
        🎮 Mini <span className="title-gradient">Game Zone</span>
      </h2>

      <div className="glass-panel" style={{
        maxWidth: "600px",
        width: "100%",
        padding: "30px",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <h3 style={{ marginBottom: "10px", color: "var(--accent-primary)" }}>Memory Match Challenge</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "14px", textAlign: "center", marginBottom: "25px", maxWidth: "450px" }}>
          Match the pairs of Lakshya&apos;s favorite things! Win under 15 moves to be a Memory Champion!
        </p>

        {/* Dashboard / Stats */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "360px",
          marginBottom: "20px",
          fontFamily: "var(--font-family-title)",
          fontSize: "16px",
        }}>
          <div>
            Moves: <strong style={{ color: "var(--accent-secondary)" }}>{moves}</strong>
          </div>
          <div>
            Matches: <strong style={{ color: "var(--color-toy-green)" }}>{matches} / {CARD_SYMBOLS.length}</strong>
          </div>
        </div>

        {/* Card Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          width: "100%",
          maxWidth: "360px",
          aspectRatio: "1/1",
          marginBottom: "25px",
        }}>
          {cards.map((card) => {
            const showSymbol = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isMatched}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "15px",
                  border: "none",
                  cursor: card.isMatched ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: showSymbol ? "32px" : "0px",
                  background: card.isMatched
                    ? "var(--glass-bg)"
                    : showSymbol
                    ? "var(--bg-secondary)"
                    : "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                  boxShadow: "var(--shadow-sm)",
                  transform: showSymbol ? "rotateY(180deg)" : "rotateY(0)",
                  transition: "transform 0.4s ease, background 0.3s ease",
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: card.isMatched ? "var(--color-toy-green)" : "var(--glass-border)",
                  position: "relative",
                  outline: "none",
                }}
              >
                {/* Back of Card Symbol (question mark) */}
                {!showSymbol && (
                  <HelpCircle
                    size={28}
                    color="white"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
                {/* Front of Card Symbol */}
                {showSymbol && (
                  <span
                    style={{
                      transform: "rotateY(180deg)", // Counter-rotate so it displays correctly
                      display: "block",
                    }}
                  >
                    {card.symbol}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Win Overlay / Message */}
        {hasWon && (
          <div style={{
            background: "rgba(34, 197, 94, 0.15)",
            border: "2px solid var(--color-toy-green)",
            borderRadius: "15px",
            padding: "15px 25px",
            textAlign: "center",
            marginBottom: "20px",
            animation: "bubble-pop 0.5s ease forwards",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}>
            <Trophy size={36} color="var(--color-toy-green)" style={{ animation: "pulse-gentle 1.5s infinite" }} />
            <h4 style={{ color: "var(--color-toy-green)" }}>You Won!</h4>
            <p style={{ fontSize: "14px" }}>
              Completed in <strong>{moves}</strong> moves. Great job!
            </p>
          </div>
        )}

        {/* Reset button */}
        <button
          onClick={initializeGame}
          style={{
            padding: "10px 22px",
            borderRadius: "20px",
            border: "none",
            background: "var(--text-primary)",
            color: "var(--bg-card)",
            fontWeight: 700,
            fontSize: "14px",
            fontFamily: "var(--font-family-title)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <RefreshCw size={14} /> Restart Game
        </button>
      </div>
    </section>
  );
}
