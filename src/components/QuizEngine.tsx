import { useState } from "react";
import type { QuizQuestion } from "../data/types";

const KEYS = ["A", "B", "C", "D"];

interface Props {
  questions: QuizQuestion[];
  /** knowledge quizzes show right/wrong feedback; personality quizzes just advance */
  mode: "knowledge" | "personality";
  onComplete: (result: { correct: number; answers: number[] }) => void;
}

export function QuizEngine({ questions, mode, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  const q = questions[idx];
  const revealed = mode === "knowledge" && picked !== null;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const nextAnswers = [...answers, i];
    setAnswers(nextAnswers);
    const nextCorrect = correctCount + (q.correct === i ? 1 : 0);
    setCorrectCount(nextCorrect);

    if (mode === "personality") {
      advance(nextAnswers, nextCorrect);
    }
  }

  function advance(finalAnswers = answers, finalCorrect = correctCount) {
    if (idx + 1 >= questions.length) {
      onComplete({ correct: finalCorrect, answers: finalAnswers });
    } else {
      setIdx(idx + 1);
      setPicked(null);
    }
  }

  return (
    <div className="fade-up" key={q.id}>
      <div className="spread mb">
        <span className="chip coral">
          Question {idx + 1} of {questions.length}
        </span>
        {mode === "knowledge" && (
          <span className="chip aqua">✓ {correctCount} correct</span>
        )}
      </div>
      <div className="quiz-progress">
        <div style={{ width: `${((idx + (picked !== null ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <h2 className="quiz-q">{q.question}</h2>

      {q.options.map((opt, i) => {
        let cls = "quiz-opt";
        if (revealed) {
          if (i === q.correct) cls += " correct";
          else if (i === picked) cls += " wrong";
          else cls += " faded";
        }
        return (
          <button key={i} className={cls} onClick={() => pick(i)} disabled={picked !== null}>
            <span className="key">{KEYS[i]}</span>
            {opt}
          </button>
        );
      })}

      {revealed && (
        <>
          {q.explanation && (
            <div className="quiz-explain">
              {picked === q.correct ? "✅ Nailed it! " : "💡 "}
              {q.explanation}
            </div>
          )}
          <button className="btn" onClick={() => advance()}>
            {idx + 1 >= questions.length ? "See my results →" : "Next question →"}
          </button>
        </>
      )}
    </div>
  );
}
