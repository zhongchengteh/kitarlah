import { createContext, useContext, useMemo, useState } from "react";
import { recentActivities as initialActivities } from "../data/mockData.js";
import { calculateSessionPoints } from "../lib/rewardModel.js";

const EcoCycleContext = createContext(null);
const makeId = () => (crypto.randomUUID ? crypto.randomUUID() : `scan-${Date.now()}`);

export function EcoCycleProvider({ children }) {
  const [stats, setStats] = useState({ availablePoints: 120, lifetimePoints: 120, redeemedPoints: 0, scans: 12, streak: 5, nextReward: 200, verifiedItems: 12, goalItems: 20, recycledWeightKg: 3.8, learningProgress: 2 });
  const [activities, setActivities] = useState(initialActivities);
  const [usedSessions, setUsedSessions] = useState([]);
  const [toast, setToast] = useState(null);
  const [redeemedRewardIds, setRedeemedRewardIds] = useState([]);

  const verifyScan = (sessionId, details) => {
    if (!sessionId || usedSessions.includes(sessionId)) return { ok: false, reason: "This QR session has already been used in the prototype." };
    const calculation = calculateSessionPoints(details.plasticCode, details.quantity);
    if (!calculation.material.accepted) return { ok: false, reason: calculation.material.guidance, rejected: true };
    const quantity = calculation.quantity;
    const weight = Number(details.weight) || 0.1;
    const points = calculation.total;
    const activity = { id: makeId(), item: details.plasticType, location: details.location, points, time: "Just now", status: "Verified", quantity, weight };
    setUsedSessions((current) => [...current, sessionId]);
    setStats((current) => ({ ...current, availablePoints: current.availablePoints + points, lifetimePoints: current.lifetimePoints + points, scans: current.scans + 1, verifiedItems: Math.min(current.goalItems, current.verifiedItems + quantity), recycledWeightKg: Number((current.recycledWeightKg + weight).toFixed(2)) }));
    setActivities((current) => [activity, ...current].slice(0, 5));
    setToast({ title: `+${points} leaf points earned`, message: "Verified entry complete. Your recovery world has changed." });
    return { ok: true, activity, calculation };
  };

  const redeemReward = (reward) => {
    if (!reward || redeemedRewardIds.includes(reward.id)) return { ok: false, reason: "This reward is already in your collection." };
    if (stats.availablePoints < reward.points) return { ok: false, reason: "Not enough available points." };
    setStats((current) => ({ ...current, availablePoints: current.availablePoints - reward.points, redeemedPoints: current.redeemedPoints + reward.points }));
    setRedeemedRewardIds((current) => [...current, reward.id]);
    setToast({ title: "Reward added to your collection", message: `${reward.points} available points were redeemed. Lifetime progress stays unchanged.` });
    return { ok: true };
  };

  const value = useMemo(() => ({ stats, activities, toast, redeemedRewardIds, verifyScan, redeemReward, clearToast: () => setToast(null) }), [stats, activities, toast, usedSessions, redeemedRewardIds]);
  return <EcoCycleContext.Provider value={value}>{children}</EcoCycleContext.Provider>;
}

export function useEcoCycle() {
  const context = useContext(EcoCycleContext);
  if (!context) throw new Error("useEcoCycle must be used within EcoCycleProvider");
  return context;
}
