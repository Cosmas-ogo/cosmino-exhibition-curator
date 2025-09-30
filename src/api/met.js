// The Met Collection API client
// Docs: https://metmuseum.github.io/

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

/**
 * Search Met for object IDs.
 * @returns {Promise<number[]>} array of objectIDs
 */
export async function fetchSearchMet({
  q,
  hasImages = true,
  medium,
  departmentId,
} = {}) {
  const params = new URLSearchParams({
    q: q ?? "",
    hasImages: String(hasImages),
  });
  if (medium) params.set("medium", medium);
  if (departmentId) params.set("departmentId", String(departmentId));

  const res = await fetch(`${MET_BASE}/search?${params.toString()}`);
  if (!res.ok) throw new Error(`Met search failed: ${res.status}`);
  const data = await res.json();
  return data.objectIDs || [];
}

/** Fetch a single Met object by ID */
export async function fetchMetObject(id) {
  const res = await fetch(`${MET_BASE}/objects/${id}`);
  if (!res.ok) throw new Error(`Met object failed: ${res.status}`);
  return res.json();
}
