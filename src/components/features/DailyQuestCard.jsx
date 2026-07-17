import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import Card from "../ui/Card.jsx";

export default function DailyQuestCard({ title = "Today\'s recovery quest", detail, progress, total, reward = "+20 leaf points", icon: Icon = Sparkles }) {
  const complete = progress >= total;
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <Card variant="tinted" className="overflow-hidden p-0">
      <div className="flex gap-3 p-4 pb-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-700 text-white shadow-sm"><Icon className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-eco-700">{title}</p>
              <h2 className="mt-1 font-black text-slate-950">{detail}</h2>
            </div>
            {complete ? <CheckCircle2 className="size-5 shrink-0 text-eco-700" /> : <Circle className="size-5 shrink-0 text-eco-400" />}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-bold text-eco-900"><span>{progress} of {total} complete</span><span>{complete ? "Complete" : reward}</span></div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-eco-600 transition-all duration-500" style={{ width: `${percentage}%` }} /></div>
        </div>
      </div>
    </Card>
  );
}
