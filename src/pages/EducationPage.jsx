import { AlertTriangle, ArrowRight, CheckCircle2, Leaf, Recycle, Trash2, XCircle } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";
import { educationCards } from "../data/mockData.js";

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
  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Plastic learning" title="Make plastic recovery count" description="Use the 7 Rs and local guidance to avoid contamination." />

      <Card variant="elevated" className="mb-4 !bg-eco-800 !text-white">
        <div className="flex gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-white/15">
            <Leaf className="size-6" />
          </span>
          <div>
            <Badge className="mb-2 bg-white/15 text-white">SDG 12</Badge>
            <h2 className="text-xl font-black">Responsible consumption starts with everyday choices.</h2>
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
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-eco-100 text-sm font-black text-eco-800">
                  {index + 1}
                </span>
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
