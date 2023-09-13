import "dotenv/config";
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

  test("the Link to the home page has the correct href", () => {
    const { getByTestId } = render(<Sidebar />);
    const linkToHome = getByTestId("link-to-home") as HTMLAnchorElement;
    expect(linkToHome.href).toEqual(process.env.URL + "/");
  });

  test("the Link to the leaderboard has the correct href", () => {
    const { getByTestId } = render(<Sidebar />);
    const linkToLeaderboard = getByTestId(
      "link-to-leaderboard"
    ) as HTMLAnchorElement;
    expect(linkToLeaderboard.href).toEqual(
      process.env.URL + "/tour-leaderboard"
    );
  });
});
