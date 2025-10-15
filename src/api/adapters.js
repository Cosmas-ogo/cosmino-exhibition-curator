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

export function mapAicToArtwork(a, iiifUrl) {
  const imageId = a.image_id || null;
  const base = iiifUrl && imageId ? `${iiifUrl}/${imageId}` : null;

  const imageThumb = base ? `${base}/full/400,/0/default.jpg` : null;
  const imageFull = base ? `${base}/full/843,/0/default.jpg` : null;

  return {
    id: `aic:${a.id}`,
    source: "aic",
    title: a.title || "Untitled",
    artist: a.artist_title || "Unknown",
    dateText: a.date_display || "",
    medium: a.medium_display || null,
    culture: a.place_of_origin || null,
    department: a.department_title || null,
    onViewHint: null,
    museum: "Art Institute of Chicago",
    link: `https://www.artic.edu/artworks/${a.id}`,
    imageThumb,
    imageFull: imageFull || imageThumb,
    isPublicDomain: Boolean(a.is_public_domain),
  };
}
