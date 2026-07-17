import { Award, Flame, QrCode, Scale } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import StatCard from "../components/features/StatCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import ProfileAvatar from "../components/ui/ProfileAvatar.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";
import { achievements } from "../data/mockData.js";

export default function ProfilePage() {
  const { stats } = useEcoCycle();
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Profile" title="Your plastic recovery profile" description="Your verified history, habits, and badges." />

      <Card variant="elevated" className="mb-4 !bg-eco-800 !text-white">
        <div className="flex items-center gap-3">
          <ProfileAvatar src={`${baseUrl}alex-profile.avif`} name="Alex Tan" className="size-16" />
          <div>
            <h2 className="text-xl font-black">Alex Tan</h2>
            <p className="text-sm text-eco-100">Plastic recovery member</p>
            <Badge className="mt-2 bg-white/15 text-white">Green Starter</Badge>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={stats.points} max={stats.nextReward} label="Progress to next reward" tone="light" />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Award} label="Total points" value={stats.points} helper="Reward balance" />
        <StatCard icon={QrCode} label="Verified scans" value={stats.scans} tone="sky" helper="Plastic entries" />
        <StatCard icon={Flame} label="Streak" value={`${stats.streak} days`} tone="amber" helper="Recycling habit" />
        <StatCard icon={Scale} label="Plastic diverted" value={`${stats.recycledWeightKg} kg`} tone="rose" helper="Estimated weight" />
      </div>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((item) => (
            <Card key={item.title} className="p-3 text-center" variant="tinted">
              <item.icon className="mx-auto size-6 text-eco-700" />
              <p className="mt-2 text-xs font-bold text-eco-900">{item.title}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
