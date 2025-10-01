import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMetObject } from "../api/met";
import { fetchCmaArtwork } from "../api/cma";
import { mapMetToArtwork, mapCmaToArtwork } from "../api/adapters";

/**
 * useArtwork(input)
 * input: "met:437133" | "cma:12345" | { source: 'met'|'cma', id: '...' }
 */
export function useArtwork(input) {
  const { source, id, composite } = normalizeInput(input);
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["artwork", source, id],
    queryFn: async () => {
      if (source === "met") {
        const obj = await fetchMetObject(id);
        return mapMetToArtwork(obj);
      }
      if (source === "cma") {
        const art = await fetchCmaArtwork(id);
        return mapCmaToArtwork(art);
      }
      throw new Error(`Unknown source "${source}"`);
    },
    placeholderData: () => findFromSearchCache(queryClient, composite),
    staleTime: 1000 * 60 * 10,
    retry: 2,
  });
}

function normalizeInput(input) {
  if (typeof input === "string") {
    const [source, ...rest] = input.split(":");
    const id = rest.join(":");
    return { source, id, composite: input };
  }
  if (input && typeof input === "object" && input.source && input.id) {
    return {
      source: input.source,
      id: String(input.id),
      composite: `${input.source}:${input.id}`,
    };
  }
  throw new Error(
    'useArtwork: expected "met:123", "cma:abc", or { source, id }'
  );
}

function findFromSearchCache(queryClient, compositeKey) {
  const hits = queryClient.getQueriesData({ queryKey: ["search"] });
  for (const [, data] of hits) {
    if (Array.isArray(data)) {
      const found = data.find((it) => it.id === compositeKey);
      if (found) return found;
    }
  }
  return undefined;
}
