import { BookOpen, Gift, LockKeyhole, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader.jsx";
import DailyQuestCard from "../components/features/DailyQuestCard.jsx";
import RewardUnlockCelebration from "../components/features/RewardUnlockCelebration.jsx";
import Badge from "../components/ui/Badge.jsx";
import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Modal from "../components/ui/Modal.jsx";
import ProgressBar from "../components/ui/ProgressBar.jsx";
import { useEcoCycle } from "../context/EcoCycleContext.jsx";
import { rewards } from "../data/mockData.js";

export default function RewardsPage() {
  const { stats, redeemReward, redeemedRewardIds } = useEcoCycle();
  const [redeemed, setRedeemed] = useState(null);

  const unlockReward = (reward) => {
    const result = redeemReward(reward);
    if (result.ok) setRedeemed(reward);
  };

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Reward vault" title="Unlock good habits" description="Small rewards celebrate verified recovery, not replace it." />
      <Card variant="elevated" className="mb-4 overflow-hidden !bg-eco-800 !text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-eco-100">Available points</p>
            <p className="text-3xl font-black text-white">{stats.availablePoints}</p>
          </div>
          <span className="grid size-12 place-items-center rounded-lg bg-white/15 text-amber-200">
            <Gift className="size-6" />
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar value={stats.availablePoints} max={stats.nextReward} label="Next vault unlock" tone="light" />
        </div>
        <div className="mt-3 flex justify-between border-t border-white/15 pt-3 text-xs font-semibold text-eco-100"><span>Lifetime {stats.lifetimePoints}</span><span>Redeemed {stats.redeemedPoints}</span></div>
      </Card>

      <div className="mb-4"><DailyQuestCard title="Verified collection" detail="Make one approved booth deposit" progress={Math.min(Math.max(stats.scans - 12, 0), 1)} total={1} reward="Points use the material rate" icon={Star} /></div>

      <Card variant="tinted" className="mb-4">
        <div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-eco-700 text-white"><BookOpen className="size-5" /></span><div><h2 className="font-black text-eco-950">How points are calculated</h2><p className="mt-1 text-sm leading-6 text-eco-900">Accepted item quantity x its material rate + a 5-point verified booth visit bonus.</p><Link to="/app/education#points-guide" className="mt-2 inline-flex text-sm font-black text-eco-800">Open points and sorting guide</Link></div></div>
      </Card>

      <div className="grid gap-3">
        {rewards.map((reward) => {
          const alreadyRedeemed = redeemedRewardIds.includes(reward.id);
          const canRedeem = stats.availablePoints >= reward.points && !alreadyRedeemed;
          return (
            <Card key={reward.id} variant="interactive">
              <div className="flex gap-3">
                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-eco-100 text-eco-700">
                  <reward.icon className="size-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-black text-slate-950">{reward.title}</h2>
                    <Badge variant={canRedeem ? "success" : "neutral"}>{reward.points} pts</Badge>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{reward.description}</p>
                  <Button className="mt-3 w-full" variant={canRedeem ? "primary" : "outline"} onClick={() => unlockReward(reward)} disabled={!canRedeem}>
                    {alreadyRedeemed ? <><Sparkles className="size-4" /> Collected</> : canRedeem ? <><Sparkles className="size-4" /> Unlock reward</> : <><LockKeyhole className="size-4" /> {reward.points - stats.availablePoints} points to go</>}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={Boolean(redeemed)} title="Reward unlocked" actionLabel="View my rewards" onClose={() => setRedeemed(null)}>
        <RewardUnlockCelebration reward={redeemed} />
      </Modal>
    </div>
  );
}
