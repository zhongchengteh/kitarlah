import { Camera, CheckCircle2, ImagePlus, QrCode, ScanLine, ShieldCheck } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import InputField from "../components/ui/InputField.jsx";
import Modal from "../components/ui/Modal.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";

const sessionId = () => `BIN-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export default function ScanPage() {
  const { verifyScan, stats } = useEcoCycle();
  const [scanning, setScanning] = useState(false);
  const [session, setSession] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ plasticType: "PET bottle", quantity: "1", weight: "0.1", evidence: false });

  const beginScan = () => {
    setScanning(true); setError("");
    window.setTimeout(() => { setSession({ id: sessionId(), location: "Community Eco Bin Station", expires: "Valid for 5 minutes" }); setScanning(false); }, 850);
  };
  const verify = () => {
    const result = verifyScan(session.id, { ...form, location: session.location });
    if (!result.ok) { setError(result.reason); return; }
    setSuccess(true); setSession(null);
  };

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="QR verification" title="Scan plastic QR" description="Record a plastic recycling entry for this prototype." />
      <Card variant="elevated" className="overflow-hidden p-0">
        <div className="bg-slate-950 p-5 text-white">
          <div className="relative mx-auto aspect-[4/5] max-w-[280px] overflow-hidden rounded-lg border border-white/20 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.26),rgba(15,23,42,1)_58%)]">
            <div className="absolute inset-8 rounded-lg border-2 border-eco-300/90" />
            <div className="absolute left-8 right-8 top-8 h-1 bg-eco-300 shadow-[0_0_24px_rgba(134,239,172,0.9)] animate-scan" />
            <QrCode className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/55" />
            <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/10 p-3 text-center text-xs font-semibold text-eco-100 backdrop-blur">{scanning ? "Reading QR..." : session ? "QR booth identified" : "Align bin QR inside frame"}</p>
          </div>
        </div>
        <div className="p-4">
          {!session ? <Button className="w-full" size="lg" onClick={beginScan} disabled={scanning}>{scanning ? <ScanLine className="size-5 animate-pulse" /> : <Camera className="size-5" />}{scanning ? "Scanning..." : "Scan physical bin QR"}</Button> : <div className="rounded-lg bg-eco-50 p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-black text-eco-950">{session.location}</p><p className="mt-1 text-xs text-eco-800">Session {session.id} - {session.expires}</p></div><Badge variant="success">QR enabled</Badge></div></div>}
        </div>
      </Card>

      {session ? <Card variant="elevated" className="mt-4"><div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-eco-100 text-eco-700"><ShieldCheck className="size-5" /></span><div><h2 className="font-black text-slate-950">Confirm plastic entry</h2><p className="text-xs leading-5 text-slate-500">Prototype validation: one local use per QR session.</p></div></div><div className="grid gap-3"><label className="grid gap-1 text-sm font-bold text-slate-800">Plastic type<select value={form.plasticType} onChange={(event) => setForm({ ...form, plasticType: event.target.value })} className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-eco-500"><option>PET bottle</option><option>HDPE container</option><option>Plastic cup</option><option>Clean food container</option></select></label><div className="grid grid-cols-2 gap-3"><InputField label="Quantity" type="number" min="1" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /><InputField label="Estimated kg" type="number" min="0.1" step="0.1" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} /></div><label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-eco-200 bg-eco-50 p-3 text-sm font-semibold text-eco-900"><ImagePlus className="size-5" /><span className="flex-1">Optional photo evidence</span><input type="file" accept="image/*" className="sr-only" onChange={(event) => setForm({ ...form, evidence: Boolean(event.target.files?.[0]) })} /><Badge variant={form.evidence ? "success" : "neutral"}>{form.evidence ? "Attached" : "Optional"}</Badge></label>{error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}<Button className="w-full" size="lg" onClick={verify}><CheckCircle2 className="size-5" /> Verify plastic entry</Button></div></Card> : null}

      <Card variant="tinted" className="mt-4"><p className="text-sm leading-6 text-eco-950">Empty, rinse and dry the container. Check the plastic resin/type accepted by this location. This is prototype validation, not production-grade fraud prevention.</p></Card>
      <Modal open={success} title="Plastic entry verified" actionLabel="See recovery world" onClose={() => setSuccess(false)}>Your verified entry has updated your motivational recovery world. You now have {stats.verifiedItems} verified plastic items. Points were added as a secondary reward.</Modal>
    </div>
  );
}
