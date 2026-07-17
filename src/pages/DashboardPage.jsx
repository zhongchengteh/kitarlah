import { Leaf, QrCode, Recycle, Sparkles, Sprout, Trees } from "lucide-react";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import StatCard from "../components/features/StatCard.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";
import { achievements } from "../data/mockData.js";

const EnvironmentScene = lazy(() => import("../components/features/EnvironmentScene.jsx"));

export default function DashboardPage() {
  const { stats, activities } = useEcoCycle();

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Home" title="Hi, Alex" description="See how your recycling helps a cleaner world grow." />

      <Card variant="elevated" className="mb-4 overflow-hidden p-0">
        <div className="p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <Badge variant="success">Living impact</Badge>
              <h2 className="mt-2 text-xl font-black text-slate-950">Your virtual world is recovering</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">
                Each recycling entry helps this environment become greener, cleaner, and more alive.
              </p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-100 text-eco-700">
              <Leaf className="size-5" />
            </span>
          </div>
          <ProgressBar value={stats.habitatHealth} max={100} label="Habitat health" />
        </div>
        <Suspense fallback={<div className="h-64 w-full animate-pulse bg-eco-100" />}>
          <EnvironmentScene health={stats.habitatHealth} />
        </Suspense>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Sprout} label="Habitat health" value={`${stats.habitatHealth}%`} helper="Virtual recovery" />
        <StatCard icon={Trees} label="Trees restored" value={stats.restoredTrees} tone="sky" helper="Visual growth" />
        <StatCard icon={QrCode} label="Recycling entries" value={stats.scans} tone="amber" helper="Plastic items" />
        <StatCard icon={Recycle} label="CO2 saved" value="4.2 kg" tone="rose" helper="Estimated impact" />
      </div>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-950">Quick actions</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/app/scan">
            <Button className="w-full" size="lg">
              <QrCode className="size-5" /> Add recycling
            </Button>
          </Link>
          <Link to="/app/education">
            <Button className="w-full" variant="secondary" size="lg">
              <Sparkles className="size-5" /> Learn why
            </Button>
          </Link>
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Care habits</h2>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((item) => (
            <Card key={item.title} className="p-3 text-center" variant="tinted">
              <item.icon className="mx-auto size-6 text-eco-700" />
              <p className="mt-2 text-xs font-bold text-eco-900">{item.title}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Recent restoration entries</h2>
        <div className="grid gap-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-950">{activity.item}</p>
                <p className="text-xs text-slate-500">
                  {activity.location} - {activity.time}
                </p>
              </div>
              <Badge variant="success">Restored</Badge>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
