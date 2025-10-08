// Art Institute of Chicago API client
// Docs: https://api.artic.edu/docs/#introduction

const AIC_BASE = "https://api.artic.edu/api/v1";

/**
 * Search AIC artworks.
 * Returns full payload: { data: [...], config: {...}, pagination: {...} }
 */
export async function fetchSearchAic({
  q,
  limit = 24,
  page = 1,
  isPublicDomain = true,
  hasImage = true,
} = {}) {
  // Build 'params' with fields we actually render to minimize payload size.
  const fields = [
    "id",
    "title",
    "artist_title",
    "date_display",
    "medium_display",
    "department_title",
    "place_of_origin",
    "is_public_domain",
    "image_id",
  ].join(",");

  const params = new URLSearchParams({
    q: q ?? "",
    fields,
    page: String(page),
    limit: String(limit),
  });

  // Simple client-side filters after fetch (AIC search doesn’t have a direct "has_image" toggle;
  // we’ll drop items without image_id below).
  const res = await fetch(`${AIC_BASE}/artworks/search?${params.toString()}`);
  if (!res.ok) throw new Error(`AIC search failed: ${res.status}`);
  const data = await res.json();

  // Optionally filter to PD + has image in client (to keep code simple & consistent)
  const filtered = {
    ...data,
    data: (data.data || []).filter((a) => {
      if (hasImage && !a.image_id) return false;
      if (isPublicDomain && a.is_public_domain === false) return false;
      return true;
    }),
  };
  return filtered;
}

/** Fetch a single AIC artwork by id (if you deep-link into one) */
export async function fetchAicArtwork(id) {
  const fields = [
    "id",
    "title",
    "artist_title",
    "date_display",
    "medium_display",
    "department_title",
    "place_of_origin",
    "is_public_domain",
    "image_id",
  ].join(",");
  const res = await fetch(
    `${AIC_BASE}/artworks/${id}?fields=${encodeURIComponent(fields)}`
  );
  if (!res.ok) throw new Error(`AIC artwork failed: ${res.status}`);
  return res.json(); // { data: {...}, config: {...} }
}
