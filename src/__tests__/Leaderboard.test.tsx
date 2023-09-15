import { render, renderHook, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";
import { Leaderboard } from "@/containers/Leaderboard";
import {
  leaderboard,
  tour2season2021,
  tour2season2023,
  noResults,
} from "../dummy";
import type { ReactElement } from "react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === "test" ? () => {} : console.error,
  },
});

beforeAll(() => {
  if (!global.fetch) {
    global.fetch = require("node-fetch");
  }
});

const wrapper = ({ children }: { children: ReactElement }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Leaderboard", () => {
  const mockOptions = {
    pageIndex: 0,
    pageSize: 10,
    tourId: 1,
    season: 2023,
  };

  const expectation = nock("http://localhost:3000")
    .get("/api/tour-ranking")
    .reply(200, leaderboard);

  it("it should render the skeleton component before data is fetched", async () => {
    const { result } = renderHook(() => useLeaderboard(mockOptions), {
      wrapper,
    });
    const { getByTestId } = render(<TableSkeleton />, { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(getByTestId("skeleton")).toBeInTheDocument();
  });

  it("it should render the leaderboard component and display data", async () => {
    queryClient.setQueriesData(["data", mockOptions], () => leaderboard);

    const { result } = renderHook(() => useLeaderboard(mockOptions), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toEqual(leaderboard));

    const { getByTestId } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("table-component")).toBeInTheDocument();
  });

  it("it should render the filters tour and season", async () => {
    const { getByTestId } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("tour")).toBeInTheDocument();
    expect(getByTestId("season")).toBeInTheDocument();
  });

  it("it should render the filters tour and season with the correct values", async () => {
    const { getByTestId } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("tour")).toHaveValue("1");
    expect(getByTestId("season")).toHaveValue("2023");
  });

  it("it should change the tour filter and show the correct data", async () => {
    queryClient.setQueriesData(["data", mockOptions], () => leaderboard);

    const { result } = renderHook(() => useLeaderboard(mockOptions), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toEqual(leaderboard));

    const { getByTestId, getByText } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("table-component")).toBeInTheDocument();
    const tourFilter = getByTestId("tour") as HTMLSelectElement;
    tourFilter.value = "2";

    queryClient.setQueriesData(["data", mockOptions], () => tour2season2023);
    await waitFor(() => expect(result.current.data).toEqual(tour2season2023));
    expect(getByText("Lucas Glover")).toBeInTheDocument();
    expect(getByText("3,041")).toBeInTheDocument();
  });

  it("it should change the season filter and show the correct data", async () => {
    queryClient.setQueriesData(["data", mockOptions], () => leaderboard);

    const { result } = renderHook(() => useLeaderboard(mockOptions), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toEqual(leaderboard));

    const { getByTestId, getByText } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("table-component")).toBeInTheDocument();
    const seasonFilter = getByTestId("season") as HTMLSelectElement;
    seasonFilter.value = "2022";

    queryClient.setQueriesData(["data", mockOptions], () => tour2season2021);
    await waitFor(() => expect(result.current.data).toEqual(tour2season2021));
    expect(getByText("Harris English")).toBeInTheDocument();
    expect(getByText("2,039")).toBeInTheDocument();
  });

  it("it should show no results when there is no data", async () => {
    queryClient.setQueriesData(["data", mockOptions], () => noResults);

    const { result } = renderHook(() => useLeaderboard(mockOptions), {
      wrapper,
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.data).toEqual(noResults));

    const { getByTestId, getByText } = render(<Leaderboard />, { wrapper });
    expect(getByTestId("table-component")).toBeInTheDocument();
    expect(
      getByText("No results for tour/season combination")
    ).toBeInTheDocument();
  });
});
