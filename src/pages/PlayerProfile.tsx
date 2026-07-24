import { Link, useParams } from "react-router-dom";
import { useApp } from "../context/AppState";
import { playerById } from "../data/players";
import { PostCard } from "../components/PostCard";
import { Avatar } from "../components/Avatar";

export function PlayerProfile() {
  const { playerId } = useParams();
  const { posts, follows, toggleFollow } = useApp();
  const player = playerId ? playerById(playerId) : undefined;

  if (!player) {
    return (
      <div className="card center">
        <h2>Player not found</h2>
        <Link className="btn mt" to="/community">Back to Community</Link>
      </div>
    );
  }

  const following = follows.includes(player.id);
  const theirPosts = posts.filter((p) => p.authorId === player.id);

  return (
    <>
      <Link to="/community" className="chip clickable" style={{ marginBottom: 18 }}>
        ← Back to Community
      </Link>

      <div className="card mb mt" style={{ overflow: "hidden", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: 90,
            background: player.gradient,
            opacity: 0.85,
          }}
        />
        <div style={{ position: "relative", paddingTop: 34 }}>
          <Avatar emoji={player.emoji} gradient={player.gradient} size={84} photo={player.photo} alt={player.name} />
          <div className="spread mt">
            <div>
              <h1 style={{ fontSize: "1.6rem" }}>
                {player.name} {player.verified && "✔️"}
              </h1>
              <p className="muted">@{player.handle}</p>
            </div>
            <button className={`btn ${following ? "ghost" : ""}`} onClick={() => toggleFollow(player.id)}>
              {following ? "Following ✓" : "Follow"}
            </button>
          </div>
          <p className="mt">{player.bio}</p>
          <div className="row mt" style={{ gap: 8, flexWrap: "wrap" }}>
            <span className="chip aqua">{player.position}</span>
            <span className="chip violet">{player.level}</span>
            <span className="chip">{player.region}</span>
            <span className="chip gold">
              {(player.followers + (following ? 1 : 0)).toLocaleString()} followers
            </span>
          </div>
        </div>
      </div>

      <div className="section-title">
        <h2>Posts by {player.name.split(" ")[0]}</h2>
      </div>
      {theirPosts.length === 0 ? (
        <div className="card center muted">No posts yet — follow them to catch their first one!</div>
      ) : (
        <div className="grid2">
          {theirPosts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}
    </>
  );
}
