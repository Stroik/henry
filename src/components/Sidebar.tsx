import Link from "next/link";
import { IconHenry, IconLeaderboard } from "./Icons";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Link href="/">
          <IconHenry />
        </Link>
      </div>
      <nav>
        <Link
          href="/leaderboard"
          className="bg-[#FFE84D] w-12 h-12 flex items-center justify-center rounded-xl"
        >
          <IconLeaderboard />
        </Link>
      </nav>
    </aside>
  );
};
