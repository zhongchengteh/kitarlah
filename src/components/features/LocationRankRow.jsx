import { MapPin, Recycle, Scale } from "lucide-react";
import Card from "../ui/Card.jsx";

export default function LocationRankRow({ location, baseUrl }) {
  return (
    <Card variant="interactive" className="flex max-w-full items-center gap-2 overflow-hidden p-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-eco-50 text-sm font-black text-eco-800 ring-1 ring-eco-100">
        {location.rank}
      </span>
      <img
        src={`${baseUrl}${location.image}`}
        alt=""
        className="size-10 shrink-0 rounded-lg bg-mint object-cover ring-1 ring-eco-100"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-slate-950">{location.name}</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="size-3 text-eco-700" />
          {location.area}
        </p>
      </div>
      <div className="shrink-0 text-right text-xs">
        <p className="flex items-center justify-end gap-1 text-sm font-black text-slate-950">
          <Recycle className="size-3.5 text-eco-700" />
          {location.entries}
        </p>
        <p className="flex items-center justify-end gap-1 text-xs font-medium text-slate-500">
          <Scale className="size-3" />
          {location.weight} kg
        </p>
      </div>
    </Card>
  );
}
