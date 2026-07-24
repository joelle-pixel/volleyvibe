import { Link } from "react-router-dom";
import { useApp } from "../context/AppState";
import { news } from "../data/news";
import { courses } from "../data/courses";
import { PostCard } from "../components/PostCard";
import hero from "../assets/vv-hero.png";

const quickLinks = [
  { to: "/academy", emoji: "🎓", title: "VolleyU Academy", text: "Courses, lessons & checkpoint quizzes for your level" },
  { to: "/community", emoji: "🏐", title: "Community", text: "The feed. Post, like, comment, and follow players" },
  { to: "/clubs", emoji: "🔎", title: "Club Matchmaker", text: "Find the club that fits your area, budget & goals" },
  { to: "/position-quiz", emoji: "🧭", title: "Position Quiz", text: "Still deciding? Discover the position built for you" },
  { to: "/fuel", emoji: "💧", title: "Fuel Station", text: "Nutrition guides + hydration reminders" },
  { to: "/pro-zone", emoji: "🧠", title: "Pro Zone", text: "Rotations, drills & the full volleyball dictionary" },
];

export function Home() {
  const { profile, posts, hydration } = useApp();
  const trending = [...posts].sort((a, b) => b.likes - a.likes).slice(0, 2);
  const topNews = news.slice(0, 3);
  const waterPct = Math.min(100, Math.round((hydration.drankOz / hydration.goalOz) * 100));

  const suggestedCourse =
    courses.find((c) => c.level === profile.level) ?? courses[0];

  return (
    <>
      <section className="hero">
        <img className="bg" src={hero} alt="Volleyball player spiking at sunset" />
        <div className="scrim" />
        <div className="content">
          <span className="chip gold">
            {profile.level === "Advanced" ? "🏆" : profile.level === "Intermediate" ? "🚀" : "🌱"}{" "}
            {profile.level} player
          </span>
          <h1>
            Hey {profile.name.split(" ")[0]}, <span className="grad-text">ready to rally?</span>
          </h1>
          <p>
            Your volleyball world in one place — learn, connect, train, and find where
            you belong on the court.
          </p>
          <div className="row" style={{ flexWrap: "wrap", gap: 10 }}>
            <Link to="/community" className="btn">Jump into the feed 🏐</Link>
            <Link to={`/academy/${suggestedCourse.id}`} className="btn ghost">
              Continue learning: {suggestedCourse.emoji} {suggestedCourse.title}
            </Link>
          </div>
        </div>
      </section>

      <div className="grid3">
        {quickLinks.map((q) => (
          <Link to={q.to} key={q.to} className="card hoverable">
            <div style={{ fontSize: "2rem", marginBottom: 10 }}>{q.emoji}</div>
            <h3 style={{ marginBottom: 6, fontSize: "1.08rem" }}>{q.title}</h3>
            <p className="muted small">{q.text}</p>
          </Link>
        ))}
      </div>

      <div className="section-title">
        <h2>💧 Today's hydration</h2>
        <Link to="/fuel">Open Fuel Station →</Link>
      </div>
      <div className="card">
        <div className="spread">
          <div>
            <div className="stat-big">
              {hydration.drankOz}<span className="muted" style={{ fontSize: "1.1rem" }}> / {hydration.goalOz} oz</span>
            </div>
            <p className="muted small">
              {waterPct >= 100
                ? "Goal crushed! Your vertical thanks you 🎉"
                : `${waterPct}% of your daily goal — keep sipping`}
            </p>
          </div>
          <div className="match-ring" style={{ ["--pct" as string]: waterPct }}>
            <div>{waterPct}%</div>
          </div>
        </div>
        <div className="bar mt">
          <div style={{ width: `${waterPct}%` }} />
        </div>
      </div>

      <div className="section-title">
        <h2>🔥 Trending in the community</h2>
        <Link to="/community">See all posts →</Link>
      </div>
      <div className="grid2">
        {trending.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div className="section-title">
        <h2>📰 Latest volleyball news</h2>
        <Link to="/news">All news & tryouts →</Link>
      </div>
      <div className="grid3">
        {topNews.map((n) => (
          <Link to="/news" key={n.id} className="card hoverable">
            <div
              className="post-art"
              style={{ background: n.gradient, minHeight: 90, fontSize: "2.6rem", marginBottom: 14 }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>{n.emoji}</span>
            </div>
            <span className="chip violet mb" style={{ marginBottom: 10 }}>{n.category}</span>
            <h3 style={{ fontSize: "1rem", margin: "8px 0 6px" }}>{n.headline}</h3>
            <p className="muted small">{n.date}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
