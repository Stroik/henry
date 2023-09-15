import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "@/components/PageHeader";

describe("PageHeader", () => {
  it("It should render the title", () => {
    const title = "My Page Title";
    render(<PageHeader title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("It should render the subtitle if provided", () => {
    const title = "My Page Title";
    const subtitle = "My Page Subtitle";
    render(<PageHeader title={title} subtitle={subtitle} />);
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it("It should not render the subtitle if not provided", () => {
    const title = "My Page Title";
    render(<PageHeader title={title} />);
    expect(screen.queryByText("My Page Subtitle")).toBeNull();
  });
});
