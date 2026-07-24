import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { QuizEngine } from "../components/QuizEngine";
import { positionQuiz, positionResults } from "../data/quizzes";
import type { Position } from "../data/types";

const OPTION_KEYS = ["a", "b", "c", "d"];

function computePosition(answers: number[]): Position {
  const tally: Partial<Record<Position, number>> = {};
  answers.forEach((choice, qi) => {
    const weights = positionQuiz[qi].weights?.[OPTION_KEYS[choice]];
    if (!weights) return;
    for (const [pos, w] of Object.entries(weights)) {
      tally[pos as Position] = (tally[pos as Position] ?? 0) + (w ?? 0);
    }
  });
  let best: Position = "Outside Hitter";
  let bestScore = -1;
  for (const [pos, score] of Object.entries(tally)) {
    if ((score ?? 0) > bestScore) {
      best = pos as Position;
      bestScore = score ?? 0;
    }
  }
  return best;
}

export function PositionQuizPage() {
  const { positionResult, setPositionResult, showToast } = useApp();
  const [taking, setTaking] = useState(false);
  const [freshResult, setFreshResult] = useState<Position | null>(null);

  const shown = freshResult ?? positionResult;
  const info = shown ? positionResults[shown] : null;

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Position Quiz</div>
        <h1>
          What position were you <span className="grad-text">born to play?</span>
        </h1>
        <p>
          10 questions about your instincts, your vibe, and what makes you light up on
          the court. No wrong answers — just your volleyball DNA.
        </p>
      </div>

      {!taking && !shown && (
        <div className="card center" style={{ padding: 48 }}>
          <div style={{ fontSize: "4rem", marginBottom: 8 }}>🧭</div>
          <h2 style={{ marginBottom: 10 }}>Still deciding your position?</h2>
          <p className="muted" style={{ maxWidth: 480, margin: "0 auto 24px" }}>
            Setter? Outside? Libero? Answer honestly and we'll match your personality and
            play style to the position that fits you best.
          </p>
          <button className="btn" onClick={() => setTaking(true)}>
            Take the quiz →
          </button>
        </div>
      )}

      {taking && (
        <div className="card">
          <QuizEngine
            questions={positionQuiz}
            mode="personality"
            onComplete={({ answers }) => {
              const pos = computePosition(answers);
              setFreshResult(pos);
              setPositionResult(pos);
              setTaking(false);
              showToast(`🏐 Position unlocked: ${pos}!`);
            }}
          />
        </div>
      )}

      {!taking && info && (
        <div className="card result-card confetti-bg fade-up">
          <span className="big-emoji">{info.emoji}</span>
          <h2>
            You're a <span className="grad-text">{info.position}</span>
          </h2>
          <p className="tagline">{info.tagline}</p>
          <p style={{ maxWidth: 540, margin: "0 auto 22px" }}>{info.description}</p>

          <div className="grid2" style={{ textAlign: "left", maxWidth: 640, margin: "0 auto 26px" }}>
            <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>💪 Your toolkit</h3>
              <p className="muted small">{info.pros}</p>
            </div>
            <div className="card" style={{ background: "rgba(255,255,255,0.04)" }}>
              <h3 style={{ fontSize: "0.95rem", marginBottom: 8 }}>⭐ Pros who play it</h3>
              <p className="muted small">{info.famous}</p>
            </div>
          </div>

          <div className="row" style={{ justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn ghost"
              onClick={() => {
                setFreshResult(null);
                setTaking(true);
              }}
            >
              Retake quiz
            </button>
            <Link to="/clubs" className="btn">
              Find clubs needing a {info.position} →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
