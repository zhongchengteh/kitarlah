import { Flame, Leaf, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useEcoCycle } from "../../context/EcoCycleContext.jsx";

export default function GameStatusStrip() {
  const { stats } = useEcoCycle();
  const previousPoints = useRef(stats.availablePoints);
  const [pointGain, setPointGain] = useState(0);
  const level = Math.max(1, Math.ceil(stats.verifiedItems / 5));
  const progress = ((stats.verifiedItems % 5) / 5) * 100;

  useEffect(() => {
    const gain = stats.availablePoints - previousPoints.current;
    previousPoints.current = stats.availablePoints;
    if (gain <= 0) return undefined;
    setPointGain(gain);
    const timer = window.setTimeout(() => setPointGain(0), 1400);
    return () => window.clearTimeout(timer);
  }, [stats.availablePoints]);

  return (
    <div className="border-b border-eco-100 bg-eco-50 px-4 py-2">
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-eco-700 text-white shadow-sm">
          <Leaf className="size-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2 text-[0.68rem] font-black uppercase tracking-wide text-eco-900">
            <span>Recovery level {level}</span>
            <span>{stats.verifiedItems % 5}/5 to level {level + 1}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-eco-200">
            <div className="h-full rounded-full bg-eco-600 transition-all duration-500" style={{ width: `${progress || 8}%` }} />
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-xs font-black text-amber-700"><Flame className="size-3.5" /> {stats.streak}</span>
        <span className={`relative flex shrink-0 items-center gap-1 text-xs font-black text-eco-800 ${pointGain ? "score-total-pop" : ""}`}><Sparkles className="size-3.5" /> {stats.availablePoints}{pointGain ? <span className="score-gain-float absolute -top-5 right-0 text-xs text-amber-700">+{pointGain}</span> : null}</span>
      </div>
    </div>
  );
}
