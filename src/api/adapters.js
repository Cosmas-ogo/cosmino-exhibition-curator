// Map raw API payloads into a single normalized Artwork shape.

export function mapMetToArtwork(o) {
  return {
    id: `met:${o.objectID}`,
    source: "met",
    title: o.title || "Untitled",
    artist: o.artistDisplayName || "Unknown",
    dateText: o.objectDate || "",
    medium: o.medium || null,
    culture: o.culture || null,
    department: o.department || null,
    onViewHint: o.GalleryNumber ? `Gallery ${o.GalleryNumber}` : null,
    museum: "The Metropolitan Museum of Art",
    link: o.objectURL || o.linkResource || "",
    imageThumb: o.primaryImageSmall || null,
    imageFull: o.primaryImage || o.primaryImageSmall || null,
    isPublicDomain: Boolean(o.isPublicDomain),
  };
}

export function mapCmaToArtwork(a) {
  const creator =
    (Array.isArray(a.creators) &&
      a.creators[0] &&
      (a.creators[0].description || a.creators[0].display_name)) ||
    null;

  return {
    id: `cma:${a.id ?? a.accession_number}`,
    source: "cma",
    title: a.title || "Untitled",
    artist: creator || "Unknown",
    dateText: a.creation_date || a.creation_date_earliest || "",
    medium: a.technique || a.type || null,
    culture: Array.isArray(a.culture)
      ? a.culture.join(", ")
      : a.culture || null,
    department: a.department || null,
    onViewHint: a.current_location || null,
    museum: "Cleveland Museum of Art",
    link: a.url || "",
    imageThumb: a?.images?.web?.url || null,
    imageFull: a?.images?.print?.url || a?.images?.web?.url || null,
    isPublicDomain: a.cc0 === 1 || a.share_license_status === "CC0",
  };
}
