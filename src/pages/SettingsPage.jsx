import { Bell, Camera, CircleHelp, Globe2, Lock, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Card from "../components/ui/Card.jsx";

const settings = [
  { title: "Notifications", value: "Weekly plastic recycling reminder", icon: Bell },
  { title: "Camera permission", value: "Used for QR scanning in a full version", icon: Camera },
  { title: "Location permission", value: "Off - no live location in this prototype", icon: MapPin },
  { title: "Language", value: "English", icon: Globe2 },
  { title: "Privacy", value: "Demo profile only", icon: Lock },
  { title: "Help and SDG 12", value: "Responsible consumption and production", icon: CircleHelp },
  { title: "Prototype mode", value: "No real account or backend", icon: ShieldCheck },
];

export default function SettingsPage() {
  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Journey settings" title="Shape your experience" description="Demo preferences for your recovery missions and profile." />

      <Card variant="tinted" className="mb-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 font-black text-eco-950"><Sparkles className="size-4" /> Demo-only settings</h2>
            <p className="mt-1 text-sm leading-6 text-eco-900">
              These controls are visual placeholders to show how a real recycling app could organize account preferences.
            </p>
          </div>
          <Badge variant="success">MVP</Badge>
        </div>
      </Card>

      <div className="grid gap-3">
        {settings.map((item) => (
          <Card key={item.title} variant="interactive" className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-eco-100 text-eco-700">
              <item.icon className="size-5" />
            </span>
            <div>
              <p className="font-black text-slate-950">{item.title}</p>
              <p className="text-sm text-slate-500">{item.value}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
