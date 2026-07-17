import { Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell.jsx";
import AdminShell from "./components/layout/AdminShell.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ScanPage from "./pages/ScanPage.jsx";
import RewardsPage from "./pages/RewardsPage.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import EducationPage from "./pages/EducationPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AppShell />}>
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/scan" element={<ScanPage />} />
        <Route path="/app/rewards" element={<RewardsPage />} />
        <Route path="/app/locations" element={<LocationsPage />} />
        <Route path="/app/education" element={<EducationPage />} />
        <Route path="/app/leaderboard" element={<LeaderboardPage />} />
        <Route path="/app/profile" element={<ProfilePage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
      </Route>
      <Route element={<AdminShell />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/scan" element={<ScanPage />} />
        <Route path="/admin/rewards" element={<RewardsPage />} />
        <Route path="/admin/locations" element={<LocationsPage />} />
        <Route path="/admin/leaderboard" element={<LeaderboardPage />} />
      </Route>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
}
