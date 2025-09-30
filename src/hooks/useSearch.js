// Aggregates Met + CMA searches with sane defaults and partial-failure tolerance.

import { useQuery } from "@tanstack/react-query";
import { fetchSearchMet, fetchMetObject } from "../api/met";
import { fetchSearchCma } from "../api/cma";
import { mapMetToArtwork, mapCmaToArtwork } from "../api/adapters";

const MET_DETAIL_CONCURRENCY = 8;
const MET_MAX_DETAILS = 32;
const CMA_LIMIT = 24;

/**
 * useSearch(query, options)
 * options: { includeMet?: boolean, includeCma?: boolean }
 */
export function useSearch(query, options = {}) {
  const includeMet = options.includeMet ?? true;
  const includeCma = options.includeCma ?? true;

  return useQuery({
    queryKey: ["search", { query, includeMet, includeCma }],
    enabled: Boolean(query) && (includeMet || includeCma),
    queryFn: async () => {
      const tasks = [];
      if (includeMet) tasks.push(fetchMetBatch(query));
      if (includeCma) tasks.push(fetchCmaBatch(query));

      const settled = await Promise.allSettled(tasks);
      const items = [];
      for (const res of settled) {
        if (res.status === "fulfilled") items.push(...res.value);
      }
      // Lightweight sort: by title then artist (relevance is API-specific).
      items.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      return items;
    },
    staleTime: 1000 * 60 * 5,
  });
}

async function fetchMetBatch(q) {
  const ids = await fetchSearchMet({ q, hasImages: true });
  const first = (ids || []).slice(0, MET_MAX_DETAILS);
  const results = [];

  for (let i = 0; i < first.length; i += MET_DETAIL_CONCURRENCY) {
    const slice = first.slice(i, i + MET_DETAIL_CONCURRENCY);
    const objs = await Promise.all(slice.map(fetchMetObject));
    // filter out records without any image URL
    objs
      .filter((o) => o.primaryImage || o.primaryImageSmall)
      .forEach((o) => results.push(mapMetToArtwork(o)));
  }
  return results;
}

async function fetchCmaBatch(q) {
  const data = await fetchSearchCma({
    q,
    hasImage: 1,
    cc0: 1,
    limit: CMA_LIMIT,
    skip: 0,
  });
  return (data.data || []).map(mapCmaToArtwork);
}
