import { useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../data/types";
import { playerById } from "../data/players";
import { useApp } from "../context/AppState";
import { Avatar } from "./Avatar";

export function PostCard({ post }: { post: Post }) {
  const { profile, liked, toggleLike, addComment } = useApp();
  const [draft, setDraft] = useState("");
  const [showAll, setShowAll] = useState(false);

  const isMine = post.authorId === "me";
  const author = isMine ? null : playerById(post.authorId);
  const name = isMine ? profile.name || "You" : author?.name ?? "Player";
  const handle = isMine ? profile.handle : author?.handle ?? "";
  const emoji = isMine ? profile.emoji : author?.emoji ?? "🏐";
  const gradient = isMine
    ? "linear-gradient(135deg, #2dd4bf 0%, #38bdf8 100%)"
    : author?.gradient ?? "";

  const isLiked = liked.includes(post.id);
  const likeCount = post.likes + (isLiked ? 1 : 0);
  const comments = showAll ? post.comments : post.comments.slice(0, 2);

  function commentAuthorName(id: string) {
    if (id === "me") return profile.name || "You";
    return playerById(id)?.handle ?? "player";
  }

  function submit() {
    const text = draft.trim();
    if (!text) return;
    addComment(post.id, text);
    setDraft("");
    setShowAll(true);
  }

  return (
    <article className="card post">
      <header className="post-head">
        {isMine ? (
          <Avatar emoji={emoji} gradient={gradient} />
        ) : (
          <Link to={`/players/${post.authorId}`}>
            <Avatar emoji={emoji} gradient={gradient} photo={author?.photo} alt={name} />
          </Link>
        )}
        <div className="who">
          <div className="name">
            {isMine ? name : <Link to={`/players/${post.authorId}`}>{name}</Link>}
            {author?.verified && <span title="Verified player">✔️</span>}
          </div>
          <div className="meta">
            @{handle} · {post.timestamp}
          </div>
        </div>
      </header>

      <div className="post-art" style={{ background: post.gradient }}>
        <span className="tag">{post.tag}</span>
        <span style={{ position: "relative", zIndex: 1 }}>{post.emoji}</span>
      </div>

      <p style={{ fontSize: "0.97rem" }}>{post.text}</p>

      <div className="post-actions">
        <button
          className={`icon-btn ${isLiked ? "liked" : ""}`}
          onClick={() => toggleLike(post.id)}
        >
          {isLiked ? "❤️" : "🤍"} {likeCount.toLocaleString()}
        </button>
        <span className="icon-btn" style={{ cursor: "default" }}>
          💬 {post.comments.length}
        </span>
      </div>

      {post.comments.length > 0 && (
        <div className="comments">
          {comments.map((c) => (
            <div className="comment" key={c.id}>
              <b>@{commentAuthorName(c.authorId)}</b>
              <span>{c.text}</span>
            </div>
          ))}
          {post.comments.length > 2 && !showAll && (
            <button className="icon-btn" style={{ alignSelf: "flex-start" }} onClick={() => setShowAll(true)}>
              View all {post.comments.length} comments
            </button>
          )}
        </div>
      )}

      <div className="comment-box">
        <input
          value={draft}
          placeholder="Add a comment…"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button className="btn sm ghost" onClick={submit} disabled={!draft.trim()}>
          Post
        </button>
      </div>
    </article>
  );
}
