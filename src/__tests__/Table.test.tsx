import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import { Table } from "@/components/Table";
import { leaderboard } from "@/dummy";

describe("Table Component", () => {
  const mockSetPagination = jest.fn();

  const mockData = leaderboard;

  const mockColumns = [
    {
      accessorKey: "position",
      header: "#",
      cell: (info: any) => info.getValue(),
      maxSize: 40,
    },
    {
      accessorKey: "player_name",
      header: "Name",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "points",
      header: "Points",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "num_wins",
      header: "# of wins",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "num_top_tens",
      header: "# of top10's",
      cell: (info: any) => info.getValue(),
    },
    {
      accessorKey: "num_events",
      header: "# of events",
      cell: (info: any) => info.getValue(),
    },
  ];

  const mockPagination = {
    pageIndex: 0,
    pageSize: 10,
  };

  it("should render correctly", () => {
    const { getByText } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        pagination={mockPagination}
        setPagination={mockSetPagination}
      />
    );

    expect(getByText("Viktor Hovland")).toBeInTheDocument();
    expect(getByText("Vincent Norrman")).toBeInTheDocument();
  });

  it("should handle pagination correctly", () => {
    const { getByTestId } = render(
      <Table
        data={mockData}
        columns={mockColumns}
        pagination={mockPagination}
        setPagination={mockSetPagination}
      />
    );

    fireEvent.click(getByTestId("next-page"));
    const updaterFunction = mockSetPagination.mock.calls[0][0];
    const newPaginationState = updaterFunction(mockPagination);
    expect(newPaginationState.pageIndex).toBe(1);
    mockSetPagination.mockReset();

    fireEvent.click(getByTestId("previous-page"));
    if (mockSetPagination.mock.calls.length > 0) {
      const updaterFunctionPrev = mockSetPagination.mock.calls[0][0];
      const newPaginationStatePrev = updaterFunctionPrev(newPaginationState);
      expect(newPaginationStatePrev.pageIndex).toBe(0);
    }
  });
});
