import { CheckCircle2, Sparkles } from "lucide-react";
import Badge from "../ui/Badge.jsx";

export default function RewardUnlockCelebration({ reward }) {
  if (!reward) return null;
  const Icon = reward.icon;

  return (
    <div className="text-center">
      <div className="relative mx-auto mb-4 grid size-24 place-items-center">
        <span className="reward-unlock-ring absolute inset-1 rounded-full border-2 border-eco-200" />
        <span className="reward-unlock-icon grid size-16 place-items-center rounded-full bg-eco-700 text-white shadow-soft"><Icon className="size-8" /></span>
        <Sparkles className="reward-spark absolute -right-1 top-1 size-5 text-amber-500" />
        <Sparkles className="reward-spark absolute bottom-1 left-0 size-4 text-eco-500 [animation-delay:180ms]" />
      </div>
      <Badge variant="success"><CheckCircle2 className="mr-1 size-3.5" /> Unlocked</Badge>
      <h3 className="mt-3 text-xl font-black text-slate-950">{reward.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">Added to your reward collection for this prototype.</p>
    </div>
  );
}
