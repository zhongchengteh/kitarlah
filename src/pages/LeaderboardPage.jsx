import { useMemo, useState } from "react";
import { Crown, Leaf, Medal, Recycle, Scale, TrendingUp } from "lucide-react";
import LocationRankRow from "../components/features/LocationRankRow.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import { locationLeaderboard } from "../data/mockData.js";

const baseUrl = import.meta.env.BASE_URL;

function PodiumStation({ location, position, featured }) {
  return (
    <div className={`flex min-w-0 flex-col items-center text-center ${featured ? "-translate-y-2" : ""}`}>
      <div className={`relative grid place-items-center rounded-full bg-white ring-2 ${featured ? "size-20 ring-eco-500 shadow-soft" : "size-14 ring-eco-200"}`}>
        {featured ? <Crown className="absolute -top-5 size-6 text-amber-500" /> : <span className="absolute -top-4 grid size-5 place-items-center rounded-full bg-eco-700 text-[10px] font-black text-white">{position}</span>}
        <img src={`${baseUrl}${location.image}`} alt="" className={`${featured ? "size-15" : "size-11"} rounded-full object-cover`} />
      </div>
      <p className="mt-2 line-clamp-2 min-h-9 rounded-md bg-white/10 px-1.5 py-0.5 text-xs font-black leading-4 text-white">{location.name}</p>
      <p className="mt-1 text-xs font-bold text-eco-100">{location.entries} items</p>
    </div>
  );
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("week");
  const locations = locationLeaderboard[period];
  const totals = useMemo(
    () => locations.reduce((summary, location) => ({ entries: summary.entries + location.entries, weight: summary.weight + location.weight }), { entries: 0, weight: 0 }),
    [locations],
  );
  const topThree = [locations[1], locations[0], locations[2]];

  return (
    <div className="animate-rise pb-1">
      <PageHeader
        eyebrow="Location impact"
        title="Plastic recovery by location"
        description="See which local collection points are keeping more plastic in circulation."
      />

      <div className="mb-4 grid grid-cols-2 rounded-lg bg-eco-50 p-1 ring-1 ring-eco-100" role="tablist" aria-label="Leaderboard period">
        {[{ id: "week", label: "This week" }, { id: "month", label: "This month" }].map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={period === option.id}
            onClick={() => setPeriod(option.id)}
            className={`rounded-md px-3 py-2 text-sm font-bold transition ${period === option.id ? "bg-white text-eco-800 shadow-sm" : "text-slate-500"}`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <Card variant="tinted" className="mb-5 overflow-hidden p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Badge variant="success">Verified collection activity</Badge>
            <p className="mt-2 text-2xl font-black text-slate-950">{totals.entries} plastic items</p>
            <p className="mt-1 text-sm text-slate-600">recorded across local recycling locations</p>
          </div>
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-eco-700 shadow-sm ring-1 ring-eco-100">
            <Leaf className="size-6" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 border-t border-eco-100 pt-3 text-sm font-semibold text-eco-900">
          <Scale className="size-4 text-eco-700" />
          {totals.weight.toFixed(1)} kg estimated plastic diverted
        </div>
      </Card>

      <section className="mb-5 rounded-lg bg-eco-800 px-4 pb-4 pt-6 shadow-soft" aria-label="Top recycling locations">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-eco-200">Top locations</p>
            <h2 className="mt-1 font-black text-white">Recovery leaders</h2>
          </div>
          <Medal className="size-6 text-amber-300" />
        </div>
        <div className="grid grid-cols-3 items-end gap-2">
          <PodiumStation location={topThree[0]} position={2} />
          <PodiumStation location={topThree[1]} position={1} featured />
          <PodiumStation location={topThree[2]} position={3} />
        </div>
      </section>

      <section aria-labelledby="location-rankings">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 id="location-rankings" className="font-black text-slate-950">All locations</h2>
            <p className="mt-0.5 text-xs text-slate-500">Ranked by verified plastic entries</p>
          </div>
          <TrendingUp className="size-5 text-eco-700" />
        </div>
        <div className="grid gap-3">
          {locations.map((location) => <LocationRankRow key={location.name} location={location} baseUrl={baseUrl} />)}
        </div>
      </section>

      <p className="mt-5 flex gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-900 ring-1 ring-amber-100">
        <Recycle className="mt-0.5 size-4 shrink-0 text-amber-700" />
        This prototype compares location activity, not individual people. Totals use verified plastic-entry mock data.
      </p>
    </div>
  );
}
