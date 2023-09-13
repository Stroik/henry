import Link from "next/link";
import { IconHenry, IconLeaderboard } from "./Icons";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Link href="/">
          <IconHenry data-testid="icon-henry" />
        </Link>
      </div>
      <nav>
        <Link
          href="/tour-leaderboard"
          className="bg-[#FFE84D] w-12 h-12 flex items-center justify-center rounded-xl"
        >
          <IconLeaderboard data-testid="icon-leaderboard" />
        </Link>
      </nav>
    </aside>
  );
};
