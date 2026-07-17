import { useMemo, useState } from "react";
import { Crown, Leaf, MapPinned, Medal, Recycle, Scale, Sparkles, TrendingUp, Users } from "lucide-react";
import LocationRankRow from "../components/features/LocationRankRow.jsx";
import UserRankRow, { UserAvatar } from "../components/features/UserRankRow.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import { locationLeaderboard, peopleLeaderboard } from "../data/mockData.js";

const baseUrl = import.meta.env.BASE_URL;

function PodiumPlace({ item, position, featured, type }) {
  const label = type === "locations" ? item.shortName || item.name : item.name;
  const value = type === "locations" ? `${item.entries} items` : `${item.points} pts`;

  return (
    <div className={`flex w-full min-w-0 flex-col items-center text-center ${featured ? "-translate-y-2" : ""}`}>
      <div className={`relative grid place-items-center rounded-full bg-white ring-2 ${featured ? "size-20 ring-eco-400 shadow-soft" : "size-14 ring-eco-200"}`}>
        {featured ? <Crown className="absolute -top-5 size-6 text-amber-400" /> : <span className="absolute -top-4 grid size-5 place-items-center rounded-full bg-eco-600 text-[10px] font-black text-white">{position}</span>}
        {type === "locations" ? (
          <img src={`${baseUrl}${item.image}`} alt="" className={`${featured ? "size-[4.5rem]" : "size-11"} max-w-full rounded-full object-cover`} />
        ) : (
          <UserAvatar user={item} baseUrl={baseUrl} className={featured ? "size-[4.5rem]" : "size-11"} />
        )}
      </div>
      <p className="mt-2 flex min-h-9 w-full items-center justify-center break-words rounded-md bg-white/10 px-1 py-0.5 text-[0.68rem] font-black leading-4 text-white">{label}</p>
      <p className="mt-1 text-xs font-bold text-eco-100">{value}</p>
    </div>
  );
}

export default function LeaderboardPage() {
  const [board, setBoard] = useState("locations");
  const [period, setPeriod] = useState("week");
  const isLocations = board === "locations";
  const entries = isLocations ? locationLeaderboard[period] : peopleLeaderboard[period];
  const totals = useMemo(
    () => entries.reduce((summary, item) => ({ entries: summary.entries + item.entries, weight: summary.weight + item.weight, points: summary.points + (item.points || 0) }), { entries: 0, weight: 0, points: 0 }),
    [entries],
  );
  const topThree = [entries[1], entries[0], entries[2]];

  return (
    <div className="max-w-full overflow-x-hidden pb-1 animate-rise">
      <PageHeader
        eyebrow="Community rankings"
        title={isLocations ? "Plastic recovery by location" : "Individual recovery leaders"}
        description={isLocations ? "Compare verified collection activity across Bukit Jalil prototype booths." : "A privacy-friendly view using display names and verified plastic entries."}
      />

      <div className="mb-3 grid grid-cols-2 rounded-lg bg-slate-100 p-1" role="tablist" aria-label="Ranking type">
        {[{ id: "locations", label: "Locations", icon: MapPinned }, { id: "people", label: "People", icon: Users }].map((option) => (
          <button key={option.id} type="button" role="tab" aria-selected={board === option.id} onClick={() => setBoard(option.id)} className={`flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold transition ${board === option.id ? "bg-eco-700 text-white shadow-sm" : "text-slate-500"}`}>
            <option.icon className="size-4" />{option.label}
          </button>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-2 rounded-lg bg-eco-50 p-1 ring-1 ring-eco-100" role="tablist" aria-label="Leaderboard period">
        {[{ id: "week", label: "This week" }, { id: "month", label: "This month" }].map((option) => (
          <button key={option.id} type="button" role="tab" aria-selected={period === option.id} onClick={() => setPeriod(option.id)} className={`rounded-md px-3 py-2 text-sm font-bold transition ${period === option.id ? "bg-white text-eco-800 shadow-sm" : "text-slate-500"}`}>{option.label}</button>
        ))}
      </div>

      <Card variant="tinted" className="mb-5 overflow-hidden p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="success">Verified recovery activity</Badge>
            <p className="mt-2 text-2xl font-black text-slate-950">{totals.entries} plastic items</p>
            <p className="mt-1 text-sm text-slate-600">{isLocations ? "recorded across Bukit Jalil locations" : `recycled by ${entries.length} named participants`}</p>
          </div>
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-eco-700 shadow-sm ring-1 ring-eco-100">{isLocations ? <Leaf className="size-6" /> : <Users className="size-6" />}</div>
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-eco-100 pt-3 text-sm font-semibold text-eco-900">
          {isLocations ? <Scale className="size-4 text-eco-700" /> : <Sparkles className="size-4 text-amber-500" />}
          {isLocations ? `${totals.weight.toFixed(1)} kg estimated plastic diverted` : `${totals.points.toLocaleString()} collective leaf points`}
        </div>
      </Card>

      <section className="mb-5 max-w-full overflow-hidden rounded-lg bg-eco-800 px-3 pb-4 pt-6 shadow-soft" aria-label={isLocations ? "Top recycling locations" : "Top recycling participants"}>
        <div className="mb-5 flex items-center justify-between">
          <div><p className="text-xs font-bold uppercase tracking-wide text-eco-200">{isLocations ? "Top locations" : "Top participants"}</p><h2 className="mt-1 font-black text-white">Recovery leaders</h2></div>
          <Medal className="size-6 text-amber-300" />
        </div>
        <div className="grid grid-cols-3 items-end gap-1.5">
          <PodiumPlace item={topThree[0]} position={2} type={board} />
          <PodiumPlace item={topThree[1]} position={1} featured type={board} />
          <PodiumPlace item={topThree[2]} position={3} type={board} />
        </div>
      </section>

      <section aria-labelledby="all-rankings">
        <div className="mb-3 flex items-center justify-between"><div><h2 id="all-rankings" className="font-black text-slate-950">{isLocations ? "All locations" : "Participant ranking"}</h2><p className="mt-0.5 text-xs text-slate-500">Ranked by verified plastic entries</p></div><TrendingUp className="size-5 text-eco-700" /></div>
        <div className="grid gap-3">
          {entries.map((item) => isLocations ? <LocationRankRow key={item.name} location={item} baseUrl={baseUrl} /> : <UserRankRow key={item.name} user={item} baseUrl={baseUrl} />)}
        </div>
      </section>

      <p className="mt-5 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100"><Recycle className="mt-0.5 size-4 shrink-0 text-amber-700" />{isLocations ? "Location totals use simulated verified entries at real Bukit Jalil addresses." : "Participant names and results are mock data. A production leaderboard should offer opt-out and display-name privacy controls."}</p>
    </div>
  );
}
