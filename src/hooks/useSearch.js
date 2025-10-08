import { useQuery } from "@tanstack/react-query";
import { fetchSearchAic } from "../api/aic";
import { fetchSearchCma } from "../api/cma";
import { mapAicToArtwork, mapCmaToArtwork } from "../api/adapters";

const CMA_LIMIT = 24;
const AIC_LIMIT = 24;

export function useSearch(query, options = {}) {
  const includeAic = options.includeAic ?? true;
  const includeCma = options.includeCma ?? true;

  return useQuery({
    queryKey: ["search", { query, includeAic, includeCma }],
    enabled: Boolean(query) && (includeAic || includeCma),
    queryFn: async () => {
      const tasks = [];
      if (includeAic) tasks.push(fetchAicBatch(query));
      if (includeCma) tasks.push(fetchCmaBatch(query));

      const settled = await Promise.allSettled(tasks);
      const items = [];
      for (const res of settled) {
        if (res.status === "fulfilled") items.push(...res.value);
      }

      items.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      return items;
    },
    staleTime: 1000 * 60 * 5,
  });
}

async function fetchAicBatch(q) {
  const payload = await fetchSearchAic({
    q,
    limit: AIC_LIMIT,
    page: 1,
    isPublicDomain: true,
    hasImage: true,
  });
  const iiifUrl = payload?.config?.iiif_url || "https://www.artic.edu/iiif/2";
  return (payload.data || []).map((a) => mapAicToArtwork(a, iiifUrl));
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
