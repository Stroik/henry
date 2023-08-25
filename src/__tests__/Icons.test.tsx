import { render } from "@testing-library/react";
import {
  IconHenry,
  IconLeaderboard,
  IconArrowDown,
  IconArrowRight,
  IconArrowLeft,
} from "../components/Icons";

describe("Icon Components", () => {
  test("IconHenry renders without errors", () => {
    render(<IconHenry />);
  });

  test("IconLeaderboard renders without errors", () => {
    render(<IconLeaderboard />);
  });

  test("IconArrowDown renders without errors", () => {
    render(<IconArrowDown />);
  });

  test("IconArrowRight renders without errors", () => {
    render(<IconArrowRight />);
  });

  test("IconArrowLeft renders without errors", () => {
    render(<IconArrowLeft />);
  });
});
