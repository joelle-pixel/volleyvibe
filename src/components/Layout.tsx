import { NavLink, Outlet } from "react-router-dom";
import { useApp } from "../context/AppState";

const links = [
  { to: "/", label: "Home", ico: "🏠", end: true },
  { to: "/academy", label: "VolleyU", ico: "🎓" },
  { to: "/community", label: "Community", ico: "🏐" },
  { to: "/news", label: "News", ico: "📰" },
  { to: "/clubs", label: "Club Finder", ico: "🔎" },
  { to: "/position-quiz", label: "Position Quiz", ico: "🧭" },
  { to: "/fuel", label: "Fuel", ico: "💧" },
  { to: "/pro-zone", label: "Pro Zone", ico: "🧠" },
];

const mobileLinks = [
  links[0],
  links[1],
  links[2],
  links[4],
  { to: "/profile", label: "You", ico: "👤" },
];

export function Layout() {
  const { profile, toast } = useApp();

  return (
    <>
      <header className="topnav">
        <NavLink to="/" className="brand">
          <span className="ball">🏐</span>
          <span className="grad-text">VolleyVibe</span>
        </NavLink>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `navlink${isActive ? " active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-right">
          {profile.level && <span className="chip gold">{profile.level}</span>}
          <NavLink to="/profile" className="nav-avatar" title="Your profile">
            {profile.emoji}
          </NavLink>
        </div>
      </header>

      <main className="shell">
        <Outlet />
      </main>

      <nav className="bottombar">
        {mobileLinks.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={"end" in l ? l.end : false}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="ico">{l.ico}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
