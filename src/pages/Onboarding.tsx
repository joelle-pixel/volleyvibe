import { useState } from "react";
import { useApp } from "../context/AppState";
import { QuizEngine } from "../components/QuizEngine";
import { levelingQuiz, scoreLevel, levelBlurbs } from "../data/quizzes";
import type { Level } from "../data/types";
import hero from "../assets/vv-hero.png";

type Stage = "welcome" | "quiz" | "result";

export function Onboarding() {
  const { completeOnboarding } = useApp();
  const [stage, setStage] = useState<Stage>("welcome");
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ correct: number; level: Level } | null>(null);

  return (
    <div className="onboard">
      <div className="card glass onboard-card fade-up">
        {stage === "welcome" && (
          <>
            <img
              src={hero}
              alt="Volleyball player spiking at sunset"
              style={{ width: "100%", borderRadius: 16, marginBottom: 22 }}
            />
            <span className="chip coral mb">🏐 WELCOME TO VOLLEYVIBE</span>
            <h1 style={{ fontSize: "clamp(1.7rem, 5vw, 2.4rem)", margin: "12px 0" }}>
              Where <span className="grad-text">volleyball</span> lives.
            </h1>
            <p className="muted" style={{ marginBottom: 22 }}>
              Learn the game, connect with players, find your club, and discover your
              position. First, a quick 10-question fundamentals quiz so we can level
              you — Beginner, Intermediate, or Advanced — and personalize everything.
            </p>
            <div className="field">
              <label>What should we call you?</label>
              <input
                value={name}
                placeholder="Your name"
                maxLength={30}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && setStage("quiz")}
              />
            </div>
            <button className="btn" disabled={!name.trim()} onClick={() => setStage("quiz")}>
              Take the leveling quiz →
            </button>
          </>
        )}

        {stage === "quiz" && (
          <QuizEngine
            questions={levelingQuiz}
            mode="knowledge"
            onComplete={({ correct }) => {
              setResult({ correct, level: scoreLevel(correct, levelingQuiz.length) });
              setStage("result");
            }}
          />
        )}

        {stage === "result" && result && (
          <div className="result-card confetti-bg fade-up">
            <span className="big-emoji">
              {result.level === "Advanced" ? "🏆" : result.level === "Intermediate" ? "🚀" : "🌱"}
            </span>
            <h2>
              You're <span className="grad-text">{result.level}</span>
            </h2>
            <p className="tagline">
              {result.correct}/{levelingQuiz.length} fundamentals correct
            </p>
            <p className="muted" style={{ maxWidth: 460, margin: "0 auto 26px" }}>
              {levelBlurbs[result.level]}
            </p>
            <button className="btn" onClick={() => completeOnboarding(name.trim(), result.level)}>
              Enter VolleyVibe 🏐
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
