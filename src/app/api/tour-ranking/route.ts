import { NextResponse } from "next/server";

type DataType = any;

interface Cache {
  [key: string]: { rows: DataType; pageCount: number };
}

let cache: Cache = {};

export async function GET(request: Request) {
  const params = new URL(request.url);
  const tourId = params.searchParams.get("tour_id") ?? 1;
  const season = params.searchParams.get("season") ?? 2021;

  const pageIndex = parseInt(params.searchParams.get("pageIndex") ?? "0");
  const pageSize = parseInt(params.searchParams.get("pageSize") ?? "10");

  const cacheKey = `${tourId}-${season}-${pageIndex}-${pageSize}`;

  if (cache[cacheKey]) {
    return NextResponse.json(cache[cacheKey]);
  }

  const req = await fetch(`${process.env.API_URL}/${tourId}/${season}`, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY!,
      "X-RapidAPI-Host": process.env.RAPID_API_HOST!,
    },
  });

  try {
    const res = await req.json();

    if (res.error) {
      return NextResponse.json({rows: [], pageCount: 0});
    }

    const startIndex = pageIndex * pageSize;
    const endIndex = (pageIndex + 1) * pageSize;

    const rows = res.results.rankings.slice(startIndex, endIndex);
    const pageCount = Math.ceil(res.results.rankings.length / pageSize);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "No results found for the specified page." },
        { status: 404 }
      );
    }

    const result = { rows, pageCount };
    cache[cacheKey] = result;
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.error();
  }
}
