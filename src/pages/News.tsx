import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { news } from "../data/news";
import { clubs } from "../data/clubs";
import type { Position } from "../data/types";

const categories = ["All", "Pro", "College", "Club", "Beach", "Gear"] as const;
const positions: (Position | "All positions")[] = [
  "All positions",
  "Setter",
  "Outside Hitter",
  "Opposite",
  "Middle Blocker",
  "Libero",
  "Defensive Specialist",
];

export function News() {
  const { profile } = useApp();
  const [tab, setTab] = useState<"news" | "tryouts">("news");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [pos, setPos] = useState<(typeof positions)[number]>("All positions");
  const [openArticle, setOpenArticle] = useState<string | null>(null);

  const visibleNews = news.filter((n) => cat === "All" || n.category === cat);
  const openings = clubs
    .flatMap((c) => c.openings.map((o) => ({ club: c, ...o })))
    .filter((o) => pos === "All positions" || o.position === pos);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">News & Tryouts</div>
        <h1>
          What's happening in <span className="grad-text">volleyball world</span>
        </h1>
        <p>
          Headlines from pro to club — plus a live board of roster openings and tryout
          info for players ready to compete.
        </p>
      </div>

      <div className="row mb" style={{ gap: 8 }}>
        <button className={`chip clickable ${tab === "news" ? "on" : ""}`} onClick={() => setTab("news")}>
          📰 Headlines
        </button>
        <button className={`chip clickable ${tab === "tryouts" ? "on" : ""}`} onClick={() => setTab("tryouts")}>
          📋 Roster openings ({openings.length})
        </button>
      </div>

      {tab === "news" && (
        <>
          <div className="row mb" style={{ gap: 8, flexWrap: "wrap" }}>
            {categories.map((c) => (
              <button key={c} className={`chip clickable ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="stack">
            {visibleNews.map((n) => {
              const open = openArticle === n.id;
              return (
                <article className="card hoverable" key={n.id}>
                  <div className="row" style={{ alignItems: "flex-start" }}>
                    <div
                      className="post-art"
                      style={{
                        background: n.gradient,
                        minHeight: 74,
                        width: 74,
                        fontSize: "2rem",
                        borderRadius: 14,
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ position: "relative", zIndex: 1 }}>{n.emoji}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="row mb" style={{ gap: 8 }}>
                        <span className="chip violet">{n.category}</span>
                        <span className="muted small">{n.date}</span>
                        {n.minLevel === "Advanced" && <span className="chip coral">Advanced</span>}
                      </div>
                      <h3 style={{ marginBottom: 8 }}>{n.headline}</h3>
                      <p className="muted small">{n.summary}</p>
                      {open && <p className="mt" style={{ fontSize: "0.95rem" }}>{n.body}</p>}
                      <button
                        className="icon-btn mt"
                        style={{ paddingLeft: 0 }}
                        onClick={() => setOpenArticle(open ? null : n.id)}
                      >
                        {open ? "Show less ▲" : "Read full story ▼"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

      {tab === "tryouts" && (
        <>
          {profile.level !== "Advanced" && (
            <div className="tipbox mb">
              <span style={{ fontSize: "1.2rem" }}>💡</span>
              <span>
                The tryout board is aimed at competitive players — but browsing is open to
                everyone. Beginners: check the <Link to="/clubs" style={{ textDecoration: "underline" }}>Club Matchmaker</Link> for
                development-friendly clubs.
              </span>
            </div>
          )}
          <div className="row mb" style={{ gap: 8, flexWrap: "wrap" }}>
            {positions.map((p) => (
              <button key={p} className={`chip clickable ${pos === p ? "on" : ""}`} onClick={() => setPos(p)}>
                {p}
              </button>
            ))}
          </div>
          <div className="grid2">
            {openings.map((o, i) => (
              <div className="card hoverable" key={`${o.club.id}-${o.position}-${i}`}>
                <div className="spread mb">
                  <div className="row">
                    <div
                      className="post-art"
                      style={{
                        background: o.club.gradient,
                        minHeight: 52,
                        width: 52,
                        fontSize: "1.5rem",
                        borderRadius: 12,
                      }}
                    >
                      <span style={{ position: "relative", zIndex: 1 }}>{o.club.emoji}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.05rem" }}>{o.club.name}</h3>
                      <p className="muted small">{o.club.city}</p>
                    </div>
                  </div>
                  <span className="chip coral">
                    {o.spots} {o.spots === 1 ? "spot" : "spots"} left
                  </span>
                </div>
                <div className="row mb" style={{ gap: 6, flexWrap: "wrap" }}>
                  <span className="chip aqua">{o.position}</span>
                  <span className="chip violet">{o.club.competitiveness}</span>
                  <span className="chip">{o.club.ageGroups.join(" · ")}</span>
                </div>
                <div className="table-wrap">
                  <table className="vv">
                    <tbody>
                      <tr>
                        <td className="muted">Tryout date</td>
                        <td style={{ fontWeight: 700 }}>{o.club.tryoutDate}</td>
                      </tr>
                      <tr>
                        <td className="muted">Location</td>
                        <td style={{ fontWeight: 700 }}>{o.club.tryoutLocation}</td>
                      </tr>
                      <tr>
                        <td className="muted">Tryout fee</td>
                        <td style={{ fontWeight: 700 }}>
                          {o.club.tryoutFee === 0 ? "FREE" : `$${o.club.tryoutFee}`}
                        </td>
                      </tr>
                      <tr>
                        <td className="muted">Season fee</td>
                        <td style={{ fontWeight: 700 }}>${o.club.seasonFee.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
