import { Crown, Medal, Trophy } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import { leaderboard } from "../data/mockData.js";

export default function LeaderboardPage() {
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Leaderboard" title="Community participation" description="An optional privacy-friendly weekly view of verified plastic recycling." />

      <div className="mb-5 grid grid-cols-3 items-end gap-2">
        {topThree.map((participant, index) => (
          <Card
            key={participant.name}
            variant="elevated"
            className={`p-3 text-center ${index === 0 ? "min-h-36 !bg-eco-800 !text-white" : "min-h-28"}`}
          >
            {index === 0 ? <Crown className="mx-auto size-7 text-amber-200" /> : <Medal className="mx-auto size-6 text-eco-700" />}
            <p className={`mt-2 text-sm font-black ${index === 0 ? "text-white" : "text-slate-950"}`}>{participant.name.split(" ")[0]}</p>
            <p className={`text-xs ${index === 0 ? "text-eco-100" : "text-slate-500"}`}>{participant.points} pts</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-3">
        {leaderboard.map((participant) => (
          <Card key={participant.rank} variant={participant.name === "You" ? "tinted" : "default"} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-sm font-black text-eco-800 ring-1 ring-eco-100">
              {participant.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-black text-slate-950">{participant.name}</p>
              <p className="text-xs text-slate-500">{participant.role}</p>
            </div>
            {participant.name === "You" ? <Badge variant="success">You</Badge> : null}
            <div className="flex items-center gap-1 font-black text-slate-950">
              <Trophy className="size-4 text-amber-500" />
              {participant.points}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
