import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { courses } from "../data/courses";
import type { Level } from "../data/types";
import banner from "../assets/vv-academy.png";

const levelOrder: Level[] = ["Beginner", "Intermediate", "Advanced"];
const levelChip: Record<Level, string> = {
  Beginner: "lime",
  Intermediate: "aqua",
  Advanced: "coral",
};

export function Academy() {
  const { profile, progress } = useApp();

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">VolleyU Academy</div>
        <h1>
          Learn the game like a <span className="grad-text">scholarship athlete</span>
        </h1>
        <p>
          University-style courses with lessons, court diagrams, and checkpoint quizzes.
          Start at your level and climb — {profile.level} courses are highlighted for you.
        </p>
      </div>

      <img className="banner" src={banner} alt="Coach teaching volleyball tactics on a whiteboard" />

      {levelOrder.map((level) => (
        <div key={level}>
          <div className="section-title">
            <h2>
              {level === "Beginner" ? "🌱" : level === "Intermediate" ? "🚀" : "🏆"} {level} track
              {profile.level === level && (
                <span className="chip gold" style={{ marginLeft: 10 }}>your level</span>
              )}
            </h2>
          </div>
          <div className="grid2">
            {courses
              .filter((c) => c.level === level)
              .map((c) => {
                const prog = progress[c.id];
                const done = prog?.lessonsDone.length ?? 0;
                const total = c.lessons.length;
                const pct = Math.round(((done + (prog?.checkpointPassed ? 1 : 0)) / (total + 1)) * 100);
                return (
                  <Link to={`/academy/${c.id}`} key={c.id} className="card hoverable">
                    <div className="spread mb">
                      <div
                        className="post-art"
                        style={{
                          background: c.gradient,
                          minHeight: 64,
                          width: 64,
                          fontSize: "1.9rem",
                          borderRadius: 14,
                        }}
                      >
                        <span style={{ position: "relative", zIndex: 1 }}>{c.emoji}</span>
                      </div>
                      <span className={`chip ${levelChip[c.level]}`}>{c.level}</span>
                    </div>
                    <h3 style={{ marginBottom: 6 }}>{c.title}</h3>
                    <p className="muted small" style={{ marginBottom: 14 }}>{c.description}</p>
                    <div className="spread small muted" style={{ marginBottom: 8 }}>
                      <span>
                        {total} lessons + checkpoint quiz
                      </span>
                      <span>{prog?.checkpointPassed ? "✅ Completed" : `${pct}%`}</span>
                    </div>
                    <div className="bar">
                      <div style={{ width: `${pct}%` }} />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      ))}
    </>
  );
}
