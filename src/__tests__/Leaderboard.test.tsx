import { render, fireEvent } from "@testing-library/react";
import { Leaderboard } from "../containers/Leaderboard";
import { leaderboard } from "@/dummy";

describe("Leaderboard Component", () => {
  const data: any[] = leaderboard;

  test("renders without errors", () => {
    render(<Leaderboard data={data} />);
  });

  test("filters change state correctly", () => {
    const { getByTestId } = render(<Leaderboard data={data} />);

    const tourDropdown = getByTestId("tour") as HTMLSelectElement;
    fireEvent.change(tourDropdown, { target: { value: "2" } });
    expect(tourDropdown.value).toBe("2");

    const seasonDropdown = getByTestId("seasson") as HTMLSelectElement;
    fireEvent.change(seasonDropdown, { target: { value: "3" } });
    expect(seasonDropdown.value).toBe("3");
  });
});
