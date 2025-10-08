import ArtworkCard from "./ArtworkCard";
import SkeletonCard from "./SkeletonCard";

export default function ResultsGrid({
  items,
  isLoading,
  isError,
  onOpen,
  onAdd,
}) {
  const announceText = isLoading
    ? "Loading results"
    : items?.length
      ? `${items.length} artworks`
      : "No artworks";

  let content = null;

  if (isError) {
    content = (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-800"
      >
        We couldn’t load results. Please try again.
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[min(100%,18rem)]">
            <SkeletonCard />
          </div>
        ))}
      </div>
    );
  } else if (!items?.length) {
    content = (
      <div className="mt-4 text-sm text-gray-600">
        No artworks found. Try a different search term.
      </div>
    );
  } else {
    content = (
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {items.map((it) => (
          <div key={it.id} className="w-[min(100%,18rem)]">
            <ArtworkCard item={it} onOpen={() => onOpen(it)} onAdd={onAdd} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announceText}
      </p>

      {content}
    </>
  );
}
