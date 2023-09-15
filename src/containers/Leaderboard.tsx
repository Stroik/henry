"use client";

import { IconArrowDown } from "@/components/Icons";
import { Table } from "@/components/Table";
import { useMemo, useState } from "react";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import type { Ranking } from "@/types/Ranking";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";
import { useLeaderboard } from "@/hooks/useLeaderboard";

export const Leaderboard = () => {
  const [tour, setTour] = useState<number>(1);
  const [season, setSeason] = useState<number>(2023);

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    tourId: tour,
    season: season,
  };

  const { data, isLoading } = useLeaderboard(fetchDataOptions);

  const defaultData = useMemo(() => [], []);
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const columns = useMemo<ColumnDef<Ranking>[]>(
    () => [
      {
        accessorKey: "position",
        header: "#",
        cell: (info) => info.getValue(),
        maxSize: 40,
      },
      {
        accessorKey: "player_name",
        header: "Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "points",
        header: "Points",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "num_wins",
        header: "# of wins",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "num_top_tens",
        header: "# of top10's",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "num_events",
        header: "# of events",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return (
    <div className="leaderboard">
      <div className="filters">
        <div className="dropdown">
          <label htmlFor="tour">
            <IconArrowDown />
          </label>
          <select
            name="tour"
            id="tour"
            value={tour}
            onChange={(e) => setTour(e.target.value as any)}
            data-testid="tour"
          >
            <option value="" disabled>
              Tour
            </option>
            {Array.from({ length: 2 }).map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="season">
            <IconArrowDown />
          </label>
          <select
            name="season"
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value as any)}
            data-testid="season"
          >
            <option value="" disabled>
              Season
            </option>
            {Array.from({ length: 4 }).map((_, i) => (
              <option key={i} value={2023 - i}>
                {2023 - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading && <TableSkeleton />}
      {data && (
        <Table
          columns={columns}
          data={data ?? defaultData}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
    </div>
  );
};
