import { render, fireEvent } from "@testing-library/react";
import { Table } from "@/components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { leaderboard } from "../dummy";

describe("Table Component", () => {
  let data: any[] = leaderboard;

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

  test("renders without errors", () => {
    render(<Table columns={columns} data={data} />);
  });

  test("renders the correct number of rows", () => {
    const { getAllByRole } = render(<Table columns={columns} data={data} />);
    const rows = getAllByRole("row");
    expect(rows.length).toBe(data.length + 1);
  });

  test("clicking pagination buttons changes the page", () => {
    const { getByTestId } = render(<Table columns={columns} data={data} />);

    const previousButton = getByTestId("previous-page");
    fireEvent.click(previousButton);

    const nextButton = getByTestId("next-page");
    fireEvent.click(nextButton);
  });
});
