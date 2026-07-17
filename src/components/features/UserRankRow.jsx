import { MapPin, Recycle, Sparkles } from "lucide-react";
import Badge from "../ui/Badge.jsx";
import Card from "../ui/Card.jsx";

export function UserAvatar({ user, baseUrl, className = "size-10" }) {
  if (user.avatar) return <img src={`${baseUrl}${user.avatar}`} alt={`${user.name} profile`} className={`${className} shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm`} />;
  return <span aria-hidden="true" className={`${className} grid shrink-0 place-items-center rounded-full text-xs font-black ring-2 ring-white shadow-sm ${user.color}`}>{user.initials}</span>;
}

export default function UserRankRow({ user, baseUrl }) {
  return (
    <Card variant={user.isCurrentUser ? "tinted" : "interactive"} className="flex max-w-full items-center gap-2 overflow-hidden p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-eco-800 ring-1 ring-eco-100">{user.rank}</span>
      <UserAvatar user={user} baseUrl={baseUrl} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5"><p className="truncate text-sm font-black text-slate-950">{user.name}</p>{user.isCurrentUser ? <Badge variant="success">You</Badge> : null}</div>
        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-slate-500"><MapPin className="size-3 shrink-0 text-eco-700" />{user.booth}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="flex items-center justify-end gap-1 text-sm font-black text-slate-950"><Recycle className="size-3.5 text-eco-700" />{user.entries}</p>
        <p className="flex items-center justify-end gap-1 text-xs font-medium text-slate-500"><Sparkles className="size-3 text-amber-500" />{user.points}</p>
      </div>
    </Card>
  );
}
