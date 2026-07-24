import { useState } from "react";
import { useApp } from "../context/AppState";
import { nutritionGuides, hydrationTips } from "../data/nutrition";
import banner from "../assets/vv-fuel.png";

const CUP_OZ = 8;

export function Fuel() {
  const { hydration, logWater, setHydration, showToast } = useApp();
  const [openGuide, setOpenGuide] = useState<string | null>(null);

  const cups = Math.ceil(hydration.goalOz / CUP_OZ);
  const fullCups = Math.min(cups, Math.floor(hydration.drankOz / CUP_OZ));
  const pct = Math.min(100, Math.round((hydration.drankOz / hydration.goalOz) * 100));
  const tip = hydrationTips[new Date().getDate() % hydrationTips.length];

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Fuel Station</div>
        <h1>
          Eat, drink & <span className="grad-text">jump higher</span>
        </h1>
        <p>
          Nutrition built for volleyball players — plus a hydration tracker with
          reminders so you never hit a wall in set three.
        </p>
      </div>

      <img className="banner" src={banner} alt="Athlete nutrition: water, fruit, protein bowl and a volleyball" />

      <div className="grid2 mb">
        <div className="card">
          <div className="spread mb">
            <h3>💧 Hydration tracker</h3>
            <span className="chip aqua">{pct}% of goal</span>
          </div>
          <div className="stat-big" style={{ marginBottom: 4 }}>
            {hydration.drankOz} <span className="muted" style={{ fontSize: "1rem" }}>/ {hydration.goalOz} oz today</span>
          </div>
          <div className="water-cups">
            {Array.from({ length: cups }).map((_, i) => (
              <div key={i} className={`water-cup ${i < fullCups ? "full" : ""}`} />
            ))}
          </div>
          <div className="row" style={{ gap: 8, flexWrap: "wrap" }}>
            <button className="btn aqua sm" onClick={() => { logWater(CUP_OZ); }}>
              +1 cup (8 oz)
            </button>
            <button className="btn ghost sm" onClick={() => logWater(16)}>+ bottle (16 oz)</button>
            <button className="btn ghost sm" onClick={() => logWater(-CUP_OZ)}>undo</button>
          </div>
          {pct >= 100 && (
            <div className="tipbox mt">
              <span>🎉</span>
              <span>Daily goal reached! Elite hydration = elite hops.</span>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="mb">⏰ Reminder settings</h3>
          <div className="field">
            <label>Daily goal: {hydration.goalOz} oz</label>
            <input
              type="range"
              min={40}
              max={140}
              step={2}
              value={hydration.goalOz}
              onChange={(e) => setHydration({ goalOz: Number(e.target.value) })}
            />
          </div>
          <div className="field">
            <label>Remind me every</label>
            <select
              value={hydration.remindEveryMin}
              onChange={(e) => setHydration({ remindEveryMin: Number(e.target.value) })}
            >
              {[15, 30, 45, 60, 90].map((m) => (
                <option key={m} value={m}>{m} minutes</option>
              ))}
            </select>
          </div>
          <div className="spread">
            <span className="small muted">In-app reminders while VolleyVibe is open</span>
            <button
              className={`btn sm ${hydration.remindersOn ? "aqua" : "ghost"}`}
              onClick={() => {
                setHydration({ remindersOn: !hydration.remindersOn });
                showToast(
                  hydration.remindersOn
                    ? "🔕 Hydration reminders off"
                    : "🔔 Hydration reminders on — we'll nudge you!"
                );
              }}
            >
              {hydration.remindersOn ? "Reminders ON" : "Reminders OFF"}
            </button>
          </div>
          <div className="tipbox mt">
            <span>💡</span>
            <span>{tip}</span>
          </div>
        </div>
      </div>

      <div className="section-title">
        <h2>🥗 Nutrition playbook</h2>
      </div>
      <div className="grid2">
        {nutritionGuides.map((g) => {
          const open = openGuide === g.id;
          return (
            <div className="card hoverable" key={g.id}>
              <div className="row mb">
                <div
                  className="post-art"
                  style={{ background: g.gradient, minHeight: 56, width: 56, fontSize: "1.7rem", borderRadius: 13 }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>{g.emoji}</span>
                </div>
                <div>
                  <span className="chip lime">{g.category}</span>
                  <h3 style={{ fontSize: "1.05rem", marginTop: 6 }}>{g.title}</h3>
                </div>
              </div>
              <p className="muted small mb">{g.summary}</p>
              {open && (
                <ul className="fade-up" style={{ listStyle: "none", display: "grid", gap: 9, marginBottom: 14 }}>
                  {g.points.map((p, i) => (
                    <li key={i} className="small" style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--aqua)" }}>▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button className="icon-btn" style={{ paddingLeft: 0 }} onClick={() => setOpenGuide(open ? null : g.id)}>
                {open ? "Show less ▲" : "Read the guide ▼"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
