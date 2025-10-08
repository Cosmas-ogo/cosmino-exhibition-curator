// // Cleveland Museum of Art Open Access API client
// // Docs: https://openaccess-api.clevelandart.org/

// const CMA_BASE = "https://openaccess-api.clevelandart.org/api";

// /**
//  * Search CMA artworks.
//  * Returns full payload: { data: [...], info: {...} }
//  */
// export async function fetchSearchCma({
//   q,
//   hasImage = 1,
//   cc0 = 1,
//   limit = 24,
//   skip = 0,
// } = {}) {
//   const params = new URLSearchParams({
//     q: q ?? "",
//     has_image: String(hasImage),
//     cc0: String(cc0),
//     limit: String(limit),
//     skip: String(skip),
//   });
//   const res = await fetch(`${CMA_BASE}/artworks?${params.toString()}`);
//   if (!res.ok) throw new Error(`CMA search failed: ${res.status}`);
//   return res.json();
// }

// /** Fetch a single CMA artwork (id or accession number) */
// export async function fetchCmaArtwork(idOrAccession) {
//   const res = await fetch(`${CMA_BASE}/artworks/${idOrAccession}`);
//   if (!res.ok) throw new Error(`CMA artwork failed: ${res.status}`);
//   const data = await res.json();
//   return data.data;
// }

// FILE: src/api/cma.js
// Cleveland Museum of Art Open Access API client
// Docs: https://openaccess-api.clevelandart.org/

const CMA_BASE = "https://openaccess-api.clevelandart.org/api";

/**
 * Search CMA artworks.
 * Returns full payload: { data: [...], info: {...} }
 * @param {{ q?: string, hasImage?: 0|1, cc0?: 0|1, limit?: number, skip?: number }} params
 * @param {{ signal?: AbortSignal }} [opts]
 */
export async function fetchSearchCma(
  { q, hasImage = 1, cc0 = 1, limit = 24, skip = 0 } = {},
  { signal } = {}
) {
  const params = new URLSearchParams({
    q: q ?? "",
    has_image: String(hasImage),
    cc0: String(cc0),
    limit: String(limit),
    skip: String(skip),
  });
  const res = await fetch(`${CMA_BASE}/artworks?${params.toString()}`, {
    signal,
  });
  if (!res.ok) throw new Error(`CMA search failed: ${res.status}`);
  return res.json();
}

/** Fetch a single CMA artwork (id or accession number) */
export async function fetchCmaArtwork(idOrAccession, { signal } = {}) {
  const res = await fetch(`${CMA_BASE}/artworks/${idOrAccession}`, { signal });
  if (!res.ok) throw new Error(`CMA artwork failed: ${res.status}`);
  const data = await res.json();
  return data.data;
}
