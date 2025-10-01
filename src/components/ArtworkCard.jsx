export default function ArtworkCard({ item, onOpen, onAdd }) {
  return (
    <button
      className="w-full text-left"
      onClick={onOpen}
      aria-label={`Open details for ${item.title} by ${item.artist}`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
        {item.imageThumb ? (
          <img
            src={item.imageThumb}
            alt={`${item.title} by ${item.artist}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-opacity hover:opacity-90"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="truncate font-medium">{item.title}</div>
          <div className="truncate text-sm text-gray-600">{item.artist}</div>
        </div>
        <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs">
          {item.source.toUpperCase()}
        </span>
      </div>
      <div className="mt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd?.(item);
          }}
          className="rounded-xl border px-3 py-1 text-sm hover:bg-gray-50"
        >
          Add
        </button>
      </div>
    </button>
  );
}
