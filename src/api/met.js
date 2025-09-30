const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function searchMet({
  q,
  medium,
  departmentId,
  hasImages = true,
  page = 1,
  pageSize = 20,
}) {
  const params = new URLSearchParams({ q, hasImages: String(hasImages) });
  if (medium) params.set("medium", medium);
  if (departmentId) params.set("departmentId", String(departmentId));

  const res = await fetch(`${MET_BASE}/search?${params.toString()}`);
  if (!res.ok) throw new Error("Met search failed");
  const data = await res.json();
  const ids = (data.objectIDs || []).slice(0, pageSize * page); // simple paging
  return ids;
}

export async function getMetObject(id) {
  const res = await fetch(`${MET_BASE}/objects/${id}`);
  if (!res.ok) throw new Error("Met object failed");
  return res.json();
}
