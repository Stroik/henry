import { PageHeader } from "@/components/PageHeader";
import { Leaderboard } from "@/containers/Leaderboard";

const getLeaderboard = async () => {
  const url =
    "https://golf-leaderboard-data.p.rapidapi.com/tour-rankings/2/2021";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7b6beaf6famsh4fdd62d8f845405p16c61cjsn6f6d50f0f46c",
      "X-RapidAPI-Host": "golf-leaderboard-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const res = await response.json();
    const { results: { rankings } } = res;
    return rankings;
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  const leaderboard = await getLeaderboard();

  return (
    <section className="">
      <PageHeader title="Golf Leaderboard" />
      <Leaderboard data={leaderboard} />
    </section>
  );
}
