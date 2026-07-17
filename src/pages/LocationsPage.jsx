import { ExternalLink, Flag, MapPin, Recycle } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import DailyQuestCard from "../components/features/DailyQuestCard.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import { locations } from "../data/mockData.js";

export default function LocationsPage() {
  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Recovery map" title="Choose your next stop" description="Discover plastic-only collection points and complete local recovery routes." />

      <div className="mb-4"><DailyQuestCard title="Location quest" detail="Visit a QR-enabled recovery booth" progress={0} total={1} reward="+15 leaf points" icon={Flag} /></div>

      <Card variant="tinted" className="mb-4">
        <div className="flex gap-3">
          <MapPin className="mt-0.5 size-5 shrink-0 text-eco-700" />
          <p className="text-sm leading-6 text-eco-900">
            QR-enabled booths can validate plastic entries. Opening hours and accepted plastic types are mock information; always check the location label.
          </p>
        </div>
      </Card>

      <div className="grid gap-3">
        {locations.map((location) => (
          <Card key={location.id} variant="interactive">
            <img src={`${import.meta.env.BASE_URL}${location.image}`} alt="" className="mb-4 aspect-[2/1] w-full rounded-lg border border-eco-100 bg-eco-50 object-cover" />
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <div className="flex flex-wrap gap-2"><Badge variant={location.category.includes("Bulky") ? "warning" : "success"}>{location.category}</Badge>{location.qrEnabled ? <Badge variant="info">Quest-ready</Badge> : null}</div>
                <h2 className="mt-2 text-lg font-black text-slate-950">{location.name}</h2>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-100 text-eco-700">
                <Recycle className="size-5" />
              </span>
            </div>
            <dl className="grid gap-2 text-sm leading-6 text-slate-600">
              <div>
                <dt className="font-bold text-slate-800">Address</dt>
                <dd>{location.address}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-800">Operating hours</dt>
                <dd>{location.hours}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-800">Accepted plastic types</dt>
                <dd>{location.types.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-800">Distance and QR</dt>
                <dd>{location.distance} - {location.qrEnabled ? "QR-enabled booth" : "No QR verification"}</dd>
              </div>
            </dl>
            <a href={location.map} target="_blank" rel="noreferrer">
              <Button className="mt-4 w-full" variant="secondary">
                Open Google Maps <ExternalLink className="size-4" />
              </Button>
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
}
