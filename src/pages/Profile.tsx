import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { players } from "../data/players";
import { courses } from "../data/courses";
import { PostCard } from "../components/PostCard";
import { Avatar } from "../components/Avatar";
import type { Position } from "../data/types";

const avatarEmojis = ["🏐", "🔥", "⚡", "🌊", "🛡️", "🎯", "🌟", "😤", "🦅", "👑"];
const positions: Position[] = [
  "Undecided",
  "Setter",
  "Outside Hitter",
  "Opposite",
  "Middle Blocker",
  "Libero",
  "Defensive Specialist",
];

export function Profile() {
  const { profile, updateProfile, posts, follows, progress, resetLevel, showToast } = useApp();
  const [editing, setEditing] = useState(false);

  const myPosts = posts.filter((p) => p.authorId === "me");
  const followedPlayers = players.filter((p) => follows.includes(p.id));
  const coursesDone = Object.values(progress).filter((p) => p.checkpointPassed).length;
  const lessonsDone = Object.values(progress).reduce((n, p) => n + p.lessonsDone.length, 0);

  return (
    <>
      <div className="card mb" style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 90,
            background: "var(--grad-hero)",
            opacity: 0.8,
          }}
        />
        <div style={{ position: "relative", paddingTop: 30 }}>
          <Avatar emoji={profile.emoji} gradient="linear-gradient(135deg, #2dd4bf, #38bdf8)" size={84} />
          <div className="spread mt">
            <div>
              <h1 style={{ fontSize: "1.6rem" }}>{profile.name || "You"}</h1>
              <p className="muted">@{profile.handle}</p>
            </div>
            <button className="btn ghost" onClick={() => setEditing((e) => !e)}>
              {editing ? "Done" : "Edit profile ✏️"}
            </button>
          </div>
          <p className="mt">{profile.bio}</p>
          <div className="row mt" style={{ gap: 8, flexWrap: "wrap" }}>
            <span className="chip aqua">{profile.position}</span>
            <span className="chip gold">{profile.level}</span>
            <span className="chip">{profile.region}</span>
          </div>
        </div>
      </div>

      {editing && (
        <div className="card mb fade-up">
          <h3 className="mb">Edit your profile</h3>
          <div className="grid2">
            <div className="field">
              <label>Name</label>
              <input value={profile.name} maxLength={30} onChange={(e) => updateProfile({ name: e.target.value })} />
            </div>
            <div className="field">
              <label>Region</label>
              <select value={profile.region} onChange={(e) => updateProfile({ region: e.target.value })}>
                {["West Coast", "Midwest", "South", "Northeast"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field">
            <label>Bio</label>
            <textarea
              rows={2}
              maxLength={140}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
            />
          </div>
          <div className="grid2">
            <div className="field">
              <label>Position</label>
              <select
                value={profile.position}
                onChange={(e) => updateProfile({ position: e.target.value as Position })}
              >
                {positions.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Avatar</label>
              <div className="emoji-pick">
                {avatarEmojis.map((e) => (
                  <button
                    key={e}
                    className={profile.emoji === e ? "on" : ""}
                    onClick={() => updateProfile({ emoji: e })}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid3 mb">
        <div className="card center">
          <div className="stat-big grad-text">{myPosts.length}</div>
          <p className="muted small">posts shared</p>
        </div>
        <div className="card center">
          <div className="stat-big grad-text">{follows.length}</div>
          <p className="muted small">players followed</p>
        </div>
        <div className="card center">
          <div className="stat-big grad-text">{coursesDone}/{courses.length}</div>
          <p className="muted small">courses completed · {lessonsDone} lessons done</p>
        </div>
      </div>

      <div className="card mb">
        <div className="spread">
          <div>
            <h3>🎚️ Your level: {profile.level}</h3>
            <p className="muted small">
              Think you've leveled up? Retake the fundamentals quiz anytime.
            </p>
          </div>
          <button
            className="btn ghost"
            onClick={() => {
              showToast("🔄 Leveling quiz reset — show us what you've learned!");
              resetLevel();
            }}
          >
            Retake leveling quiz
          </button>
        </div>
      </div>

      {followedPlayers.length > 0 && (
        <>
          <div className="section-title">
            <h2>👥 Following</h2>
            <Link to="/community">Find more players →</Link>
          </div>
          <div className="row mb" style={{ gap: 12, flexWrap: "wrap" }}>
            {followedPlayers.map((p) => (
              <Link to={`/players/${p.id}`} key={p.id} className="chip clickable" style={{ padding: "8px 14px" }}>
                <Avatar emoji={p.emoji} gradient={p.gradient} size={24} /> {p.name}
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="section-title">
        <h2>📸 Your posts</h2>
      </div>
      {myPosts.length === 0 ? (
        <div className="card center">
          <p className="muted mb">You haven't posted yet — the community wants to hear from you!</p>
          <Link to="/community" className="btn">Write your first post 🏐</Link>
        </div>
      ) : (
        <div className="grid2">
          {myPosts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </>
  );
}
