import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppState";
import { Layout } from "./components/Layout";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { Academy } from "./pages/Academy";
import { CourseDetail } from "./pages/CourseDetail";
import { Community } from "./pages/Community";
import { PlayerProfile } from "./pages/PlayerProfile";
import { News } from "./pages/News";
import { ClubFinder } from "./pages/ClubFinder";
import { PositionQuizPage } from "./pages/PositionQuiz";
import { Fuel } from "./pages/Fuel";
import { ProZone } from "./pages/ProZone";
import { Profile } from "./pages/Profile";

export default function App() {
  const { profile } = useApp();

  if (!profile.onboarded) {
    return <Onboarding />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:courseId" element={<CourseDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/players/:playerId" element={<PlayerProfile />} />
        <Route path="/news" element={<News />} />
        <Route path="/clubs" element={<ClubFinder />} />
        <Route path="/position-quiz" element={<PositionQuizPage />} />
        <Route path="/fuel" element={<Fuel />} />
        <Route path="/pro-zone" element={<ProZone />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
