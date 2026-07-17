import { CheckCircle2, QrCode, ScanLine } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/layout/PageHeader.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Modal from "../components/ui/Modal.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";

export default function ScanPage() {
  const { addScan, stats } = useEcoCycle();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleScan = () => {
    setScanning(true);
    window.setTimeout(() => {
      addScan();
      setScanning(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="QR scanner" title="Scan recycling bin" description="Simulated camera flow for presentation demos." />

      <Card variant="elevated" className="overflow-hidden p-0">
        <div className="bg-slate-950 p-5 text-white">
          <div className="relative mx-auto aspect-[4/5] max-w-[280px] overflow-hidden rounded-lg border border-white/20 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.26),rgba(15,23,42,1)_58%)]">
            <div className="absolute inset-8 rounded-lg border-2 border-eco-300/90" />
            <div className="absolute left-8 right-8 top-8 h-1 bg-eco-300 shadow-[0_0_24px_rgba(134,239,172,0.9)] animate-scan" />
            <QrCode className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 text-white/55" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-white/10 p-3 text-center backdrop-blur">
              <p className="text-xs font-semibold text-eco-100">{scanning ? "Scanning QR code..." : "Align bin QR inside frame"}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-950">Current habitat</p>
              <p className="text-2xl font-black text-eco-800">{stats.habitatHealth}%</p>
              <p className="text-xs font-semibold text-slate-500">Habitat health</p>
            </div>
            <Badge variant="info">Demo mode</Badge>
          </div>
          <Button className="w-full" size="lg" onClick={handleScan} disabled={scanning}>
            {scanning ? <ScanLine className="size-5 animate-pulse" /> : <QrCode className="size-5" />}
            {scanning ? "Scanning..." : "Scan QR"}
          </Button>
        </div>
      </Card>

      <Card variant="tinted" className="mt-4">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-eco-700" />
          <p className="text-sm leading-6 text-eco-900">
            This prototype does not use a real camera or QR validator. The button simulates a successful plastic recycling scan.
          </p>
        </div>
      </Card>

      <Modal open={success} title="Plastic recycled successfully!" actionLabel="View greener world" onClose={() => setSuccess(false)}>
        Your entry helped the virtual environment recover. The home page habitat is now cleaner and more alive.
      </Modal>
    </div>
  );
}
