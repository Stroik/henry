import Link from "next/link";
import { IconHenry, IconLeaderboard } from "./Icons";

export const Sidebar = () => {
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="brand">
        <Link href="/" data-testid="link-to-home">
          <IconHenry data-testid="icon-henry" />
        </Link>
      </div>
      <nav>
        <Link
          href="/tour-leaderboard"
          className="bg-[#FFE84D] w-12 h-12 flex items-center justify-center rounded-xl"
          data-testid="link-to-leaderboard"
        >
          <IconLeaderboard data-testid="icon-leaderboard" />
        </Link>
      </nav>
    </aside>
  );
};
