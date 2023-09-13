import { useQuery } from "@tanstack/react-query";

type Options = {
  pageIndex: number;
  pageSize: number;
  tourId: number;
  season: number;
};

const fetchData = async ({ pageIndex, pageSize, tourId, season }: Options) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tour-ranking?tour_id=${tourId}&season=${season}&pageIndex=${pageIndex}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
};

export function useLeaderboard(params: Options) {
  return useQuery({
    queryKey: ["data", params],
    queryFn: () => fetchData(params),
  });
}
