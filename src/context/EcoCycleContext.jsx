import { createContext, useContext, useMemo, useState } from "react";
import { recentActivities as initialActivities } from "../data/mockData.js";

const EcoCycleContext = createContext(null);
const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : `scan-${Date.now()}`);

export function EcoCycleProvider({ children }) {
  const [stats, setStats] = useState({ points: 120, scans: 12, streak: 5, nextReward: 200, verifiedItems: 12, goalItems: 20, recycledWeightKg: 3.8, learningProgress: 2 });
  const [activities, setActivities] = useState(initialActivities);
  const [usedSessions, setUsedSessions] = useState([]);
  const [toast, setToast] = useState(null);

  const verifyScan = (sessionId, details) => {
    if (!sessionId || usedSessions.includes(sessionId)) return { ok: false, reason: "This QR session has already been used in the prototype." };
    const quantity = Number(details.quantity) || 1;
    const weight = Number(details.weight) || 0.1;
    const points = quantity * 10;
    const activity = { id: makeId(), item: details.plasticType, location: details.location, points, time: "Just now", status: "Verified", quantity, weight };
    setUsedSessions((current) => [...current, sessionId]);
    setStats((current) => ({ ...current, points: current.points + points, scans: current.scans + 1, verifiedItems: Math.min(current.goalItems, current.verifiedItems + quantity), recycledWeightKg: Number((current.recycledWeightKg + weight).toFixed(2)) }));
    setActivities((current) => [activity, ...current].slice(0, 5));
    setToast({ title: `+${points} leaf points earned`, message: "Verified entry complete. Your recovery world has changed." });
    return { ok: true, activity };
  };

  const value = useMemo(() => ({ stats, activities, toast, verifyScan, clearToast: () => setToast(null) }), [stats, activities, toast, usedSessions]);
  return <EcoCycleContext.Provider value={value}>{children}</EcoCycleContext.Provider>;
}

export function useEcoCycle() {
  const context = useContext(EcoCycleContext);
  if (!context) throw new Error("useEcoCycle must be used within EcoCycleProvider");
  return context;
}
