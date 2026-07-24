import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppState";
import { courses } from "../data/courses";
import { CourtDiagram } from "../components/CourtDiagram";
import { QuizEngine } from "../components/QuizEngine";
import type { LessonBlock } from "../data/types";

function Block({ block }: { block: LessonBlock }) {
  switch (block.kind) {
    case "heading":
      return <h3>{block.text}</h3>;
    case "text":
      return <p>{block.text}</p>;
    case "tip":
      return (
        <div className="tipbox">
          <span style={{ fontSize: "1.2rem" }}>💡</span>
          <span>{block.text}</span>
        </div>
      );
    case "terms":
      return (
        <div className="terms">
          {block.terms.map((t) => (
            <div className="term" key={t.term}>
              <b>{t.term}</b> — <span>{t.def}</span>
            </div>
          ))}
        </div>
      );
    case "court":
      return (
        <figure className="court-fig">
          <CourtDiagram variant={block.variant} />
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
  }
}

export function CourseDetail() {
  const { courseId } = useParams();
  const { progress, markLesson, passCheckpoint, showToast } = useApp();
  const course = courses.find((c) => c.id === courseId);
  const [open, setOpen] = useState<string | null>(course?.lessons[0]?.id ?? null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizResult, setQuizResult] = useState<{ correct: number } | null>(null);

  if (!course) {
    return (
      <div className="card center">
        <h2>Course not found</h2>
        <Link className="btn mt" to="/academy">Back to Academy</Link>
      </div>
    );
  }

  const prog = progress[course.id];
  const doneLessons = prog?.lessonsDone ?? [];
  const passThreshold = Math.ceil(course.checkpoint.length * 0.7);

  return (
    <>
      <Link to="/academy" className="chip clickable mb" style={{ marginBottom: 18 }}>
        ← Back to VolleyU
      </Link>

      <div className="card mb" style={{ background: course.gradient, border: "none", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "2.6rem" }}>{course.emoji}</div>
          <h1 style={{ color: "#fff", margin: "6px 0" }}>{course.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.9)", maxWidth: 560 }}>{course.description}</p>
          <div className="row mt" style={{ gap: 8 }}>
            <span className="chip" style={{ background: "rgba(0,0,0,0.3)", color: "#fff", border: "none" }}>
              {course.level}
            </span>
            <span className="chip" style={{ background: "rgba(0,0,0,0.3)", color: "#fff", border: "none" }}>
              {course.lessons.length} lessons
            </span>
            <span className="chip" style={{ background: "rgba(0,0,0,0.3)", color: "#fff", border: "none" }}>
              {prog?.checkpointPassed ? "✅ Checkpoint passed" : "🎯 Checkpoint quiz"}
            </span>
          </div>
        </div>
      </div>

      <div className="stack">
        {course.lessons.map((lesson, i) => {
          const isOpen = open === lesson.id;
          const isDone = doneLessons.includes(lesson.id);
          return (
            <div className="card" key={lesson.id}>
              <button
                className="spread"
                style={{ width: "100%", background: "none", border: "none", color: "inherit", textAlign: "left" }}
                onClick={() => setOpen(isOpen ? null : lesson.id)}
              >
                <div className="row">
                  <span className="chip aqua">{isDone ? "✅" : i + 1}</span>
                  <h3 style={{ fontSize: "1.1rem" }}>{lesson.title}</h3>
                </div>
                <span className="muted small">{lesson.minutes} min {isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <div className="lesson-body fade-up mt">
                  {lesson.content.map((b, j) => (
                    <Block block={b} key={j} />
                  ))}
                  {!isDone && (
                    <button
                      className="btn aqua mt"
                      onClick={() => {
                        markLesson(course.id, lesson.id);
                        showToast(`✅ Lesson complete: ${lesson.title}`);
                        const next = course.lessons[i + 1];
                        setOpen(next ? next.id : null);
                      }}
                    >
                      Mark complete {course.lessons[i + 1] ? "→ next lesson" : "→ checkpoint"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div className="card" style={{ borderColor: "rgba(251,191,36,0.4)" }}>
          <div className="spread">
            <div className="row">
              <span style={{ fontSize: "1.7rem" }}>🎯</span>
              <div>
                <h3>Checkpoint quiz</h3>
                <p className="muted small">
                  {course.checkpoint.length} questions · pass with {passThreshold}+ correct
                  {prog?.checkpointPassed && " · already passed ✅"}
                </p>
              </div>
            </div>
            {!quizOpen && (
              <button className="btn" onClick={() => { setQuizOpen(true); setQuizResult(null); }}>
                {prog?.checkpointPassed ? "Retake" : "Start"}
              </button>
            )}
          </div>

          {quizOpen && !quizResult && (
            <div className="mt">
              <QuizEngine
                questions={course.checkpoint}
                mode="knowledge"
                onComplete={({ correct }) => {
                  setQuizResult({ correct });
                  if (correct >= passThreshold) {
                    passCheckpoint(course.id);
                    showToast(`🏅 Checkpoint passed — ${course.title} complete!`);
                  }
                }}
              />
            </div>
          )}

          {quizResult && (
            <div className="result-card fade-up">
              <span className="big-emoji">{quizResult.correct >= passThreshold ? "🏅" : "📚"}</span>
              <h2>{quizResult.correct}/{course.checkpoint.length}</h2>
              <p className="muted" style={{ marginBottom: 18 }}>
                {quizResult.correct >= passThreshold
                  ? "Checkpoint passed! This course is officially conquered."
                  : "Not quite — review the lessons above and try again. You've got this."}
              </p>
              <div className="row" style={{ justifyContent: "center", gap: 10 }}>
                <button className="btn ghost" onClick={() => setQuizResult(null)}>Retake quiz</button>
                <Link to="/academy" className="btn">Back to Academy</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
