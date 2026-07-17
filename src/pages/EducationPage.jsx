import { AlertTriangle, ArrowRight, CheckCircle2, Leaf, Recycle, Sparkles, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import DailyQuestCard from "../components/features/DailyQuestCard.jsx";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import { educationCards } from "../data/mockData.js";
import { plasticRewardRates, VISIT_BONUS } from "../lib/rewardModel.js";

const steps = [
  {
    title: "Check the label",
    text: "Look for common recyclable materials such as PET bottles, HDPE containers, aluminium cans, paper, and cardboard.",
  },
  {
    title: "Empty the item",
    text: "Pour away leftover drinks or food. Wet and oily waste can contaminate the whole bin.",
  },
  {
    title: "Rinse quickly",
    text: "A short rinse is enough for most bottles and containers. They do not need to be perfectly clean.",
  },
  {
    title: "Flatten when possible",
    text: "Flatten bottles and boxes so bins fill more efficiently and collection is easier.",
  },
  {
    title: "Sort by bin label",
    text: "Use the correct bin for plastics, paper, cans, glass, e-waste, or bulky waste.",
  },
];

const acceptedItems = ["Plastic bottles", "Clean food containers", "Aluminium cans", "Paper and cardboard"];
const rejectedItems = ["Food waste", "Oily containers", "Tissues", "Mixed dirty packaging"];

export default function EducationPage() {
  const [checkedSteps, setCheckedSteps] = useState([]);
  const completeStep = (index) => setCheckedSteps((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index]);

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Recycling guide" title="Sort correctly and understand rewards" description="Learn the validation process, material rates, and cleaner plastic preparation." />

      <div className="mb-4"><DailyQuestCard title="Sorting practice" detail="Complete the clean-container checklist" progress={checkedSteps.length} total={steps.length} reward="Practice only - points require a verified deposit" icon={Sparkles} /></div>

      <section id="points-guide" className="mb-5 scroll-mt-28">
        <Card variant="elevated">
          <Badge variant="success">Reward tutorial</Badge>
          <h2 className="mt-2 text-xl font-black text-slate-950">How recycling points work</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">For each approved booth session: <strong>session points = quantity x material rate + {VISIT_BONUS}-point visit bonus</strong>. Unsupported or contaminated items are rejected and earn zero.</p>
          <div className="mt-4 grid gap-2">
            {plasticRewardRates.map((item) => <div key={item.code} className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3"><div><p className="text-sm font-black text-slate-900">{item.shortLabel}</p><p className="mt-0.5 text-xs leading-5 text-slate-500">{item.guidance}</p></div><Badge variant={item.accepted ? "success" : "neutral"}>{item.rate} pts</Badge></div>)}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div className="rounded-lg bg-eco-50 p-2"><p className="text-lg font-black text-eco-900">Q x R</p><p className="text-[0.65rem] font-bold text-eco-700">Item points</p></div><div className="rounded-lg bg-amber-50 p-2"><p className="text-lg font-black text-amber-800">+{VISIT_BONUS}</p><p className="text-[0.65rem] font-bold text-amber-700">Visit bonus</p></div><div className="rounded-lg bg-sky-50 p-2"><p className="text-lg font-black text-sky-900">= Total</p><p className="text-[0.65rem] font-bold text-sky-700">After approval</p></div></div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Available points can be redeemed. Lifetime points never decrease and continue to represent historical verified participation.</p>
        </Card>
      </section>

      <Card variant="elevated" className="mb-4 !bg-eco-800 !text-white">
        <div className="flex gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-white/15">
            <Leaf className="size-6" />
          </span>
          <div>
            <Badge className="mb-2 bg-white/15 text-white">SDG 12</Badge>
            <h2 className="text-xl font-black">A small skill unlocks cleaner recovery.</h2>
            <p className="mt-2 text-sm leading-6 text-eco-50">
              SDG 12 starts before the bin: Refuse unnecessary single-use plastic, Reuse what you can, then recycle accepted clean containers.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-3">
        {educationCards.map((card) => (
          <Card key={card.title} variant="interactive" className="flex gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-100 text-eco-700">
              <card.icon className="size-5" />
            </span>
            <div>
              <h2 className="font-black text-slate-950">{card.title}</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">{card.text}</p>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-5">
        <h2 className="mb-3 text-lg font-black text-slate-950">How to recycle plastic properly</h2>
        <Card variant="elevated">
          <ol className="grid gap-3">
            {steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-3">
                <button type="button" aria-label={`Mark ${step.title} complete`} aria-pressed={checkedSteps.includes(index)} onClick={() => completeStep(index)} className={`grid size-8 shrink-0 place-items-center rounded-lg text-sm font-black transition ${checkedSteps.includes(index) ? "bg-eco-700 text-white" : "bg-eco-100 text-eco-800"}`}>
                  {checkedSteps.includes(index) ? <CheckCircle2 className="size-4" /> : index + 1}
                </button>
                <span>
                  <span className="block text-sm font-black text-slate-900">{step.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Card>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle2 className="size-5 text-eco-700" />
            <h2 className="font-black text-slate-950">Usually accepted</h2>
          </div>
          <ul className="grid gap-2">
            {acceptedItems.map((item) => (
              <li key={item} className="text-sm font-semibold leading-5 text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card variant="elevated">
          <div className="mb-3 flex items-center gap-2">
            <XCircle className="size-5 text-red-600" />
            <h2 className="font-black text-slate-950">Keep out when dirty</h2>
          </div>
          <ul className="grid gap-2">
            {rejectedItems.map((item) => (
              <li key={item} className="text-sm font-semibold leading-5 text-slate-600">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card variant="elevated" className="mt-5">
        <div className="flex gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
            <AlertTriangle className="size-5" />
          </span>
          <div>
            <h2 className="font-black text-slate-950">When unsure, keep it out</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Acceptance changes by facility. If an item is dirty, mixed-material, or not listed on the bin label, check with the location instead of assuming it is recyclable.
            </p>
          </div>
        </div>
      </Card>

      <Card variant="tinted" className="mt-5">
        <div className="flex items-center gap-3">
          <Recycle className="size-7 text-eco-700" />
          <ArrowRight className="size-5 text-eco-400" />
          <CheckCircle2 className="size-7 text-eco-700" />
          <Trash2 className="size-7 text-eco-700" />
          <p className="ml-auto max-w-[8rem] text-right text-xs font-bold text-eco-900">Clean item, correct bin, better recovery.</p>
        </div>
      </Card>
    </div>
  );
}
