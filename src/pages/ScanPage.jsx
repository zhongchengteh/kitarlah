import { Camera, CheckCircle2, QrCode, ScanLine, ShieldCheck, Sparkles, Upload } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import InputField from "../components/ui/InputField.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";
import CollectionSimulationModal from "../components/features/CollectionSimulationModal.jsx";
import { calculateSessionPoints, plasticRewardRates } from "../lib/rewardModel.js";

const sessionId = () => `BIN-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

export default function ScanPage() {
  const { verifyScan, stats } = useEcoCycle();
  const cameraInputRef = useRef(null);
  const uploadInputRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [session, setSession] = useState(null);
  const [simulationPhase, setSimulationPhase] = useState(null);
  const [validationReason, setValidationReason] = useState("");
  const [error, setError] = useState("");
  const [evidenceLabel, setEvidenceLabel] = useState("");
  const [form, setForm] = useState({ plasticCode: "PET_01", quantity: "1", weight: "0.1", evidence: false });
  const calculation = useMemo(() => calculateSessionPoints(form.plasticCode, form.quantity), [form.plasticCode, form.quantity]);

  const beginScan = () => {
    setScanning(true);
    setError("");
    setEvidenceLabel("");
    setForm((current) => ({ ...current, evidence: false }));
    window.setTimeout(() => {
      setSession({ id: sessionId(), location: "Community Eco Bin Station", expires: "Valid for 5 minutes" });
      setScanning(false);
    }, 850);
  };

  const selectEvidence = (event, source) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setForm({ ...form, evidence: true });
    setEvidenceLabel(source === "camera" ? "Photo captured" : "Photo uploaded");
    setError("");
  };

  const beginValidation = () => {
    if (!form.evidence) {
      setError("Photo evidence is required before this entry can be verified.");
      return;
    }
    setSimulationPhase("cleanliness");
  };

  useEffect(() => {
    if (simulationPhase !== "validating") return undefined;
    const timer = window.setTimeout(() => {
      const result = verifyScan(session?.id, { ...form, plasticType: calculation.material.shortLabel, location: session?.location });
      if (result.ok) {
        setSession(null);
        setSimulationPhase("success");
      } else {
        setValidationReason(result.reason);
        setSimulationPhase("rejected");
      }
    }, 1650);
    return () => window.clearTimeout(timer);
  }, [simulationPhase]);

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Recovery mission" title="Scan plastic QR" description="Verify a clean plastic item to grow your recovery world." />

      <Card variant="elevated" className="overflow-hidden p-0">
        <div className="bg-slate-950 p-5 text-white">
          <div className="relative mx-auto aspect-[4/5] max-w-[280px] overflow-hidden rounded-lg border border-white/20 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.26),rgba(15,23,42,1)_58%)]">
            <div className="absolute inset-8 rounded-lg border-2 border-eco-300/90" />
            <div className="absolute left-8 right-8 top-8 h-1 animate-scan bg-eco-300 shadow-[0_0_24px_rgba(134,239,172,0.9)]" />
            <QrCode className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/55" />
            <p className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/10 p-3 text-center text-xs font-semibold text-eco-100 backdrop-blur">{scanning ? "Reading QR..." : session ? "QR booth identified" : "Align bin QR inside frame"}</p>
          </div>
        </div>
        <div className="p-4">
          {!session ? <Button className="w-full" size="lg" onClick={beginScan} disabled={scanning}>{scanning ? <ScanLine className="size-5 animate-pulse" /> : <Camera className="size-5" />}{scanning ? "Finding the booth..." : "Start scan mission"}</Button> : <div className="rounded-lg bg-eco-50 p-3"><div className="flex items-start justify-between gap-3"><div><p className="font-black text-eco-950">{session.location}</p><p className="mt-1 text-xs text-eco-800">Session {session.id} - {session.expires}</p></div><Badge variant="success"><Sparkles className="mr-1 size-3" /> Quest live</Badge></div></div>}
        </div>
      </Card>

      {session ? <Card variant="elevated" className="mt-4">
        <div className="mb-4 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-lg bg-eco-100 text-eco-700"><ShieldCheck className="size-5" /></span><div><h2 className="font-black text-slate-950">Confirm plastic entry</h2><p className="text-xs leading-5 text-slate-500">Prototype validation: one local use per QR session.</p></div></div>
        <div className="grid gap-3">
          <label className="grid gap-1 text-sm font-bold text-slate-800">Plastic type<select value={form.plasticCode} onChange={(event) => setForm({ ...form, plasticCode: event.target.value })} className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none focus:border-eco-500">{plasticRewardRates.map((item) => <option key={item.code} value={item.code}>{item.label} - {item.rate} pts</option>)}</select></label>
          <div className="grid grid-cols-2 gap-3"><InputField label="Quantity" type="number" min="1" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: event.target.value })} /><InputField label="Estimated kg" type="number" min="0.1" step="0.1" value={form.weight} onChange={(event) => setForm({ ...form, weight: event.target.value })} /></div>
          <div className={`rounded-lg p-3 ${calculation.material.accepted ? "bg-eco-50 text-eco-950" : "bg-red-50 text-red-800"}`}><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold">Estimated verified award</span><strong className="text-lg">{calculation.total} pts</strong></div><p className="mt-1 text-xs leading-5">{calculation.material.accepted ? `${calculation.itemPoints} item points + ${calculation.visitBonus} booth visit bonus` : calculation.material.guidance}</p></div>
          <div className={`rounded-lg border border-dashed p-3 ${form.evidence ? "border-eco-200 bg-eco-50" : "border-amber-300 bg-amber-50"}`}>
            <div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-900">Photo evidence</p><Badge variant={form.evidence ? "success" : "warning"}>{evidenceLabel || "Required"}</Badge></div>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => cameraInputRef.current?.click()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-eco-700 px-3 text-sm font-bold text-white transition hover:bg-eco-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><Camera className="size-4" /> Take photo</button>
              <button type="button" onClick={() => uploadInputRef.current?.click()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-eco-200 bg-white px-3 text-sm font-bold text-eco-800 transition hover:bg-eco-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-eco-500"><Upload className="size-4" /> Upload</button>
            </div>
            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="sr-only" onChange={(event) => selectEvidence(event, "camera")} />
            <input ref={uploadInputRef} type="file" accept="image/*" className="sr-only" onChange={(event) => selectEvidence(event, "upload")} />
          </div>
          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
          <Button className="w-full" size="lg" onClick={beginValidation} disabled={!form.evidence}><CheckCircle2 className="size-5" /> {form.evidence ? "Submit for validation" : "Add photo to verify"}</Button>
        </div>
      </Card> : null}

      <Card variant="tinted" className="mt-4"><p className="text-sm leading-6 text-eco-950">Empty, rinse and dry the container. Check the plastic resin/type accepted by this location. This is prototype validation, not production-grade fraud prevention.</p></Card>
      <CollectionSimulationModal phase={simulationPhase} calculation={calculation} reason={validationReason} availablePoints={stats.availablePoints} onConfirm={() => setSimulationPhase("validating")} onClose={() => setSimulationPhase(null)} />
    </div>
  );
}
