"use client";

import { IconArrowDown } from "@/components/Icons";
import { Table } from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

export const Leaderboard = ({ data }: { data: any[] }) => {
  const [tour, setTour] = useState("");
  const [seasson, setSeasson] = useState("");

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("index", {
      header: "#",
      cell: ({ row }) => row.index + 1,
      maxSize: 40,
    }),
    columnHelper.accessor("player_name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("points", {
      header: "Points",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("num_wins", {
      header: "# of wins",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("num_top_tens", {
      header: "# of top10's",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("num_events", {
      header: "# of events",
      cell: (info) => info.getValue(),
    }),
  ];
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
            onChange={(e) => setTour(e.target.value)}
            data-testid="tour"
          >
            <option value="" disabled>
              Tour
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="seasson">
            <IconArrowDown />
          </label>
          <select
            name="seasson"
            id="seasson"
            value={seasson}
            onChange={(e) => setSeasson(e.target.value)}
            data-testid="seasson"
          >
            <option value="" disabled>
              Seasson
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  );
};
