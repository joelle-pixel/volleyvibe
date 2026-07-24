import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { players } from "../data/players";
import { PostCard } from "../components/PostCard";
import { Avatar } from "../components/Avatar";
import banner from "../assets/vv-community.png";

const postEmojis = ["🏐", "🔥", "🏆", "💪", "🎯", "😤", "🥳", "⚡"];
const tags = ["General", "Tournament", "Training", "Progress", "Tips", "Beach"];

export function Community() {
  const { posts, addPost, follows, toggleFollow, showToast } = useApp();
  const [tab, setTab] = useState<"feed" | "players">("feed");
  const [draft, setDraft] = useState("");
  const [tag, setTag] = useState("General");
  const [emoji, setEmoji] = useState("🏐");

  function publish() {
    const text = draft.trim();
    if (!text) return;
    addPost(text, tag, emoji);
    setDraft("");
    showToast("📣 Posted to the community feed!");
  }

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">Community</div>
        <h1>
          The <span className="grad-text">Instagram of volleyball</span>
        </h1>
        <p>
          Share your wins, learn from other players, and build your volleyball circle.
        </p>
      </div>

      <img className="banner" src={banner} alt="Volleyball team taking a selfie together" />

      <div className="row mb" style={{ gap: 8 }}>
        <button className={`chip clickable ${tab === "feed" ? "on" : ""}`} onClick={() => setTab("feed")}>
          📸 Feed
        </button>
        <button className={`chip clickable ${tab === "players" ? "on" : ""}`} onClick={() => setTab("players")}>
          👥 Find players ({players.length})
        </button>
      </div>

      {tab === "feed" && (
        <>
          <div className="card mb">
            <h3 style={{ marginBottom: 12 }}>Share something 🏐</h3>
            <div className="field">
              <textarea
                rows={3}
                value={draft}
                maxLength={400}
                placeholder="Tournament win? New skill? Practice grind? Tell the community…"
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
            <div className="spread">
              <div className="row" style={{ flexWrap: "wrap", gap: 10 }}>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 10,
                    color: "var(--text)",
                    padding: "8px 12px",
                  }}
                >
                  {tags.map((t) => (
                    <option key={t} value={t} style={{ background: "#101636" }}>{t}</option>
                  ))}
                </select>
                <div className="emoji-pick">
                  {postEmojis.map((e) => (
                    <button key={e} className={emoji === e ? "on" : ""} onClick={() => setEmoji(e)}>
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <button className="btn" onClick={publish} disabled={!draft.trim()}>
                Post it 🚀
              </button>
            </div>
          </div>

          <div className="grid2">
            {posts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </>
      )}

      {tab === "players" && (
        <div className="grid3">
          {players.map((p) => {
            const following = follows.includes(p.id);
            return (
              <div className="card hoverable" key={p.id}>
                <div className="row mb">
                  <Link to={`/players/${p.id}`}>
                    <Avatar emoji={p.emoji} gradient={p.gradient} size={54} photo={p.photo} alt={p.name} />
                  </Link>
                  <div>
                    <Link to={`/players/${p.id}`} style={{ fontWeight: 700 }}>
                      {p.name} {p.verified && "✔️"}
                    </Link>
                    <div className="muted small">@{p.handle}</div>
                  </div>
                </div>
                <div className="row mb" style={{ gap: 6, flexWrap: "wrap" }}>
                  <span className="chip aqua">{p.position}</span>
                  <span className="chip violet">{p.level}</span>
                  <span className="chip">{p.region}</span>
                </div>
                <p className="muted small mb">{p.bio}</p>
                <div className="spread">
                  <span className="small muted">
                    {(p.followers + (following ? 1 : 0)).toLocaleString()} followers
                  </span>
                  <button
                    className={`btn sm ${following ? "ghost" : ""}`}
                    onClick={() => toggleFollow(p.id)}
                  >
                    {following ? "Following ✓" : "Follow"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
