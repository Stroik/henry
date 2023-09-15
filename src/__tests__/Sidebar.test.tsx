import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { Sidebar } from "@/components/Sidebar";

const getLastPath = (url: string) => {
  const paths = url.split("/");
  return paths[paths.length - 1];
};

describe("Sidebar Component", () => {
  it("it should render without errors", () => {
    const { getByTestId } = render(<Sidebar />);
    expect(getByTestId("sidebar")).toBeInTheDocument();
  });

  it("<IconHenry /> should be in the <Sidebar />", () => {
    const { getByTestId } = render(<Sidebar />);
    const iconHenry = getByTestId("icon-henry");
    expect(iconHenry).toBeInTheDocument();
  });

  it("<IconLeaderboard /> should be in <Sidebar />", () => {
    const { getByTestId } = render(<Sidebar />);
    const iconLeaderboard = getByTestId("icon-leaderboard");
    expect(iconLeaderboard).toBeInTheDocument();
  });

  it("it should contain the correct link to the homepage /", () => {
    const { getByTestId } = render(<Sidebar />);
    const linkToHome = getByTestId("link-to-home") as HTMLAnchorElement;
    expect(linkToHome.href[linkToHome.href.length - 1]).toEqual("/");
  });

  it("it should contain the correct link to the tour-leaderboard", () => {
    const { getByTestId } = render(<Sidebar />);
    const linkToLeaderboard = getByTestId(
      "link-to-leaderboard"
    ) as HTMLAnchorElement;
    expect(getLastPath(linkToLeaderboard.href)).toEqual("tour-leaderboard");
  });
});
