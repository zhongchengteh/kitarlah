import { Sparkles } from "lucide-react";

export default function ScoreBurst({ points, label = "Leaf points earned" }) {
  return (
    <div className="score-burst my-4 flex items-center justify-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900" role="status">
      <Sparkles className="size-5 text-amber-600" />
      <span className="text-2xl font-black">+{points}</span>
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}
