import { PageHeader } from "@/components/PageHeader";
import { render } from "@testing-library/react";

describe("PageHeader", () => {
  it("renders title and subtitle correctly", () => {
    const props = {
      title: "Test Title",
      subtitle: "Test Subtitle",
    };

    const { getByText } = render(<PageHeader {...props} />);

    const titleElement = getByText("Test Title");
    const subtitleElement = getByText("Test Subtitle");

    expect(titleElement).toBeTruthy();
    expect(subtitleElement).toBeTruthy();
  });

  it("renders only title when no subtitle is provided", () => {
    const props = {
      title: "Test Title",
    };

    const { getByText, queryByText } = render(<PageHeader {...props} />);

    const titleElement = getByText("Test Title");
    const subtitleElement = queryByText("Test Subtitle");

    expect(titleElement).toBeTruthy();
    expect(subtitleElement).toBeNull();
  });
});
