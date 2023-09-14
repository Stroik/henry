import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { Leaderboard } from "@/containers/Leaderboard";
import { leaderboard } from "../dummy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

beforeAll(() => {
  if (!global.fetch) {
    global.fetch = require("node-fetch");
  }
});

describe("Leaderboard", () => {
  it("it should render the leaderboard component and display data", async () => {
    nock("https://localhost:3000")
      .get("/tour-ranking")
      .query(true)
      .reply(200, leaderboard);

    render(
      <QueryClientProvider client={queryClient}>
        <Leaderboard />
      </QueryClientProvider>
    );

    expect(screen.getByTestId("tour")).toBeInTheDocument();
    expect(screen.getByTestId("seasson")).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByText("Collin Morikawa")).toBeInTheDocument();
      expect(screen.getByText("Matt Fitzpatrick")).toBeInTheDocument();
    });
  });

  it("it should display Matt Fitzpatrick when season is 2022", async () => {
    nock("https://localhost:3000")
      .get("/tour-ranking")
      .query(true)
      .reply(200, leaderboard);

    render(
      <QueryClientProvider client={queryClient}>
        <Leaderboard />
      </QueryClientProvider>
    );

    await waitFor(async () => {
      const selectSeason = screen.getByTestId("seasson") as HTMLSelectElement;
      selectSeason.value = "2022";

      await waitFor(() => {
        expect(screen.getByText("Matt Fitzpatrick")).toBeInTheDocument();
      });
    });
  });

  it("it should change the page when the previous/next buttons are clicked and Will Zalatoris should be found on the second page", async () => {
    nock("https://localhost:3000")
      .get("/tour-ranking")
      .query(true)
      .reply(200, leaderboard);

    render(
      <QueryClientProvider client={queryClient}>
        <Leaderboard />
      </QueryClientProvider>
    );

    await waitFor(async () => {
      const previousPageButton = screen.getByTestId("previous-page");
      previousPageButton.click();

      await waitFor(async () => {
        const currentPage = screen.getByTestId("current-page");
        expect(currentPage).toHaveTextContent("1");
      });

      const nextPageButton = screen.getByTestId("next-page");
      nextPageButton.click();

      await waitFor(async () => {
        const currentPage = screen.getByTestId("current-page");
        console.log(currentPage.TEXT_NODE);
        expect(currentPage).toHaveTextContent("2");
        expect(screen.getByText("Will Zalatoris")).toBeInTheDocument();
      });
    });
  });
});
