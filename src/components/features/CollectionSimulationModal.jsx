import { AlertTriangle, CheckCircle2, Clock3, Database, ShieldCheck, Sparkles } from "lucide-react";
import Button from "../ui/Button.jsx";
import ScoreBurst from "./ScoreBurst.jsx";

const validationSteps = [
  { label: "Booth QR session matched", icon: Clock3 },
  { label: "Photo evidence attached", icon: ShieldCheck },
  { label: "Staff checking clean, sorted items", icon: Sparkles },
  { label: "Preparing points ledger", icon: Database },
];

export default function CollectionSimulationModal({ phase, calculation, reason, availablePoints, onConfirm, onClose }) {
  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="collection-title">
      <div className="w-full max-w-sm animate-rise rounded-lg bg-white p-5 shadow-lift">
        {phase === "cleanliness" ? <><span className="grid size-11 place-items-center rounded-lg bg-amber-100 text-amber-700"><AlertTriangle className="size-5" /></span><h2 id="collection-title" className="mt-3 text-xl font-black text-slate-950">Mandatory disposal check</h2><p className="mt-2 text-sm leading-6 text-slate-600">Confirm every container is empty, rinsed, dry and sorted. Contaminated items can spoil a batch and will be rejected.</p><div className="mt-4 rounded-lg bg-eco-50 p-3 text-sm"><div className="flex justify-between"><span>{calculation.quantity} x {calculation.material.rate} item points</span><strong>{calculation.itemPoints}</strong></div><div className="mt-1 flex justify-between"><span>Verified booth visit</span><strong>+{calculation.visitBonus}</strong></div><div className="mt-2 flex justify-between border-t border-eco-200 pt-2 font-black text-eco-900"><span>Estimated award</span><span>{calculation.total} pts</span></div></div><Button className="mt-5 w-full" onClick={onConfirm}><CheckCircle2 className="size-5" /> I confirm items are clean</Button><Button className="mt-2 w-full" variant="ghost" onClick={onClose}>Go back</Button></> : null}

        {phase === "validating" ? <><span className="grid size-11 animate-pulse place-items-center rounded-lg bg-eco-100 text-eco-700"><ShieldCheck className="size-5" /></span><h2 id="collection-title" className="mt-3 text-xl font-black text-slate-950">Validating collection</h2><p className="mt-1 text-sm text-slate-500">Simulated staff review for this academic prototype.</p><div className="mt-5 grid gap-3">{validationSteps.map((step, index) => <div key={step.label} className="flex items-center gap-3"><span className={`grid size-8 place-items-center rounded-full ${index < 2 ? "bg-eco-700 text-white" : "animate-pulse bg-eco-100 text-eco-700"}`}><step.icon className="size-4" /></span><span className="text-sm font-bold text-slate-700">{step.label}</span></div>)}</div><div className="mt-5 h-2 overflow-hidden rounded-full bg-eco-100"><div className="collection-progress h-full rounded-full bg-eco-600" /></div></> : null}

        {phase === "success" ? <><h2 id="collection-title" className="text-center text-xl font-black text-slate-950">Collection approved</h2><ScoreBurst points={calculation.total} /><p className="text-center text-sm leading-6 text-slate-600">The ledger is updated. Your available balance is now <strong>{availablePoints} points</strong>, and the same award remains in lifetime progress.</p><Button className="mt-5 w-full" onClick={onClose}>Continue</Button></> : null}

        {phase === "rejected" ? <><span className="grid size-11 place-items-center rounded-lg bg-red-100 text-red-700"><AlertTriangle className="size-5" /></span><h2 id="collection-title" className="mt-3 text-xl font-black text-slate-950">Item not approved</h2><p className="mt-2 text-sm leading-6 text-slate-600">{reason}</p><p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">No points or visit bonus were awarded.</p><Button className="mt-5 w-full" onClick={onClose}>Choose another item</Button></> : null}
      </div>
    </div>
  );
}
