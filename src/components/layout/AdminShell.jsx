import { Outlet } from "react-router-dom";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";
import AdminBottomNav from "./AdminBottomNav.jsx";
import GameStatusStrip from "../features/GameStatusStrip.jsx";

export default function AdminShell() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="phone-shell min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-eco-100 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <img src={`${baseUrl}kitarlah-logo.png`} alt="Kitarlah" className="size-11 rounded-full object-cover" />
            <div><p className="text-sm font-black text-slate-950">Kitarlah Admin</p><p className="text-xs font-semibold text-eco-700">Recovery operations</p></div>
          </div>
          <ProfileAvatar src={`${baseUrl}nadia-profile.jpeg`} name="Nadia Lim" className="size-10" />
        </header>
        <GameStatusStrip />
        <main className="safe-bottom px-4 py-5"><Outlet /></main>
        <AdminBottomNav />
      </div>
    </div>
  );
}
