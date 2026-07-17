import { Gift, LockKeyhole, Sparkles, Star } from "lucide-react";
import { useState } from "react";
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
  const { stats } = useEcoCycle();
  const [redeemed, setRedeemed] = useState(null);

  return (
    <div className="animate-rise">
      <PageHeader eyebrow="Reward vault" title="Unlock good habits" description="Small rewards celebrate verified recovery, not replace it." />
      <Card variant="elevated" className="mb-4 overflow-hidden !bg-eco-800 !text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-eco-100">Leaf points collected</p>
            <p className="text-3xl font-black text-white">{stats.points}</p>
          </div>
          <span className="grid size-12 place-items-center rounded-lg bg-white/15 text-amber-200">
            <Gift className="size-6" />
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar value={stats.points} max={stats.nextReward} label="Next vault unlock" tone="light" />
        </div>
      </Card>

      <div className="mb-4"><DailyQuestCard title="Bonus mission" detail="Make one verified scan today" progress={0} total={1} reward="+10 leaf points" icon={Star} /></div>

      <div className="grid gap-3">
        {rewards.map((reward) => {
          const canRedeem = stats.points >= reward.points;
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
                  <Button className="mt-3 w-full" variant={canRedeem ? "primary" : "outline"} onClick={() => setRedeemed(reward)} disabled={!canRedeem}>
                    {canRedeem ? <><Sparkles className="size-4" /> Unlock reward</> : <><LockKeyhole className="size-4" /> {reward.points - stats.points} points to go</>}
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
