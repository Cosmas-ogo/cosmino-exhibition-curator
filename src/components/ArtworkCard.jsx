export default function ArtworkCard({ item, onOpen, onAdd }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen?.()}
      aria-label={`Open details for ${item.title} by ${item.artist}`}
      className="w-full text-left group rounded-2xl border border-zinc-200 bg-white p-2 transition-shadow
                 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                 dark:border-zinc-800 dark:bg-zinc-900"
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
          <div className="truncate font-semibold text-zinc-900 dark:text-zinc-100">
            {item.title}
          </div>
          <div className="truncate text-sm text-zinc-600 dark:text-zinc-400">
            {item.artist}
          </div>
        </div>
        <span className="shrink-0 rounded-full border px-2 py-0.5 text-xs border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
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
          className="rounded-full border border-zinc-300 px-3 py-1 text-sm text-zinc-800 hover:bg-zinc-100
                     dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Add
        </button>
      </div>
    </div>
  );
}
