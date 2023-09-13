import { PageHeader } from "@/components/PageHeader";
import { Leaderboard } from "@/containers/Leaderboard";

export default async function LeaderBoardPage() {
  return (
    <section>
      <PageHeader title="Golf Leaderboard" />
      <Leaderboard />
    </section>
  );
}
