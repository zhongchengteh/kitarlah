import { BarChart3, Download, Sparkles, Users } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import StatCard from "../components/features/StatCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { activeUsers, adminLocationPerformance, adminMetrics, adminWeeklyRecovery, campaignPerformance } from "../data/mockData.js";

export default function AdminDashboardPage() {
  const maxEntries = Math.max(...adminWeeklyRecovery.map((day) => day.entries));
  const weeklyEntries = adminWeeklyRecovery.reduce((total, day) => total + day.entries, 0);
  const weeklyWeight = adminWeeklyRecovery.reduce((total, day) => total + day.weight, 0).toFixed(1);

  return (
    <div className="animate-rise">
      <PageHeader
        eyebrow="Campaign control"
        title="Recovery season dashboard"
        description="Mock organiser analytics for sustained plastic recovery missions."
        action={
          <Button variant="secondary" size="sm">
            <Download className="size-4" />
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3">
        {adminMetrics.map((metric) => (
          <StatCard key={metric.label} {...metric} />
        ))}
      </div>

      <Card variant="tinted" className="mt-5 flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-700 text-white"><Sparkles className="size-5" /></span>
        <div><p className="text-xs font-bold uppercase tracking-wide text-eco-700">Season status</p><p className="mt-1 font-black text-eco-950">Community recovery sprint: 68% complete</p><p className="mt-1 text-sm text-eco-800">Booth challenges and learning quests are encouraging return visits.</p></div>
      </Card>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Weekly verified plastic entries</h2>
        <Card variant="elevated">
          <div className="mb-4 flex items-center justify-between gap-3 text-xs font-bold"><span className="text-eco-800">{weeklyEntries} verified entries</span><span className="text-slate-500">{weeklyWeight} kg estimated</span></div>
          <div className="flex h-44 items-end gap-2">
            {adminWeeklyRecovery.map((day) => (
              <div key={day.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-[0.62rem] font-black text-eco-800">{day.entries}</span>
                <div className="w-full rounded-t-lg bg-eco-600 transition-all duration-500 hover:bg-eco-700" style={{ height: `${Math.max((day.entries / maxEntries) * 100, 12)}%` }} />
                <span className="text-[0.65rem] font-bold text-slate-400">{day.day.slice(0, 1)}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Location performance</h2>
        <div className="grid gap-3">
          {adminLocationPerformance.map((location) => (
            <Card key={location.name}>
              <div className="flex items-center justify-between gap-3"><p className="min-w-0 truncate font-black text-slate-950">{location.name}</p><Badge variant="success">{location.engagement}% active</Badge></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-eco-100"><div className="h-full rounded-full bg-eco-600" style={{ width: `${location.engagement}%` }} /></div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-center"><div><p className="font-black text-slate-950">{location.entries}</p><p className="text-[0.65rem] font-semibold text-slate-500">Entries</p></div><div><p className="font-black text-slate-950">{location.weight} kg</p><p className="text-[0.65rem] font-semibold text-slate-500">Estimated</p></div><div><p className="font-black text-slate-950">{location.participants}</p><p className="text-[0.65rem] font-semibold text-slate-500">People</p></div></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Booth and learning engagement</h2>
        <div className="grid gap-3">
          {campaignPerformance.map((campaign) => (
            <Card key={campaign.name}>
              <div className="mb-2 flex items-center justify-between">
                <p className="font-bold text-slate-950">{campaign.name}</p>
                <Badge variant={campaign.value > 80 ? "success" : "info"}>{campaign.value}%</Badge>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-eco-600" style={{ width: `${campaign.value}%` }} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <Card variant="tinted">
          <h2 className="font-black text-eco-950">Participation signals</h2>
          <p className="mt-2 text-sm leading-6 text-eco-900">Track booth engagement, repeat attendance, recycling frequency, completed learning tips, and participant feedback. Social reach is secondary to sustained real-world participation.</p>
        </Card>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Most active users</h2>
        <Card variant="elevated">
          <div className="grid gap-3">
            {activeUsers.map((user) => (
              <div key={user.name} className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-eco-100 text-eco-800">
                  <Users className="size-4" />
                </span>
                <p className="min-w-0 flex-1 text-sm font-bold text-slate-800">{user.name}</p>
                <span className="flex items-center gap-1 text-sm font-black text-slate-950">
                  <BarChart3 className="size-4 text-eco-700" />
                  {user.scans}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
