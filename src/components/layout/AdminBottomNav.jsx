import { Award, BarChart3, MapPin, QrCode, Users } from "lucide-react";
import BottomNav from "./BottomNav.jsx";

const adminNavItems = [
  { label: "Admin", to: "/admin", icon: BarChart3 },
  { label: "Rewards", to: "/admin/rewards", icon: Award },
  { label: "Scan", to: "/admin/scan", icon: QrCode, primary: true },
  { label: "Map", to: "/admin/locations", icon: MapPin },
  { label: "Rank", to: "/admin/leaderboard", icon: Users },
];

export default function AdminBottomNav() {
  return <BottomNav items={adminNavItems} />;
}
