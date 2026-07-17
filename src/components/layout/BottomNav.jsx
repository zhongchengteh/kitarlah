import { Award, BarChart3, Home, MapPin, QrCode } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/cn.js";

export const memberNavItems = [
  { label: "Home", to: "/app/dashboard", icon: Home },
  { label: "Rewards", to: "/app/rewards", icon: Award },
  { label: "Scan", to: "/app/scan", icon: QrCode, primary: true },
  { label: "Map", to: "/app/locations", icon: MapPin },
  { label: "Rank", to: "/app/leaderboard", icon: BarChart3 },
];

export default function BottomNav({ items = memberNavItems }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-[480px] -translate-x-1/2 border-t border-eco-100 bg-white/95 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-16px_35px_rgba(20,83,45,0.08)] backdrop-blur">
      <div className="grid grid-cols-5 items-end gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-[0.68rem] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500",
                item.primary && "text-eco-700",
                item.primary
                  ? isActive
                    ? "bg-eco-100 text-eco-800"
                    : "text-eco-700 hover:bg-eco-50 hover:text-eco-800"
                  : isActive
                    ? "bg-eco-100 text-eco-800"
                    : "text-slate-500 hover:bg-eco-50 hover:text-eco-800"
              )
            }
          >
            <span>
              <item.icon className="size-5" />
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
