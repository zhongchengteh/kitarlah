import { ArrowLeft, BarChart3, ShieldCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";

export default function AdminShell() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="phone-shell min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-eco-100 bg-white/95 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="grid size-10 place-items-center rounded-lg bg-eco-800 text-white"><BarChart3 className="size-5" /></span>
            <div><p className="text-sm font-black text-slate-950">Kitarlah Organiser</p><p className="text-xs font-semibold text-slate-500">Community recovery</p></div>
          </div>
          <ProfileAvatar src={`${baseUrl}nadia-profile.jpeg`} name="Nadia Lim" className="size-10" />
        </header>
        <main className="px-4 py-5"><Outlet /></main>
        <footer className="border-t border-eco-100 bg-eco-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold text-eco-900"><ShieldCheck className="size-4" /> Organiser prototype</span><Link to="/app/dashboard" className="inline-flex items-center gap-1 text-xs font-black text-eco-800">Member view <ArrowLeft className="size-3 rotate-180" /></Link></div>
        </footer>
      </div>
    </div>
  );
}
