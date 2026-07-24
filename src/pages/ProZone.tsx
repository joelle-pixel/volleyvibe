import { useState } from "react";
import { drills, glossary } from "../data/drills";
import { CourtDiagram } from "../components/CourtDiagram";
import type { CourtVariant, Level } from "../data/types";

const skillFilters = ["All", "Passing", "Setting", "Serving", "Attacking", "Blocking", "Defense", "Team Systems"];
const levelChip: Record<Level, string> = { Beginner: "lime", Intermediate: "aqua", Advanced: "coral" };

export function ProZone() {
  const [rotation, setRotation] = useState(1);
  const [skill, setSkill] = useState("All");
  const [search, setSearch] = useState("");

  const visibleDrills = drills.filter((d) => skill === "All" || d.skill === skill);
  const visibleTerms = glossary.filter(
    (g) =>
      g.term.toLowerCase().includes(search.toLowerCase()) ||
      g.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Pro Zone</div>
        <h1>
          Tools for players who are <span className="grad-text">locked in</span>
        </h1>
        <p>
          Rotation visualizer, a drills library used by real club coaches, and the
          complete volleyball dictionary.
        </p>
      </div>

      <div className="section-title">
        <h2>🔄 Rotation visualizer (5-1 system)</h2>
      </div>
      <div className="card mb">
        <p className="muted small mb">
          Step through all six rotations. Watch the setter (orange) travel from zone 1
          around the court — front-row when in zones 2-4, penetrating from the back row
          when in zones 1, 6, 5.
        </p>
        <div className="row mb" style={{ gap: 8, flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5, 6].map((r) => (
            <button
              key={r}
              className={`chip clickable ${rotation === r ? "on" : ""}`}
              onClick={() => setRotation(r)}
            >
              Rotation {r}
            </button>
          ))}
        </div>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <figure className="court-fig">
            <CourtDiagram variant={`rotation-${rotation}` as CourtVariant} />
            <figcaption>
              {rotation === 1 && "Setter in zone 1 — serving rotation. Penetrates from back-right."}
              {rotation === 2 && "Setter in zone 6 — penetrates from middle-back to the net."}
              {rotation === 3 && "Setter in zone 5 — longest sprint to target. Stack your hitters!"}
              {rotation === 4 && "Setter in zone 4 — front row now. Only two front-row attackers."}
              {rotation === 5 && "Setter in zone 3 — front row, middle. Quick sets get spicy."}
              {rotation === 6 && "Setter in zone 2 — front row, home sweet home at the net."}
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="section-title">
        <h2>🏋️ Drills library</h2>
      </div>
      <div className="row mb" style={{ gap: 8, flexWrap: "wrap" }}>
        {skillFilters.map((s) => (
          <button key={s} className={`chip clickable ${skill === s ? "on" : ""}`} onClick={() => setSkill(s)}>
            {s}
          </button>
        ))}
      </div>
      <div className="grid3 mb">
        {visibleDrills.map((d) => (
          <div className="card hoverable" key={d.id}>
            <div style={{ fontSize: "1.9rem", marginBottom: 8 }}>{d.emoji}</div>
            <h3 style={{ fontSize: "1.02rem", marginBottom: 8 }}>{d.name}</h3>
            <div className="row mb" style={{ gap: 6, flexWrap: "wrap" }}>
              <span className="chip violet">{d.skill}</span>
              <span className={`chip ${levelChip[d.level]}`}>{d.level}</span>
              <span className="chip">👥 {d.players}</span>
            </div>
            <p className="muted small">{d.description}</p>
          </div>
        ))}
      </div>

      <div className="section-title">
        <h2>📚 Volleyball dictionary ({glossary.length} terms)</h2>
      </div>
      <div className="field">
        <input
          value={search}
          placeholder="Search terms… try 'seam', 'pipe', or 'pancake'"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid2">
        {visibleTerms.map((g) => (
          <div className="term" key={g.term}>
            <b>{g.term}</b> — <span>{g.def}</span>
          </div>
        ))}
        {visibleTerms.length === 0 && (
          <p className="muted">No terms match "{search}" — but hey, maybe you just invented a new move.</p>
        )}
      </div>
    </>
  );
}
