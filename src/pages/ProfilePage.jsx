import { Award, Flame, QrCode, Scale, Sparkles } from "lucide-react";
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
      <PageHeader eyebrow="Recovery passport" title="Your progress collection" description="A record of your verified habits, milestones, and unlocked badges." />

      <Card variant="elevated" className="mb-4 !bg-eco-800 !text-white">
        <div className="flex items-center gap-3">
          <ProfileAvatar src={`${baseUrl}alex-profile.avif`} name="Alex Tan" className="size-16" />
          <div>
            <h2 className="text-xl font-black">Alex Tan</h2>
            <p className="text-sm text-eco-100">Plastic recovery member</p>
            <Badge className="mt-2 bg-white/15 text-white"><Sparkles className="mr-1 size-3" /> Green Starter</Badge>
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar value={stats.points} max={stats.nextReward} label="Passport level progress" tone="light" />
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={Award} label="Total points" value={stats.points} helper="Reward balance" />
        <StatCard icon={QrCode} label="Verified scans" value={stats.scans} tone="sky" helper="Plastic entries" />
        <StatCard icon={Flame} label="Streak" value={`${stats.streak} days`} tone="amber" helper="Recycling habit" />
        <StatCard icon={Scale} label="Plastic diverted" value={`${stats.recycledWeightKg} kg`} tone="rose" helper="Estimated weight" />
      </div>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-black text-slate-950">Badge shelf</h2><span className="text-xs font-bold text-eco-700">{achievements.length}/{achievements.length} found</span></div>
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
