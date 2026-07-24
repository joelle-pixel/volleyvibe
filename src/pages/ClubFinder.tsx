import { useState } from "react";
import { clubs } from "../data/clubs";
import type { Club, Position } from "../data/types";

interface Prefs {
  region: string;
  size: string;
  competitiveness: string;
  budget: number;
  travel: string;
  position: Position | "Any";
}

const defaultPrefs: Prefs = {
  region: "West Coast",
  size: "Any",
  competitiveness: "Any",
  budget: 2500,
  travel: "Either",
  position: "Any",
};

interface Match {
  club: Club;
  score: number;
  reasons: string[];
}

function matchClubs(prefs: Prefs): Match[] {
  return clubs
    .map((club) => {
      let score = 0;
      const reasons: string[] = [];

      if (club.region === prefs.region) {
        score += 30;
        reasons.push(`📍 In your region (${club.region})`);
      }

      if (prefs.size === "Any" || club.size === prefs.size) {
        score += 15;
        if (prefs.size !== "Any") reasons.push(`👥 ${club.size} club, just like you wanted`);
      }

      if (prefs.competitiveness === "Any" || club.competitiveness === prefs.competitiveness) {
        score += 20;
        if (prefs.competitiveness !== "Any") reasons.push(`🏆 ${club.competitiveness} level match`);
      }

      if (club.seasonFee <= prefs.budget) {
        score += 20;
        reasons.push(`💸 Season fee $${club.seasonFee.toLocaleString()} fits your budget`);
      } else if (club.seasonFee <= prefs.budget * 1.25) {
        score += 8;
        reasons.push(`💸 Slightly over budget ($${club.seasonFee.toLocaleString()})`);
      }

      if (
        prefs.travel === "Either" ||
        (prefs.travel === "Travel team" && club.travel) ||
        (prefs.travel === "Local only" && !club.travel)
      ) {
        score += 10;
        if (prefs.travel !== "Either")
          reasons.push(club.travel ? "✈️ Travel schedule" : "🏠 Stays local");
      }

      if (prefs.position !== "Any") {
        const opening = club.openings.find((o) => o.position === prefs.position);
        if (opening) {
          score += 25;
          reasons.push(
            `🔥 ${opening.spots} open ${prefs.position} ${opening.spots === 1 ? "spot" : "spots"} right now`
          );
        }
      }

      return { club, score, reasons };
    })
    .sort((a, b) => b.score - a.score);
}

const MAX_SCORE = 120;

export function ClubFinder() {
  const [prefs, setPrefs] = useState<Prefs>(defaultPrefs);
  const [results, setResults] = useState<Match[] | null>(null);

  const set = <K extends keyof Prefs>(key: K, value: Prefs[K]) =>
    setPrefs((p) => ({ ...p, [key]: value }));

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Club Matchmaker</div>
        <h1>
          Find the club <span className="grad-text">built for you</span>
        </h1>
        <p>
          Tell us what matters — location, size, budget, vibe — and we'll rank every club
          with a match score and the reasons why.
        </p>
      </div>

      <div className="card mb">
        <div className="grid3">
          <div className="field">
            <label>📍 Your region</label>
            <select value={prefs.region} onChange={(e) => set("region", e.target.value)}>
              {["West Coast", "Midwest", "South", "Northeast"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>👥 Club size</label>
            <select value={prefs.size} onChange={(e) => set("size", e.target.value)}>
              {["Any", "Small", "Medium", "Large"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>🏆 Competitiveness</label>
            <select value={prefs.competitiveness} onChange={(e) => set("competitiveness", e.target.value)}>
              {["Any", "Recreational", "Competitive", "Elite"].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>💸 Season budget: ${prefs.budget.toLocaleString()}</label>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={prefs.budget}
              onChange={(e) => set("budget", Number(e.target.value))}
            />
          </div>
          <div className="field">
            <label>✈️ Travel preference</label>
            <select value={prefs.travel} onChange={(e) => set("travel", e.target.value)}>
              {["Either", "Travel team", "Local only"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>🏐 Your position</label>
            <select
              value={prefs.position}
              onChange={(e) => set("position", e.target.value as Prefs["position"])}
            >
              {["Any", "Setter", "Outside Hitter", "Opposite", "Middle Blocker", "Libero", "Defensive Specialist"].map(
                (p) => (
                  <option key={p}>{p}</option>
                )
              )}
            </select>
          </div>
        </div>
        <button className="btn" onClick={() => setResults(matchClubs(prefs))}>
          Find my clubs 🔎
        </button>
      </div>

      {results && (
        <div className="stack fade-up">
          {results.map(({ club, score, reasons }, i) => {
            const pct = Math.min(99, Math.round((score / MAX_SCORE) * 100));
            return (
              <div className="card hoverable" key={club.id}>
                <div className="row" style={{ alignItems: "flex-start", gap: 18 }}>
                  <div className="match-ring" style={{ ["--pct" as string]: pct }}>
                    <div>{pct}%</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="spread">
                      <h3>
                        {i === 0 && "👑 "}
                        {club.emoji} {club.name}
                      </h3>
                      <span className="chip">{club.city}</span>
                    </div>
                    <div className="row mt" style={{ gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                      <span className="chip violet">{club.competitiveness}</span>
                      <span className="chip aqua">{club.size} club</span>
                      <span className="chip">{club.travel ? "✈️ Travels" : "🏠 Local"}</span>
                      <span className="chip gold">${club.seasonFee.toLocaleString()}/season</span>
                    </div>
                    <p className="muted small mb">{club.blurb}</p>
                    {reasons.length > 0 ? (
                      <ul style={{ listStyle: "none", display: "grid", gap: 5 }}>
                        {reasons.map((r) => (
                          <li key={r} className="small">{r}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted small">Not much overlap with your preferences.</p>
                    )}
                    <div className="row mt" style={{ gap: 8, flexWrap: "wrap" }}>
                      <span className="chip coral">
                        Tryouts {club.tryoutDate} · {club.tryoutFee === 0 ? "free" : `$${club.tryoutFee}`}
                      </span>
                      <span className="chip">{club.ageGroups.join(" · ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
