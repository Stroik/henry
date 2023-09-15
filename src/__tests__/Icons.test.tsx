import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import {
  IconHenry,
  IconLeaderboard,
  IconArrowDown,
  IconArrowRight,
  IconArrowLeft,
} from "@/components/Icons";

describe("Icon Components", () => {
  it("<IconHenry /> should renders without errors", () => {
    const { getByTestId } = render(<IconHenry />);
    expect(getByTestId("icon-henry")).toBeInTheDocument();
  });

  it("<IconLeaderboard /> should renders without errors", () => {
    const { getByTestId } = render(<IconLeaderboard />);
    expect(getByTestId("icon-leaderboard")).toBeInTheDocument();
  });

  it("<IconArrowDown /> should renders without errors", () => {
    const { getByTestId } = render(<IconArrowDown />);
    expect(getByTestId("icon-arrow-down")).toBeInTheDocument();
  });

  it("<IconArrowRight /> should renders without errors", () => {
    const { getByTestId } = render(<IconArrowRight />);
    expect(getByTestId("icon-arrow-right")).toBeInTheDocument();
  });

  it("<IconArrowLeft /> should renders without errors", () => {
    const { getByTestId } = render(<IconArrowLeft />);
    expect(getByTestId("icon-arrow-left")).toBeInTheDocument();
  });
});
