import ArtworkCard from "./ArtworkCard";
import SkeletonCard from "./SkeletonCard";

export default function ResultsGrid({
  items,
  isLoading,
  isError,
  onOpen,
  onAdd,
}) {
  if (isError) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-800"
      >
        We couldn’t load results. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return (
      <div className="mt-4 text-sm text-gray-600">
        No artworks found. Try a different search term.
      </div>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((it) => (
        <ArtworkCard
          key={it.id}
          item={it}
          onOpen={() => onOpen(it)}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
