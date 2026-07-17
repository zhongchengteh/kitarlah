import { createContext, useContext, useMemo, useState } from "react";
import { recentActivities as initialActivities } from "../data/mockData.js";

const EcoCycleContext = createContext(null);

export function EcoCycleProvider({ children }) {
  const [stats, setStats] = useState({
    points: 120,
    scans: 15,
    streak: 5,
    nextReward: 200,
    habitatHealth: 62,
    restoredTrees: 12,
  });
  const [activities, setActivities] = useState(initialActivities);
  const [toast, setToast] = useState(null);

  const addScan = () => {
    const activity = {
      id: crypto.randomUUID(),
      item: "Plastic bottle",
      location: "Community Eco Bin",
      points: 10,
      time: "Just now",
    };

    setStats((current) => ({
      ...current,
      points: current.points + 10,
      scans: current.scans + 1,
      habitatHealth: Math.min(100, current.habitatHealth + 4),
      restoredTrees: current.restoredTrees + 1,
    }));
    setActivities((current) => [activity, ...current].slice(0, 5));
    setToast({ title: "Plastic recycled successfully!", message: "Your virtual habitat grew healthier" });
  };

  const value = useMemo(
    () => ({
      stats,
      activities,
      toast,
      addScan,
      clearToast: () => setToast(null),
    }),
    [stats, activities, toast]
  );

  return <EcoCycleContext.Provider value={value}>{children}</EcoCycleContext.Provider>;
}

export function useEcoCycle() {
  const context = useContext(EcoCycleContext);
  if (!context) {
    throw new Error("useEcoCycle must be used within EcoCycleProvider");
  }
  return context;
}
