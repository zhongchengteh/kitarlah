import { BookOpen, LogOut, Settings, UserRound } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BottomNav from "./BottomNav.jsx";
import Toast from "../ui/Toast.jsx";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";

export default function AppShell() {
  const [profileOpen, setProfileOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="bg-slate-950">
      <div className="phone-shell relative">
        <div className="sticky top-0 z-30 flex items-center justify-between border-b border-eco-100 bg-white/90 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}kitarlah-logo.png`} alt="Kitarlah" className="size-11 rounded-full object-cover object-center" />
            <p className="text-sm font-black text-slate-950">Kitarlah</p>
          </div>
          <div className="relative">
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((open) => !open)}
              className="rounded-full transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"
            >
              <ProfileAvatar src={`${baseUrl}alex-profile.avif`} name="Alex Tan" className="size-11" />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-12 w-56 animate-rise rounded-lg bg-white p-2 shadow-lift ring-1 ring-eco-100">
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-sm font-black text-slate-950">Alex Tan</p>
                  <p className="text-xs font-semibold text-slate-500">Plastic recovery member</p>
                </div>
                <Link
                  to="/app/profile"
                  onClick={() => setProfileOpen(false)}
                  className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-eco-50 hover:text-eco-800"
                >
                  <UserRound className="size-4" /> Profile
                </Link>
                <Link
                  to="/app/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-eco-50 hover:text-eco-800"
                >
                  <Settings className="size-4" /> Settings
                </Link>
                <Link
                  to="/app/education"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-eco-50 hover:text-eco-800"
                >
                  <BookOpen className="size-4" /> Learn
                </Link>
                <Link
                  to="/"
                  onClick={() => setProfileOpen(false)}
                  className="mt-1 flex items-center gap-3 rounded-lg border-t border-slate-100 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="size-4" /> Logout
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        <main className="safe-bottom px-4 py-5">
          <Outlet />
        </main>
        <BottomNav />
        <Toast />
      </div>
    </div>
  );
}
