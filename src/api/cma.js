const CMA_BASE = "https://openaccess-api.clevelandart.org/api";

export async function searchCma({
  q,
  skip = 0,
  limit = 20,
  hasImage = 1,
  cc0 = 1,
}) {
  const params = new URLSearchParams({
    q,
    skip,
    limit,
    has_image: hasImage,
    cc0,
  });
  const res = await fetch(`${CMA_BASE}/artworks?${params.toString()}`);
  if (!res.ok) throw new Error("CMA search failed");
  return res.json(); // { data: [...], info: { total: ... } }
}

export async function getCmaArtwork(idOrAccession) {
  const res = await fetch(`${CMA_BASE}/artworks/${idOrAccession}`);
  if (!res.ok) throw new Error("CMA artwork failed");
  const data = await res.json();
  return data.data;
}
