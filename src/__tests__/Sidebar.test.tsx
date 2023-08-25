import React from "react";
import { render } from "@testing-library/react";
import { Sidebar } from "@/components/Sidebar";

describe("Sidebar Component", () => {
  test("renders without errors", () => {
    render(<Sidebar />);
  });

  test("contains IconHenry", () => {
    const { getByTestId } = render(<Sidebar />);
    const iconHenry = getByTestId("icon-henry");
    expect(iconHenry).toBeTruthy();
  });

  test("contains IconLeaderboard", () => {
    const { getByTestId } = render(<Sidebar />);
    const iconLeaderboard = getByTestId("icon-leaderboard");
    expect(iconLeaderboard).toBeTruthy();
  });
});
