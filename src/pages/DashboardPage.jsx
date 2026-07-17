import { BookOpen, Droplets, Flame, QrCode, Recycle, Scale, Sparkles, Target } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/features/StatCard.jsx";
import DailyQuestCard from "../components/features/DailyQuestCard.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";

const PlasticRecoveryWorld = lazy(() => import("../components/features/PlasticRecoveryWorld.jsx"));

export default function DashboardPage() {
  const { stats, activities } = useEcoCycle();
  const remainingItems = Math.max(stats.goalItems - stats.verifiedItems, 0);
  const level = stats.verifiedItems >= stats.goalItems ? "Flourishing" : stats.verifiedItems >= 13 ? "Growing" : "Recovering";

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Home" title="Hi, Alex" description="Recycle plastic correctly and watch your community recover." />

      <Link to="/app/scan" className="mb-5 block">
        <Button className="w-full shadow-soft" size="lg"><QrCode className="size-5" /> Start a recovery scan <Sparkles className="size-4" /></Button>
      </Link>

      <div className="mb-5">
        <DailyQuestCard detail="Verify 2 clean plastic items" progress={Math.min(stats.verifiedItems % 3, 2)} total={2} reward="+20 leaf points" icon={Target} />
      </div>

      <Card variant="elevated" className="mb-5 overflow-hidden p-0">
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between gap-3"><Badge variant="success">Living impact</Badge><span className="inline-flex items-center gap-1 text-xs font-black text-amber-700"><Sparkles className="size-3.5" /> Level {Math.max(1, Math.ceil(stats.verifiedItems / 5))}</span></div>
          <h2 className="mt-2 text-xl font-black text-slate-950">Your plastic recovery world</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Verified recycling removes litter and grows the environment.</p>
          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-sm font-black text-slate-950">{stats.verifiedItems} of {stats.goalItems} verified plastic items</p>
            <Badge variant="info">{level}</Badge>
          </div>
          <div className="mt-2"><ProgressBar value={stats.verifiedItems} max={stats.goalItems} label="Recovery progress" tone="dark" /></div>
        </div>
        <Suspense fallback={<div className="h-[300px] w-full animate-pulse bg-eco-100" />}>
          <PlasticRecoveryWorld verifiedItems={stats.verifiedItems} goalItems={stats.goalItems} stage={level} />
        </Suspense>
        <div className="border-t border-eco-100 bg-eco-50 px-4 py-3 text-xs font-semibold leading-5 text-eco-900">
          {remainingItems ? `${remainingItems} more verified items unlock the next recovery milestone.` : "Milestone complete. Keep verifying items to begin the next recovery stage."} A playful motivation map, not an exact impact measurement.
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Recycle} label="Plastic items" value={stats.verifiedItems} helper="Verified recycled" />
        <StatCard icon={Scale} label="Plastic diverted" value={`${stats.recycledWeightKg} kg`} tone="sky" helper="Estimated weight" />
        <StatCard icon={Flame} label="Recycling streak" value={`${stats.streak} days`} tone="amber" helper="Keep the habit" />
        <StatCard icon={BookOpen} label="Learning: 7 Rs" value={`${stats.learningProgress}/7`} tone="rose" helper="Refuse begins here" />
      </div>

      <section className="mt-5">
        <Card variant="tinted" className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-700 text-white"><Droplets className="size-5" /></span>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-eco-700">Knowledge quest</p>
            <h2 className="mt-1 font-black text-slate-950">Refuse first</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Avoid unnecessary single-use plastic when a refill, reusable item, or no packaging option works.</p>
            <Link to="/app/education" className="mt-3 inline-flex items-center gap-1 text-sm font-black text-eco-800">Learn the 7 Rs <BookOpen className="size-4" /></Link>
          </div>
        </Card>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Recent plastic recycling scans</h2>
        <div className="grid gap-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-slate-950">{activity.item}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">{activity.location} - {activity.time}</p>
                <p className="text-xs font-semibold text-slate-400">{activity.quantity ? `${activity.quantity} item${activity.quantity > 1 ? "s" : ""} - ` : ""}{activity.weight ? `${activity.weight} kg - ` : ""}{activity.points} pts</p>
              </div>
              <Badge variant="success">{activity.status || "Verified"}</Badge>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
